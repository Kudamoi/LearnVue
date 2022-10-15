<template>
  <router-link :to="{name: 'cart'}" aria-label="Корзина с товарами" class="header__cart">
    <svg fill="currentColor" height="21" width="30">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span aria-label="Количество товаров" class="header__count">{{ countProducts }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIndicator',
  computed: {
    ...mapGetters({ countProducts: 'getCountCartProducts' }),
  },
};
</script>

<style scoped>

</style>
