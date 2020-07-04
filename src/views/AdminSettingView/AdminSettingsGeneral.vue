<template>
    <vx-card no-shadow>
        <!-- Img Row -->
        <div class="flex flex-wrap items-center mb-base">
            <vs-avatar :src="avatar" size="70px" class="mr-4 mb-4" />
            <div>
                <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*" />
                <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
            </div>
        </div>

        <!-- Info -->
        <vs-input class="w-full mb-base" label-placeholder="Họ Tên" v-model="full_name"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Tên hiển thị" v-model="display_name"></vs-input>
        <vs-input class="w-full" label-placeholder="Email" v-model="email"></vs-input>
        <vs-input class="w-full" label="Ngày sinh" v-model="birthday" type="date" name="Ngày sinh" />

        <vs-select v-model="gender" label="Giới tính" class="mt-5 w-full">
            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in gender_choices" />
        </vs-select>

        <!-- Save & Reset Button -->
        <div class="flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="editData">Save Changes</vs-button>
        </div>
    </vx-card>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            display_name: ' ',
            full_name: '',
            email: ' ',
            avatar: '',
            birthday: '',
            gender: '',

            dataLocalSto: '',

            newData: '',

            gender_choices: [
                { text: 'Nam', value: 'male' },
                { text: 'Nữ', value: 'female' }
            ]
        };
    },
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        }
    },
    methods: {
        async getNewData() {
            this.$vs.loading();

            this.dataLocalSto = JSON.parse(localStorage.getItem('user-info'));

            console.log(this.dataLocalSto);

            await this.$store
                .dispatch('userManager/fetchUser', this.dataLocalSto.id)
                .then((result) => {
                    this.newData = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });

            this.id = this.newData.id;
            this.email = this.newData.email;
            this.password = this.newData.password;
            this.full_name = this.newData.full_name;
            this.display_name = this.newData.display_name;
            this.birthday = this.newData.birthday;
            this.gender = this.newData.gender;
            this.avatar = this.newData.avatar;

            this.$vs.loading.close();
        },
        async editData() {
            console.log('click edit data');
            const obj = {
                id: this.id,
                email: this.email,
                password: this.password,
                full_name: this.full_name,
                display_name: this.display_name,
                birthday: this.birthday,
                gender: this.gender,
                avatar: this.avatar
            };
            if (this.id !== null && this.id >= 0) {
                await this.$store
                    .dispatch('userManager/editUser', obj)
                    .then((result) => {
                        if (result) {
                            localStorage.setItem('user-info', JSON.stringify(result.data));
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                await this.getNewData();
            }
        },
        async getNewAvatarUrl(avatar) {
            await this.$store
                .dispatch('userManager/fetchUserAvatar', avatar)
                .then((result) => {
                    this.dataAvatar = result.data['fileUrl'];
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async updateCurrImg(input) {
            this.$vs.loading();
            console.log(input.target.files);
            if (input.target.files && input.target.files[0]) {
                let my_avatar = input.target.files[0];

                await this.$store
                    .dispatch('userManager/updateAvatar', { id: this.id, avatar: my_avatar })
                    .then((result) => {
                        this.avatar = result.data['fileUrl'];
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            this.$vs.loading.close();
        }
    },
    async mounted() {
        await this.getNewData();
    }
};
</script>
