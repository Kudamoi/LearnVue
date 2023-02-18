<template>
  <ul class="catalog__pagination pagination" v-if="countPages > 1">
    <li class="pagination__item">
      <a :class="page <= 1 ? 'pagination__link--disabled' : ''" aria-label="Предыдущая страница"
         class="pagination__link pagination__link--arrow" href="#"
         @click.prevent="prevPage">
        <svg fill="currentColor" height="14" width="8">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li v-for="currentPage in countPages" :key="currentPage"
        class="pagination__item">
      <a :class="currentPage === page ? 'pagination__link--current pagination__link--disabled' : ''"
         class="pagination__link" href="#"
         @click.prevent="toPage(currentPage)">
        {{ currentPage }}
      </a>
    </li>
    <li class="pagination__item">
      <a :class="page >= countPages ? 'pagination__link--disabled' : ''" aria-label="Следующая страница"
         class="pagination__link pagination__link--arrow" href="#"
         @click.prevent="nextPage">
        <svg fill="currentColor" height="14" width="8">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['page', 'countPages', 'elementsOnPage'],
  name: 'BasePagination',
  methods: {
    prevPage() {
      if (this.page > 1) {
        this.$emit('update:page', this.page - 1);
      }
    },
    nextPage() {
      if (this.page < this.countPages) {
        this.$emit('update:page', this.page + 1);
      }
    },
    toPage(page) {
      if (this.page !== page) {
        this.$emit('update:page', page);
      }
    },
  },
};
</script>
