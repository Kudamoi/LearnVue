<template>
  <LoaderIndicator v-if="loading"></LoaderIndicator>
  <template v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main', query: {'category': product.category?.slug ?? '' }}" class="breadcrumbs__link">
            {{ product.category.title }}
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
          <img :alt="product.title" :src="product.image.file.url" height="570" width="570">
        </div>
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
                <li v-for="color in product.colors" :key="`color-${color.id}`"
                    class="colors__item">
                  <label class="colors__label">
                    <input :value="color.code" checked="" class="colors__radio sr-only" name="color-item"
                           type="radio">
                    <span :style="'background-color:' + color.code" class="colors__value"></span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <template v-if="loadUpdate">
              <div class="item__row">
                <LoaderIndicator></LoaderIndicator>
              </div>
            </template>
            <template v-else>
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
                  {{ currentQuantity ? 'В корзине' : 'В корзину' }}
                </button>
              </div>
              <div class="item__row" style="width: 100%" v-if="currentQuantity">
                <div>
                  <br>
                  В корзине: {{ currentQuantity.quantity }}
                </div>
                <div>
                  <br>
                  В корзине: {{ numberFormat(currentQuantity.price * currentQuantity.quantity, 2, '.', ' ') }} ₽
                </div>

              </div>
            </template>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs" v-if="product.content && product.content.length > 0">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
        </ul>
        <div class="item__content">
          {{ product.content }}
        </div>
      </div>
    </section>
  </template>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { DOMAIN } from '@/config';
import LoaderIndicator from '@/components/LoaderIndicator';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductPage',
  props: ['pageParams'],
  components: {
    LoaderIndicator,
  },
  data() {
    return {
      productAmount: 1,
      product: {},
      loading: true,
      loadUpdate: false,
    };
  },
  computed: {
    ...mapGetters({
      mapCounter: 'getCurrentProductsCount',
    }),
    currentQuantity() {
      return this.mapCounter[this.product.id];
    },
  },
  methods: {
    numberFormat,
    addToCart() {
      this.loadUpdate = true;
      this.$store.commit('addProductToCart', { productId: this.product.id, amount: this.productAmount });
    },
    plusAmount() {
      this.productAmount += 1;
    },
    minusAmount() {
      this.productAmount -= 1;
    },
    getProduct() {
      this.loading = true;
      fetch(`${DOMAIN}/api/products/${this.$route.params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        this.product = await response.json();
        this.loading = false;
      });
    },
  },
  watch: {
    currentQuantity: {
      handler(value) {
        this.productAmount = value?.quantity ?? 1;
        this.loadUpdate = false;
      },
      immediate: true,
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>

</style>
