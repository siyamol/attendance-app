<!-- <template>
 
  <div class="home-container">
    <div class="text-wrapper">
    <h1 class="title">Student Attendance System Using QR Code</h1>
    
  </div>
  
  
  </div>
  <div>
    <v-img :src="'data:image/png;base64,'+ Qr" class="mt-5 img" ></v-img>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      intervalId: null
    }
  },
  computed: {
    ...mapGetters(['getQr','getQrStatus']),
    Qr(){
      return this.getQr;
    },
    status(){
      return this.getQrStatus;
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
    // async nextCall(){
    //   try {
    //     if(this.status.status == 1){
    //       this.genrateQr();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async fetchStatus(){
      try {
        await this.$store.dispatch('fetchStatus');
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted(){
    this.genrateQr();
    console.log("hxhs",this.Qr)
    this.fetchStatus();
    this.intervalId = setInterval(this.fetchStatus,1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  // watch: {
  //   status(newValue, oldValue) {
  //     if (newValue !== oldValue) {
  //       this.genrateQr();
  //     }
  //   }
  // },
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
  /* background-color:#d9cdf6; */
  /* background-color:#d9cdf6; */
  background-color:rgb(194, 235, 243);
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
</style>-->
<template>
  <div class="home-container">
    <div class="text-wrapper">
      <h1 class="title">Student Attendance System Using QR Code</h1>
    </div>
  </div>

  <div>
    <v-img v-if="Qr" :src="'data:image/png;base64,' + Qr" class="mt-5 img"></v-img>
    <p v-else>Generating QR Code...</p>
  </div>
</template>

<script>
import { onMounted, onUnmounted, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let intervalId = null;

    const Qr = computed(() => store.getters.getQr);
    const status = computed(() => store.getters.getQrStatus);

    const generateQr = async () => {
      try {
        console.log("Generating QR...");
        await store.dispatch("generateQr");
      } catch (error) {
        console.error("Error generating QR:", error);
      }
    };

    const fetchStatus = async () => {
      try {
        console.log("Fetching status...");
        await store.dispatch("fetchStatus");
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    // Watch for status changes and generate QR if status becomes 1
    watch(status, (newStatus, oldStatus) => {
      if (newStatus.status === 1 && oldStatus.status !== 1) {
        generateQr();
      }
    });

    onMounted(() => {
      generateQr(); // Initial QR generation
      fetchStatus(); // Fetch status immediately
      intervalId = setInterval(fetchStatus, 5000); // Fetch status every 5 seconds
    });

    onUnmounted(() => {
      clearInterval(intervalId); // Stop polling when component unmounts
    });

    return { Qr, status, generateQr, fetchStatus };
  },
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
  background-color: rgb(194, 235, 243);
}

.title {
  margin-top: 1px; /* Adjust this to move the heading down */
}

.img {
  width: 450px;
  height: 450px;
  left: 460px;
}
</style>
