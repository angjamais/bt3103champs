<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Full Name:</label>
                <input type="text" placeholder="Enter full name" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address:</label>
                <input type="email" placeholder="Enter email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" placeholder="Enter password" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="submit" class="btn btn-dark btn-lg">Sign Up</button>

            <p class="forgot-password text-middle">
                Already registered ?
                <router-link id="router-link" to="/login" exact>sign in</router-link>

            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style>
    .form-group {
        margin-left:33%;
        margin-right:33%;
    }


</style>