<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{name: 'main'}" class="breadcrumbs__link">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Корзина
        </a>
      </li>
    </ul>

    <h1 class="content__title">
      Корзина
    </h1>
    <span class="content__info">
      {{ declination(countProducts, ['товар', 'товара', 'товаров']) }}
    </span>
  </div>

  <section class="cart">
    <form action="#" class="cart__form form" method="POST" @submit.prevent="">
      <div class="cart__field">
        <ul class="cart__list">
          <li v-for="product in products" :key="product.id" class="cart__item product">
            <CartProduct :product="product"></CartProduct>
          </li>
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>{{ numberFormat(totalPrice, 2, '.', ' ') }} ₽</span>
        </p>

        <button class="cart__button button button--primery" type="submit">
          Оформить заказ
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartProduct from '@/components/CartProduct';
import declination from '@/helpers/declination';

export default {
  name: 'CartPage',
  components: {
    CartProduct,
  },
  methods: {
    declination,
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'getTotalCartPrice',
      countProducts: 'getCountCartProducts',
    }),
  },
};
</script>

<style scoped>

</style>
