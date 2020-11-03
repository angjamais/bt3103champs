<template>
    <div id ="cards" >
        <BCard id="card">
            <img style="width:50px" :src="getImage()" />
            <div>
                <h5>{{title}}</h5>
                <p>{{msg}}</p>
            </div>
        </BCard>
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #cards {
        width: 1500px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
    }
</style>
