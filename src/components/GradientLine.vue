<template>
  <div id="chart">
    <apexcharts
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase.js";
export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  mounted() {
    this.fetchData();
  },
  data: function () {
    return {
          x_categories: [],
          eventdata: [],
          series: [{
            name: 'Events',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
            },
            stroke: {
              width: 7,
              curve: 'smooth'
            },
            xaxis: {
              //type: 'datetime',
              categories: ['1/11/2020', '2/11/2020', '3/11/2020', '4/11/2020', '5/11/2020', '6/11/2020', '7/11/2020', '8/11/2020', '9/11/2020', '10/11/2020', '11/11/2020', '12/11/2020'],
              //tickAmount: 10,
              
            },
            title: {
              text: 'Personalised Events History',
              align: 'left',
              style: {
                fontSize: "16px",
                color: '#666'
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              },
            },
            markers: {
              size: 4,
              colors: ["#FFA41B"],
              strokeColors: "#fff",
              strokeWidth: 2,
              hover: {
                size: 7,
              }
            },
            yaxis: {
              min: -10,
              max: 40,
              title: {
                text: 'Engagement',
              },
            }
          },
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value,
        },
      }
    },
     async fetchData() {
        var username = localStorage.getItem("username")
        console.log("Fetching data");
        var dates = {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0,
          "11": 0,
          "18": 0,
          "20": 0
        }
        await database.collection('accounts').doc(username).get().then(doc => {

          var events = doc.data().events
          console.log(events.length)
          var eventid = doc.data().my_events
          eventid.forEach(id => {
            database.collection('events').doc(id).get().then(doc => {
            console.log("Fetch event data")
            console.log(doc.data().date.substring(8))
            var day = doc.data().date.substring(8)
            if (day.length != 0) {
            dates[day] += 1
            //match day to dictionary
            console.log(Object.values(dates))
            this.series= [{
            name: 'Events',
            data: Object.values(dates)
          }]
            }
          })
          })
      })
      }
  },
};
</script>
