<template>
    <div>
        <b-form @submit="addAccount" @reset="onReset" style=" margin-top: 25px;">
            <b-form-group label="Full Name:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.name" type="text" required placeholder="Enter Full Name" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Email:" id="input-group" description="*We'll never share your email with anyone else.">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.username" type="email" required placeholder="Enter Email" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Contact:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.contact" type="text" required placeholder="Enter Valid Contact" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Address:" id="input-group">
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.address" type="text" required placeholder="Enter Valid Address" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Password:" id="input-group" >
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.password" type="password" required placeholder="Password" /></b-col>
                </b-col>
            </b-form-group>

            <b-form-group label="Confirm Password:" id="input-group" >
                <b-col>
                    <b-col><b-form-input id="input-1" v-model="acc.confirmpassword" type="password" required placeholder="Confirm Your Password" /></b-col>
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
                        <b-col><b-form-input id="input-1" v-model="acc.emergency_contact_name" type="text"/></b-col>
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
                               :options ="occupations"
                               required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                    <b-form-checkbox value="me">Subscribe to our newsletters</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import database from '../firebase.js'
    import { BFormGroup, BButton, BForm, BFormCheckbox, BFormCheckboxGroup, BFormSelect, BFormInput } from "bootstrap-vue";
    export default {
        data() {
            return {
                acc: {
                    username: '',
                    password: '',
                    confirmpassword:'',
                    occupation: null,
                    emergency_contact_relationship: '',
                    emergency_contact_name: '',
                    emergency_contact: '',
                    name: '',
                    contact: '',
                    address: '', 
                },
                occupations: [{ text: 'Select One', value: null },"Student", "Working Adult", "Retired"]


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
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.acc))
            },
            addAccount() {
                database.collection('accounts').add(this.acc)
                alert('Registration Successful!')
                this.username = '';
                this.password = '';
                this.confirmpassword = '';
                this.occupation = null;
                this.emergency_contact_relationship = '';
                this.emergency_contact_name = '';
                this.emergency_contact = '';
                this.name = '';
                this.contact = '';
                this.address = '';
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