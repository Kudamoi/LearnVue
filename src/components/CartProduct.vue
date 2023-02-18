<template>
  <div class="product__pic">
    <img :alt="product.title" :src="product.image.file.url" height="120" width="120">
  </div>
  <h3 class="product__title">
    <router-link :to="{name: 'product', params: {id: product.slug}}">
      {{ product.title }}
    </router-link>
  </h3>
  <p class="product__info product__info--color">
    Цвет:
    <span>
      <i :style="'background-color:' + product.colors[0].code"></i>
      {{ product.colors[0].title }}
    </span>
  </p>
  <span class="product__code">Артикул: {{ product.id }}</span>
  <div class="product__counter form__counter">
    <button aria-label="Убрать один товар" type="button" @click="remAmount">
      <svg fill="currentColor" height="10" width="10">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <label><input v-model.number="amount" name="count" type="text"></label>
    <button aria-label="Добавить один товар" type="button" @click="addAmount">
      <svg fill="currentColor" height="10" width="10">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
  <b class="product__price">
    {{ numberFormat(product.price * product.quantity, 2, '.', ' ') }} ₽
  </b>
  <button aria-label="Удалить товар из корзины" class="product__del button-del" type="button"
          @click="deleteProduct">
    <svg fill="currentColor" height="20" width="20">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartProduct',
  props: ['product'],
  methods: {
    numberFormat,
    deleteProduct() {
      this.$store.commit('deleteCartProduct', {
        productId: this.product.id,
      });
    },
    remAmount() {
      this.amount -= 1;
    },
    addAmount() {
      this.amount += 1;
    },
  },
  computed: {
    amount: {
      set(value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.product.id,
          amount: value > 0 ? value : 1,
        });
      },
      get() {
        return this.product.quantity;
      },
    },
  },
};
</script>

<style scoped>

</style>
