<template>
  <div class="flex bg-white border-t p-3 items-center h-16">
    <input class="appearance-none w-full py-2 px-3
                  text-grey-darker leading-tight focus:outline-none"
           type="text"
           @keypress.enter="submit"
           v-model="message"
           placeholder="Type a message to send..." />
    <i class="far fa-paper-plane mr-2 text-grey" :class="{ 'text-green': message.length }"></i>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',

  data: () => ({
    message: '',
  }),

  methods: {
    submit() {
      // Don't submit an empty message
      if (this.message.length === 0) {
        return;
      }

      this.$store.dispatch('sendMessage', this.message).then(() => {
        // Reset the message field
        this.message = '';
      });
    },
  },
};
</script>
