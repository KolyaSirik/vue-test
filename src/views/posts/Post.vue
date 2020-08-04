<template>
  <div>
    <h1>{{ post.title }}</h1>

    <p>{{ post.body }}</p>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import router from '@/routes/index.js';

export default {
  data() {
    return {
      post: {},
    };
  },
  async mounted() {
    if (!this.$store.getters['auth/user']) {
      router.push({ name: 'registration' });

      return;
    }

    await this.$store.dispatch('posts/loadPost', this.$route.params.id);

    this.post = this.$store.getters['posts/post'];
  },
};
</script>
