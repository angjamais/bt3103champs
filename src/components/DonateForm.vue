<template>
  <!-- Default form contact -->
  <form>
      <br>
    <p class="form-title">Support your chosen cause</p>
    <h5>Leave a one time $10 donation</h5>

    <label for="beneficiary">Please select beneficiary:</label>
    <select id="beneficiary"
            class="form-control"
            v-model="selectedBeneficiary">
        <option value="Null" selected disabled>Choose an option</option>
        <option v-for="beneficiary in beneficiaries" v-bind:key="beneficiary">{{ beneficiary }}</option>
    </select>

    <br>

    <!-- Default input email -->
    <label for="defaultFormContactEmailEx" class="grey-text">Your email</label>
    <input type="email" id="defaultFormContactEmailEx" class="form-control">

    <br>

    <label for="status">Please select beneficiary:</label>
    <select id="status"
            class="form-control"
            v-model="selectedstatus">
        <option v-for="status in statuses" v-bind:key="status">{{ status }}</option>
    </select>

    <br>

    <!-- Default input name -->
    <label for="defaultFormContactNameEx" class="grey-text">Organisation\Honoree name:</label>
    <input type="text" id="defaultFormContactNameEx" class="form-control" value="Optional">

    <br>

    <!-- Default textarea message -->
    <label for="defaultFormContactMessageEx" class="grey-text">Your message:</label>
    <textarea type="text" id="defaultFormContactMessageEx" class="form-control" rows="3" value ="Optional"></textarea>

    <div class="text-center mt-4">
        <button class="btn btn-outline-warning" type="submit">Donate<i class="far fa-paper-plane ml-2"></i></button>
    </div>
  </form>
  <!-- Default form contact -->
</template>

<script>
    export default {
        data() {
            return {
                selectedBeneficiary: 'E Elder care',
                beneficiaries: ['Auntie A', 'Uncle B', 'Family C', 'D Children Home', 'E Elder care'],
                selectedStatus: 'Myself',
                statuses: ['Myself', 'An organisation', 'Someone Else']
            }
        }
    }
</script>


<style scoped>
    .form-title {
        font-size: larger;
        font-weight: bolder;
        padding-bottom: 0%;
    }
h5 {
    font-size: medium;
}


</style>