<template>
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
        {{ products.length }} товара
      </span>
  </div>
  <div class="content__catalog">
    <ProductFilter v-model:categories="categories" v-model:color="color"
                   v-model:priceFrom.number="priceFrom" v-model:priceTo.number="priceTo"
                   v-model:selectCategory="category" :colors="colors"
                   :maxPrice="getProductsMaxPrice"></ProductFilter>
    <section class="catalog">
      <ProductList :products="getCurrentProduct"></ProductList>
      <BasePagination v-model:page="currentPage" :countElements="getCountProduct"
                      :countElementsOnPage="productOnPage"></BasePagination>
    </section>
  </div>
</template>

<script>
import colors from '@/data/colors';
import categories from '@/data/categories';
import products from '@/data/products';
import ProductList from '@/components/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';

export default {
  name: 'MainPage',
  props: ['pageParams'],
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      products,
      categories,
      colors,
      currentPage: 1,
      productOnPage: 6,
      color: 'none',
      category: 'none',
      priceFrom: 0,
      priceTo: -1,
    };
  },
  mounted() {
    this.priceTo = this.getProductsMaxPrice;
  },
  computed: {
    getProductsMaxPrice() {
      let maxPrice = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const product of this.products) {
        if (maxPrice < product.price) {
          maxPrice = product.price;
        }
      }
      return maxPrice;
    },
    filteredProduct() {
      return products.filter((product) => {
        const checkPriceFrom = product.price >= this.priceFrom;
        let checkColor = true;
        let checkCategory = true;
        let checkPriceTo = true;

        if (this.priceTo !== -1) {
          checkPriceTo = product.price <= this.priceTo;
        }

        if (this.category !== 'none') {
          checkCategory = product.category === this.category;
        }

        if (this.color !== 'none') {
          checkColor = product.colors.indexOf(this.color) !== -1;
        }
        return checkPriceFrom && checkPriceTo && checkColor && checkCategory;
      });
    },
    getCurrentProduct() {
      const startIndex = (this.currentPage - 1) * this.productOnPage;
      return this.filteredProduct.slice(startIndex, startIndex + this.productOnPage);
    },
    getCountProduct() {
      return this.filteredProduct.length;
    },
  },
};
</script>

<style scoped>

</style>
