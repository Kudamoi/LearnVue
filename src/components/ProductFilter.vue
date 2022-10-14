<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form action="#" class="filter__form form" method="get" @submit.prevent="filterProducts"
          @reset.prevent="filterReset">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input v-model="currentPriceFrom" class="form__input" name="min-price" type="text">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input v-model="currentPriceTo" class="form__input" name="max-price" type="text">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select v-model="currentCategory" class="form__select" name="category">
            <option value="none" :key="'none'">Все категории</option>
            <option v-for="category of categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color of colors" :key="color">
            <label class="colors__label">
              <input v-model="this.currentColor" class="colors__radio sr-only"
                     name="color" type="radio"
                     :value="color">
              <span class="colors__value" :style="'background-color: ' + color + ';'">
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input checked="" class="check-list__check sr-only" name="volume" type="checkbox" value="8">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
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
  props: ['categories', 'selectCategory', 'priceFrom', 'priceTo', 'maxPrice', 'colors', 'color'],
  name: 'ProductFilter',
  data() {
    return {
      currentCategory: this.selectCategory,
      currentPriceFrom: this.priceFrom,
      currentPriceTo: this.priceTo === -1 ? this.maxPrice : this.priceTo,
      currentColor: this.color,
    };
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    color(value) {
      this.currentColor = value;
    },
    selectCategory(value) {
      this.currentCategory = value;
    },
  },
  methods: {
    filterProducts() {
      this.$emit('update:selectCategory', this.currentCategory);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:color', this.currentColor);
    },
    filterReset() {
      this.$emit('update:selectCategory', 'none');
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', this.maxPrice);
      this.$emit('update:color', 'none');
    },
  },
};
</script>
