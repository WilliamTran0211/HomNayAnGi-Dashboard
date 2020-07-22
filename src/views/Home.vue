<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-1/3">
                <statistics-card-line
                    hideChart
                    class="mb-base"
                    icon="UserIcon"
                    statistic="9"
                    statisticTitle="Người dùng"
                />
            </div>

            <div class="vx-col w-1/3">
                <statistics-card-line
                    hideChart
                    class="mb-base"
                    icon="FileIcon"
                    statisticTitle="Công thức"
                    statistic="3"
                    color="success"
                />
            </div>

            <div class="vx-col w-1/3">
                <statistics-card-line
                    hideChart
                    class="mb-base"
                    icon="ShoppingBagIcon"
                    statistic="40"
                    statisticTitle="Thực phẩm"
                    color="warning"
                />
            </div>
        </div>
    </div>
</template>


<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue';

export default {
    components: {
        StatisticsCardLine
    }
};
</script>