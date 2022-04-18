<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-alert :value="showAlert" type="error">
              Please enter correct details!
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign in to your account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    v-model="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <v-checkbox
                    v-model="ex4"
                    label="keep me signed in"
                    color="primary"
                    value="primary"
                    hide-details
                  ></v-checkbox>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    >Login</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showAlert: false,
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '1234') {
        alert('Entered correct details');
        this.showAlert = false;
      } else {
        // alert('Entered wrong details');
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
        this.username = '';
        this.password = '';
      }
    },
  },
};
</script>
