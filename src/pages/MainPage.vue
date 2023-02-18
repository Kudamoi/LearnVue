<template>
  <LoaderIndicator v-if="loading"></LoaderIndicator>
  <template v-else>
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
      {{ declination(currentParams.pagination.total, ['товар', 'товара', 'товаров']) }}
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter
          :colors="colors"
          :categories="categories"
          :currentFilter="currentParams.filter"
          @changeFilter="changeFilter($event)"
      ></ProductFilter>
      <section class="catalog">
        <ProductList
            :products="products"
        ></ProductList>
        <BasePagination
            v-model:page="currentParams.pagination.current"
            :count-pages="currentParams.pagination.pages"
            :elementsOnPage="currentParams.pagination.countOnPage"
        ></BasePagination>
      </section>
    </div>
  </template>
</template>

<script>
import ProductList from '@/components/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import declination from '@/helpers/declination';
import { DOMAIN } from '@/config';
import LoaderIndicator from '@/components/LoaderIndicator';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    LoaderIndicator,
  },
  data() {
    return {
      loading: true,
      currentParams: {
        pagination: {
          current: 1,
          countOnPage: 6,
          total: 0,
          pages: 0,
        },
        filter: {
          color: null,
          category: this.$route.query.category ?? null,
          priceFrom: null,
          priceTo: null,
        },
      },
      timer: null,
      colors: [],
      categories: [],
      products: [],
    };
  },
  methods: {
    declination,
    getCurrentProducts() {
      this.loading = true;
      let params = `?limit=${this.currentParams.pagination.countOnPage}&page=${this.currentParams.pagination.current}`;

      if (this.currentParams.filter.category) {
        params += `&categoryId=${this.currentParams.filter.category}`;
      }

      if (this.currentParams.filter.color) {
        params += `&colorId=${this.currentParams.filter.color}`;
      }

      if (this.currentParams.filter.priceFrom) {
        params += `&minPrice=${this.currentParams.filter.priceFrom}`;
      }

      if (this.currentParams.filter.priceTo) {
        params += `&maxPrice=${this.currentParams.filter.priceTo}`;
      }

      fetch(`${DOMAIN}/api/products${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const items = await response.json();
        this.currentParams.pagination.pages = items.pagination.pages;
        this.currentParams.pagination.total = items.pagination.total;
        this.products = items.items;
        this.loading = false;
      });
    },
    changeFilter(filter) {
      this.currentParams.filter = filter;
      this.currentParams.pagination.current = 1;
    },
    getCurrentFilters() {
      fetch(`${DOMAIN}/api/colors`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const colors = await response.json();
        this.colors = colors.items;
      });

      fetch(`${DOMAIN}/api/productCategories`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const categories = await response.json();
        this.categories = categories.items;
      });
    },
  },
  watch: {
    currentParams: {
      handler() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getCurrentProducts();
        }, 100);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getCurrentFilters();
  },
};
</script>

<style scoped>

</style>
