<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/Batvoice.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex xs12 lg6 offset-lg1 mb-4>
        <v-card>
          <v-card-text>
            <div v-if="selected">{{ selected.name }}</div>
          </v-card-text>
        </v-card>
        <vuetify-audio :file="selected.location"></vuetify-audio>
      </v-flex>
      <v-flex xs12 lg3 offset-lg1 mb-4>
        <v-select
          label="Select Audio to transcript"
          :items="audiosNotTranscripted"
          item-text="name"
          v-model="selected"
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 lg8 offset-lg2>
        <v-textarea
          label="Transcript"
          :outlined="true"
          placeholder="Transcript goes here..."
          :rounded="true"
          :row-height="24"
          :rows="5"
          v-model="transcriptText"
        ></v-textarea>
      </v-flex>

      <v-flex mb-5 xs12>
        <v-layout justify-center>
          <v-btn color="primary" @click="submitTranscript">submit</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VuetifyAudio from "vuetify-audio";
import axios from "axios";
import authHeader from "../services/auth-header";

export default {
  components: {
    VuetifyAudio
  },
  data() {
    return {
      audiosNotTranscripted: [],
      selected: "",
      transcriptText: ""
    };
  },
  methods: {
    submitTranscript() {
      var data = {
        voice: this.selected.id,
        body: this.transcriptText
      };
      axios
        .post("http://127.0.0.1:8000/api/voice/transcript/", data, {
          headers: authHeader()
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/voice/not-transcripted/", {
        headers: authHeader()
      })
      .then(response => {
        this.audiosNotTranscripted = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
