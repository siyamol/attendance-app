<template>
  <div class="home-container">
    <h1 class="title">Student Attendance System Using QR Code</h1>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh; /* Takes full viewport height */
  text-align: center;
  color: rgb(62, 62, 120);
  background-color: rgb(120, 206, 223);
}

.title {
  margin-top: 1px; /* Adjust this to move the heading down */
}
</style>
