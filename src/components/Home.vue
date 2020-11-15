<template>
    <div>
        <br>
        <br>
        <div id='left'>
            <h1 style = 'padding: 10px'> ABOUT US </h1>
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
            <br>
        </div>
        <img id = 'right' src = '../assets/Home page pic.jpg' alt = 'iHelp Home'>
        <br>
        <p style='color: white'>     linebreak     </p>
        <router-link id="router-link" to="/join_us" exact> <custbtn> </custbtn> </router-link> 
        <br><br>
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
    #left {
        float: left;
        width: 30%;
        text-align: justify;
        height: 400px;
        margin-left:20%;
    }
    #right {
        float: right;
        width: 30%;
        height: 400px;
        margin-right:20%;
    }
    img {
        object-fit: cover;
        height: 300px
    }

</style>