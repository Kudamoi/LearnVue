import Vuex from 'vuex';
import products from '@/data/products';

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addProductToCart(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((a) => a.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter((a) => a.productId !== productId);
    },
    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const product = state.cartProducts.find((a) => a.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    getCountCartProducts(state, getters) {
      return getters.cartDetailProducts.length;
    },
    getTotalCartPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => acc + item.product.price * item.amount, 0);
    },
  },
});
