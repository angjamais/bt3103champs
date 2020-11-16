<template>
  <div id="chart">
    <apexcharts
      type="treemap"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase.js"
export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  beforeMount() {
    this.fetchEventData();
  },
  data() {
    return {
      chartOptions: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
        },
       title: {
              text: 'Monthly Top Contributors',
              align: 'left',
              style: {
                fontSize: "16px",
                color: '#666'
              }
            },
      },
      treemapdata: [],
      series: [
        {
          name: "series-1",
          // data: [30, 40, 45, 30, 49]
          data: [{x:"HEEE", y:80}], // need this to declare the x and y for the data structure
        },
      ],
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value,
        },
      };
    },
    
    async fetchEventData() {
      //fetch all users, fetch the number of events per user
      var users = []
      var arr = [];
      await database.collection('accounts').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().events.length)
          users.push(doc.data().name)
          var curr = {
                  x: doc.data().name,
                  y: doc.data().events.length
              }
          arr.push(curr)
        })
      })
      this.treemapdata = arr;
          console.log(this.treemapdata)
        //  this.treemapdata = data;
          this.series = [
            {
              name: "series-1",
              data: arr,
            }
          ]

      
    },
  }
};
</script>

