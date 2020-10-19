<template>
    <div id='body'>
        <h1 style='text-align: center'> Join iHelp today! </h1>
        <p> 
            iHelp is the perfect platform for underprivileged families to seek help from the society. 
            <br> Meanwhile, iHelp also provides opportunities for volunteers to disseminate kindness. 
            <br> You can join iHelp as a needy household or a volunteer. <br> 
        </p>
        <br>
        <div id='left'>
            <br>
            <img src = '../assets/household.jpg' alt = 'Household'>
            <h3> HOUSEHOLD </h3>
            <p style = 'font-size: 10px; padding-left: 15px; padding-right: 15px'> 
                Seek help on iHelp from our warm-hearted volunteer users. 
                Hesitate no more to voice out your needs. Post your needs 
                and iHelp will automatically match available volunteers 
                who wish to sign up.<br><br>
            </p>
            <router-link id="router-link" to="/registerhousehold" exact> <reg></reg> </router-link>
        </div>
        <div id='right'>
            <br>
            <img src = '../assets/volunteer2.jpg' alt = 'Volunteer'>
            <h3> VOLUNTEER </h3>
            <p style = 'font-size: 10px; padding-left: 15px; padding-right: 15px'> 
                You are our absolutely heroes and most precious asset. Sign up today for volunteer 
                opportunities. We dearly appreciate your kindness. Your time and effort mean a lot 
                to our beneficiaries. <br><br>
            </p>
            <router-link id="router-link" to="/registervolunteer" exact> <reg></reg> </router-link>
            
        </div>
    </div>
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
    #body {
        margin-left: 20%;
        margin-right: 20%;
    }
    #left {
        float: left;
        width: 30%;
        height: 400px;
        margin-left:20%;
        box-shadow: 5px 5px 5px #888888
    }
    #right {
        float: right;
        width: 30%;
        height: 400px;
        margin-right:20%;
        box-shadow: 5px 5px 5px #888888
    }
    img {
        object-fit: cover;
        height: 120px;
        width: 150px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    p {
        text-align: center;
        line-height: 1.5
    }
    h3 {
        color: rgb(240, 94, 26);
        font-size: 15px
    }
</style>