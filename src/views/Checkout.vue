<template>
  <div class="checkout">
    <Navbar/>
    <div class="container mt-5 pt-5">
        <div class="row">
            <div class="col-md-8">
                <h4>Checkout Page</h4>
                <ul>
                    <li v-for="item in this.$store.state.cart" class="media">
                    <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                    <div class="media-body">
                        <h5 class="mt-0">{{item.productName}} 
                            <span class='float-right deleteIcon' @click="$store.commit('removeFromCart', item)">X</span>
                        </h5>
                        <p class="mt-0">{{item.productPrice | currency('&#8358;')}}</p>
                        <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                    </div>
                    </li>

                </ul>
            </div>
            <div class="col-md-4">
                <p>
                    Total Price : {{ this.$store.getters.totalPrice | currency('&#8358;') }}
                </p>

                <button class='pay-with-stripe btn btn-primary mt-4'>Pay with credit card</button>

            </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
    .checkout h4{
        text-align:left;
    }
    .deleteIcon{
        cursor: pointer;
    }
</style>
