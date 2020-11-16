<template>
    <div>
        <b-container fluid id="root">
            <b-row>
                <b-col xs=12 sm=6>
                <h1 style='display:flex;justify-content:center'> ABOUT US </h1>
            <p style = 'padding: 10px; padding-right: 30px; font-size: 14px'> 
                Due to lockdown practices, social distancing and restrictions on gathering for COVID-19, 
                jobs were lost and some people lost their income. Residents from low income neighbourhood 
                suffer the most from the impact of the pandemic. However, although there is help reached 
                out to them, such assistance was very limited. During the pandemic, many community service 
                initiatives have been put on hold, either suspended or cancelled when the need for help is 
                greater than ever. Instead of working from home, the pandemic brings even more challenges 
                to the low-income community as they risk losing their jobs, making it even harder for the 
                underprivileged households to survive. <br><br>

                Therefore, iHelp wants to lay a helping hand as well. iHelp is a platform that matches 
                help-seekers with help-providers. Join us today as a volunteer,  or a needy household. 
                Voice out your need here, and we are the bridge that connects kind souls in Singapore. <br><br>
            </p>
                </b-col>
       
      <b-col xs=12 sm=6>
            <img  src = '../assets/Home page pic.jpg' alt = 'iHelp Home'></b-col>
            </b-row>
             <b-row id="router-link"><router-link to="/join_us" exact> <custbtn> </custbtn> </router-link> </b-row>
        </b-container>
   </div>    
</template>

<script>
import CustomButton from './JoiniHelpButton.vue'
export default {
  //Registering component Locally
  components:{
    'custbtn':CustomButton,
  },
}
</script>

<style scoped>
    #root {
        width: 80%;
        margin-top:5%;
        height: 100%;
    }
    img {
        object-fit: cover;
        height: 300px;
        width: 400px;
    }

    #router-link {
        display:flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
    }

</style>