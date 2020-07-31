<template>
  <div>
    <Header/>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <router-view/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './views/partials/Header.vue';
import Footer from './views/partials/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
