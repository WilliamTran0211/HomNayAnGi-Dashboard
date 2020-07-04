<template>
    <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.display_name">
        <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ activeUserInfo.display_name }}</p>
        </div>

        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
                <vs-avatar
                    v-if="activeUserInfo.avatar"
                    key="onlineImg"
                    :src="activeUserInfo.avatar"
                    alt="user-img"
                    width="40"
                    height="40"
                    class="rounded-full shadow-md cursor-pointer block"
                />
            </div>

            <vs-dropdown-menu class="vx-navbar-dropdown">
                <ul style="min-width: 9rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="directToAdminInfo">
                        <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                        <span class="ml-2">Thông Tin</span>
                    </li>
                    <vs-divider class="m-1" />

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">
                        <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                        <span class="ml-2">Đăng xuất</span>
                    </li>
                </ul>
            </vs-dropdown-menu>
        </vs-dropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
            UserInfo: {}
        };
    },
    computed: {
        activeUserInfo() {
            return JSON.parse(localStorage.getItem('user-info'));
            // return this.$store.state.AppActiveUser;
        }
    },
    watch: {},
    async beforeCreate() {
        // await this.getUserInfo();
        // let userLoginInfo = JSON.parse(localStorage.getItem("user-info"));
        // await this.$store
        //   .dispatch("userManager/fetchUser", userLoginInfo.id)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
    },
    created() {},
    methods: {
        async getUserInfo() {
            let userLoginInfo = JSON.parse(localStorage.getItem('user-info'));
            await this.$store
                .dispatch('userManager/fetchUser', userLoginInfo.id)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        directToAdminInfo() {
            this.$router.push('/admin-setting').catch(() => {});
        },
        logout() {
            this.$store.dispatch('userManager/logout');
            this.$router.push('/login').catch(() => {});
        }
    },
    async mounted() {
        console.log(localStorage.getItem('user-info'));
        await this.getUserInfo();
    }
};
</script>
