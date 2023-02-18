<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form"
          method="get"
          @submit.prevent="filterProducts"
          @reset.prevent="filterReset">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input placeholder="12 054" v-model="price.from" class="form__input" name="min-price" type="text">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input placeholder="20 125" v-model="price.to" class="form__input" name="max-price" type="text">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select v-model="current.category" class="form__select" name="category">
            <option value="null" :key="null">Все категории</option>
            <option v-for="category of categories" :key="category" :value="category.slug">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color of colors" :key="color">
            <label class="colors__label">
              <input v-model="current.color" class="colors__radio sr-only"
                     name="color" type="radio" :value="color.id">
              <span class="colors__value" :style="'background-color: ' + color.code + ';'">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
export default {
  props: [
    'categories',
    'colors',
    'currentFilter',
  ],
  name: 'ProductFilter',
  data() {
    return {
      price: {
        from: this.currentFilter.priceFrom,
        to: this.currentFilter.priceTo,
      },
      current: {
        category: this.currentFilter.category,
        color: this.currentFilter.color,
      },
    };
  },
  methods: {
    filterProducts() {
      this.$emit('changeFilter', {
        priceFrom: this.price.from,
        priceTo: this.price.to,
        category: this.current.category,
        color: this.current.color,
      });
    },
    filterReset() {
      this.$emit('changeFilter', {
        priceFrom: null,
        priceTo: null,
        category: null,
        color: null,
      });
    },
  },
  watch: {
    currentFilter: {
      handler() {
        this.price = {
          from: this.currentFilter.priceFrom,
          to: this.currentFilter.priceTo,
        };

        this.current = {
          category: this.currentFilter.category,
          color: this.currentFilter.color,
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
