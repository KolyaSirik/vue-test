<template>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Authors</label>
    <div class="col-sm-10">
      <select class="custom-select my-1 mr-sm-2"
              v-on:change="$emit('filter-posts', $event.target.value)"
              :value="userId"
      >
        <option v-for="(author, key) in authors"
                :key="key"
                :value="author === 'All' ? '' : author">
          {{ author }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authors: Array,
    userId: String,
  },
};
</script>
