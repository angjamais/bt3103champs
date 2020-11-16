<template>
 <b-container fluid>
            <b-row id="content">
            <h1 id="title">Join iHelp today</h1>
            <p> 
            iHelp is the perfect platform for underprivileged families to seek help from the society. 
            <br> Meanwhile, iHelp also provides opportunities for volunteers to disseminate kindness. 
            <br> You can join iHelp as a needy household or a volunteer. <br> 
                    </p>
            </b-row>
            <b-row id="bg1">
                <b-col cols=6 id="img1">
                </b-col>
           <b-col cols=6 id="details"> 
            <h3> Join us! </h3>
            <p>
                Seek help on iHelp from our warm-hearted volunteer users.<br/>
                Hesitate no more to voice out your needs. <br/>Post your needs
                and iHelp will automatically match available volunteers
                who wish to sign up.
            </p>
              <router-link id="router-link" to="/register_account" exact> <reg></reg> </router-link></b-col>
            </b-row>
            <b-row id="bg2">
                <b-col cols=6 id="details">
                       <h3>Or</h3>
            <p>
                Sign up today for volunteer
                opportunities. <br/> We dearly appreciate your kindness. Your time and effort mean a lot
                to our beneficiaries. <br><br>
            </p>
            <router-link id="router-link" to="/register_account" exact> <reg></reg> </router-link></b-col>
                     <b-col cols=6 id="img2">
                     </b-col>
            </b-row>
 </b-container>
</template>

<script>
import registerbtn from './RegisterButton.vue'
export default {
    components: {
        'reg': registerbtn
    }
}
</script>

<style scoped>
    #title {
        display: flex;
        justify-content: center;
    }
    #content {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 50px;
        height: 450px;
    }
    #content2 {
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
    #img1 {
        display: flex;
        background-size: cover;
        background-image: url("../assets/household.jpg");
        height: 450px;
    }
    #img2 {
        display: flex;
        background-size: cover;
        background-image: url("../assets/volunteer2.jpg");
        height: 450px;
    }
    p {
        text-align: center;
        line-height: 1.5
    }
    h1{
        font-size: 50px;
        font-weight: 800;
        padding-bottom: 30px;
    }
    h3 {
        color: rgb(240, 94, 26);
        font-size: 30px
    }
    #details {
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    #bg1 {
        background-color:snow;
    }
    #bg2 {
        background-color:wheat;
    }
</style>