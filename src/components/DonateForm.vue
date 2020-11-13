<template>
  <!-- Default form contact -->
    <form>
        <br>
        <p class="form-title">Support your chosen cause</p>
        <h5>Leave a one time $10 donation</h5>
        <h3>Beneficiary</h3>
        <p>{{beneficiary}}</p>
        <h2 style="text-align:center">Account Detail</h2>
        <p>{{acc}}</p>
        <br>

        <!-- Default input email -->
        <label for="defaultFormContactEmailEx" class="grey-text">Your email</label>
        <input type="email" id="defaultFormContactEmailEx" class="form-control">

        <br>

        <label for="status">I am donating in the name of:</label>
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

        <b-form-group label="Proof of transfer" label-for="form-image" description="*We will not share your bank information with anyone" style="width:500px; margin-left:5px;">
            <b-input-group>
                <b-input-group-prepend is-text>
                    <b-icon icon="image-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-file id="form-image" accept="image/*"></b-form-file>
            </b-input-group>
        </b-form-group>

        <!-- Default textarea message -->
        <label for="defaultFormContactMessageEx" class="grey-text">Your message:</label>
        <textarea type="text" id="defaultFormContactMessageEx" class="form-control" rows="3" value="Optional"></textarea>

        <div class="text-center mt-4">
            <button class="btn btn-outline-warning" type="submit" v-on:click="donate">Donate<i class="far fa-paper-plane ml-2"></i></button>
        </div>
    </form>
  <!-- Default form contact -->
</template>

<script>
    import database from '../firebase.js';

    export default {
        props: {
            beneficiary: String,
            acc: String,
            eventID: String,
        },
        data() {
            return {
                selectedBeneficiary: 'E Elder care',
                selectedStatus: 'Myself',
                statuses: ['Myself', 'An organisation', 'Someone Else']
            }
        },
        methods: {
             donate() {
                var username = localStorage.getItem("username");
                database.collection('accounts').doc(username).get().then(async (doc) => {
                    var data = doc.data()
                    var participated_event = data.events
                    participated_event.push(this.eventID)
                    await database.collection('accounts').doc(username).set({ events: participated_event }, { merge: true }).then(() => {
                        alert("Thank you for your donation!");
                    })
                })
            }
        }
    }
</script>


<style scoped>
form {
    margin-left:33%;
    margin-right:33%;
}
    .form-title {
        font-size: larger;
        font-weight: bolder;
        padding-bottom: 0%;
        margin-bottom:0%;
    }
h5 {
    padding-top:0%;
    font-size: medium;
}


</style>