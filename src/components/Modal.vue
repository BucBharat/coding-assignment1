<template>
  <v-card
    id="dialogBox"
    v-if="currentUser != null"
    class="mx-auto pa-0 ma-0 rounded-lg"
    outlined
    flat
  >
    <v-list-item class="pa-0 ma-0">
      <v-img
        :src="currentUser.image"
        class="white--text align-center text-center rounded-lg"
        gradient="to bottom,
            rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="450px"
        width="90px"
      >
      </v-img>
      <v-list-item-content>
        <v-col class="text-right">
          <v-btn icon @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
        </v-col>

        <p class="pa-1">
          <v-icon large color="black darken-2"> mdi-account </v-icon>&emsp;{{
            this.currentUser.name
          }}
        </p>
        <a :href="mailTo" class="pa-1">
          <v-icon large color="black darken-2"> mdi-email </v-icon>&emsp;{{
            this.currentUser.email
          }}
        </a>
        <p class="pa-1">
          <v-icon large color="black darken-2"> mdi-phone </v-icon>&emsp;{{
            this.currentUser.phone
          }}
        </p>
        <p class="pa-1">
          <v-icon large color="black darken-2"> mdi-home </v-icon>
          &emsp;{{ this.currentUser.address.city }},
          {{ this.currentUser.address.street }}
        </p>

        <p class="pa-1">
          <v-icon large color="black darken-2"> mdi-web-box </v-icon>&emsp;{{
            this.currentUser.website
          }}
        </p>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    currentUser: {
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
  computed: {
    mailTo() {
      return 'mailto:' + this.currentUser.email;
    },
  },
};
</script>

<style scoped>
a,
a:hover,
a:focus,
a:active {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
</style>
