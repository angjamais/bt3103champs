<template>
    <b-container fluid id="root">
        <b-form @reset="onReset">
            <b-row>
            <b-col cols=6>
                 <b-form-group label="Full Name:">
               <b-form-input v-model="acc.name" type="text" required placeholder="Enter Full Name" />
            </b-form-group>

            <b-form-group  label="Gender:" label-for="input-3">
                <b-form-select id="input-3"
                               v-model="acc.gender"
                               :options="genders"
                               required></b-form-select>
            </b-form-group>

            <b-form-group label="Email:" description="*We'll never share your email with anyone else.">
                <b-form-input @change="changeStatus()" v-model="acc.username" type="email" required placeholder="Enter Email" />
           
            </b-form-group>
            </b-col>
            <b-col cols=6>
                 <b-form-group label="Contact:">
                <b-form-input v-model="acc.contact" type="text" required placeholder="Enter Valid Contact" />
            </b-form-group>
             <b-form-group label="Address:">
                 <b-form-input v-model="acc.address" type="text" required placeholder="Enter Valid Address" />
                
            </b-form-group>
  <b-form-group id="input-group" label="Occupation:" label-for="input-3">
                <b-form-select id="input-3"
                               v-model="acc.occupation"
                               :options="occupations"
                               required></b-form-select>
            </b-form-group>
            </b-col>   
           
            </b-row>
             <b-row>
            <b-col cols=6>
            </b-col>
            <b-col cols=6>
            </b-col>
             </b-row>
                <b-row>
               <b-col cols=6>
                        <b-form-group label="Password:" id="input-group">
                <b-form-input id="input-1" v-model="acc.password" type="password" required placeholder="Password" />
             
            </b-form-group>
               </b-col>
            <b-col cols=6>
            <b-form-group label="Confirm Password:" id="input-group">
                
                    <b-form-input @change="changeStatus()" id="input-1" v-model="acc.confirmpassword" type="password" required placeholder="Confirm Your Password" />
                    <p style="color:red;font-size:3px;" v-show="this.pwMatch">*passwords do not match</p>
                
            </b-form-group></b-col></b-row>
            <b-row>
                <b-col cols=6>
                <b-form-group label="Emergency Contact:" id="input-group">
                    <b-form-input id="input-1" v-model="acc.emergency_contact" type="text" required />
                </b-form-group>

                <b-form-group label="Emergency Contact Name:" id="input-group">
                    <b-form-input id="input-1" v-model="acc.emergency_contact_name" type="text" />
                </b-form-group>
                </b-col><b-col cols=6>
                <b-form-group label="Relationship:" id="input-group">
                    <b-form-input id="input-1" v-model="acc.emergency_contact_relationship" type="text" />
                </b-form-group>
                 <b-form-group label="Date of Birth:" id="input-group">
                <b-form-datepicker id="input-1" v-model="acc.dob" type="text" required></b-form-datepicker>
            </b-form-group>
          
                </b-col></b-row>
                  <div style="display:flex; justify-content:center">
            <b-form-group label="Profile Picture" label-for="form-image" description="Upload a picture of yourself" style="margin:auto">
             
                    <b-input-group>
                    <input type="file" @change="onFileSelected">
                </b-input-group>
            </b-form-group></div>
            <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                    <b-form-checkbox value="me">Subscribe to our newsletters</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-button :disabled="subPermit" variant="primary" v-on:click="addAccount()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </b-container>
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
    #root {
        margin-top: 5%;
        margin-bottom: 5%;
        /*padding-left: 10%;
        padding-right: 10%;*/
    }
    .template{
        padding: 10px;
    }

    label{
        font-size:18px;
    }

    #emergency{
        display:flex;
        flex-direction:column;
    }
</style>