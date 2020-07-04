<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="data-list-list-view" class="data-list-container">
        <!-- <data-view-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
        />-->
        <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

        <vs-table ref="table" multiple v-model="selected" search pagination :max-items="itemsPerPage" :data="recipeIngredientsList">
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                    <div
                        class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                        @click="addNewData"
                    >
                        <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                        <span class="ml-2 text-base text-primary">Thêm mới</span>
                    </div>
                    <div
                        class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                        @click="reloadData"
                    >
                        <feather-icon icon="RefreshCcwIcon" svgClasses="h-4 w-4" />
                        <span class="ml-2 text-base text-primary">Reload</span>
                    </div>
                </div>

                <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">
                            {{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                            {{ recipeIngredientsList.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : recipeIngredientsList.length }} of {{ queriedItems }}
                        </span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>
                        <vs-dropdown-item @click="itemsPerPage = 4">
                            <span>4</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage = 10">
                            <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage = 15">
                            <span>15</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage = 20">
                            <span>20</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </div>

            <template slot="thead">
                <vs-th sort-key="id">id</vs-th>
                <vs-th sort-key="recipe">Công thức</vs-th>
                <vs-th sort-key="ingredient">Tên Thực phẩm</vs-th>
                <vs-th sort-key="amount">Số lượng</vs-th>
                <vs-th sort-key="unit">Đơn vị</vs-th>
                <vs-th>Chức năng</vs-th>
            </template>

            <template slot-scope="{ data }">
                <tbody>
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.id }}</p>
                        </vs-td>
                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.recipe }}</p>
                        </vs-td>
                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.ingredient }}</p>
                        </vs-td>
                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.amount }}</p>
                        </vs-td>
                        <vs-td>
                            <p class="product-name font-medium truncate">{{ tr.unit }}</p>
                        </vs-td>
                        <vs-td class="whitespace-no-wrap">
                            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" />
                        </vs-td>
                    </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
import DataViewSidebar from './RecipesIngredientsSideView';

export default {
    components: {
        DataViewSidebar
    },
    data() {
        return {
            selected: [],
            itemsPerPage: 4,
            isMounted: false,

            recipeIngredientsList: [],

            addNewDataSidebar: false,
            sidebarData: {},

            recipesList: [],
            ingredientsList: []
        };
    },
    computed: {
        currentPage() {
            if (this.isMounted) {
                return this.$refs.table.currentx;
            }
            return 0;
        },
        queriedItems() {
            return this.$refs.table ? this.$refs.table.queriedResults.length : this.recipeIngredientsList.length;
        }
    },
    methods: {
        reloadData() {
            this.getList();
        },
        addNewData() {
            console.log('add click');
            this.sidebarData = {};
            this.toggleDataSidebar({ val: true, isSubmit: undefined });
        },
        editData(data) {
            console.log('edit data ' + JSON.stringify(data));
            this.sidebarData = data;
            this.toggleDataSidebar({ val: true, isSubmit: undefined });
        },
        async getList() {
            this.$vs.loading();

            this.recipeIngredientsList = [];

            await this.$store
                .dispatch('recipesManager/fetchRecipesIngredients')
                .then((result) => {
                    console.log(result);
                    this.recipeIngredientsList = result.data;
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

            await this.setNameNtitle();

            this.$vs.loading.close();
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
        async setNameNtitle() {
            await this.recipeIngredientsList.forEach(async (element) => {
                await this.recipesList.map(function(o) {
                    if (element.recipe == o.id) {
                        element.recipeInfo = o;
                    }
                });

                await this.ingredientsList.map(function(o) {
                    if (element.ingredient == o.id) {
                        element.ingredientInfo = o;
                    }
                });
            });
        },
        getTitleOfRecipe(id) {
            this.recipesList.forEach((element) => {
                if (element.id == id) {
                    this.tempRecipeData = element;
                    return true;
                }
            });
        },
        getNameOfIngredient(id) {
            this.ingredientsList.forEach((element) => {
                if (element.id == id) {
                    this.tempIngreData = element;
                    return true;
                }
            });
        },
        async toggleDataSidebar(datasibe = { val: false, isSubmit: undefined }) {
            console.log('toggleDataSidebar has been call');
            this.addNewDataSidebar = datasibe.val;
            if (datasibe.isSubmit) {
                console.log('reload when submit');
                this.recipeIngredientsList = [];
                await this.getList();
            }
        }
    },
    created() {
    },
    async mounted() {
        this.isMounted = true;
        this.getList();
    }
};
</script>

<style lang="scss">
#data-list-list-view {
    .vs-con-table {
        /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
        @media (max-width: 689px) {
            .vs-table--search {
                margin-left: 0;
                max-width: unset;
                width: 100%;

                .vs-table--search-input {
                    width: 100%;
                }
            }
        }

        @media (max-width: 461px) {
            .items-per-page-handler {
                display: none;
            }
        }

        @media (max-width: 341px) {
            .data-list-btn-container {
                width: 100%;

                .dd-actions,
                .btn-add-new {
                    width: 100%;
                    margin-right: 0 !important;
                }
            }
        }

        .product-name {
            max-width: 23rem;
        }

        .vs-table--header {
            display: flex;
            flex-wrap: wrap;
            margin-left: 1.5rem;
            margin-right: 1.5rem;
            > span {
                display: flex;
                flex-grow: 1;
            }

            .vs-table--search {
                padding-top: 0;

                .vs-table--search-input {
                    padding: 0.9rem 2.5rem;
                    font-size: 1rem;

                    & + i {
                        left: 1rem;
                    }

                    &:focus + i {
                        left: 1rem;
                    }
                }
            }
        }

        .vs-table {
            border-collapse: separate;
            border-spacing: 0 1.3rem;
            padding: 0 1rem;

            tr {
                box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
                td {
                    padding: 20px;
                    &:first-child {
                        border-top-left-radius: 0.5rem;
                        border-bottom-left-radius: 0.5rem;
                    }
                    &:last-child {
                        border-top-right-radius: 0.5rem;
                        border-bottom-right-radius: 0.5rem;
                    }
                }
                td.td-check {
                    padding: 20px !important;
                }
            }
        }

        .vs-table--thead {
            th {
                padding-top: 0;
                padding-bottom: 0;

                .vs-table-text {
                    text-transform: uppercase;
                    font-weight: 600;
                }
            }
            th.td-check {
                padding: 0 15px !important;
            }
            tr {
                background: none;
                box-shadow: none;
            }
        }

        .vs-table--pagination {
            justify-content: center;
        }
    }
}
</style>
