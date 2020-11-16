<template>
  <div>
    <Donate />
    <Photo />
  </div>
</template>



<script>
import Photo from '@/components/Photo.vue';
import Donate from '@/components/Donate.vue';

export default {
  name: 'photo',
  components: {
    Donate,
    Photo,
  },
};
</script>