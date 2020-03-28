<template>
  <v-app>
    <v-app-bar app color="info" dark>
      <v-toolbar-title>
        <img src="./assets/logo.webp" /> Annotator
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
        >{{ link.label }}</v-btn
      >
      <div v-if="currentUser">
        <v-btn text rounded>{{ currentUser }} </v-btn>
        <v-btn text rounded @click="logOut">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text rounded :to="{ name: 'login' }">Login</v-btn>
      </div>
      <v-btn @click="toggleTheme" text rounded>Toggle Theme</v-btn>
    </v-app-bar>
    <v-content>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer color="info lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
          >{{ link.label }}</v-btn
        >
        <v-flex info lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>Batvoice</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: [
        {
          label: "Home",
          url: "/"
        },

        {
          label: "Signup",
          url: "/signup"
        },
        {
          label: "Visualize Data",
          url: "/visualize"
        }
      ]
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = "#0080FF";
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}
</style>
