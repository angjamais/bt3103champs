<template>
    <div>
        <div id='left'>
            <h3> About Me </h3> <br>
            <p> Name: {{info.name}}</p> <br>
            <p> Gender: {{info.gender}}</p> <br>
            <p> Phone: {{info.phone}}</p> <br>
            <p> Date of birth:{{info.dob}} </p> <br>
            <p> Account:{{info.acc}} </p> <br>
        </div>
    </div>
</template>

<script>
    import database from '../firebase.js'

    export default {
        data() {
            return {
                info: {
                    name: "",
                    gender: "",
                    phone: "",
                    dob: "",
                    acc: "",
                }
            }
        },
        mounted() {
            var username = localStorage.getItem("username");
            database.collection('accounts')
            .doc(username)
            .get()
            .then((doc) => {
                var info = doc.data();
                this.info.name = info.name;
                this.info.gender = info.gender;
                this.info.phone = info.contact;
                this.info.dob = info.dob;
                this.info.acc = username;
            })
    }
}
</script>

<style scoped>
    p {
        text-align: left
    }
    #left {
        float: left;
        width: 60%;
        text-align: justify;
        height: 400px;
        margin-left:20%;
        margin-right:20%
    }
</style>