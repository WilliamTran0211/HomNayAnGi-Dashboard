<template>
    <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">
        <!-- GENERAL -->
        <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Thông tin chung' : ''">
            <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
                <AdminSettingsGeneral />
            </div>
        </vs-tab>
        <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Đổi mật khẩu' : ''">
            <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
                <AdminSettingsChangePassword />
            </div>
        </vs-tab>
    </vs-tabs>
</template>

<script>
import AdminSettingsGeneral from './AdminSettingsGeneral.vue';
import AdminSettingsChangePassword from './AdminSettingsChangePassword.vue';

export default {
    components: {
        AdminSettingsGeneral,
        AdminSettingsChangePassword
    },
    data() {
        return {};
    },
    computed: {
        isSmallerScreen() {
            return this.$store.state.windowWidth < 768;
        }
    }
};
</script>

<style lang="scss">
#profile-tabs {
    .vs-tabs--content {
        padding: 0;
    }
}
</style>
