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
                    Thực phẩm
                </h4>
                <feather-icon
                    icon="XIcon"
                    @click.stop="isSidebarActiveLocal = false"
                    class="cursor-pointer"
                ></feather-icon>
            </div>
            <vs-divider class="mb-0"></vs-divider>

            <component
                :is="scrollbarTag"
                class="scroll-area--data-list-add-new"
                :settings="settings"
                :key="$vs.rtl"
            >
                <div class="p-6">
                    <vs-input
                        label="Tên nguyên liệu"
                        v-model="dataName"
                        class="mt-5 w-full"
                        type="text"
                        name="name"
                        v-validate="'required'"
                    />
                    <span
                        class="text-danger text-sm"
                        v-show="errors.has('name')"
                    >{{ errors.first('name') }}</span>

                    <vs-row>
                        <vs-input
                            label="Đơn vị"
                            class="mt-5 w-2/3"
                            v-model="newUnit"
                            type="text"
                            name="unit"
                        />

                        <vs-col
                            vs-type="flex"
                            vs-justify="space-between"
                            vs-align="flex-end"
                            vs-w="4"
                            class="p-6"
                        >
                            <vs-button
                                type="border"
                                class="mt-5"
                                color="success"
                                icon-pack="feather"
                                icon="icon-plus"
                                @click="addUnits"
                            >Thêm</vs-button>
                        </vs-col>
                    </vs-row>

                    <vs-row>
                        <vs-chip
                            :key="chip"
                            v-for="chip in dataPossibleUnit"
                            transparent
                            color="dark"
                            closable
                            @click="removeUnit(chip)"
                        >{{ chip }}</vs-chip>
                    </vs-row>
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
            dataId: null,
            dataName: '',
            dataPossibleUnit: [],

            newUnit: '',

            hasData: false,

            isSubmit: undefined,
            isCancel: true,

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
                const { id, name, possible_unit } = JSON.parse(JSON.stringify(this.data));

                this.dataId = id;
                this.dataName = name;
                this.dataPossibleUnit = possible_unit;
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
            return !this.errors.any() && this.dataName;
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
        addUnits() {
            if (this.newUnit) {
                let list = this.dataPossibleUnit;
                let res = list.includes(this.newUnit);
                if (res) {
                    this.newUnit = null;
                } else {
                    this.dataPossibleUnit.push(this.newUnit);
                    this.newUnit = null;
                }
            }
        },
        removeUnit(item) {
            let index = this.dataPossibleUnit.indexOf(item);
            this.dataPossibleUnit.splice(index, 1);
        },
        submitData() {
            console.log('submit click');
            this.$validator.validateAll().then(async (result) => {
                if (result) {
                    const obj = {
                        id: this.dataId,
                        name: this.dataName,
                        possible_unit: this.dataPossibleUnit
                    };
                    if (this.dataId !== null && this.dataId >= 0) {
                        console.log('submit update');
                        this.$store
                            .dispatch('ingredientsManager/editIngredients', obj)
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
                            .dispatch('ingredientsManager/addIngredients', obj)
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
