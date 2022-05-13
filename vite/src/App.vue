<template>
  <div >
      <h1> app.vue </h1>
      <h2> count is : {{ count }}</h2>
      <button @click="count += 1">+1</button>
  </div>

</template>

<script>
import {ref} from 'vue'
export default {
   setup(){
    let count = ref(10)

    function add() {
       count.value++
    }

    return {
       count
     }
   },
  
}
</script>

<style>

</style>