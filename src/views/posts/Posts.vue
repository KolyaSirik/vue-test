<template>
  <div>
    <posts-filter
      :authors="authors"
      :userId="userId"
      :currentPath="currentPath"
      @filter-posts="filterPosts"
    />

    <posts-pagination
      :meta="meta"
      :perPage="perPage"
      @change-per-page="changePerPage"
    />

    <div class="card-columns" v-if="posts.length">
      <post-card v-for="post in posts" :post="post" :key="post.id"/>
    </div>
    <posts-placeholder v-else></posts-placeholder>

    <posts-pagination
      :meta="meta"
      :perPage="perPage"
      v-on:change-per-page="changePerPage"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import router from '@/routes/index.js';
// eslint-disable-next-line import/extensions
import PostsPagination from './partials/PostsPagination';
// eslint-disable-next-line import/extensions
import PostCard from './partials/PostCard';
// eslint-disable-next-line import/extensions
import PostsFilter from './partials/PostsFilter';
// eslint-disable-next-line import/extensions
import PostsPlaceholder from './partials/PostsPlaceholder';

export default {
  name: 'Posts',
  components: {
    PostsPagination,
    PostCard,
    PostsFilter,
    PostsPlaceholder,
  },
  data() {
    return {
      posts: [],
      meta: {},
      authors: [],
      perPage: 10,
      userId: '',
      currentPath: null,
    };
  },
  methods: {
    changePerPage(perPage) {
      this.perPage = perPage;

      router.push({
        parh: this.currentPath,
        query: { perPage },
      });
    },
    async loadData(currentPage, userId) {
      await this.$store.dispatch('posts/loadPosts', {
        perPage: this.perPage,
        currentPage,
        userId,
      });

      this.setData();
    },
    filterPosts(userId) {
      this.userId = userId;

      router.push({
        name: 'posts',
        params: { userId: userId === '' ? null : userId },
        query: {
          perPage: this.perPage,
          currentPage: this.meta.currentPage,
        },
      });
    },
    setData() {
      this.posts = this.$store.getters['posts/posts'];
      this.meta = this.$store.getters['posts/meta'];
      this.authors = this.$store.getters['posts/authors'];
    },
  },
  watch: {
    $route(to) {
      this.currentPath = to.path;

      this.loadData(to.query.currentPage, to.params.userId);
    },
  },
  created() {
    if (this.$route.query.perPage) {
      this.perPage = this.$route.query.perPage;
    }

    if (this.$route.params.userId) {
      this.userId = this.$route.params.userId;
    }

    this.loadData(this.$route.query.currentPage, this.userId);
  },
};
</script>

<style type="scss">
  .card-columns {
    @include media-breakpoint-only(lg) {
      column-count: 4;
    }
    @include media-breakpoint-only(xl) {
      column-count: 5;
    }
  }
</style>
