<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter justify-center items-center">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
                        </div>

                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8 login-tabs-container">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Đăng nhập</h4>
                                    <p>
                                        Chào mừng quay trở lại, vui lòng đăng nhập vào tài khoản của bạn
                                    </p>
                                </div>

                                <div>
                                    <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="Email" v-model="email" class="w-full" />

                                    <vs-input
                                        type="password"
                                        name="password"
                                        icon-no-border
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        label-placeholder="Mật khẩu"
                                        v-model="password"
                                        class="w-full mt-6"
                                    />

                                    <div class="flex flex-wrap justify-between my-5">
                                        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Nhớ mật khẩu</vs-checkbox>
                                        <router-link to>Quên mật khẩu?</router-link>
                                    </div>
                                    <vs-button @click="userLogin">Đăng Nhập</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            checkbox_remember_me: false,
            isLoading: false
        };
    },
    computed: {
        ...mapGetters([])
    },
    created() {
        let userLoginInfo = JSON.parse(localStorage.getItem('user-info'));
        if (userLoginInfo != undefined || userLoginInfo != null) {
            this.$router.push('/');
        }
    },
    methods: {
        async userLogin() {
            console.log(this.email + '  ' + this.password);

            let bodyFormData = new FormData();

            bodyFormData.set('email', this.email);
            bodyFormData.set('password', this.password);

            // this.$http
            //   .post("/api/users/login", bodyFormData)
            //   .then(response => {
            //     console.log(response.data);
            //     if (response.data) {
            //       console.log("okela");
            //       this.$store.commit("SET_USERS", response.data);
            //       // window.location.href = "/";
            //     }
            //   })
            //   .catch(error => {
            //     console.log(error);
            //   });

            let user = {
                password: this.password,
                email: this.email
            };

            await this.$store
                .dispatch('userManager/loginUser', user)
                .then((response) => {
                    // API success
                    console.log('API success');
                    console.log(response.data);
                    this.$router.push('/');
                })
                .catch((error) => {
                    // API fail
                    console.log('API fail');
                    console.log(error);
                    console.log(error.data);
                    let message = error.data.message;
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Error',
                        position: 'top-center',
                        text: message + '. Please try again!'
                    });
                });
        }
    }
};
</script>

<style lang="scss">
#page-login {
    .social-login-buttons {
        .bg-facebook {
            background-color: #1551b1;
        }
        .bg-twitter {
            background-color: #00aaff;
        }
        .bg-google {
            background-color: #4285f4;
        }
        .bg-github {
            background-color: #333;
        }
    }
}
</style>
