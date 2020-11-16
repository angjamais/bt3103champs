<template>

        <b-container fluid style="padding: 10px">
            <b-row>
                <b-col cols=6><BarChart></BarChart></b-col>
                <b-col cols=6><GradientLine></GradientLine>
                </b-col>
            </b-row>
            <b-row>
               <b-col>
                <PieChart></PieChart></b-col>
                <b-col>
                <TreeMap></TreeMap></b-col>
            </b-row>
        </b-container>
   
</template>

<script>
import BarChart from "../components/BarChart.vue";
import GradientLine from "../components/GradientLine.vue";
import PieChart from "../components/PieChart.vue";
import TreeMap from "../components/TreeMap.vue";

export default {
    components: {
    BarChart: BarChart,
    GradientLine: GradientLine,
    PieChart: PieChart,
    TreeMap: TreeMap
  },
}
</script>

<style scoped>

</style>