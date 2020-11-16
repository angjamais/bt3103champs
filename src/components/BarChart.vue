<template>
  <div class="example">
    <p>
      <label><b>Select Theme Palette</b> </label> &nbsp;
      <select @change="updateTheme">
        <option value="palette1">palette1</option>
        <option value="palette2">palette2</option>
        <option value="palette3">palette3</option>
        <option value="palette4">palette4</option>
        <option value="palette5">palette5</option>
        <option value="palette6">palette6</option>
        <option value="palette7">palette7</option>
        <option value="palette8">palette8</option>
        <option value="palette9">palette9</option>
        <option value="palette10">palette10</option>
      </select>
    </p>
    <apexcharts
      width="100%"
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import database from '../firebase.js';
export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "basic-bar",
          animations: {
            speed: 200
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            distributed: true
          }
        },
        title: {
              text: 'Number of Regional Events/Services',
              align: 'left',
              style: {
                fontSize: "16px",
                color: '#666'
              }
            },
        xaxis: {
          categories: ['North', 'South', 'East', 'West','Central']
        }
      },
      eventdata: [],
      north: 0,
      south: 0,
      east: 0,
      central: 0,
      west: 0,
      series: [
        {
          name: "Events",
         // data: [30, 40, 45, 30, 49]
         data: this.eventdata
        }
      ],
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
    async fetchData() {
      await database.collection('events').where("region", "==", "North").get().then((querySnapshot) => {
        //console.log("Fetched north data " + this.north)
        this.north = querySnapshot.size
        //this.eventdata.push(querySnapshot.size)
        console.log("North" + this.north)
      });   
      await database.collection('events').where("region", "==", "East").get().then((querySnapshot) => {
        this.east = querySnapshot.size
      }); 
      await database.collection('events').where("region", "==", "South").get().then((querySnapshot) => {
        this.south = querySnapshot.size
      });  
      await database.collection('events').where("region", "==", "West").get().then((querySnapshot) => {
        this.west = querySnapshot.size
      });  
      await database.collection('events').where("region", "==", "Central").get().then((querySnapshot) => {
        this.central = querySnapshot.size
      });  
      this.series = [
        {
          name: "Events",
          data: [this.north, this.south, this.east, this.west, this.central]
        }
      ] 
     },
  }
};
</script>
