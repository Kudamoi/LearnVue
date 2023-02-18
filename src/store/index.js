import Vuex from 'vuex';
import { DOMAIN } from '@/config';

export default new Vuex.Store({
  state: {
    cartAccess: '',
    cartProducts: [],
  },
  mutations: {
    getCartProducts(state) {
      let params = '';

      if (state.cartAccess) {
        params = `?userAccessKey=${state.cartAccess}`;
      }

      fetch(`${DOMAIN}/api/baskets${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        if (!response.ok) {
          return;
        }
        const json = await response.json();

        this.dispatch('setCartKey', json.user.accessKey);
        state.cartAccess = json.user.accessKey;
        state.cartProducts = json.items;
      });
    },
    addProductToCart(state, { productId, amount }) {
      let params = '';

      if (state.cartAccess) {
        params = `?userAccessKey=${state.cartAccess}`;
      }

      if (state.cartProducts.find((item) => item.product.id === productId)) {
        this.commit('updateCartProductAmount', { productId, amount });
      } else {
        fetch(`${DOMAIN}/api/baskets/products${params}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            quantity: amount,
          }),
        }).then(async (response) => {
          const json = await response.json();

          state.cartProducts = json.items;
        });
      }
    },
    deleteCartProduct(state, { productId }) {
      let params = '';

      if (state.cartAccess) {
        params = `?userAccessKey=${state.cartAccess}`;
      }

      fetch(`${DOMAIN}/api/baskets/products${params}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      }).then(async (response) => {
        const json = await response.json();

        state.cartProducts = json.items;
      });
    },
    updateCartProductAmount(state, { productId, amount }) {
      let params = '';

      if (state.cartAccess) {
        params = `?userAccessKey=${state.cartAccess}`;
      }

      fetch(`${DOMAIN}/api/baskets/products${params}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: amount,
        }),
      }).then(async (response) => {
        const json = await response.json();

        state.cartProducts = json.items;
      });
    },
    setCartKey(state, key) {
      state.cartAccess = key;
    },
  },
  actions: {
    getCartKey(context) {
      context.commit('setCartKey', localStorage.getItem('cart_key'));

      context.commit('getCartProducts');
    },
    setCartKey(context, key) {
      localStorage.setItem('cart_key', key);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        quantity: item.quantity,
        ...item.product,
      }));
    },
    getCurrentProductsCount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => ({
        ...acc,
        [item.id]: {
          quantity: item.quantity,
          price: item.price,
        },
      }), {});
    },
    getCountCartProducts(state, getters) {
      return getters.cartDetailProducts.length;
    },
    getTotalCartPrice(state, getters) {
      return Object.values(getters.getCurrentProductsCount).reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
});
