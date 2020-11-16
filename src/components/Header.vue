<template>
  <div id="root">
    <header id="panel">
      <div id="spacing"></div>
      <img id="logo" src="../assets/iHelp.png" />
      <h1 id="slogan">iHelp</h1>
      <div id="spacing-middle"></div>
      <router-link to="/personal" exact
        ><img id="logo-icon" src="../assets/user-profile.png" />
      </router-link>
      <b-button id="signout" v-on:click="signOut()">{{this.status}}</b-button>
          <div id="spacing-back"></div>
</header>
    <nav id="nav">
      <div id="router-link-container"></div>
      <div id="router-link-center" style="padding: 4px">
        <router-link id="router-link" to="/home" exact>HOME</router-link>
        <router-link id="router-link" to="/dashboard" exact>DASHBOARD</router-link>
        <router-link id="router-link" to="/join_us" exact>JOIN US</router-link>
        <router-link id="router-link" to="/requests" exact
          >REQUESTS</router-link
        >
        <router-link id="router-link" to="/donate" exact>DONATE</router-link>
        <router-link id="router-link" to="/contact_us" exact
          >CONTACT US</router-link
        >
      </div>
      <div id="router-link-container"></div>
    </nav>
  </div>
</template>

<script>

    import { BButton } from "bootstrap-vue";

    export default {
        components: {
            'b-button': BButton
        },
  data() {
        return {
            status: "Log in",
        };
  },
  props: {
    msg: {
      type: String,
    },
        },
        mounted() {
            var username = localStorage.getItem("username");
            if (username) {
                this.status ="Log out"
            } else {
                this.status = "Log in"
            }
        },
        methods: {
            signOut() {
                var username = localStorage.getItem("username");
                if (username) {
                    localStorage.removeItem("username");
                    this.status = "Log in"
                    this.$router.push({ path: '/login' })
                    location.reload()
                } else {
                    this.$router.push({ path: '/login' })
                    location.reload()
                }
            }
        }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#root {
  margin: 0px;
}
#panel {
  width:100%;
  background: rgb(193, 237, 121);
  height: 100px;
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  margin-top:-60px;
}
#logo {
  height: 90px;
  width: 90px;
  left: 150px;
}

#logo-icon {
  height: 30px;
  width: 30px;
  margin-left: 15px;
  margin-top: 50px;
}
#search-icon {
  height: 30px;
  width: 60px;
  margin-left: 0px;
  margin-top: 50px;
}

#nav {
  background: rgb(252, 248, 192);
  background-image: url("https://wallpaperaccess.com/full/1746747.jpg");
  font-size: 25px;
  display: flex;
  flex-direction: row;
  width:100%;
}

#slogan {
  color: white;
  margin-top: 10px;
  font-size: 65px;
}

#router-link-center {
  position: relative;
  flex: 3;
  text-decoration: none;
  font-size: 25px;
  display: flex;
  flex-direction: row;
}

#form {
  margin-left: 10px;
  margin-top: 50px;
}
#router-link {
  position: relative;
  flex: 1;
  text-decoration: none;
  font-size: 15px;
  color: black;
}

#router-link:hover {
  color: green;
}

#router-link:hovisitedver {
  color: black;
}

#router-link-container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
}

#spacing {
  flex: 5;
}

#spacing-middle {
  flex: 13;
}

#spacing-back {
  flex: 5;
}

#signout {
        background-color: gray;
        color: white;
        margin-top: 50px;
        margin-left: 16px;
        border-color:transparent;
        font-size:14px;
        height: 30px;
        width:80px;
    }
</style>