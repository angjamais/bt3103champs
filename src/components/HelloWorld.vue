<template>
    <v-container>
        <v-layout row>
            <v-flex class="text-center font-weight-black">
                <h1>Upload a photo</h1>
            </v-flex>
        </v-layout>


        <v-layout row>
            <v-flex md6 offset-sm3>
                <div>
                    <div>
                        <input type="file" @change="onFileSelected">
                    </div>

                    <div v-if="imageData!=null">
                        <img class="preview" height="268" width="356" :src="img1">
                        <br>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="text-center">
                <v-btn color="pink" @click="onUpload">upload</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    //import database from '../firebase.js'
    import axios from 'axios'

    export default {
        data() {
            return {
                selectedFile: null,
            }
        },
        methods: {
            onFileSelected(event) {
                console.log(event)
                this.selectedFile =  event.target.files[0]
            },

            onUpload() {
                alert("Uploading")
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name)
                axios.post('http://localhost:5000/bt3103-e1798/us-central1/uploadFile', fd).then((res) => {
                    console.log(res.data.url)
                })

            }
        }
    }
</script>
