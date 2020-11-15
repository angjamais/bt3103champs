<template>
    <div id="card">

        <b-card>
            <BCardHeader id="title">{{title}}</BCardHeader><br><br>
            <div id="imagebox">
                <img id="icon" :src="getImage()" />
                <b-card-text id="type">{{getType()}}</b-card-text>
            </div>
            <h5 style="margin-top:10px;">Location:</h5>
            <b-card-text id="text">
                {{location}}
            </b-card-text>
            <div>
                <h5>Date:</h5>
                <b-card-text id="text2">{{date}}</b-card-text>
            </div>
                <div><img id="icon" :src="getCash()" /></div>
                <div>
            <b-button href="#" id="view" variant="primary" v-on:click="redirect()">View More >></b-button></div>
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
        margin-top: 20px;
        border-width: 5px;
        border-color: black;
        border-style: solid;
        height: 100%;
        width: 100%;
        font-size: 5px;
        box-shadow: 1px 1px 5px 1px;
        border-color: rgb(113, 247, 35);
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: row;
        
    }
    #title {
        font-size: 20px;
        margin-top:10px;
        border-width:0px;
        font-weight: 900;
        height: 150px;
        color: darkolivegreen;
        background-color:transparent;
    }
    #text {
        font-size: 20px;
        margin-top:5px;
        border-width:0px;
        font-weight: 900;
        height: 60px;
        color: black;
        background-color:transparent;
    }
    #text2 {
        font-size: 20px;
        margin-top:5px;
        border-width:0px;
        font-weight: 900;
        height: 30px;
        color: black;
        background-color:transparent;
        width:100%;
    }
    #icon{
        height:60px;
        width:60px;
    }

    #type {
        font-size:20px;
        color:darkgreen;
        font-weight: 800;
        margin-left: 15px;
        margin-top: 15px;
    }
    #view {
        margin-top: 20px;
    }
    #imagebox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: darkseagreen;
        border-radius: 5px;
        height: 80px;
        padding: 10px;
    }
</style>
