<template>
  <div id="pageLayout">
    <v-row>
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
    };
  },
  methods: {
    showModal(user) {
      this.modalDisplay = true;
      this.currentUser = user;
    },
    closeModal() {
      this.modalDisplay = false;
      this.currentUser = null;
    },
    signOut() {
      localStorage.removeItem('accessToken');
      this.$router.push({ name: 'Login' });
    },
    showMobileSideBar() {
      this.mobileSideBarVar = !this.mobileSideBarVar;
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
</style>
