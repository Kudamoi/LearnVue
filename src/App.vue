<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="product in products" :key="product.title">
        <a class="catalog__pic" href="#">
          <img :alt="product.title" :src="product.image" :srcset="product.image2x">
        </a>

        <h3 class="catalog__title">
          <a href="#">
            {{ product.title }}
          </a>
        </h3>

        <span class="catalog__price">
              {{ product.price }} ₽
            </span>

        <ul class="colors colors--black">
          <li class="colors__item">
            <label class="colors__label">
              <input checked="" class="colors__radio sr-only" name="color-1" type="radio" value="#73B6EA">
              <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" name="color-1" type="radio" value="#8BE000">
              <span class="colors__value" style="background-color: #8BE000;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" name="color-1" type="radio" value="#222">
              <span class="colors__value" style="background-color: #222;">
                  </span>
            </label>
          </li>
        </ul>
      </li>

    </ul>

    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a aria-label="Предыдущая страница" class="pagination__link pagination__link--arrow pagination__link--disabled">
          <svg fill="currentColor" height="14" width="8">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current">
          1
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          2
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          3
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          4
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          ...
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          10
        </a>
      </li>
      <li class="pagination__item">
        <a aria-label="Следующая страница" class="pagination__link pagination__link--arrow" href="#">
          <svg fill="currentColor" height="14" width="8">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import products from '@/data/products';

export default {
  name: 'App',
  data() {
    return {
      products,
    };
  },
};
</script>
