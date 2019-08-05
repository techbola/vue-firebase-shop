import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
      cart: cart ? JSON.parse(cart) : [],
    },
    getters: {
        
        totalPrice: state => {
            let total = 0;
            state.cart.filter((item) => {
                total += (item.productPrice * item.productQuantity);
            });
    
            return total;
        }
    },
    mutations: {
        addToCart(state, item){

            let found = state.cart.find(product => product.productId == item.productId);

            if(found){
                found.productQuantity++;
            } else{
                state.cart.push(item);
            }

            // storing cart products in localStorage so that the cart is still 
            // available after page reload (Data Persistency)

            this.commit('saveData');
            
        },
        saveData(state){

            // we can't pass object data to the localStorage, so we convert it to string

            window.localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        removeFromCart(state, item){

            let index = state.cart.indexOf(item);

            state.cart.splice(index,1);

            this.commit('saveData');

        }
    }
  })