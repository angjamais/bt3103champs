<template>
  <div class="footer">
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
    
  </div>
</template>

<script>

export default {
  
  data(){
        return {
            detail:'Contact iHelp: +65 XXXX XXXX | contact@ihelp.com',
            copyRtSymbol:'&copy; ',
            title:'iHelp'
        }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer {
        padding: 5px;
        text-align: center;
        font-family: Arial;
        color: black;
        height: 50px;
        vertical-align: middle;
        display: flex;
        flex-direction: row;
        width:100%;
    }
    #words {
        text-align: center;
        font-family: Arial;
        color: black;
        height: 50px;
        flex:60;
        margin-top:0px;
        font-size: 10px
    }
    #logo-spacing{
        flex:1;
        display:flex;
        flex-direction:row;
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