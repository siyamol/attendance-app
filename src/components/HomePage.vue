<template>
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
      intervalId = setInterval(fetchStatus, 5000); // Fetch status every 5 seconds
    });

    onUnmounted(() => {
      clearInterval(intervalId); // Stop polling when component unmounts
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
  margin-top: 1px; /* Adjust this to move the heading down */
}

.img {
  width: 450px;
  height: 450px;
  left: 460px;
}
</style>