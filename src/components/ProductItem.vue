<template>
  <a class="catalog__pic" href="#">
    <img :alt="product.title" :src="product.thumbnail">
  </a>
  <h3 class="catalog__title">
    <a href="#">
      {{ product.title }}
    </a>
  </h3>
  <span class="catalog__price">{{ product.price }} ₽</span>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color of product.colors" :key="product.id + color">
      <label class="colors__label">
        <input :checked="color === product.colors[0]" class="colors__radio sr-only"
               :name="'color-' + product.id"
               type="radio">
        <span class="colors__value" :style="'background-color: ' + color + ';'"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['product'],
  name: 'ProductItem',
};
</script>
