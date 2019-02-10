<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="min-w-xs max-w-xs flex flex-col bg-grey-darkest h-full text-left text-white">
      <div class="border-b border-black p-2 mb-3 mt-3 pb-3">
        <input type="text"
               class="rounded-full bg-black text-white w-full pl-4 pr-3 pt-2 pb-2 focus:outline-none"
               v-model="userFilter"
               placeholder="Search" />
      </div>
      <ul class="flex-grow overflow-y-auto list-reset mt-3">
        <li v-for="username in filteredUsers" :key="username">
          <ChatUser :username="username" />
        </li>
      </ul>
      <div class="p-4">
        <a href="#" class="text-white no-underline hover:font-bold" @click.prevent="logout">Logout</a>
      </div>
    </div>

    <!--Main chat window-->
    <div class="flex-grow bg-grey-lighter h-full flex flex-col">
      <div v-if="!connected" class="bg-yellow p-2 shadow text-sm">You are currently offline...</div>
      <div class="border-b border-light-grey text-left p-3">
        <h1 class="text-lg font-medium pl-4 pt-3 pb-3">Lobby</h1>
      </div>
      <div ref="messagesContainer" class="flex-grow overflow-y-auto pt-3">
        <ChatMessage v-for="message in messages"
                     :key="message.id"
                     :message="message"
                     :own-message="message.username === auth.username" />
      </div>
      <ChatInput/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatInput from '@/components/ChatInput.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatUser from '@/components/ChatUser.vue';

export default {
  name: 'chat',

  components: {
    ChatInput,
    ChatMessage,
    ChatUser,
  },

  data: () => ({
    userFilter: '',
  }),

  computed: {
    ...mapState([
      'auth',
      'connected',
      'messages',
      'users',
    ]),

    totalUsers() {
      return this.users.length;
    },

    filteredUsers() {
      const filter = this.userFilter.toLowerCase();

      return this.users
        .filter(u => u.toLowerCase().indexOf(filter) > -1);
    },
  },

  watch: {
    messages() {
      this.scrollToBottom();
    },
  },

  mounted() {
    if (!this.auth.token) {
      return this.$router.push('/');
    }

    this.$store.dispatch('connect');

    this.scrollToBottom();
  },

  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },

    scrollToBottom() {
      setTimeout(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      }, 50);
    },
  },
};
</script>

<style lang="scss">
@import "https://use.fontawesome.com/releases/v5.7.1/css/all.css";
</style>
