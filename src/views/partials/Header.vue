<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-4">
    <div class="container">
      <router-link :to="{name: 'home'}" class="navbar-brand">Vue.js</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{name: 'posts'}" class="nav-link">Posts</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <ul class="nav navbar-nav navbar-right">
            <li class="nav-item">
              <router-link :to="{name: 'registration'}" class="nav-link"
                           v-if="!$store.getters['auth/user']">
                Sign up
              </router-link>
              <a href="#" class="nav-link" @click="logout" v-else>Log Out</a>
            </li>
          </ul>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>
