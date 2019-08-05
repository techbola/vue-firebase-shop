<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Our Products List</h1>
            <div class="row">

                <div class="col-md-4" v-for="(product,index) in products">
                    <div class="card product-item">

                        <carousel :perPage="1">
                            <slide v-for="(image,index) in product.images" :key="index.id">
                                <img :src="image" class="card-img-top productImg" alt="">
                            </slide>
                        </carousel>
                        
                        <div class="card-body">

                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-price">{{ product.price | currency('&#8358;') }}</h5>
                            </div>
                            
                            <!-- <p class="card-text" v-html="product.description">
                            
                            </p> -->
                            
                            <add-to-cart 
                                
                                :name="product.name"
                                :price="product.price"
                                :p-id="product.id"
                                :image="getImage(product.images)">

                            </add-to-cart>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

import { fb, db } from '../firebase';

export default {
  name: "Products-list",
  props: {
    msg: String
  },
  data(){
        return {
            products: [],
        }
    },
    firestore(){
        return {
            products: db.collection('products')
        }
    },
    methods: {
        getImage(images){
            return images[0]
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .products{
    margin-top: 7rem;
    background: #f2f2f2;
    padding-bottom: 3rem;
  }
  .productImg{
      width: 80%;
      height: 300px;
      padding: 20px;
  }
</style>
