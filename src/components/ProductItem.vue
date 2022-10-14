<template>
  <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
    <img :alt="product.title" :src="product.thumbnail">
  </a>
  <h3 class="catalog__title">
    <a href="#" @click.prevent="gotoPage('product', {id: product.id})">
      {{ product.title }}
    </a>
  </h3>
  <span class="catalog__price">{{ numberFormat(product.price, 2, '.', ' ') }} ₽</span>
  <ul class="colors colors--black">
    <li v-for="color of product.colors" :key="product.id + color" class="colors__item">
      <label class="colors__label">
        <input :checked="color === product.colors[0]" :name="'color-' + product.id"
               class="colors__radio sr-only"
               type="radio">
        <span :style="'background-color: ' + color + ';'" class="colors__value"></span>
      </label>
    </li>
  </ul>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  name: 'ProductItem',
  methods: {
    gotoPage,
    numberFormat,
  },
  emits: ['gotoPage'],
};
</script>
