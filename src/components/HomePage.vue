<template>
 
  <div class="home-container">
    <div class="text-wrapper">
    <h1 class="title">Student Attendance System Using QR Code</h1>
    
  </div>
  
  
  </div>
  <div>
    <v-img :src="'data:image/png;base64,'+ Qr" class="mt-5 img" ></v-img>
  </div>
</template>
<!--   -->

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['getQr']),
    Qr(){
      return this.getQr;
    }

  },
  methods: {
    async genrateQr(){
      try{
         await this.$store.dispatch('generateQr') 
        // if(res) {
        //   this.genrateQr();
        // }
      }catch (error) {
          console.error(error);
      } 
    },
  },
  mounted(){
    this.genrateQr();
    console.log("hxhs",this.Qr)
  }
};

</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh; /* Takes full viewport height */
  text-align: center;
  color: rgb(62, 62, 120);
  background-color: rgb(120, 206, 223);
}

.title {
  margin-top: 1px; /* Adjust this to move the heading down */
}
.img{
  width: 450px;
  height: 450px;
  /* top:330px;
  right: 400px; */
  left: 460px;
}
</style>
