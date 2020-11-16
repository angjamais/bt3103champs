<template>
    <div id="main">
        <br>
        <br>
    <h1> Locate us </h1>
        <GMap :lat=1.297104 :lng=103.777548 id="left" alt='iHelp Location'></GMap>
        <div id='right'>
            <div class='container'>
                <p style='font-size: 10px; color: grey'>
                    Phone: +65 8728 1234<br>
                    National University of Singapore <br>
                    21 Lower Kent Ridge Rd, Singapore 119077 <br>
                    Email: contact@ihelp.com <br>
                    Have questions or suggestions?
                </p>
                <form>
                    <label for="name" style='font-size: 12px; align: left'> Enter your name: </label> <br>
                    <input type="text" id='name'> <br>
                    <label for="email" style='font-size: 12px; text-align: left'> Enter your e-mail*: </label> <br>
                    <input type="email" id='email'> <br>
                    <label for="subject" style='font-size: 12px; text-align: left'> Enter your subject: </label> <br>
                    <input type="text" id='subject'> <br>
                    <label for="msg" style='font-size: 12px; text-align: left'> Enter your message: </label> <br>
                    <textarea name="msg" rows="6" cols="40"></textarea> <br>
                    <input type="submit" value="Submit">

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "./Map.vue"
export default {
        components: {
            "GMap": Map
        },
}
</script>

<style scoped>
    #main {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        height: 600px;
    }

    #left {
        width: 30%;
        text-align: justify;
        position:inherit;
        margin-top: 50px;
        }
    #right {    
        width: 30%;
        height: 300px;
        margin-left:-20px;
        margin-top:-5px;
    }
    p {
        text-align: left;
        padding-left: 30px
    }
    h1 {
        text-align: left;
        font-size: 30px;
        
    }
    .container {
        width: 300px;
        padding-left: 30px;

    }
    .container input {
        width: 100%;

    }
</style>