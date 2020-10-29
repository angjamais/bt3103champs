<template>
  <div>
    <header id="panel">
      <div id="spacing"></div>
      <img id="logo" src="../assets/iHelp.png" />
      <h1 id="slogan">iHelp</h1>
      <div id="spacing-middle"></div>
      <b-nav-form id="form">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search"
        ></b-form-input>
        <b-button size="sm" id="search-icon" class="my-2 my-sm-0" type="submit"
          >Search</b-button
        >
      </b-nav-form>
      <router-link to="/inbox" exact
        ><img id="logo-icon" src="../assets/email.png"
      /></router-link>
      <router-link to="/personal" exact
        ><img id="logo-icon" src="../assets/user-profile.png" />
      </router-link>
      <div id="spacing-back"></div>
    </header>
    <nav id="nav">
      <div id="router-link-container"></div>
      <div id="router-link-center" style="padding: 4px">
        <router-link id="router-link" to="/home" exact>HOME</router-link>
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
export default {
  data() {
    return {};
  },
  props: {
    msg: {
      type: String,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panel {
    width:1500px;
  background: rgb(193, 237, 121);
  height: 100px;
  margin-top: -50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
}
#logo {
  height: 100px;
  width: 100px;
  left: 150px;
}

#logo-icon {
  height: 30px;
  width: 30px;
  margin-left: 10px;
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
  width:1500px;
}

#slogan {
  color: white;
  margin-top: 10px;
  font-size: 70px;
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
</style>