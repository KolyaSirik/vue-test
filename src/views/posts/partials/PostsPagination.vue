<template>
  <div class="row">
    <div class="col-md-6">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label">Per page</label>
        <div class="col-sm-4">
          <select class="custom-select"
                  v-on:change="$emit('change-per-page', $event.target.value)"
                  :value="perPage"
          >
            <option v-for="(option, key) in perPageOptions" :key="key" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: meta.currentPage < 2 }">
            <router-link
              class="page-link"
              tabindex="-1"
              :to="{ path: currentPath, query: { currentPage: meta.currentPage - 1, perPage }}"
            >
              Previous
            </router-link>
          </li>

          <li class="page-item"
              :class="{ disabled: meta.currentPage === page || page === '...' }"
              v-for="page in pages"
              :key="page"
          >
            <router-link class="page-link"
                         :to="{ path: currentPath, query: { currentPage: page, perPage }}">
              {{ page }}
            </router-link>
          </li>

          <li class="page-item" :class="{ disabled: meta.currentPage >= meta.totalPages }">
            <router-link
              class="page-link"
              :to="{ path: currentPath, query: { currentPage: meta.currentPage + 1, perPage }}"
            >
              Next
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPageOptions: [10, 15, 20, 25],
      totalPages: 0,
      currentPage: 1,
    };
  },
  watch: {
    meta() {
      if (this.meta !== undefined) {
        this.totalPages = this.meta.totalPages;
        this.currentPage = this.meta.currentPage;
      }
    },
  },
  computed: {
    pages() {
      const pagesToShow = [];

      if (this.currentPage > 3) {
        pagesToShow.push(1, '...');
      } else if (this.currentPage > 2) {
        pagesToShow.push(1);
      }

      let i = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
      for (; i < this.currentPage + 2; i += 1) {
        if (i <= this.totalPages) {
          pagesToShow.push(i);
        }
      }

      if (this.currentPage + 2 < this.totalPages) {
        pagesToShow.push('...', this.totalPages);
      } else if (this.currentPage + 1 < this.totalPages) {
        pagesToShow.push(this.totalPages);
      }

      return pagesToShow;
    },
  },
  props: [
    'meta',
    'perPage',
    'currentPath',
  ],
};
</script>
