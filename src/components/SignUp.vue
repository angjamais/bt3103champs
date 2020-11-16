<template>
    <div id="main">
        <b-container class="bv-example-row">
            <b-row>
                <b-col sm="6">
                    <br>
                    <h1>{{rqst.title}}</h1>
                    <p id="org_details">
                        Organiser: {{rqst.organiser}}<br />
                        Location: {{rqst.location}}<br />
                        Date: {{rqst.date}}<br />
                        Time: {{rqst.time}}<br />
                        <br>
                        <u id="org_details">
                            *Please observe social distancing and wear your mask at all times during the event
                        </u>
                    </p>
                    <br>
                    <p>{{rqst.description}}</p>
                </b-col>
                <b-col sm="4">
                    <br>
                    <b-row>
                        <img id="event_pic" :src="rqst.event_pic" />
                    </b-row>
                    <b-row align-h="center">
                        <SignUpButton></SignUpButton>
                        <p align="left" style="margin-left: 50%; width:1000px">
                            Person of Contact: <br />{{rqst.organiser}}<br />
                            Contact Number: {{rqst.contact}}<br />
                            Event Status: Active<br />
                        </p>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <b-form @submit.prevent="onSubmit">
            <b-container>
                <b-row align-v="center">
                    <b-col><button class="button" :disabled="busy" type="submit">Sign Up</button></b-col>
                </b-row>
            </b-container>
            <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
                <template #overlay>
                    <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
                        <img style="width:60px" src="../assets/cloud-computing.png" font-scale="4" />
                        <div class="mb-3">Joining event...</div>
                        <b-progress min="1"
                                    max="15"
                                    :value="counter"
                                    variant="success"
                                    height="3px"
                                    class="mx-n4 rounded-0"></b-progress>
                    </div>
                    <div v-else
                         ref="dialog"
                         tabindex="-1"
                         role="dialog"
                         aria-modal="false"
                         aria-labelledby="form-confirm-label"
                         class="text-center p-3">
                        <p><strong id="form-confirm-label">Are you sure?</strong></p>
                        <div class="d-flex">
                            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
                                Cancel
                            </b-button>
                            <b-button variant="outline-success" @click="onOK">OK</b-button>
                        </div>
                    </div>
                </template>
            </b-overlay>
        </b-form>
    </div>
</template>

<script>

    //import SignUpButton from "../components/SignUpButton.vue";
    //import SignUpCard from "../components/SignUpCard.vue";
    import database from '../firebase.js';

    export default {
        props: {
            eventID: String,
        },
        components: {
        },

        mounted() {
            this.fetchData();
        },

        data() {
            return {
                busy: false,
                processing: false,
                counter: 1,
                interval: null,
                rqst: {
                    title: "",
                    description: "",
                    location: "",
                    organiser: "",
                    date: "",
                    time: "",
                    contact: "",
                    event_limit: "",
                    event_type: "",
                    event_image: "",
                    event_cash: "",
                    event_status: true,
                    beneficiary: "",
                    event_participants: [],
                    slots: "",
                    event_pic:"",
                },
            };
        },
        beforeDestroy() {
            this.clearInterval()
        },
        methods: {
            clearInterval() {
                if (this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }
            },
            onShown() {
                this.$refs.dialog.focus()
            },
            onHidden() {
                this.$refs.submit.focus()
            },
            onSubmit() {
                this.busy = true
            },
            onCancel() {
                this.busy = false
            },
            onOK() {
                // Act a bit

                this.counter = 1
                var output = this.joinEvent();
                this.processing = true
                this.clearInterval()
                this.interval = setInterval(() => {
                    if (this.counter < 15) {
                        this.counter = this.counter + 1
                    } else {
                        this.clearInterval()
                        this.$nextTick(() => {
                            this.busy = this.processing = false
                            this.$router.push("requests");
                            if (output === 1) {
                                alert("Event joined!")
                            } else {
                                alert("Already joined this event!")
                            }
                            location.reload()
                        })

                    }
                }, 250)


            },
            fetchData() {
                database.collection('events').doc(this.eventID).get().then(doc => {
                    var data = doc.data();
                    var s = data.event_participants.length + "/" + data.event_limit
                    //alert(s)
                    var loc = data.location;
                    var time = data.time;
                    var date = data.date;
                    if (loc === "") { loc = "-" }
                    if (time === "") { time = "-" }
                    if (date === "") { date = "-" }
                    var rqst = {
                        title: data.title,
                        description: data.description,
                        location: loc,
                        organiser: data.organiser,
                        date: date,
                        time: time,
                        contact: data.contact,
                        event_limit: data.event_limit,
                        event_type: data.event_type,
                        event_image: [],
                        event_cash: "",
                        event_status: true,
                        beneficiary: '',
                        event_participants: data.event_participants,
                        slots: s,
                        event_pic: data.event_pic,
                    }
                    this.rqst = rqst;
                })
                // do some error handling
            },
            joinEvent() {
                var username = localStorage.getItem("username")
                if (!this.rqst.event_participants.includes(username)) {
                    this.rqst.event_participants.push(username)
                    database.collection('events').doc(this.eventID).set({ event_participants: this.rqst.event_participants }, { merge: true })
                    database.collection('accounts').doc(username).get().then(doc => {
                        var data = doc.data()
                        var participated_event = data.events
                        participated_event.push(this.eventID)
                        database.collection('accounts').doc(username).set({ events: participated_event }, {merge:true})
                        return 1;
                    })
                } else {
                    return 0;
                }

            }


        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    h1 {
        font-weight: bold;
        margin-bottom: 0;
        text-align: left;
        font-size: 20px;
    }

    h2 {
        font-weight: normal;
        font-size: 20px;
        margin: 0;
        text-align: left;
        padding-block-end: 0%;
    }

    h3 {
        margin: 40px 0 0;
    }

    a {
        color: #42b983;
    }

    #org_details {
        font-weight: normal;
        line-height: 1.5;
        margin: 0;
        text-align: left;
        padding-block-end: 0%;
    }

    #pagi {
        /* KIV for resizing of the navigation bar*/
    }

    p {
        text-align: center;
        line-height: 1.5;
    }

    #event_pic {
        height: 250px;
        width: 300px;
        object-fit: cover;
        border-radius: 10px;
        justify-content: center;
        background-color: white;
        color: cornflowerblue;
        box-shadow: 0 0 8px 3px #B8B8B8;
        display: flex !important;
        align-items: center;
        margin: -10px 0px 0px -180px;
        margin-left: 50%;
    }

    .button {
        background: #76B3FA;
        border-radius: 100px;
        padding: 20px 60px;
        color: #fff;
        text-decoration: none;
        font-size: 1.45em;
        margin: 0 15px;
        height: 50px;
        width: 220px;
        font-size: 20px;
        margin-top: 25px;
        padding: 0.6em;
        outline: none;
        margin-top: 0px;
    }

    .filter {
        font-size: 15px;
        align-content: center;
        height: 25px;
        width: 100px;
        margin-left: 0px;
        padding: 0em;
        margin-top: 8px;
    }

    /* Hover state animation applied here */
    .button:hover {
        -webkit-animation: hover 1200ms linear 2 alternate;
        animation: hover 1200ms linear 2 alternate;
    }

    /* Active state animation applied here */
    .button:active {
        -webkit-animation: active 1200ms ease 1 alternate;
        animation: active 1200ms ease 1 alternate;
        background: #5F9BE0;
    }

    .gray {
        background: #D2D2D2;
    }

        .gray:active {
            background: #b9b9b9;
        }

    /* Active state animation keyframes below */

    @-webkit-keyframes active {
        0% {
            transform: scale(1,1);
        }

        90% {
            transform: scale(.9,.88);
        }

        100% {
            transform: scale(.92,.9);
        }
    }

    keyframes active {
        0%

    {
        transform: scale(1,1);
    }

    90% {
        transform: scale(.9,.88);
    }

    100% {
        transform: scale(.92,.9);
    }

    }

    /* Hover state animation keyframes below */

    @-webkit-keyframes hover {
        0% {
            -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        1.8% {
            -webkit-transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        3.5% {
            -webkit-transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        4.7% {
            -webkit-transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        5.31% {
            -webkit-transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        7.01% {
            -webkit-transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        8.91% {
            -webkit-transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        9.41% {
            -webkit-transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        10.71% {
            -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        12.61% {
            -webkit-transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        14.11% {
            -webkit-transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        14.41% {
            -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        16.32% {
            -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        18.12% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        18.72% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        20.02% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        21.82% {
            -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        24.32% {
            -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        25.53% {
            -webkit-transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        29.23% {
            -webkit-transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        29.93% {
            -webkit-transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        35.54% {
            -webkit-transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        36.64% {
            -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        41.04% {
            -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        44.04% {
            -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        51.45% {
            -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        52.15% {
            -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        58.86% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        63.26% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        66.27% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        73.77% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        81.18% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        85.49% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        88.59% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        96% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        100% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
    }

    @keyframes hover {
        0% {
            -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        1.8% {
            -webkit-transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        3.5% {
            -webkit-transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        4.7% {
            -webkit-transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        5.31% {
            -webkit-transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        7.01% {
            -webkit-transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        8.91% {
            -webkit-transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        9.41% {
            -webkit-transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        10.71% {
            -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        12.61% {
            -webkit-transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        14.11% {
            -webkit-transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        14.41% {
            -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        16.32% {
            -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        18.12% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        18.72% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        20.02% {
            -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        21.82% {
            -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        24.32% {
            -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        25.53% {
            -webkit-transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        29.23% {
            -webkit-transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        29.93% {
            -webkit-transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        35.54% {
            -webkit-transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        36.64% {
            -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        41.04% {
            -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        44.04% {
            -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        51.45% {
            -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        52.15% {
            -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        58.86% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        63.26% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        66.27% {
            -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        73.77% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        81.18% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        85.49% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        88.59% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        96% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        100% {
            -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
    }
</style>
