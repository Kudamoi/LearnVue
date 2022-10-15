<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{name: 'main'}" class="breadcrumbs__link">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link :to="{name: 'main'}" class="breadcrumbs__link">
          {{ product.category }}
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ product.title }}
        </a>
      </li>
    </ul>
  </div>

  <section class="item">
    <div class="item__pics pics">
      <div class="pics__wrapper">
        <img :alt="product.title" :src="product.thumbnail" height="570" width="570">
      </div>
      <ul class="pics__list">
        <li v-for="image of product.images" :key="'photo-'+image" class="pics__item">
          <a class="pics__link pics__link--current" href="">
            <img :alt="product.title" :src="image" height="98" width="98">
          </a>
        </li>
      </ul>
    </div>

    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ product.title }}
      </h2>
      <div class="item__form">
        <form action="#" class="form" method="POST" @submit.prevent="addToCart">
          <b class="item__price">
            {{ numberFormat(product.price, 2, '.', ' ') }} ₽
          </b>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет:</legend>
            <ul class="colors">
              <li v-for="color in product.colors" :key="'color-'+color"
                  class="colors__item">
                <label class="colors__label">
                  <input :value="color" checked="" class="colors__radio sr-only" name="color-item"
                         type="radio">
                  <span :style="'background-color:' + color" class="colors__value"></span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ:</legend>

            <ul class="sizes sizes--primery">
              <li class="sizes__item">
                <label class="sizes__label">
                  <input class="sizes__radio sr-only" name="sizes-item" type="radio" value="32">
                  <span class="sizes__value">
                      32gb
                    </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input class="sizes__radio sr-only" name="sizes-item" type="radio" value="64">
                  <span class="sizes__value">
                      64gb
                    </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input checked="" class="sizes__radio sr-only" name="sizes-item" type="radio" value="128">
                  <span class="sizes__value">
                      128gb
                    </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <div class="item__row">
            <div class="form__counter">
              <button aria-label="Убрать один товар" type="button" @click.prevent="minusAmount">
                <svg fill="currentColor" height="12" width="12">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </button>

              <label><input v-model.number="productAmount" name="count" type="text"></label>

              <button aria-label="Добавить один товар" type="button" @click.prevent="plusAmount">
                <svg fill="currentColor" height="12" width="12">
                  <use xlink:href="#icon-plus"></use>
                </svg>
              </button>
            </div>

            <button class="button button--primery" type="submit">
              В корзину
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="item__desc">
      <ul class="tabs">
        <li class="tabs__item">
          <a class="tabs__link tabs__link--current">
            Описание
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Характеристики
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Гарантия
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Оплата и доставка
          </a>
        </li>
      </ul>

      <div class="item__content">
        {{ product.description }}
      </div>
    </div>
  </section>
</template>

<script>
import products from '@/data/products';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductPage',
  props: ['pageParams'],
  data() {
    return {
      product: products.filter((product) => product.id === +this.$route.params.id)[0],
      productAmount: 1,
    };
  },
  methods: {
    numberFormat,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        {
          productId: this.product.id,
          amount: this.productAmount,
        },
      );
    },
    plusAmount() {
      this.productAmount += 1;
    },
    minusAmount() {
      this.productAmount -= 1;
    },
  },
};
</script>

<style scoped>

</style>
