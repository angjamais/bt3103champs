<template>
  <div id="main">
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6">
          <h1>Food Distribution & House Cleaning for Aunty Rose</h1>
          <p id="org_details">
            Organiser: Alex Lin<br />
            Location: Ang Mo Kio Block 720 #08-443, 720 Ang Mo Kio Avenue 6,
            (S)560720<br />
            Date: 10.10.2020<br />
            Time: 9am - 12pm, 1300 - 1430<br />
            <u id="org_details"
              >Please observe social distancing and wear masks at all times
              during the event</u
            >
          </p>
        </b-col>
        <b-col sm="4">
          <b-row align-h="center">
            <SignUpButton></SignUpButton>
            <p align="left">
              Person of Contact: Mr Alex Lim<br />
              Contact Number: 8123 4567<br />
              Event Status: Recruiting<br />
              Slots: 3/4
            </p>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="bv-example-row">
      <b-row align-v="center">
        <SignUpCard
          id="pagi"
          v-for="job in displayJobs"
          :key="job.id"
          :name="job.name"
          :text="job.text"
          :image="job.image"
        ></SignUpCard>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-number
        size="sm"
        align="center"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import SignUpButton from "../components/SignUpButton.vue";
import SignUpCard from "../components/SignUpCard.vue";
export default {
  components: {
    SignUpButton: SignUpButton,
    SignUpCard: SignUpCard,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      jobs: [],
      displayJobs: [],
      currentPage: 1,
      rows: 1,
      perPage: 3,
    };
  },
  methods: {
    async fetchData() {
      // do some error handling
      const res = await fetch("signup.json");
      const val = await res.json();
      this.jobs = val;
      this.displayJobs = val.slice(0, 3); // slice of it
      this.rows = this.jobs.length;
      console.log(val);
    },
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage; //give our start value
      this.displayJobs = this.jobs.slice(start, start + 3); // determine where did the array start up
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-weight: bold;
  margin-bottom: 0;
  text-align: left;
  font-size: 20px;
}
h2 {
  font-weight: normal;
  font-size: 20px;
  margin: 0;
  text-align: left;
  padding-block-end: 0%;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
#org_details {
  font-weight: normal;
  line-height: 1.5;
  margin: 0;
  text-align: left;
  padding-block-end: 0%;
}
#pagi {
  /* KIV for resizing of the navigation bar*/
}
p {
  text-align: center;
  line-height: 1.5;
}
</style>
