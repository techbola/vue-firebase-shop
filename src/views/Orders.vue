<template>
    <div class="products">
        <div class="container h-100">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-md-6">
                        <h3>Orders Page</h3>
                        <p>Manage all Orders</p>
                  </div>
                  <div class="col-md-6">
                        <img src="/img/svg/orders.svg" alt="" class="img-fluid">
                  </div>
              </div>
          </div>
            <hr>

            <h3 class="d-inline-block">Orders List</h3>
            <button @click="addNewProduct" class="btn btn-primary float-right">Add Orders</button>

            <div class="table-responsive">
                <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <button @click="editProduct(product)" class="btn btn-primary mr-3">Edit</button>
                            <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>

        </div>

        <!-- Add Product Modal -->
        <div class="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="addNewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewModalLabel">Edit Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    <div class="row">
                        <!-- main product -->
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                            </div>

                            <div class="form-group">
                                <vue-editor v-model="product.description"></vue-editor>
                            </div>
                        </div>
                        <!-- product sidebar -->
                        <div class="col-md-4">
                            <h4 class="display-6">Product Details</h4>
                            <hr>

                            <div class="form-group">
                                <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                            </div>

                            <div class="form-group">
                                <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                            
                                <div  class="d-flex">
                                    <p v-for="tag in product.tags">
                                        <span class="p-1">{{tag}}</span>
                                    </p>

                                </div>
                            </div>


                            <div class="form-group">
                                <label for="product_image">Product Images</label>
                                <input type="file" @change="uploadImage" class="form-control">
                            </div>

                            <div class="form-group d-flex">
                                <div class="p-1" v-for="(image, index) in product.images">
                                    <div class="img-wrapp">
                                        <img :src="image" alt="" width="80px">
                                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="saveData()" type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Edit Product Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    <div class="row">
                        <!-- main product -->
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text" v-model="product.name" class="form-control">
                            </div>

                            <div class="form-group">
                                <vue-editor v-model="product.description"></vue-editor>
                            </div>
                        </div>
                        <!-- product sidebar -->
                        <div class="col-md-4">
                            <h4 class="display-6">Product Details</h4>
                            <hr>

                            <div class="form-group">
                                <input type="text" v-model="product.price" class="form-control">
                            </div>

                            <div class="form-group">
                                <input type="text" v-model="product.tags" class="form-control">
                            
                                <div  class="d-flex">
                                    <p>
                                        <span class="p-1"></span>
                                    </p>

                                </div>
                            </div>


                            <div class="form-group">
                                <label for="product_image">Product Images</label>
                                <input type="file" class="form-control">
                            </div>

                            <div class="form-group d-flex">
                                <div class="p-1">
                                    <div class="img-wrapp">
                                        <img alt="" width="80px">
                                        <span class="delete-img">X</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { VueEditor } from "vue2-editor";

import { fb, db } from '../firebase';

export default {
    name: "Orders",
    components: {
        VueEditor
    },
    props: {
        msg: String
    },
    data(){
        return {
            products: [],
            product: {
                name:null,
                description:null,
                price:null,
                tags:[],
                images:[]
            },
            activeItem: null,
            tag: null
        }
    },
    firestore(){
        return {
            products: db.collection('products')
        }
    },
    methods: {
        deleteImage(img,index){

            let image = fb.storage().refFromURL(img);

            this.product.images.splice(index,1);

            image.delete().then(function() {
                console.log('image deleted');
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log('an error occurred');
            });

        },
        uploadImage(e){

            if(e.target.files[0]){
        
                let file = e.target.files[0];
            
                var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
            
                let uploadTask  = storageRef.put(file);
            
                uploadTask.on('state_changed', (snapshot) => {
                    
                }, (error) => {
                    // Handle unsuccessful uploads
                }, () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.product.images.push(downloadURL);
                    });

                });

            }

        },
        addTag(){

            this.product.tags.push(this.tag);
            this.tag = "";

        },
        addNewProduct(){

            this.reset();

            $('#addNewModal').modal('show');
        },
        reset(){

            this.product = {
                name:null,
                description:null,
                price:null,
                tags:[],
                images:[]
            }
        },
        // watcher(){

        //     db.collection("products").onSnapshot((querySnapshot) => {
        //         this.products = [];
        //         querySnapshot.forEach((doc) => {
        //             this.products.push(doc);
        //         });
        //     });

        // },
        updateProduct(){
            
        //     db.collection("products").doc(this.activeItem).update(this.product)
        //     .then(function() {

        //         $('#editModal').modal('hide');

        //         this.watcher();

        //         console.log("Document successfully updated!");
                
        //     })
        //     .catch(function(error) {
        //         // The document probably doesn't exist.
        //         console.error("Error updating document: ", error);
        //     });

            this.$firestore.products.doc(this.product.id).update(this.product);
            
            Toast.fire({
                type: 'success',
                title: 'Product updated successfully'
            })

            $('#editModal').modal('hide');

        },
        editProduct(product){
        //     $('#editModal').modal('show');
        //     this.product = product.data();
        //     this.activeItem = product.id ;

            this.product = product;
            $('#editModal').modal('show');

        },
        deleteProduct(product){

        //     if(confirm('Are you sure?')){

        //         db.collection("products").doc(doc).delete()
        //         .then(() => {

        //             this.watcher();
        //             console.log("Document successfully deleted!");

        //         }).catch((error) => {
        //             console.error("Error removing document: ", error);
        //         });

        //     } else{

        //     }

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {

                    this.$firestore.products.doc(product.id).delete()

                    // Swal.fire(
                    // 'Deleted!',
                    // 'Product has been deleted.',
                    // 'success'
                    // )

                    Toast.fire({
                        type: 'success',
                        title: 'Product deleted successfully'
                    })
                }
            })
        
        },
        // readData(){

        //     // db.collection("products").get().then((querySnapshot) => {
        //     //     querySnapshot.forEach((doc) => {

        //     //         this.products.push(doc);

        //     //     });
        //     // });

        // },
        saveData(){
            // db.collection("products").add(this.product)
            // .then((docRef) => {
            //     // console.log("Document written with ID: ", docRef.id);
            //     this.watcher();
            // })
            // .catch((error) => {
            //     console.error("Error adding document: ", error);
            // });

            // ADD PRODUCT IN REALTIME USING FIRESTORE without using the watcher
             
            this.$firestore.products.add(this.product)

            $('#addNewModal').modal('hide');
            
        },
    },
    // created(){

    //     // this.readData();
    // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        padding-top: 2rem;
    }
    .img-wrapp{
        position: relative;
    }
    .img-wrapp span.delete-img{
        position: absolute;
        top: -14px;
        left: -2px;
    }
    .img-wrapp span.delete-img:hover{
        cursor: pointer;
    }
</style>
