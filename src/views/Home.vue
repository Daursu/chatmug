<template>
  <div class="home text-left">
    <div class="flex flex-wrap">
      <div class="w-2/3 ml-auto mr-auto h-12 max-w-xs">
        <div class="w-full max-w-xs mt-12">
          <h1 class="text-center">ChatMUG</h1>
        </div>

        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
              v-on:submit.prevent="login">
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3
                          text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                   id="username"
                   type="text"
                   autocomplete="off"
                   required="required"
                   placeholder="Username"
                   v-model="username">
          </div>
          <div v-if="loginError" class="text-red text-xs italic mb-4">
            {{ loginError }}
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue hover:bg-blue-dark text-white font-bold w-full
                           py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
              Start Chatting
            </button>
          </div>
        </form>

        <p class="text-center text-grey text-xs">
          &copy;2019 ChatMug. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data: () => ({
    username: '',
  }),

  computed: {
    loginError() {
      return this.$store.state.login.error;
    },
  },

  created() {
    if (this.$store.state.auth.token) {
      this.$router.push('chat');
    }
  },

  methods: {
    login() {
      this.$store.dispatch('login', this.username).then(() => {
        if (!this.loginError) {
          this.$router.push('chat');
        }
      });
    },
  },
};
</script>

<style lang="scss">
  body {
    background-image: url('../assets/home-bg.jpeg');

    /*
    &::after {
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2));
      box-shadow: 0 0 80px rgba(0, 0, 0, 0.3) inset;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 1;
    }
    */
  }
</style>
