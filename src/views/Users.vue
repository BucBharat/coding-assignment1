<template>
  <div id="pageLayout">
    <SideBar />

    <v-row class="mt-14 ml-3">
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
        <Modal :currentUser="currentUser" @close-modal="dialog = false" />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import EventService from '../Services/EventService';
import SideBar from '../components/SideBar.vue';
import Modal from '../components/Modal.vue';

export default {
  components: {
    SideBar,
    Modal,
  },
  data() {
    return {
      users: [],
      dialog: false,
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
