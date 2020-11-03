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
      series: [
        {
          name: "series-1",
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
     async fetchEventData() {
      // do some error handling
      //const res = await fetch("eventdata.json");
      //const val = await res.json();
      //console.log("MY data is " + res.json().data);
      fetch("eventdata.json").then(res => res.json()).then(data => {
          console.log(data)
          this.eventdata = data
          this.series = [
        {
          name: "series-1",
        data: this.eventdata
        }
      ]
      } )
      //this.eventdata = val;
      //console.log(val);
    },
  }
};
</script>
