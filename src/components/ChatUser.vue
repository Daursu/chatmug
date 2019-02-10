<template>
  <div class="flex pl-4 mb-4 items-center">
    <ChatUserGravatar :username="username" />
    <span class="flex-grow font-medium ml-2">{{ username }}</span>
  </div>
</template>

<script>
import ChatUserGravatar from '@/components/ChatUserGravatar.vue';

export default {
  name: 'ChatUser',

  components: {
    ChatUserGravatar,
  },

  props: {
    username: String,
  },
};
</script>

<style scoped lang="scss">
  img {
    max-width: 2em;
    max-height: 2em;
  }
</style>
