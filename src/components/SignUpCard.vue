<template>
    <div>
        <b-col>
          <b-card
            :title="name" 
            :sub-title="text"
            :img-src="image"
            img-alt="Job-Info"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text></b-card-text>
          </b-card>
        </b-col>
    </div>
</template>

<script>
    export default {
        props: ['name','text','image']
    }
</script>

<style lang="scss" scoped>

</style>