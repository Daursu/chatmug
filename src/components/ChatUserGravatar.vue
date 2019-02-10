<template>
  <img :src="gravatar" class="rounded-full max-w-xs" alt="Gravatar" />
</template>

<script>
import md5 from 'md5';

export default {
  name: 'ChatUserGravatar',

  props: {
    username: String,
  },

  computed: {
    hash() {
      return md5(this.username);
    },

    gravatar() {
      return `https://www.gravatar.com/avatar/${this.hash}?d=identicon`;
    }
  },
}
</script>
