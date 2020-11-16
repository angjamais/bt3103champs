<template>
      <footer>
          <div id="spacing"></div>
          <div id="spacing"></div>
          <p id="words"  v-html="'<br/>' + detail + '<br/>' + copyRtSymbol +title"></p>
          <div id="logo-spacing">
              <a href= "https://twitter.com/official_ihelp">
              <img id="logo" src="../assets/twitter.png" /></a>
              <a href= "https://www.instagram.com/ihelp.official/">
              <img id="logo" src="../assets/instagram.png" /></a>
              <img id="logo" src="../assets/facebook-app-logo.png" />
          </div>
          <div id="spacing"></div>
      </footer>
</template>

<script>

export default {
  
  data(){
        return {
            detail:'Contact iHelp: +65 8728 1234 | contact@ihelp.com',
            copyRtSymbol:'&copy; ',
            title:'iHelp'
        }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer {
        text-align: center;
        font-family: Arial;
        color: black;
        vertical-align: middle;
        display: flex;
        flex-direction: row;
        width:100%;
        background-color:seashell;
    }
    #words {
        text-align: center;
        font-family: Arial;
        color: black;
        flex:60;
        font-size: 15px
    }
    #logo-spacing{
        flex:1;
        display:flex;
        flex-direction:row;
        margin-top: 20px;
    }
    #spacing{
        flex:5;
    }
    #logo{
        width:20px;
        height:20px;
        flex:1;
        margin-right:10px;
    }
</style>