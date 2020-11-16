<template>
    <div class="vue-tempalte">
        <form>
            <h3>Forgot Password</h3>
            <br>
            <div class="form-group">
                <label>Email address:</label>
                <input type="email" placceholder="Enter email" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg">Reset password</button>

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