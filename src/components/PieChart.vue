<template>
   <div id="chart">
        <apexcharts type="pie" width="100%" :options="chartOptions" :series="series"></apexcharts>
      </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts
  },
  beforeMount() {
    this.fetchEventData();
  },
  data() {
    return {
          chartOptions: {
            chart: {
              type: 'pie',
            },
            title: {
              text: 'Category of Events/Services',
              align: 'left',
              style: {
                fontSize: "16px",
                color: '#666'
              }
            },
            labels: ['Social or Community Service', 'Education', 'Environmental', 'Elderly Care', 'Disabled Care'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                 
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
series: [44, 55, 13, 43, 22],
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value
        }
      };
    }
  }
};
</script>
