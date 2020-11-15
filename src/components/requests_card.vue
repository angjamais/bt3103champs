<template>
    <div id="card">
        <b-card>
            <BCardHeader id="title" style="margin-top:-20px; margin-left:0px;">{{title}}</BCardHeader><br><br>
            <div style="display:flex;flex-direction:row;justify-content:center;margin-top:-40px;">
                <img id="icon" :src="getImage()" />
                <b-card-text style="font-size:25px;margin-left:20px;margin-top:5px;">{{getType()}}</b-card-text>
            </div>
            <h3 style="margin-top:10px;">Location:</h3>
            <b-card-text style="margin-top:10px;font-size:20px;">
                {{location}}
            </b-card-text>
            <div style="display:flex;flex-direction:row;justify-content:center;margin-top:10px;">
                <h4>Date:</h4>
                <b-card-text style="margin-top:6px;font-size:15px;">{{date}}</b-card-text>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center; margin-top:10px;">
                <img id="icon" :src="getCash()" />
                <b-button href="#" variant="primary" style="margin-bottom:0px; background-color:transparent; color:black;border-width:0px; margin-top:15px;" v-on:click="redirect()">View More >></b-button>
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
            cash: Boolean,
            eventID: String,
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
                if (this.cash) {
                    return require('../assets/cash.png')
                } else {
                    return require('../assets/no-cash.png')
                }
            },
            redirect() {
                if (this.type === 'donate') {
                    this.$router.push({ name: 'signup-donate', params: { eventID: this.eventID } })
                }
                else {
                    this.$router.push({ name: 'signup', params: { eventID: this.eventID } })
                }
            }
        },


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #card {
        border-width: 5px;
        border-color: black;
        border-style: solid;
        height: 100%;
        width: 100%;
        font-size: 5px;
        box-shadow: 1px 1px 5px 1px;
        border-color: rgb(113, 247, 35);
        border-radius: 10px;
        margin-top: 5px;
        background-color: white;
        
    }
    #title {
        font-size: 20px;
        margin-top:10px;
        border-width:0px;
        background-color:transparent;
    }
    #icon{
        height:30px;
        width:30px;

    }
</style>
