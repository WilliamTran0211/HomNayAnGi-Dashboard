<template>
    <vx-card no-shadow>
        <vs-input class="w-full mb-base" label-placeholder="Old Password" v-model="old_password" />
        <vs-input class="w-full mb-base" label-placeholder="New Password" v-model="new_password" />
        <vs-input class="w-full mb-base" label-placeholder="Confirm Password" v-model="confirm_new_password" />

        <!-- Save & Reset Button -->
        <div class="flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="changePassword()">Save Changes</vs-button>
        </div>
    </vx-card>
</template>

<script>
export default {
    data() {
        return {
            old_password: '',
            new_password: '',
            confirm_new_password: '',

            userInfo: '',
            id: '',
            display_name: ' ',
            full_name: '',
            email: ' ',
            avatar: '',
            birthday: '',
            gender: ''
        };
    },
    computed: {},
    methods: {
        async getuserInfo() {
            this.$vs.loading();

            this.dataLocalSto = JSON.parse(localStorage.getItem('user-info'));

            console.log(this.dataLocalSto);

            await this.$store
                .dispatch('userManager/fetchUser', this.dataLocalSto.id)
                .then((result) => {
                    this.userInfo = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });

            this.id = this.userInfo.id;
            this.email = this.userInfo.email;
            this.password = this.userInfo.password;
            this.full_name = this.userInfo.full_name;
            this.display_name = this.userInfo.display_name;
            this.birthday = this.userInfo.birthday;
            this.gender = this.userInfo.gender;
            this.avatar = this.userInfo.avatar;

            this.$vs.loading.close();
        },
        async changePassword() {
            this.userInfo = JSON.parse(localStorage.getItem('user-info'));

            if (this.confirm_new_password == this.new_password) {
                if (this.old_password == this.password) {
                    const data = {
                        email: this.userInfo.email,
                        password: this.userInfo.password,
                        new_password: this.new_password
                    };

                    await this.$store
                        .dispatch('userManager/changePassword', data)
                        .then((result) => {
                            let data = result.data;
                            this.userInfo.password = data.password;
                            localStorage.removeItem('user-info');
                            localStorage.setItem('user-info', JSON.stringify(this.userInfo));
                            this.old_password = '';
                            this.new_password = '';
                            this.confirm_new_password = '';
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    this.$vs.notify({
                        color: 'danger',
                        title: 'Error',
                        position: 'top-center',
                        text: 'Mật khẩu cũ không đúng.'
                    });
                }
            } else {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Error',
                    position: 'top-center',
                    text: 'Mật khẩu nhập lại phải giống mật khẩu'
                });
            }
        }
    },
    async mounted() {
        await this.getuserInfo();
    }
};
</script>
