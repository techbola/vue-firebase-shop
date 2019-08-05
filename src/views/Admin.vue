<template>
    <div class="admin">

        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <div id="show-sidebar" :class="{ hide_btn: showCloseToggle }" class="btn btn-sm btn-dark" @click="showSideMenu">
                <i class="fas fa-bars"></i>
            </div>
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-brand  -->
                    <div class="sidebar-item sidebar-brand">
                        <a href="#">vue shop</a>
                        <div id="close-sidebar" @click="closeSideMenu">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div class="user-pic">
                            <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                        </div>
                        <div class="user-info">
                            <span class="user-name">Jhon
                                <strong>Smith</strong>
                            </span>
                            <span class="user-role">{{ email }}</span>
                            <span class="user-status">
                                <i class="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>
                    <!-- sidebar-search  -->
                    <div class="sidebar-item sidebar-search">
                        <div>
                            <div class="input-group">
                                <input type="text" class="form-control search-menu" placeholder="Search...">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- sidebar-menu  -->
                    <div class=" sidebar-item sidebar-menu">
                        <ul>
                        
                            <li class="header-menu">
                                <span>Menu</span>
                            </li>
                            <li>
                                <router-link to="/admin/overview">
                                    <i class="fa fa-chart-line"></i>
                                    <span class="menu-text">Overview</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/products">
                                    <i class="fa fa-amazon"></i>
                                    <span class="menu-text">Products</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/orders">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span class="menu-text">Orders</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/profile">
                                    <i class="fa fa-user"></i>
                                    <span class="menu-text">Profile</span>
                                </router-link>
                            </li>
                            <li>
                                <a @click="logout()">
                                    <i class="fa fa-power-off"></i>
                                    <span class="menu-text">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- sidebar-menu  -->
                </div>
            </nav>
            <!-- page-content  -->
            <main class="page-content pt-2">
                <router-view/>
            </main>
            <!-- page-content" -->
        </div>
        <!-- page-wrapper -->

    </div>
</template>

<script>

import { fb } from '../firebase';

export default {
    name: "Admin",
    data(){
        return {
            name: null,
            email: null,
            showCloseToggle: true,
        }
    },
    methods: {
        closeSideMenu(){
            $(".page-wrapper").removeClass("toggled");
            this.showCloseToggle= false;
        },
        showSideMenu(){
            $(".page-wrapper").addClass("toggled");
            this.showCloseToggle= true;
        },
        logout(){
            fb.auth().signOut()
            .then(() => {
                this.$router.replace('/')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created(){

        var user = fb.auth().currentUser;

        this.email = user.email;

    }
};
</script>

<style scoped lang="scss">
    .hide_btn{
        display: none;
    }
</style>