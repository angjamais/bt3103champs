<template>
    <div class="vue-tempalte" id="root">
        <form>
            <h3>Sign In</h3>
            <br>
            <form action="#" @submit.prevent="submit">
            <div class="form-group">
                <label>Email address:</label>
                <input type="email"  placeholder="Enter email" v-model="input.username" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" placeholder="Enter password" v-model="input.password" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="submit" class="btn btn-dark btn-lg">Sign In</button>
</form>
            <p class="dont-have-account text-middle mt-2 mb-4">
                <router-link id="router-link" to="/register_account" exact>Don't have an account ?</router-link>
            </p>
            <p class="forgot-password text-middle mt-2 mb-4">
                <router-link id="router-link" to="/forget_password" exact>Forget password ?</router-link>
            </p>

        </form>
    </div>
</template>

<script>
    import { sha256 } from 'js-sha256';
    import database from '../firebase.js'

    export default {
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                }
            }
        },
        methods: {
            submit() {
                if (this.input.username !== "") {
                    if (this.input.password !== "") {
                        database.collection('accounts').doc(this.input.username).get().then(doc => {
                                if (doc.data()) {
                                    var password = doc.data().password;
                                    if (sha256(this.input.password) === password) {
                                        //alert("Hello " + doc.data().name)
                                        localStorage.setItem("username", this.input.username);
                                        this.$router.push({ path: '/home' })
                                        location.reload()
                                    } else {
                                       // alert("Wrong combination of username and password!")
                                        location.reload()
                                    }
                                } else {
                                    //alert("User does not exist!")
                                    location.reload()
                                }
                            })
                    } else {
                        alert("Please enter password")
                    }
                } else {
                    alert("Please enter username")
                }
            }
        }
    }
</script>

<style scoped>
    #root {
        height: 70vh;
        margin-top: 2%;
    }
    .form-group {
        margin-left:33%;
        margin-right:33%;
    }
h3 {
    font-weight:bold;
    
}
</style>