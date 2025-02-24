<!-- <template>
  <router-view>

  </router-view>
</template>



<script>





export default{
  name:'App'
}
 </script> -->
<template>
  <div>
    <NavBar />
    
    <router-view></router-view>

  </div>
</template>
<script>

import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
   
    },
};
</script>  
