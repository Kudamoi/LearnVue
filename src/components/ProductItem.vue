<template>
  <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.slug}}">
    <img :alt="product.title" :src="product.image.file.url">
  </router-link>
  <h3 class="catalog__title">
    <router-link :to="{name: 'product', params: {id: product.slug}}">
      {{ product.title }}
    </router-link>
  </h3>
  <span class="catalog__price">
    {{ numberFormat(product.price, 2, '.', ' ') }} ₽
  </span>
  <ul class="colors colors--black">
    <li v-for="color of product.colors" :key="`color-${color.id}`" class="colors__item">
      <label class="colors__label">
        <input :checked="color === product.colors[0]" :name="`color-${product.id}`"
               class="colors__radio sr-only"
               type="radio">
        <span :style="'background-color: ' + color.code + ';'" class="colors__value"></span>
      </label>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  name: 'ProductItem',
  methods: {
    numberFormat,
  },
};
</script>
