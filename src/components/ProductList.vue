<template>
  <ul class="catalog__list">
    <li v-for="product in products" :key="product.id" class="catalog__item">
      <ProductItem :product="product"></ProductItem>
    </li>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
  components: {
    ProductItem,
  },
  props: ['products'],
  name: 'ProductList',
};
</script>

<style scoped>

</style>
