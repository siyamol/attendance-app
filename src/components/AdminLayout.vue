<template>
  <div class="page-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Admin Menu</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">TodaysAttendance</router-link></li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page-container {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #00796b;
  color: white;
  border-right: 1px solid #ddd;
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #004d40;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
