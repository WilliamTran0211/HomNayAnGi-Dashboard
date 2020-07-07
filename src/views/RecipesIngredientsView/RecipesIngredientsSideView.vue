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
                    nguyên liệu
                </h4>
                <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
            </div>
            <vs-divider class="mb-0"></vs-divider>
            <div class="p-6">
                <vs-input label="Đơn vị" class="mt-5 w-full" v-model="dataUnit" type="text" name="unit" disabled />
            </div>
            <vs-divider class="mb-0"></vs-divider>

            <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
                <div class="p-6">
                    <vs-input-number
                        label="Số lượng"
                        v-model="dataAmount"
                        class="mt-5 w-full"
                        min="0.5"
                        step="0.5"
                        max="1000"
                        name="Amount"
                        v-validate="'required|between:1,1000'"
                    />
                    <span class="text-danger text-sm" v-show="errors.has('Amount')">{{ errors.first('Amount') }}</span>

                    <vs-input label="Đơn vị" class="mt-5 w-full" v-model="dataUnit" type="text" name="unit" />
                    <span class="text-danger text-sm" v-show="errors.has('unit')">{{ errors.first('unit') }}</span>
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
            dataId: '',
            dataUnit: '',
            dataAmount: null,
            dataRecipe: '',
            dataIngredient: '',

            hasData: false,

            isSubmit: undefined,
            isCancel: true,

            avatarHasChange: false,

            settings: {
                // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: 0.6
            },

            recipesList: [],
            ingredientsList: []
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
                const { id, amount, unit, recipe, ingredient } = JSON.parse(JSON.stringify(this.data));
                this.dataId = id;
                this.dataUnit = unit;
                this.dataAmount = amount;
                this.dataRecipe = recipe;
                this.ingredient = ingredient;
                this.initValues();
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
                }
            }
        },
        isFormValid() {
            return !this.errors.any();
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
            this.dataName = '';
            this.dataPossibleUnit = [];
            this.hasData = false;
            this.isSubmit = false;
        },
        async getRecipesList() {
            await this.$store
                .dispatch('recipesManager/fetchRecipes')
                .then((result) => {
                    console.log(result);
                    this.recipesList = result.data;
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
        },
        async getIngredientsList() {
            await this.$store
                .dispatch('ingredientsManager/fetchIngredients')
                .then((result) => {
                    console.log(result);
                    this.ingredientsList = result.data;
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
        },
        submitData() {
            console.log('submit click');
            this.$validator.validateAll().then(async (result) => {
                if (result) {
                    const obj = {
                        id: this.dataId,
                        amount: this.dataAmount,
                        unit: this.dataUnit,
                        recipe: this.dataRecipe,
                        ingredient: this.ingredient
                    };
                    if (this.dataId !== null && this.dataId >= 0) {
                        console.log('submit update');
                        this.$store
                            .dispatch('recipesManager/EditRecipesIngredients', obj)
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
                            .dispatch('recipesManager/addIngredients', obj)
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
        getTitleOfRecipe(id) {
            this.recipesList.forEach((element) => {
                if (element.id == id) {
                    return element;
                }
            });
        },
        getNameOfIngredient(id) {
            this.ingredientsList.forEach((element) => {
                if (element.id == id) {
                    return element;
                }
            });
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
</style>
