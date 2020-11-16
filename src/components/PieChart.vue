<template>
   <div id="chart">
        <apexcharts type="pie" width="90%" :options="chartOptions" :series="series"></apexcharts>
      </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase.js";

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
            labels: ['Social or Community Service', 'Education', 'Environmental', 'Elderly Care', 'Disabled Care', 'Others'],
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
          eventdata: [],
          series: [1,1,1,1,1,1],
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value
        }
      };
    },
    async fetchEventData() {
      await database.collection('events').where("category", "==", "Community Service").get().then((querySnapshot) => {
         
         this.eventdata.push(querySnapshot.size)
         console.log("Event data" + this.eventdata)
      });   
      await database.collection('events').where("category", "==", "Education").get().then((querySnapshot) => {
         this.eventdata.push(querySnapshot.size)
          console.log("Event data" + this.eventdata)
      });   
      await database.collection('events').where("category", "==", "Environmental").get().then((querySnapshot) => {
         this.eventdata.push(querySnapshot.size)
          console.log("Event data" + this.eventdata)
      });   
      await database.collection('events').where("category", "==", "Elderly Care").get().then((querySnapshot) => {
         this.eventdata.push(querySnapshot.size)
          console.log("Event data" + this.eventdata)
      });   
      await database.collection('events').where("category", "==", "Disabled Care").get().then((querySnapshot) => {
         this.eventdata.push(querySnapshot.size)
          console.log("Event data" + this.eventdata)
      });    
      await database.collection('events').where("category", "==", "Others").get().then((querySnapshot) => {
         this.eventdata.push(querySnapshot.size)
          console.log("Event data" + this.eventdata)
      });    
      console.log("FinalArray" + this.eventdata)
      this.series = this.eventdata
     }
  }
};
</script>
