<template>
    <div style="width:400px; height:400px; margin-left:500px;">
        <GMap :lat=1.296595 :lng=103.776365></GMap>
    </div>
</template>

<script>
    import Map from "./Map.vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
        },
  components: {
        "GMap": Map
        },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
