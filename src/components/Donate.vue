<template>
<div id="main">
    <h1> We appreciate your help! </h1>
    <h2>Here are some of our beneficiaries, click on their pictures to find out more</h2>
    <div class="donate">
    <div class="donate-panel"
         v-for="photo in photos"
         :key="photo.id">
        <router-link :to="`/photo/${photo.id}`">
        <img :src="thumbUrl(photo.filename)">
      </router-link></div></div>
      <br>
</div>
</template>

<script>
import photos from '../photos.json';
export default {
  name: 'donate',
  data() {
      return {
          photos,
      };
  },
  props: {
    msg: String, 
    msg2: String
  },
  methods: {
    thumbUrl(filename) {
      return require(`@/components/images/thumbnails/${filename}`);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #main{
        width:100%;
        height: 100%;
    }
  .donate {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 0rem;
    grid-auto-columns: 0rem;
    grid-gap: 0rem;
    max-width: 42rem;
    margin: 1rem auto;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .donate-panel img {
    width: 100%;
    height: 18vw;
    object-fit: contain;
    border-radius: 0rem;
  }
h1 {
    font-weight: heavy;
    margin-bottom: 0;
    margin-top: 2%;
    font-size: 30px;
    text-align: center;
    width: 100%;
}
h2 {
    width: 100%;
    font-weight: normal;
    font-size: 20px;
    margin: 0;
    padding-block-end: 0%;
    text-align: center;

}
a {
  color: #42b983;
}
</style>
