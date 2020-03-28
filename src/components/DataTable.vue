<template>
  <v-container>
    <v-card>
      <v-card-title>
        Transcripts
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transcripts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Axios from "axios";
import authHeader from "../services/auth-header";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Transcript ID",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Transcript Text", value: "body" },
        { text: " Annotator", value: "annotator" },
        { text: "Audio ID", value: "voice" }
      ],
      transcripts: []
    };
  },
  mounted() {
    Axios.get("http://127.0.0.1:8000/api/voice/transcript/", {
      headers: authHeader()
    })
      .then(response => (this.transcripts = response.data))
      .catch(err => console.log(err));
  }
};
</script>
