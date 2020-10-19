<template>
    <div id="card">
        <b-card>
            <BCardHeader id="title">{{title}}</BCardHeader><br><br>
            <div style="display:flex;flex-direction:row;justify-content:center;margin-top:-5px;">
                <img id="icon" :src="getImage()" />
                <b-card-text style="font-size:25px;margin-left:20px;margin-top:5px;">{{getType()}}</b-card-text>
            </div>
            <h3 style="margin-top:0px;">Location:</h3>
            <b-card-text style="font-size:20px;">
                {{location}}
            </b-card-text>
            <div style="display:flex;flex-direction:row;justify-content:center;margin-top:-20px;">
                <h4>Date:</h4>
                <b-card-text style="margin-top:20px;">{{date}}</b-card-text>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;">
                <img id="icon" :src="getCash()" />
                <b-button href="#" variant="primary">View More >></b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
    import { BCard, BCardText, BCardHeader } from "bootstrap-vue";

    export default {
        props: {
            title: String,
            type: String,
            location: String,
            date:String,
            cash: String
        },
        components: {
            'BCard': BCard,
            'BCardText': BCardText,
            'BCardHeader': BCardHeader
        },
        methods: {
            getImage() {
                return require('../assets/' + this.type + '.png')
            },
            getType() {
                if (this.type == "request") {
                    return "Request"
                }
                if (this.type == "online") {
                    return "Online"
                }
                if (this.type == "recruitment") {
                    return "Recruitment"
                }
                if (this.type == "donate") {
                    return "Donate"
                }
            },
            getCash() {
                if (this.cash === "yes") {
                    return require('../assets/cash.png')
                } else {
                    return require('../assets/no-cash.png')
                }
            }
        },
        mounted() {

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #card {
        border-width: 5px;
        border-color: black;
        border-style: solid;
        height: 375px;
        width: 270px;
        font-size: 15px;
        box-shadow: 1px 1px 5px 1px;
        border-color: rgb(113, 247, 35);
        border-radius:10px;
    }
    #title {
        font-size: 20px;
        margin-top:10px;
    }
    #icon{
        height:30px;
        width:30px;
    }
</style>
