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
                    Công thức
                </h4>
                <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
            </div>
            <vs-divider class="mb-0"></vs-divider>

            <vs-tabs alignment="fixed">
                <vs-tab label="Thông tin chung">
                    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
                        <div class="p-1">
                            <vs-input label="Tên công thức" v-model="dataTitle" class="mt-5 w-full" type="text" name="title" v-validate="'required'" />
                            <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

                            <vs-input label="Loại bữa ăn" v-model="dataDishTypes" class="mt-5 w-full" type="text" name="DishTypes" v-validate="'required'" />
                            <span class="text-danger text-sm" v-show="errors.has('DishTypes')">{{ errors.first('DishTypes') }}</span>

                            <vs-input-number label="Số người dùng" v-model="dataServings" min="1" class="mt-5 w-full" name="Servings" v-validate="'required|between:1,100'" />
                            <span class="text-danger text-sm" v-show="errors.has('Servings')">{{ errors.first('Servings') }}</span>

                            <vs-input-number
                                label="Hoàn thành trong"
                                v-model="dataReadyInMinute"
                                class="mt-5 w-full"
                                min="1"
                                name="ReadyInMinute"
                                v-validate="'required|between:1,1000'"
                            />
                            <span class="text-danger text-sm" v-show="errors.has('ReadyInMinute')">{{ errors.first('ReadyInMinute') }}</span>

                            <vs-textarea
                                label="Tổng quan"
                                v-model="dataSummary"
                                class="mt-5 w-full"
                                type="text"
                                name="Summary"
                                v-validate="'required'"
                                counter="300"
                                :counter-danger.sync="counterDanger"
                            />
                            <span class="text-danger text-sm" v-show="errors.has('Summary')">{{ errors.first('Summary') }}</span>
                        </div>
                    </component>
                </vs-tab>

                <vs-tab label="Các bước thực hiện">
                    <div class="p-2">
                        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
                            <vs-table stripe v-model="inductionsSelect" :data="dataInductions" @selected="hanledSelectedinductions">
                                <template slot="header">
                                    <vs-button type="border" class="mt-4" color="success" icon-pack="feather" icon="icon-plus" @click="activeADDPrompt = true">Thêm bước</vs-button>
                                    <vs-button
                                        type="border"
                                        class="mt-4"
                                        color="warning"
                                        icon-pack="feather"
                                        icon="icon-edit"
                                        @click="activeEDITPrompt = true"
                                        :disabled="dataInductions.length < 0"
                                        >Chỉnh sửa</vs-button
                                    >
                                </template>
                                <template slot="thead">
                                    <vs-th>STT</vs-th>
                                    <vs-th>Nội dung bước thực hiện</vs-th>
                                </template>

                                <template slot-scope="{ data }" stripe>
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="indextr">
                                            {{ indextr + 1 }}
                                        </vs-td>

                                        <vs-td :data="tr">
                                            {{ tr }}
                                        </vs-td>
                                    </vs-tr>
                                </template>
                            </vs-table>
                        </component>
                    </div>
                </vs-tab>

                <vs-tab label="Hình ảnh">
                    <div class="p-6">
                        <!-- <vs-row>
                            <vs-col vs-offset="4" vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                                <vs-button @click="activeUPLOADPrompt = true">Upload Images</vs-button>
                            </vs-col>
                        </vs-row> -->
                        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
                            <vs-images> <vs-image :key="index" :src="`${image}`" v-for="(image, index) in recipeImagesUrls" /> </vs-images>
                        </component>
                    </div>
                </vs-tab>
            </vs-tabs>

            <div class="flex flex-wrap items-center p-6" slot="footer">
                <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
                <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
            </div>
        </vs-sidebar>

        <vs-prompt
            title="Thêm bước"
            accept-text="Lưu"
            @accept="addinductions"
            cancel-text="Huỷ"
            @cancel="newinductionsteps = null"
            @close="newinductionsteps = null"
            :active.sync="activeADDPrompt"
            color="success"
            class="vs-component con-vs-popup vs-popup-primary"
        >
            <div class="con-exemple-prompt">
                <vs-textarea
                    label="Nội dung bước thực hiện"
                    v-model="newinductionsteps"
                    class="mt-5 w-full"
                    type="text"
                    name="Bước thực hiện"
                    v-validate="'required'"
                    counter="500"
                    :counter-danger.sync="counterDanger"
                /><span class="text-danger text-sm" v-show="errors.has('newinductionsteps')">{{ errors.first('newinductionsteps') }}</span>
            </div>
        </vs-prompt>

        <vs-prompt title="Chỉnh sửa" accept-text="Lưu" cancel-text="Huỷ" :active.sync="activeEDITPrompt" color="warnign" class="vs-component con-vs-popup vs-popup-primary">
            <div class="con-exemple-prompt">
                <ul>
                    <li v-for="(nd, index) in dataInductions" :key="index">
                        <vs-textarea label="Bước thực hiện" v-model="dataInductions[index]" class="mt-5 w-full" counter="300" :counter-danger.sync="counterDanger" />
                    </li>
                </ul>
            </div>
        </vs-prompt>

        <!--  -->

        <vs-prompt title="Tải hình lên" accept-text="Lưu" cancel-text="Huỷ" :active.sync="activeUPLOADPrompt" color="primary" class="vs-component con-vs-popup vs-popup-primary">
            <div class="con-exemple-prompt">
                <div class="img-container w-64 mx-auto flex items-center justify-center">
                    <img :src="tmpImageReview" alt="img" class="responsive" />
                </div>

                <div class="upload-img mt-5">
                    <input id="file" type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*" />
                    <vs-button @click="$refs.uploadImgInput.click()">Upload Image</vs-button>
                </div>
            </div>
        </vs-prompt>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

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
        Datepicker
    },
    created() {
        this.today = new Date();
    },
    data() {
        return {
            today: '',
            dataId: null,
            dataTitle: '',
            dataDishTypes: '',
            dataServings: '',
            dataSummary: '',
            dataReadyInMinute: '',
            dataImages: [],
            dataInductions: [],

            recipeImagesUrls: [],

            inductionsSelect: [],
            newinductionsteps: '',

            activeADDPrompt: false,
            activeEDITPrompt: false,
            activeUPLOADPrompt: false,

            imagesUpload: [],

            tmpImageReview: '',

            hasData: false,

            isSubmit: undefined,
            isCancel: true,

            counterDanger: false,
            avatarHasChange: false,

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
                this.hasData = true;
                this.$vs.loading();

                const { id, title, dish_types, servings, readyInMinutes, summary, inductions } = JSON.parse(JSON.stringify(this.data));

                this.dataId = id;
                this.dataTitle = title;
                this.dataDishTypes = dish_types;
                this.dataServings = servings;
                this.dataReadyInMinute = readyInMinutes;
                this.dataSummary = summary;
                this.dataInductions = inductions;

                await this.$store
                    .dispatch('recipesManager/fetchRecipeImages', this.dataId)
                    .then((result) => {
                        console.log(result);
                        let resultData = result.data['fileUrls'];
                        console.log(resultData);
                        this.recipeImagesUrls = resultData;
                    })
                    .catch((err) => {
                        console.log(err);

                        this.$vs.notify({
                            color: 'danger',
                            title: 'Error',
                            position: 'top-center',
                            text: err.message + '. Please try again!'
                        });
                    });

                this.initValues();
                this.$vs.loading.close();
            }
        }
        // inductionsSelect: function(val) {
        //     if (!val) {
        //         console.log('No selected ');
        //     }
        // }
    },
    computed: {
        isSidebarActiveLocal: {
            get() {
                return this.isSidebarActive;
            },
            set(val) {
                if (!val) {
                    this.$emit('closeSidebar');
                }
            }
        },
        isFormValid() {
            //
            return !this.errors.any() && this.dataTitle && this.dataSummary && this.dataDishTypes;
        },
        checkIntruction() {
            if (this.dataInductions.length > 0) {
                for (let itm in this.dataInductions) {
                    if (itm == undefined || itm == null || itm == '') {
                        this.$vs.notify({
                            color: 'danger',
                            title: 'Error',
                            position: 'top-center',
                            text: 'Bước hướng dẫn không được trống. Vui lòng nhập thông tin vào để tiếp tục'
                        });
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        scrollbarTag() {
            return this.$store.getters.scrollbarTag;
        }
        // isInputHasData() {
        //     return !this.errors.any() && this.newUnit;
        // }
    },
    methods: {
        initValues() {
            if (this.data.id) return;

            this.dataTitle = '';
            this.dataDishTypes = '';
            this.dataSummary = '';
            this.dataServings = '';
            this.dataInductions = [];
            this.dataReadyInMinute = '';
            this.dataImages = [];

            this.hasData = false;
            this.isSubmit = false;
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            this.dataImages;
        },
        hanledSelectedinductions() {
            console.log(this.inductionsSelect);
        },
        successUpload() {
            console.log(this.imagesUpload);
        },
        addinductions() {
            let val = this.newinductionsteps.trim();
            if (val != null || val != undefined || val != '') {
                this.dataInductions.push(val);
                this.newinductionsteps = null;
            }
        },
        removeinductions(item) {
            console.log(item);
        },
        submitData() {
            console.log('submit click');
            this.$validator.validateAll().then(async (result) => {
                if (result) {
                    const obj = {
                        id: this.dataId,
                        title: this.dataTitle,
                        dish_types: this.dataDishTypes,
                        servings: this.dataServings,
                        summary: this.dataSummary,
                        readyInMinutes: this.dataReadyInMinute,
                        images: this.dataImages,
                        inductions: this.dataInductions
                    };
                    if (this.dataId !== null && this.dataId >= 0) {
                        console.log('submit update');
                        console.log(obj);
                        this.$store
                            .dispatch('recipesManager/editRecipes', obj)
                            .then((result) => {
                                console.log(result);
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    } else {
                        delete obj.id;
                        console.log('submit create');
                        this.$store
                            .dispatch('recipesManager/addRecipes', obj)
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
            if (input.target.files && input.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.tmpImageReview = e.target.result;
                };
                reader.readAsDataURL(input.target.files[0]);
            }
        }
    }
};
</script>

<style lang="stylus">
.labelx {
  .vs-input {
    margin: 10px;
  }
}
</style>

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

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}
</style>
