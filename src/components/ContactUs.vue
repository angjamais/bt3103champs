<template>
    <div>
        <div> <h3> CONTACT US </h3> </div>
        <img id='left' src='../assets/sgmap.png' alt = 'iHelp Location'>
        <div id='right'>
            <p style='font-size: 10px; color: grey'>
                Phone: +65 XXXX XXXX <br>
                National University of Singapore <br>
                21 Lower Kent Ridge Rd, Singapore 119077 <br>
                Email: contact@ihelp.com <br>
            </p>
            <p style='font-size: 15px; color: grey'>Have questions or suggestions? <br></p>
            <div class='container'>
            <form>
                <label for="name" style = 'font-size: 12px; align: left'> Enter your name: </label> <br>
                <input type = "text" id = 'name'> <br>
                <label for="email" style = 'font-size: 12px; text-align: left'> Enter your e-mail*: </label> <br>
                <input type = "email" id = 'email'> <br>
                <label for="subject" style = 'font-size: 12px; text-align: left'> Enter your subject: </label> <br>
                <input type = "text" id = 'subject'> <br>
                <label for="msg" style = 'font-size: 12px; text-align: left'> Enter your message: </label> <br>
                <textarea name="msg" rows="7" cols="43"></textarea> <br>
                <input type="submit" value="Submit">
            </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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
    p {
        text-align: left;
        padding-left: 30px
    }
    .container {
        width: 300px;
        padding-left: 30px;
        clear: both;
    }
    .container input {
        width: 100%;
        clear: both;
    }
</style>