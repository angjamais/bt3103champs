<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>
            <br>
            <div class="form-group">
                <label>Email address:</label>
                <input type="email"  placeholder="Enter email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" placeholder="Enter password" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="submit" class="btn btn-dark btn-lg">Sign In</button>

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
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .form-group {
        margin-left:33%;
        margin-right:33%;
    }
h3 {
    font-weight:bold;
    
}
</style>