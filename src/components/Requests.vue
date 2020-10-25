
<template>
    <div>
        <div id="filter">
            <h1>Filter By:</h1>
            <button class="dropbtn">Location</button>
            <button class="dropbtn">Date</button>
            <button class="dropbtn">Category</button>
        </div>
        <div id="cards">
            <div class="card" v-bind:key="item" v-for="item in items">
                <Card :title="item.title" :location="item.location" :type="item.type" :cash="item.cash" :date="item.date" />
            </div>
        </div>
        
    </div>
</template>

<script>
    import Card from "./requests_card.vue"

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        components: {
            "Card": Card
        },
        data() {
            return {
                items: [
                    { title: "Request for walking shoe, size US7 for Aunty Ah Huat, age 70", location: "4 Jln Minyak, Singapore 163004", type: "request", cash: "no", date: "01/02/2020" },
                    { title: "Request for tuition for primary school math", location: "Online tutoring platform", type: "online", cash: "no", date: "01/09/20 - 31/12/20" },
                    { title: "Request for rice and vegetable delivery for Uncle Ah Kang", location: "1 Eunos Cres, Singapore 400001", type: "request", cash: "no", date: "27/09/20" },
                    { title: "Request for rice and vegetable delivery for Uncle Ah Kang", location: "1 Eunos Cres, Singapore 400001", type: "request", cash: "no", date: "27/09/20" },
                    { title: "Food Distribution and house cleaning for Aunty Rose in Ang Mo Kio", location: "720 Ang Mo Kio Avenue 6 (S)560720", type: "request", cash: "no", date: "10/10/2020" },
                    { title: "Donation to Uncle Ah Soon who has lost his job since the start of pandemic", location: "-", type: "donate", cash: "yes", date: "10/10/2020" },
                    { title: "Donation to Uncle Ah Soon who has lost his job since the start of pandemic", location: "-", type: "donate", cash: "yes", date: "10/10/2020" },
                    { title: "Donation to Uncle Ah Soon who has lost his job since the start of pandemic", location: "-", type: "donate", cash: "yes", date: "10/10/2020" },
                ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #filter {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .dropbtn {
        height: 25px;
        width:100px;
        margin-top: 28px;
        margin-left: 10px;
        background-image: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.5) 51%);
    }
    #cards {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
    #card >*{
        flex:1 1 20%;
    }

    #card{
        margin-left:30px;
        margin-top:30px;
    }
</style>
