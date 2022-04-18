<template>
  <div id="pageLayout">
    <v-app-bar
      absolute
      class="mb-3"
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed left app clipped>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-domain</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Company Name</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menu element</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menu element</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menu element</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-slot:append>
        <v-list-item>
          <v-btn block color="blue" @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-row class="mt-14">
      <v-col
        cols="12"
        sm="4"
        md="3"
        v-for="(user, index) in users"
        :key="index"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            height="300px"
            width="200px"
            @click.stop="settingDialog(user)"
          >
            <v-img
              :src="user.image"
              class="white--text align-center text-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <h2 v-if="hover" class="text-center" v-text="user.name"></h2>
              <p
                v-if="hover"
                class="text-center"
                v-text="user.address.city"
              ></p>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
      <v-dialog v-model="dialog" max-height="500" max-width="800">
        <v-card
          id="dialogBox"
          v-if="currentUser != null"
          class="mx-auto"
          outlined
        >
          <v-list-item class="pa-0 ma-0">
            <v-img
              :src="currentUser.image"
              class="white--text align-center text-center"
              gradient="to bottom,
            rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="450px"
              width="90px"
            >
            </v-img>
            <v-list-item-content>
              <v-col class="text-right">
                <v-btn icon @click="dialog = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-col>

              <p class="pa-1">
                <v-icon large color="black darken-2"> mdi-account </v-icon
                >&emsp;{{ this.currentUser.name }}
              </p>
              <a :href="mailTo" class="pa-1">
                <v-icon large color="black darken-2"> mdi-email </v-icon
                >&emsp;{{ this.currentUser.email }}
              </a>
              <p class="pa-1">
                <v-icon large color="black darken-2"> mdi-phone </v-icon
                >&emsp;{{ this.currentUser.phone }}
              </p>
              <p class="pa-1">
                <v-icon large color="black darken-2"> mdi-home </v-icon>
                &emsp;{{ this.currentUser.address.city }},
                {{ this.currentUser.address.street }}
              </p>

              <p class="pa-1">
                <v-icon large color="black darken-2"> mdi-web-box </v-icon
                >&emsp;{{ this.currentUser.website }}
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import EventService from '../Services/EventService';

export default {
  components: {},
  data() {
    return {
      users: [],
      modalDisplay: false,
      currentUser: null,
      mobileSideBarVar: false,
      dialog: false,
      drawer: false,
    };
  },
  methods: {
    settingDialog(user) {
      this.dialog = true;
      this.currentUser = user;
    },

    signOut() {
      localStorage.removeItem('accessToken');
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    mailTo() {
      return 'mailto:' + this.currentUser.email;
    },
  },
  created() {
    EventService.getUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response);
      });
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
.h2 {
  transition: opacity 0.4s ease-in-out;
}
.p {
  transition: opacity 0.4s ease-in-out;
}
#dialogBox {
  opacity: 1;
}
a,
a:hover,
a:focus,
a:active {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
</style>
