<template>
    <div class="template">
        <b-form @submit.prevent="onSubmit">
            <h1>Donation</h1>

            <label>Benefitiary Name: </label>
            <b-form-input v-model="rqst.benefitiary" id="input-1" type="text" required />

            <label>Summary: </label>
            <b-form-input v-model="rqst.title" id="input-1" type="text" required placeholder="Title for your event" />

            <label>Description: </label>
            <BFormTextarea id="textarea" v-model="rqst.description" placeholder="Enter Event Description" row="3" max-row="6"></BFormTextarea>

            <label>Bank account/Paynow/Paylah: </label>
            <BFormTextarea id="textarea" v-model="rqst.acc_info" placeholder="Please note down the reference number when you transfer" row="2" max-row="6"></BFormTextarea>

            <b-form-group label="Image" label-for="form-image" description="*Image of the event can increase the chance of getting helpers" style="margin-top:10px;">
                <b-input-group>
                    <b-input-group-prepend is-text>
                        <b-icon icon="image-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-file id="form-image" accept="image/*"></b-form-file>
                </b-input-group>
            </b-form-group>

            <h1>Fill in the particulars of the recipient</h1>

            <label>Initiater name: </label>
            <b-form-input v-model="rqst.organiser" id="input-1" type="text" required />

            <label>Initiater Contact: </label>
            <b-form-input v-model="rqst.contact" required />

            <div class="d-flex justify-content-center">
                <b-button style="margin-top:10px" region-fragment="submit" type="submit" :disabled="busy">Submit</b-button>
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
    //import { sha256 } from 'js-sha256';
    import database from '../../firebase.js'
    import { BFormTextarea } from "bootstrap-vue";

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
                    organiser_email: "",
                    date: "",
                    time: "",
                    contact: "",
                    event_limit: null,
                    event_type: "donate",
                    event_image: [],
                    event_cash: false,
                    event_status: true,
                    event_participants: [],
                    benefitiary: '',
                    acc_info:'',
                },
                recruitment: [{ text: 'Select One', value: null }, 1, 2, 3, 4]
            }
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
            onOK() {
                this.counter = 1
                this.processing = true
                // Act a bit
                this.clearInterval()
                var username = localStorage.getItem("username")
                this.organiser_email = username;
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
    .form-group {
    }

    .template{
        justify-content:center;
    }

    h3 {
        font-weight: bold;
    }
    #processing {
        background-color: red;
    }
</style>