<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
/* eslint-disable */
<template>
    <div id="mysidebar" class="vs-con-loading__container">
        <vs-sidebar
            click-not-close
            position-right
            parent="body"
            default-index="1"
            color="primary"
            class="add-new-data-sidebar items-no-padding"
            spacer
            v-model="isSidebarActiveLocal"
        >
            <div class="mt-6 flex items-center justify-between px-6">
                <h4>
                    {{ Object.entries(this.data).length === 0 ? 'Thêm mới' : 'Cập nhật' }}
                    người dùng
                </h4>
                <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
            </div>
            <vs-divider class="mb-0"></vs-divider>

            <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
                <div class="p-6">
                    <!-- Image -->

                    <template v-if="dataAvatar">
                        <div class="img-container w-64 mx-auto flex items-center justify-center">
                            <img :src="dataAvatar" alt="img" class="responsive" />
                        </div>
                        <div class="modify-img flex justify-between mt-5">
                            <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*" />
                            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
                            <vs-button type="flat" color="#999" @click="dataAvatar = null">Remove Image</vs-button>
                        </div>
                    </template>

                    <!-- Email -->
                    <vs-input label="Email" v-model="dataEmail" class="mt-5 w-full"  type="email" name="email" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                    <vs-input label="Mật khẩu" v-model="dataPassword" class="mt-5 w-full" type="password" name="password" v-validate="'required'" :disabled="hasData" />
                    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

                    <!-- Full name -->
                    <vs-input label="Họ tên" v-model="dataFullname" class="mt-5 w-full" name="Họ tên" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Họ tên')">{{ errors.first('Họ tên') }}</span>

                    <!-- Full name -->
                    <vs-input label="Tên hiển thị" v-model="dataDisplayname" class="mt-5 w-full" name="Tên hiển thị" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Tên hiển thị')">{{ errors.first('Tên hiển thị') }}</span>

                    <!-- Full name -->
                    <vs-input label="Ngày sinh" v-model="dataBirthday" class="mt-5 w-full" type="date" name="Ngày sinh" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Ngày sinh')">{{ errors.first('Ngày sinh') }}</span>

                    <vs-select v-model="dataGender" label="Giới tính" class="mt-5 w-full">
                        <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in gender_choices" />
                    </vs-select>

                    <div class="upload-img mt-5" v-if="!dataAvatar">
                        <input id="file" type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*" />
                        <vs-button @click="$refs.uploadImgInput.click()">Upload Image</vs-button>
                    </div>
                </div>
            </component>

            <div class="flex flex-wrap items-center p-6" slot="footer">
                <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
                <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
            </div>
        </vs-sidebar>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import vSelect from 'vue-select'

export default {
    props: {
        isSidebarActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        VuePerfectScrollbar,
        Datepicker,
        'v-select': vSelect,
    },
    created() {
        this.today = new Date();
    },
    data() {
        return {
            today: '',
            dataId: null,
            dataEmail: '',
            dataPassword: '',
            dataFullname: '',
            dataDisplayname: '',
            dataGender: null,
            dataBirthday: null,
            dataAvatar: null,
            avatar: null,
            dataOrder_status: 'pending',
            dataPrice: 0,

            hasData: false,

            isSubmit: undefined,
            isCancel: true,

            avatarHasChange: false,

            gender_choices: [
                { text: 'Nam', value: 'male' },
                { text: 'Nữ', value: 'female' }
            ],
            settings: {
                // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: 0.6
            }
        };
    },
    watch: {
        async isSidebarActive(val) {
            console.log('sidebar is watching data');
            if (!val) return;
            if (Object.entries(this.data).length === 0) {
                this.initValues();
                this.$validator.reset();
            } else {
                this.$vs.loading();

                this.hasData = true;
                const { id, email, password, full_name, display_name, birthday, gender, avatar } = JSON.parse(JSON.stringify(this.data));

                await this.$store
                    .dispatch('userManager/fetchUserAvatar', avatar)
                    .then((result) => {
                        this.dataAvatar = result.data['fileUrl'];
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                this.dataId = id;
                this.dataEmail = email;
                this.dataPassword = password;
                this.dataFullname = full_name;
                this.dataDisplayname = display_name;
                this.dataBirthday = birthday;
                this.dataGender = gender;
                this.initValues();

                this.$vs.loading.close();
            }
            // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
        }
    },
    computed: {
        isSidebarActiveLocal: {
            get() {
                return this.isSidebarActive;
            },
            set(val) {
                if (!val) {
                    this.$emit('closeSidebar');
                    // this.$validator.reset()
                    // this.initValues()
                }
            }
        },
        isFormValid() {
            return (
                !this.errors.any() && this.dataEmail && this.dataPassword && this.dataFullname && this.dataDisplayname && this.dataGender && this.dataBirthday && this.dataAvatar
            );
        },
        scrollbarTag() {
            return this.$store.getters.scrollbarTag;
        }
    },
    methods: {
        initValues() {
            if (this.data.id) return;
            this.dataEmail = '';
            this.dataPassword = '';
            this.dataFullname = '';
            this.dataDisplayname = '';
            this.dataBirthday = null;
            this.dataGender = '';
            this.dataAvatar = null;
            this.avatar = null;
            this.hasData = false;
            this.isSubmit = false;
            this.avatarHasChange = false;
        },
        submitData() {
            this.$validator.validateAll().then(async (result) => {
                if (result) {
                    const obj = {
                        id: this.dataId,
                        email: this.dataEmail,
                        password: this.dataPassword,
                        full_name: this.dataFullname,
                        display_name: this.dataDisplayname,
                        birthday: this.dataBirthday,
                        gender: this.dataGender,
                        avatar: this.avatar
                    };
                    if (this.dataId !== null && this.dataId >= 0) {
                        this.$store
                            .dispatch('userManager/editUser', obj)
                            .then((result) => {
                                if (result) {
                                    if (this.avatarHasChange) {
                                        this.$store
                                            .dispatch('userManager/updateAvatar', obj)
                                            .then((result) => {
                                                console.error(result);
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                            });
                                    }
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    } else {
                        delete obj.id;
                        this.$store
                            .dispatch('userManager/addUser', obj)
                            .then((result) => {
                                console.log(result);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    this.isSubmit = 'ok';
                    let tmp = {
                        val: false,
                        isSubmit: this.isSubmit
                    };
                    this.$emit('closeSidebar', tmp);
                    this.initValues();
                }
            });
        },
        updateCurrImg(input) {
            console.log(input.target.files);
            if (input.target.files && input.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.dataAvatar = e.target.result;
                };
                reader.readAsDataURL(input.target.files[0]);
                this.avatar = input.target.files[0];

                this.avatarHasChange = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
        z-index: 52010;
    }

    ::v-deep .vs-sidebar {
        z-index: 52010;
        width: 400px;
        max-width: 90vw;

        .img-upload {
            margin-top: 2rem;

            .con-img-upload {
                padding: 0;
            }

            .con-input-upload {
                width: 100%;
                margin: 0;
            }
        }
    }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
        overflow-y: auto;
    }
}
</style>
