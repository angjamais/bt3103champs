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
      // do some error handling
      //const res = await fetch("eventdata.json");
      //const val = await res.json();
      //console.log("MY data is " + res.json().data);
      fetch("treemapdata.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0].y);
          console.log(data.length);
          var i;
          var arr = [];
          for (i = 0; i < data.length; i++) {
              var curr = {
                  x: data[i].x,
                  y: parseInt(data[i].y)
              }
              arr.push(curr)
          }
          this.treemapdata = arr;
          console.log(this.treemapdata)
        //  this.treemapdata = data;
          this.series = [
            {
              name: "series-1",
              data: arr,
            }
          ]
        })
      //this.eventdata = val;
      //console.log(val);
    },
  }
};
</script>

