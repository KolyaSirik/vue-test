<template>
  <div class="container fill-height">
    <div class="row">
      <div class="col-12 text-screen-center">
        <h1 class="text-center">Page not found!</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style>
  .fill-height {
    position: relative;
    min-height: 100%;
    height:80vh;
  }
  .text-screen-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
