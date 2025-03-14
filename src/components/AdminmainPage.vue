<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
       <li><router-link to="/filter">Attendance Filter</router-link></li>
        <li><router-link to="/batch">Batch</router-link></li>
        <li><router-link to="/wrk">Work from Home</router-link></li>
      </ul>
    </div>
    <div class="main-content">
      <h2>Admin Page</h2>
      <hr />
      <p>Welcome, admin. Here you can manage student data, leave requests, and attendance.</p>
    </div>
  </div>
</template>

<script>
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
  /* background: linear-gradient(to top, #7fd7da, #8e4eef); */
  background: #8ddbf7; 
  color: white;
  border-right: 1px solid #ddd;
  padding: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 12px;
  text-align: start;
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
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar ul li a:hover {
  /* background-color: #9dd0ff; */
  background: #99d2f8;  
}

.main-content {
  flex-grow: 1;  
  padding: 20px;
  background-color: #f4f4f4;
}

.main-content h2 {
  font-size: 24px;
  font-weight: bold;
  
}
</style>
