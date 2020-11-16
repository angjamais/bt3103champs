<template>
    <div>
        <b-form @reset="onReset" style=" margin-top: 25px;">
            <b-form-group label="Full Name:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.name" type="text" required placeholder="Enter Full Name" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Email:" id="input-group" description="*We'll never share your email with anyone else.">
                <b-col>
                    <b-col><b-form-input id="input-1" @change="changeStatus()" v-model="acc.username" type="email" required placeholder="Enter Email" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Contact:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.contact" type="text" required placeholder="Enter Valid Contact" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group id="input-group" label="Gender:" label-for="input-3">
                <b-form-select id="input-3"
                               v-model="acc.gender"
                               :options="genders"
                               required></b-form-select>
            </b-form-group>

            <b-form-group label="Date of Birth:" id="input-group">
                <b-col>
                    <b-col><b-form-datepicker id="input-1" v-model="acc.dob" type="text" required></b-form-datepicker></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Address:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.address" type="text" required placeholder="Enter Valid Address" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Password:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.password" type="password" required placeholder="Password" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Confirm Password:" id="input-group">
                <b-col>
                    <b-col><b-form-input @change="changeStatus()" id="input-1" v-model="acc.confirmpassword" type="password" required placeholder="Confirm Your Password" /></b-col>
                    <p style="color:red;font-size:3px;" v-show="this.pwMatch">*passwords do not match</p>
                </b-col>
            </b-form-group>
            <div id="emergency">
                <b-form-group label="Emergency Contact:" id="input-group">
                    <b-col>
                        <b-col><b-form-input id="input-1" v-model="acc.emergency_contact" type="text" required /></b-col>
                    </b-col>
                </b-form-group>

                <b-form-group label="Emergency Contact Name:" id="input-group">
                    <b-col>
                        <b-col><b-form-input id="input-1" v-model="acc.emergency_contact_name" type="text" /></b-col>
                    </b-col>
                </b-form-group>
                <b-form-group label="Relationship:" id="input-group">
                    <b-col>
                        <b-col><b-form-input id="input-1" v-model="acc.emergency_contact_relationship" type="text" /></b-col>
                    </b-col>
                </b-form-group>
            </div>

            <b-form-group id="input-group" label="Occupation:" label-for="input-3">
                <b-form-select id="input-3"
                               v-model="acc.occupation"
                               :options="occupations"
                               required></b-form-select>
            </b-form-group>

            <b-form-group label="Profile Picture" label-for="form-image" description="Upload a picture of yourself" style="margin-top:10px;">
                <b-input-group>
                    <input type="file" @change="onFileSelected">
                </b-input-group>
            </b-form-group>

            <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                    <b-form-checkbox value="me">Subscribe to our newsletters</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-button :disabled="subPermit" variant="primary" v-on:click="addAccount()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import { sha256 } from 'js-sha256';
    import database from '../firebase.js'
    import axios from 'axios'
    import { BFormGroup, BButton, BForm, BFormCheckbox, BFormCheckboxGroup, BFormSelect, BFormInput } from "bootstrap-vue";
    export default {
        data() {
            return {
                pwMatch: false,
                subPermit:false,
                acc: {
                    username: '',
                    password: '',
                    confirmpassword:'',
                    occupation: null,
                    emergency_contact_relationship: '',
                    emergency_contact_name: '',
                    emergency_contact: '',
                    name: '',
                    gender: null,
                    dob:'',
                    contact: '',
                    address: '', 
                },
                occupations: ["Student", "Working Adult", "Retired"],
                genders: [ "Male", "Female"],
                selectedFile: null,
                profile_pic_url: "",


            }
        },
        components: {
            'b-form-group': BFormGroup,
            'b-form-checkbox-group': BFormCheckboxGroup,
            'b-form-checkbox': BFormCheckbox,
            'b-form-input': BFormInput,
            'b-button': BButton,
            'b-form-select': BFormSelect,
            'b-form': BForm,
        },
        methods: {
            onFileSelected(event) {
                console.log(event)
                this.selectedFile = event.target.files[0]
            },
            async onUpload() {
                alert("Uploading")
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.acc.username)
                await axios.post('https://us-central1-bt3103-e1798.cloudfunctions.net/uploadFile', fd).then((res) => {
                    this.profile_pic_url = res.data.url;
                })

            },
            addAccount() {
                if (this.acc.password === this.acc.confirmpassword && this.acc.confirmpassword) {
                    database.collection('accounts').doc(this.acc.username).get().then(async (doc) => {
                        if (!doc.data()) {
                            //Upload profile image and get url
                            await this.onUpload()
                            var account = {
                                username: this.acc.username,
                                password: sha256(this.acc.password),
                                occupation: this.acc.occupation,
                                emergency_contact_relationship: this.acc.emergency_contact_relationship,
                                emergency_contact_name: this.acc.emergency_contact_name,
                                emergency_contact: this.acc.emergency_contact,
                                name: this.acc.name,
                                contact: this.acc.contact,
                                address: this.acc.address,
                                gender: this.acc.gender,
                                dob: this.acc.dob,
                                events: [],
                                my_events: [],
                                profile_pic_url: this.profile_pic_url,
                            }
                            await database.collection('accounts').doc(this.acc.username).set(account)
                            alert('Registration Successful!')
                            localStorage.setItem("username", this.acc.username);
                            this.$router.push({ path: '/personal' });
                            location.reload();
                            this.acc = {
                                username: '',
                                password: '',
                                confirmpassword: '',
                                occupation: null,
                                emergency_contact_relationship: '',
                                emergency_contact_name: '',
                                emergency_contact: '',
                                name: '',
                                contact: '',
                                address: '',
                                gender: '',
                                dob: '',
                                my_events: [],
                                events:[],
                                }
                   

                        } else {
                            alert("Username already taken")
                        }
                    })
                    
                } else {
                    alert("Password entries are different. Please check")
                } 
            },
            changeStatus() {
                if (this.acc.password !== this.acc.confirmpassword) {
                    this.pwMatch = true;
                } else {
                    this.pwMatch = false;
                }
                if (this.acc.username !== "") {
                    this.subPermit = false;
                }

            }
            
        }
    }
</script>

<style>
    .form-group {
        margin-left: 33%;
        margin-right: 33%;
    }

    #input-group {
        justify-content: center;
       
    }

    #input-1{
        width:100%;
    }

    label{
        font-size:15px;
    }

    #emergency{
        display:flex;
        flex-direction:column;
    }
</style>