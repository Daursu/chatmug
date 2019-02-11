<template>
  <div class="flex text-left mb-4 pl-2" :class="{ 'flex-row-reverse pr-2': ownMessage }">
    <div class="mt-2">
      <ChatUserGravatar :username="message.username"/>
    </div>
    <div class="flex-grow ml-3 max-w-xs mr-3">
      <div class="shadow border rounded text-sm bg-white p-3"
           :class="{ 'bg-green text-white': ownMessage }">
        <div class="text-left font-bold mb-2">
          {{ message.username }}
        </div>
        {{ message.message }}
      </div>
      <div class="text-right italic text-xs mt-2">
        <span :title="isoDate">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import ChatUserGravatar from '@/components/ChatUserGravatar.vue';

export default {
  name: 'ChatMessage',

  components: {
    ChatUserGravatar,
  },

  props: {
    message: Object,
    ownMessage: Boolean,
  },

  computed: {
    date() {
      return moment(this.message.timestamp).format('hh:mm a');
    },

    isoDate() {
      return moment(this.message.timestamp).toISOString();
    },
  },
};
</script>

<style scoped lang="scss">
  img {
    max-width: 2em;
    max-height: 2em;
  }
</style>
