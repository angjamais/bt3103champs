<template>
    <div style="background-color:transparent; border-color:transparent;justify-content:center;">
    <div style="background-color:transparent; border-color:transparent;justify-content:center;" class="card" v-bind:key="item" v-for="item in items">
        <Card :title="item.title" :msg="item.msg" :type="item.type"/>
    </div>
        </div>
</template>

<script>

    import Card from "./request_type_card.vue"

    export default {
        components: {
            'Card': Card
        },
        data() {
            return {
                items: [
                    { title: "Donation", msg: "Raise fund for individuals", type: "donate" },
                    { title: "Recruitment", msg: "Find your voluteers", type: "recruitment" },
                    { title: "Online", msg: "Help without been physically present", type: "online" },
                    { title: "Request", msg: "Make a help request", type: "request" },
                ]
            }
        },

    }
</script>

<style>
    #card {
        border-width: 5px;
        border-color: black;
        border-style: solid;
        height: 150px;
        width: 400px;
        font-size: 15px;
        box-shadow: 1px 1px 5px 1px;
        border-color: rgb(128, 128, 128);
        border-radius: 2px;
        margin-bottom: 0px;
        background-color: white;
        display:flex;
        flex-direction:row;
        justify-content:center;
    }
</style>