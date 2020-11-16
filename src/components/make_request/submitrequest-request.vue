<template>
    <b-container fluid id="root">
        <b-form @submit.prevent="onSubmit">
            <h1>Fill in your event details here</h1>
            <b-row>
                <b-col cols=6>
            <label>Event Title: </label>
            <b-form-input v-model="rqst.title" id="input-1" type="text" required placeholder="Title for your event" />
             <label>Location: </label>
            <b-form-input id="input-1" type="text" v-model="rqst.location" required placeholder="Location" />
                </b-col>
                <b-col cols=6>
            <label>Description: </label>
            <BFormTextarea id="textarea" v-model="rqst.description" placeholder="Enter Event Description" row="3" max-row="6"></BFormTextarea>
                </b-col>
            </b-row>
            <b-row style="margin-top: 20px">
                <b-col cols=6>
                    <b-form-group label="Recruiting Limit:" description="*We limit participants of each event to be 5(including organiser) for safe distancing concerns">
                <b-form-select id="input-3" v-model="rqst.event_limit" :options="recruitment" required></b-form-select>
            </b-form-group>
                </b-col>
                <b-col cols=6>
            <b-form-group label="Image Upload" label-for="form-image" description="*Image of the event can increase the chance of getting helpers" style="margin-top:10px;">
                <b-input-group>
                    <input type="file" @change="onFileSelected">
                </b-input-group>
            </b-form-group></b-col>
            </b-row>
            <b-form-group label="Event Date and Time:">
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col><b-form-datepicker v-model="rqst.date"></b-form-datepicker></b-col>
                        <b-col><b-form-timepicker v-model="rqst.time" style="margin-top:10px;"></b-form-timepicker></b-col>
                    </b-row>
                </b-container>
            </b-form-group>

            <b-form-group description="Please check this box if your event requires money">
                <b-form-checkbox v-model="rqst.cash" value="true" unchecked-value="false">Monetary Event</b-form-checkbox>
            </b-form-group>

            <h1>Fill in your particulars here</h1>
            <b-row>
                <b-col cols=6>
            <label>Organiser Name: </label>
            <b-form-input v-model="rqst.organiser" id="input-1" type="text" required /></b-col>
            <b-col cols=6>
            <label>Contact: </label>
            <b-form-input v-model="rqst.contact" required />
            </b-col>
            </b-row>
            <div class="d-flex justify-content-center">
                <b-button style="margin-top:20px" region-fragment="submit" type="submit" :disabled="busy">Submit</b-button>
            </div>

            <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
                <template #overlay>
                    <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
                        <img style="width:60px" src="../../assets/cloud-computing.png" font-scale="4" />
                        <div class="mb-3">Creating event...</div>
                        <b-progress min="1"
                                    max="10"
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
                        <p><strong id="form-confirm-label">Click yes to create event</strong></p>
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
    </b-container>
</template>

<script>
    //import { sha256 } from 'js-sha256';
    import database from '../../firebase.js'
    import { BFormTextarea } from "bootstrap-vue";
    import axios from 'axios'

    export default {
        data() {
            return {
                busy: false,
                processing: false,
                counter: 1,
                interval: null,
                rqst: {
                    title: "",
                    description:"",
                    location: "",
                    organiser: "",
                    organiser_email:"",
                    date: "",
                    time: "",
                    contact: "",
                    event_limit: null,
                    event_type: "request",
                    event_image: [],
                    event_cash: false,
                    event_status: true,
                    event_participants : [],
                    benefitiary: '',
                    event_pic: '',
                },
                recruitment: [{ text: 'Select One', value: null }, 1, 2, 3, 4],
                selectedFile: null,
            }
        },
        beforeDestroy() {
            this.clearInterval()
        },
        methods: {
            onFileSelected(event) {
                console.log(event)
                this.selectedFile = event.target.files[0]
            },
            async onUpload(eventID) {
                const fd = new FormData();
                fd.append('image', this.selectedFile, eventID)
                await axios.post('https://us-central1-bt3103-e1798.cloudfunctions.net/uploadFile', fd).then((res) => {
                    this.rqst.event_pic = res.data.url;
                })

            },
            clearInterval() {
                if (this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }
            },
            onSubmit() {
                this.busy = true
            },
            onCancel() {
                this.busy = false
            },
            onShown() {
                this.$refs.dialog.focus()
            },
            onHidden() {
                this.$refs.submit.focus()
            },
            async onOK() {
                this.counter = 1
                this.processing = true
                // Act a bit
                this.clearInterval()
                var username = localStorage.getItem("username")
                this.rqst.organiser_email = username;
                var d = new Date();
                await this.onUpload(this.organiser_email + d)
                database.collection('events').add(this.rqst).then((doc) => {
                    var id = doc.id;
                    database.collection("accounts").doc(username).get().then(doc => {
                        var my_events = doc.data().my_events;
                        my_events.push(id);
                        database.collection("accounts").doc(username).set({ my_events: my_events }, { merge: true })
                    })

                })
                this.interval = setInterval(() => {
                    if (this.counter < 13) {
                        this.counter = this.counter + 1
                    } else {
                        this.clearInterval()
                        this.$nextTick(() => {
                            this.busy = this.processing = false
                        })
                        alert("Event created!")
                        location.reload();
                    }
                }, 250)
            }
        },
        components: {
            "BFormTextarea": BFormTextarea,
        },
    }
</script>

<style scoped>
    #root {
        margin-top: 5%;
        width: 80%;
        margin-bottom: 5%
    }
    .template{
        padding: 10px;
    }
    h3 {
        font-weight: bold;
    }
    #processing {
        background-color: red;
    }
</style>