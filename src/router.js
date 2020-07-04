/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue';
import Router from 'vue-router';
// import store from "./store/store.js"; // your vuex store

Vue.use(Router);

// let userLoginInfo = JSON.parse(localStorage.getItem("user-info"));

// const ifNotAuthenticated = (to, from, next) => {
//   console.log(userLoginInfo);
//   if (userLoginInfo != undefined || userLoginInfo != null) {
//     next();
//     return;
//   } else if (userLoginInfo == null) {
//     next("/login");
//   }
// };

// const ifAuthenticated = (to, from, next) => {
//   console.log(userLoginInfo);
//   if (userLoginInfo != undefined) {
//     next();
//     return;
//   }
//   next("/login");
// };

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            // beforeEnter: ifNotAuthenticated,
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    name: 'home',
                    component: () => import('./views/Home.vue')
                },
                {
                    path: '/users-manager',
                    name: 'Users Manager',
                    component: () => import('./views/UsersManagerView/main.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Dữ liệu', active: true }
                        ],
                        pageTitle: 'Người dùng'
                    }
                },
                {
                    path: '/recipes-manager/recipes',
                    name: 'Recipes Manager',
                    component: () => import('./views/RecipesManagerView/main.vue'),
                    meta: {
                        breadcrumb: [{ title: 'Home', url: '/' }, { title: 'Món ăn' }, { title: 'Công thức' }, { title: 'Dữ liệu', active: true }],
                        pageTitle: 'Công thức'
                    }
                },
                {
                    path: '/recipes-manager/ingrediens',
                    name: 'Recipes Ingredients Manager',
                    component: () => import('./views/RecipesIngredientsView/main.vue'),
                    meta: {
                        breadcrumb: [{ title: 'Home', url: '/' }, { title: 'Món ăn' }, { title: 'Nguyên liệu' }, { title: 'Dữ liệu', active: true }],
                        pageTitle: 'Nguyên liệu'
                    }
                },
                {
                    path: '/ingredients-manager',
                    name: 'Ingredients Manager',
                    component: () => import('./views/IngredientsManagerView/main.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Dữ liệu', active: true }
                        ],
                        pageTitle: 'Thực phẩm'
                    }
                },
                {
                    path: '/admin-setting',
                    name: 'Thông tin admin',
                    component: () => import('./views/AdminSettingView/AdminSettings.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Thông tin Admin', active: true }
                        ],
                        pageTitle: 'Cài đặt'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            // beforeEnter: ifNotAuthenticated,
            component: () => import('./views/pages/Login.vue')
        }
        // {
        //   path: "",
        //   component: () => import("@/layouts/full-page/FullPage.vue"),
        //   children: [
        //     // =============================================================================
        //     // PAGES
        //     // =============================================================================
        //     // {
        //     //   path: "/pages/error-404",
        //     //   name: "page-error-404",
        //     //   component: () => import("@/views/pages/Error404.vue")
        //     // }
        //   ]
        // },
        // Redirect to 404 page, if no match found
        // {
        //   path: "*",
        //   redirect: "/pages/error-404"
        // }
    ]
});

// router.beforeEach((to, from, next) => {
//   if (userLoginInfo == undefined || userLoginInfo == null) {
//     next("/login");
//   } else {
//     next("/");
//     return;
//   }
// });

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg');
    if (appLoading) {
        appLoading.style.display = 'none';
    }
});

export default router;
