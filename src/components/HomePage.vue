<!-- <template>
  <div class="home-container">
    <div class="text-wrapper">
      <h1 class="title">Student Attendance System Using QR Code</h1>
    </div>
  </div>

  <div>
    <v-img v-if="Qr" :src="'data:image/png;base64,' + Qr" class="mt-5 img"></v-img>
    <p v-else-if="isLoading">Generating QR Code...</p>
    <p v-else>Failed to generate QR Code. Please try again.</p>
  </div>
</template>

<script>
import { onMounted, onUnmounted, computed, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    let intervalId = null;

    // Computed properties
    const Qr = computed(() => store.getters.getQr);
    const status = computed(() => store.getters.getQrStatus);
    const flagValue = computed(() => store.getters.getFlagValue);

    // Generate QR code
    const generateQr = async () => {
      try {
        isLoading.value = true;
        console.log("Generating QR...");
        await store.dispatch("generateQr");
      } catch (error) {
        console.error("Error generating QR:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Fetch status
    const fetchStatus = async () => {
      try {
        console.log("Fetching status...");
        await store.dispatch("fetchStatus");
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    // Watch for flagValue changes
    watch(flagValue, (newFlagValue, oldFlagValue) => {
      if (newFlagValue !== oldFlagValue) {
        generateQr();
      }
    });

    // Watch for status changes
    watch(status, (newStatus, oldStatus) => {
      if (newStatus.status === 1 && oldStatus.status !== 1) {
        generateQr();
      }
    });

    // Lifecycle hooks
    onMounted(() => {
      generateQr(); // Initial QR generation
      fetchStatus(); // Fetch status immediately
      intervalId = setInterval(fetchStatus, 5000); 
    });

    onUnmounted(() => {
      clearInterval(intervalId); 
    });

    return { Qr, isLoading, generateQr, fetchStatus };
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
  margin-top: 1px;
}

.img {
  width: 450px;
  height: 450px;
  left: 460px;
}
</style> -->

<template>
  <div class="home-container">
    <div class="text-wrapper">
      <h1 class="title">Student Attendance System Using QR Code</h1>
    </div>
  </div>

  <div>
    <v-img :src="'data:image/png;base64,'+ Qr" class="mt-5 img"></v-img>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      intervalId: null,
      previousStatus: null // Store the previous status value
    };
  },
  computed: {
    ...mapGetters(['getQr', 'getQrStatus']),
    Qr() {
      return this.getQr;
    },
    status() {
      return this.getQrStatus;
    }
  },
  methods: {
    async generateQr() {
      try {
        await this.$store.dispatch('generateQr');
      } catch (error) {
        console.error(error);
      }
    },
    async fetchStatus() {
      try {
        await this.$store.dispatch('fetchStatus');
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    status(newStatus) {
      if (this.previousStatus !== null && newStatus.status !== this.previousStatus) {
        // Call generateQr() only when it switches between 0 and 1
        this.generateQr();
      }
      this.previousStatus = newStatus.status; // Update previous status
    }
  },
  mounted() {
    this.generateQr();
    this.fetchStatus();
    this.intervalId = setInterval(this.fetchStatus, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
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
</style>


