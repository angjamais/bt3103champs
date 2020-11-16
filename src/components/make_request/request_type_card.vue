<template>
    <div id="cards">
        <BCard id="card">
            <img style="width:50px" :src="getImage()" />

            <div>
                <h5>{{title}}</h5>
                <h6>{{msg}}</h6>

            </div>
        </BCard>
        <button style="width:40px;"><img src="../../assets/left-arrow.png" style="width:50px;height:50px;margin-left:10px;" v-on:click="redirect()" /></button>
    </div>
</template>

<script>
    import { BCard } from "bootstrap-vue";

    export default {
        components: {
            'BCard': BCard,
        },
        props: {
            type: String,
            title: String,
            msg: String
        },
        methods: {
            getImage() {
                return require('../../assets/' + this.type + '.png');
            },
            redirect() {
                this.$router.push("submitrequest-" + this.type);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #cards {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
        height: 100%;
        background-color: transparent;
    }
    button{
        background-color:transparent;
        border-color: transparent;
    }
</style>
