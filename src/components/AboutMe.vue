<template>
    <div id="left">
        <div id="information">
            <div style="float:left">
                <h3> About Me </h3> <br>
                <p> Name: {{info.name}}</p> <br>
                <p> Gender: {{info.gender}}</p> <br>
                <p> Phone: {{info.phone}}</p> <br>
                <p> Date of birth:{{info.dob}} </p> <br>
                <p> Account:{{info.acc}} </p> <br>
                <h3>My Events</h3>
                <br>
            </div>
            <div style="float:right;margin-top:50px;display:flex;flex-direction:column;">
                <img id="profile_pic" :src="info.profile_pic" />
                <br><h2 style="margin-left:-130px">{{info.name}}</h2> 
            </div>
        </div>
        <table>
            <tr>
                <th width="300px">Event Title</th>
                <th width="130px">Event Type</th>
                <th width="80px">Status</th>
            </tr>
            <tr v-bind:key="e" v-for="e in my_events">
                <td width="300px">{{e.title}}</td>
                <td width="130px">{{e.type}}</td>
                <td width="80px" v-if="e.status">Ongoing</td>
                <td width="80px" v-else>Ended</td>
                <button v-on:click="redirectEvent(e.id, e.type)">Go to event</button>
                <button v-on:click="archiveEvent(e.id, e.status)">Archieve Event</button>
            </tr>
        </table>
        <h3>Joined events</h3>
        <br>
        <table>
            <tr>
                <th width="300px">Event Title</th>
                <th width="130px">Event Type</th>
                <th width="80px">Status</th>
            </tr>
            <tr v-bind:key="e" v-for="e in events">
                <td width="300px">{{e.title}}</td>
                <td width="130px">{{e.type}}</td>
                <td width="80px" v-if="e.status">Ongoing</td>
                <td width="80px" v-else>Ended</td>
                <button @click="redirectEvent(e.id, e.type)">Go to event</button>
                <button v-on:click="quitEvent(e.id)">Quit event</button>
            </tr>
        </table>
        <h3>My Donations</h3>
        <br>
        <table>
            <tr>
                <th width="300px">Beneficiary</th>
            </tr>
            <tr v-bind:key="e" v-for="e in my_donate">
                <td width="300px">{{e.title}}</td>
                <button v-on:click="redirectEvent(e.id, 'donate')">Go To Donation</button>
            </tr>
        </table>
    </div>
</template>

<script>
    /*
     *                    
     * */
    import database from '../firebase.js'

    export default {
        data() {
            return {
                info: {
                    name: "",
                    gender: "",
                    phone: "",
                    dob: "",
                    acc: "",
                    profile_pic:"",
                }, 
                my_events: [],
                events: [],
                events_raw: [],
                my_donate:[],
            }
        },
        methods: {
            async quitEvent(eventID) {
                var username = localStorage.getItem("username");
                if (confirm("Are you sure you want to quit this event?")) {
                    await database.collection("events").doc(eventID).get().then(doc => {
                        //Remove user from events' data
                        var event_participants = doc.data().event_participants;
                        var new_event_participants = event_participants.filter(user => user != username);
                        database.collection("events").doc(eventID).set({ event_participants: new_event_participants }, { merge: true })
                    }).then(() => {
                    var events = this.events_raw.filter((e) => e != eventID)
                        database.collection("accounts").doc(username).set({ events: events }, { merge: true }).then(() => { location.reload(); }) //Remove the event from user's database
                        
                    })
                } 
            },
            redirectEvent(eventID, type) {
                if (type == "donate") {
                    this.$router.push({ name: 'signup-donate', params: { eventID: eventID } })
                } else {
                    this.$router.push({ name: 'signup', params: { eventID: eventID } })
                }
            },
            archiveEvent(eventID, status) {
                if (status) {
                    if (window.confirm("Are you sure you want to archive this event?")) {
                        database.collection("events").doc(eventID).set({ event_status: false }, {merge:true})
                        location.reload();
                    }
                } else {
                    alert("Event already ended")
                }
            },
            getMyEvent(eventID) {
                database.collection("events").doc(eventID).get().then(doc => {
                    this.my_events.push({ id: eventID, title: doc.data().title, type: doc.data().event_type, status: doc.data().event_status })
                })
            },
            getPartEvent(eventID) {
                database.collection("events").doc(eventID).get().then(doc => {
                    if (doc.data().event_type !== "donate") {
                        this.events.push({ id: eventID, title: doc.data().title, type: doc.data().event_type, status: doc.data().event_status })
                    } else {
                        this.my_donate.push({ id: eventID, title: doc.data().title, type: doc.data().event_type, status: doc.data().event_status })
                    }
                })
                
            },
            getInfo() {
                var username = localStorage.getItem("username");
                database.collection('accounts')
                    .doc(username)
                    .get()
                    .then((doc) => {
                        var info = doc.data();
                        this.info.name = info.name;
                        this.info.gender = info.gender;
                        this.info.phone = info.contact;
                        this.info.dob = info.dob;
                        this.info.acc = username;
                        this.events_raw = info.events;
                        this.info.profile_pic = info.profile_pic_url;
                        info.my_events.forEach((e) => this.getMyEvent(e));
                        info.events.forEach((e) => this.getPartEvent(e));
                    })
                
            }
        },
        mounted() {
            this.getInfo();
    }
}
</script>

<style scoped>
    p {
        text-align: left
    }
    #left {
        float: left;
        width: 60%;
        text-align: justify;
        height: 100%;
        margin-left:20%;
        margin-right:20%
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    button {
        background-color: #4CAF50; /* Green */
        border: double;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    #profile_pic {
        height: 200px;
        width: 200px;
        overflow: hidden;
        border-radius: 500px;
        justify-content: center;
        background-color: white;
        color: cornflowerblue;
        box-shadow: 0 0 8px 3px #B8B8B8;
        display: flex !important;
        align-items: center;
        margin: -10px 0px 0px -180px;
    }

    .cropped img {
        margin: -10px 0px 0px -180px;
    }

</style>