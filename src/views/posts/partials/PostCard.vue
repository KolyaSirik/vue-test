<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'post',
  ],
};
</script>
