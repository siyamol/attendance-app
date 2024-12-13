<!-- 
<template>
    <div class="page-container">
     
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn">TodaysAttendance</router-link></li>
        </ul>
      </div>
  
    
      <div class="main-content">
        <h1 class="page-title">Admin Student Details</h1>
        <div class="filters-container">
       
          <div class="filter">
            <label for="nameSearch">Search by Name:</label>
            <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
          </div>
         
          <div class="filter">
            <label for="batchFilter">Filter by Batch:</label>
            <select id="batchFilter" v-model="selectedBatch">
              <option value="">All</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
      
          <div class="filter">
            <label for="dateFilter">Filter by Date:</label>
         
            <input 
              id="dateFilter" 
              type="date" 
              v-model="selectedDate" 
              @change="updateFormattedDate"
            />
          </div>
        </div>
  
       
  
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Email</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="index">
              <td>{{ student.name }}</td>
              <td>{{ student.batch }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.date }}</td>
              <td>
                <span :class="getStatusClass(student.status)">
                  {{ student.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        students: [
          { name: 'Siya', batch: 'Morning', email: 'siya@example.com', date: '2024-11-20', status: 'Present' },
          { name: 'Reshma', batch: 'Morning', email: 'reshma@example.com', date: '2024-11-19', status: 'Absent' },
          { name: 'Deva', batch: 'Evening', email: 'deva@example.com', date: '2024-11-20', status: 'Present' },
          { name: 'Ameya', batch: 'Morning', email: 'si@example.com', date: '2024-11-30', status: 'Present' },
          { name: 'Resh', batch: 'Morning', email: 'reshu@example.com', date: '2024-11-3', status: 'Absent' },
          { name: 'Devi', batch: 'Evening', email: 'devi@example.com', date: '2024-11-19', status: 'Present' },
        ],
        searchText: '',
        selectedBatch: '',
        selectedDate: '', 
        formattedDate: '', 
      };
    },
    computed: {
      filteredStudents() {
        return this.students.filter(student => {
         
          const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
          
          const matchesBatch = this.selectedBatch === '' || student.batch === this.selectedBatch;
       
          const matchesDate = this.selectedDate === '' || student.date === this.selectedDate;
  
          return matchesName && matchesBatch && matchesDate;
        });
      },
    },
    methods: {
      getStatusClass(status) {
        if (status === 'Present') return 'status-present';
        if (status === 'Absent') return 'status-absent';
        return '';
      },
      async fetchUsers() {
        try{
          await this.$store.dispatch('allUsers'); 
        }catch (error) {
            console.error(error);
        } 
      },
  

      updateFormattedDate() {
        if (this.selectedDate) {
          const [year, month, day] = this.selectedDate.split('-');
          this.formattedDate = `${day}/${month}/${year}`;
        }
      },
    },
    watch: {
 
      selectedDate(newDate) {
        if (newDate) {
          const [year, month, day] = newDate.split('-');
          this.formattedDate = `${day}/${month}/${year}`;
        }
      },
    },
    mounted(){
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
 .page-container {
    display: flex;
    min-height: 100vh;
  }
  .sidebar {
    width: 250px;
    padding: 20px;
    background: linear-gradient(to top, #7fd7da, #8e4eef); 
    color: white;
  
    border-right: 1px solid #ddd;
  
    padding: 50px;
    border-radius: px; 
  
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
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar ul li a:hover {
    background-color: #a39ad9;
  }
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: rgb(204, 238, 245);
  }
  
  .search-bar-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    border: 1px solid #cfccfc;
    padding: 5px;
    border-radius: 8px;
    background-color: #dffbfb;
    box-shadow: 0 2px 5px rgba(145, 67, 253, 0.1);
  }
  .search-bar input {
    padding: 8px;
    width: 250px;
    height: 25px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
  }
  
  th, td {
    border: 5px solid #a9e6fb;
    padding: 12px;
    text-align: center;
  }
  th {
    background: linear-gradient(to left, #4830e8 ,#a485f2);
    color: #fcffff;
    font-weight: bold;
  }
  tbody tr:nth-child(even) {
    background-color: #c6c4f8;
  }
  
  tbody tr:nth-child(odd) {
    background-color: #c0bdf7;
  }
  .status-present {
    color: rgb(77, 98, 229);
    font-weight: bold;
  }
  
  .status-absent {
    color: rgb(40, 40, 157);
    font-weight: bold;
  }
  
  
  
  .page-title {
    text-align: center;
    font-size: 28px;
    margin-top: 0px;
    color: #2f6ff9;
  }
  
  .filters-container {
    display: flex;
    justify-content: space-around;
    margin: 1px 100;
    flex-wrap: wrap;
    
  
  }
  
  
  .filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    color: #2f6ff9;
  }
  
  input,
  select {
    padding: 8px;
    margin-top: 5px;
    color: #656363;
    background-color: #bddffb;
    border: 1px solid #a5b9f4; 
    margin-bottom: 1px;
    border-radius: 4px;
  }
  
  .export-btn-container {
    text-align: right;
    margin-bottom: 2px;
    
  }
  
  button.export-btn {
  
      background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  button.export-btn:hover {
    background-color:#a174f5;
  }
  
  table {
    width: 99%;
    border-collapse: collapse;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    border: 5px solid #a9e6fb;
    padding: 12px;
    text-align: center;
  }
  
  @media print {
    .export-btn {
      display: none;
    }
  }
  
  </style> -->
  <template>
    <div class="page-container">
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn">Today's Attendance</router-link></li>
        </ul>
      </div>
  
      <div class="main-content">
        <h1 class="page-title">Admin Student Details</h1>
  
        <!-- Filters -->
        <div class="filters-container">
          <!-- Name Search -->
          <div class="filter">
            <label for="nameSearch">Search by Name:</label>
            <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
          </div>
  
          <!-- Batch Filter -->
          <div class="filter">
            <label for="batchFilter">Filter by Batch:</label>
            <select id="batchFilter" v-model="selectedBatch">
              <option value="">All</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div class="filter">
            <label for="statusFilter">Filter by Status:</label>
            <select id="statusFilter" v-model="selectedStatus">
              <option value="">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          
         
        </div>
  
       
  
        <!-- Table -->
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Attendance Date</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Today's Status</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in todaystatus" :key="index">
              <td>{{ student.name }}</td>
              <td>{{ student.batch }}</td>
              <td>{{ formatDate(student.attendanceDate) }}</td>
              <td>{{ student.scanInTime }}</td>
              <td>{{ student.scanOutTime }}</td>
              <td>{{ student.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        // status: [
        //   { name: 'Siya', batch: 'Morning', email: 'siya@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Reshma', batch: 'Morning', email: 'reshma@example.com', date: '2024-12-12', status: 'Absent' },
        //   { name: 'Deva', batch: 'Evening', email: 'deva@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Ameya', batch: 'Morning', email: 'ameya@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Resh', batch: 'Morning', email: 'resh@example.com', date: '2024-12-12', status: 'Absent' },
        //   { name: 'Devi', batch: 'Evening', email: 'devi@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Amalu', batch: 'Evening', email: 'dev@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Anilu', batch: 'Morning', email: 'amea@example.com', date: '2024-12-12', status: 'Present' },
        //   { name: 'Stephy', batch: 'Morning', email: 'rsh@example.com', date: '2024-12-12', status: 'Absent' },
        //   { name: 'Emmanuel', batch: 'Evening', email: 'de@example.com', date: '2024-12-12', status: 'Absent' },
        // ],
        searchText: '',
        selectedBatch: '',
        selectedStatus: '', // Store date in YYYY-MM-DD format
      };
    },
    mounted() {
    // this.currentSpeed = this.students.map(() => 0);
    this. fetchToday();
  },
    computed: {
     ...mapGetters(['getStatus']),
    todaystatus(){
      return this.getStatus;
    },
      // filteredStudents() {
      //   return this.students.filter(student => {
       
      //     const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
      
      //     const matchesBatch = !this.selectedBatch || student.batch === this.selectedBatch;
        
      //     const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;
  
      //     return matchesName && matchesBatch && matchesStatus;
      //   });
      // },
    },
    methods: {
      async fetchToday(){
      try{
        await this.$store.dispatch('fetchToday'); 
      }catch (error) {
          console.error(error);
      } 
    },
      getStatusClass(status) {
        return {
          'status-present': status === 'Present',
          'status-absent': status === 'Absent',
        };
      },
      printPage() {
        const exportButton = document.querySelector('.export-btn');
        exportButton.style.display = 'none'; // Hide button during printing
  
        window.print();
  
        setTimeout(() => {
          exportButton.style.display = 'block'; // Restore button visibility
        }, 1000);
      },
      formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      },
    },
  };
  </script>
  <style scoped>
  /* Sidebar Styling */
  .page-container {
    display: flex;
    min-height: 100vh;
  }
  
.sidebar {
  width: 250px;
  padding: 20px;
  background: linear-gradient(to top, #7fd7da, #8e4eef);
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
  background-color: #a39ad9;
}
  /* Main Content Styling */
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: rgb(204, 238, 245);
  }
  
  .page-title {
    text-align: center;
    font-size: 28px;
    margin-top: 0px;
    color: #2f6ff9;
  }
  
  /* Filters Styling */
  .filters-container {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    flex-wrap: wrap;
    
  }
  
  .filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    color: #2f6ff9;
  
  }
  
  input,
  select {
    padding: 8px;
    margin-top: 5px;
    background-color: #bddffb;
    border: 1px solid #a5b9f4;
    border-radius: 4px;
    color: #656363;
    width: 250px;
  }
  
  /* Export Button Styling */
  .export-btn-container {
    text-align: right;
    margin-bottom: 20px;
  }
  
  button.export-btn {
    background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc);
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button.export-btn:hover {
    background-color: #a174f5;
  }
  
  /* Table Styling */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    border: 5px solid #a9e6fb;
    padding: 12px;
    text-align: center;
  }
  
  th {
    background: linear-gradient(to left, #4830e8, #a485f2);
    color: #fcffff;
    font-weight: bold;
  }
  
  tbody tr:nth-child(even) {
    background-color: #c6c4f8;
  }
  
  tbody tr:nth-child(odd) {
    background-color: #c0bdf7;
  }
  
  /* Status Coloring */
  .status-present {
    color: rgb(77, 98, 229);
    font-weight: bold;
  }
  
  .status-absent {
    color: rgb(40, 40, 157);
    font-weight: bold;
  }
  
  /* Print Styling */
  @media print {
    .export-btn {
      display: none;
    }
  }
  </style>
  