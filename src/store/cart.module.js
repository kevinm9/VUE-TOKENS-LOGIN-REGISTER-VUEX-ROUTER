export const cart = {
  namespaced: true,
  state: {
    cart: [], // Array que almacena los productos en el carrito
  },
  mutations: {
    updateCart(state, product) {
      state.cart = state.cart.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            cantidad: product.cantidad,
            subtotal: p.precio * product.cantidad,
          };
        }
        return p;
      });
    },
    addToCart(state, product) {
      let indexProduct = state.cart.findIndex((p) => p.id === product.id);
      if (indexProduct > -1) {
        let tempProduct = state.cart[indexProduct];
        state.cart.splice(indexProduct, 1);
        tempProduct.cantidad++;
        tempProduct.subtotal = tempProduct.precio * tempProduct.cantidad;
        state.cart.push(tempProduct);
      } else {
        product.cantidad = 1;
        product.subtotal = product.precio * product.cantidad;
        state.cart.push(product);
      }
    },
    removeFromCart(state, product) {
      let indexProduct = state.cart.findIndex((p) => p.id === product.id);
      let tempProduct = state.cart[indexProduct];
      state.cart.splice(tempProduct, 1);
    },
    removeAllItemsFromCart(state) {
      state.cart=[];
    },
  },
  getters: {
    cartItemCount: (state) => (state.cart.length <= 0 ? 0 : state.cart.length),
    cartItems: (state) => state.cart,
  },
};
