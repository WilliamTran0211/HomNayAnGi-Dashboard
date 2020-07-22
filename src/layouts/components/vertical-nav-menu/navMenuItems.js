/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
    {
        url: '/',
        name: 'Trang Chủ',
        slug: 'home',
        icon: 'HomeIcon'
    },
    {
        header: 'Quản lý',
        icon: 'PackageIcon',
        i18n: 'Apps',
        items: [
            {
                url: '/recipes-manager',
                name: 'Quản lý món ăn',
                slug: 'recipes-manager',
                icon: 'FileTextIcon',
                submenu: [
                    {
                        url: '/recipes-manager/recipes',
                        name: 'Công thức',
                        slug: 'recipes'
                    },
                    {
                        url: '/recipes-manager/ingrediens',
                        name: 'Nguyên liệu',
                        slug: 'ingredients'
                    }
                ]
            },
            {
                url: '',
                name: 'Quản lý danh mục ',
                slug: 'ingredients-manager',
                icon: 'DatabaseIcon',
                submenu: [
                    {
                        url: '/ingredients-manager',
                        name: 'thực phẩm',
                        slug: 'ingredients'
                    }
                ]
            },
            {
                url: '/users-manager',
                name: 'Quản lý người dùng',
                slug: 'user-manager',
                icon: 'UserIcon'
            }
            // {
            //   url: "/ingredients-manager",
            //   name: "Quản lý nguyên liệu",
            //   slug: "ingredients-manager",
            //   icon: ""
            // }
        ]
    }
];
