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
  
  </style> 


''''''''''''''''WITH THREE SEARCH BOX ''''''''''''

  <template>
    <div class="page-container">
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn"> Attendance</router-link></li>
        </ul>
      </div>
  
      <div class="main-content">
        <h1 class="page-title">Attendance</h1>
  
       
        <div class="filters-container">
        
          <div class="filter">
            <label for="nameSearch">Search by Name:</label>
            <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
          </div>
  
         
          <div class="filter">
            <label for="batchFilter">Filter by Batch:</label>
            <select id="batchFilter" v-model="selectedBatch">
              <option value="">All</option>
              <option value="Morning Batch">Morning Batch</option>
              <option value="Evening Batch">Evening Batch</option>
            </select>
          </div>
          <div class="filter">
            <label for="statusFilter">Filter by Status:</label>
            <select id="statusFilter" v-model="selectedStatus">
              <option value="">All</option>
              <option value="Punctual">Punctual</option>
              <option value="Late">Late</option>
            </select>
          </div>
          
         
        </div>
  
       
        <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>
     
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
        
            <tr v-for="(student, index) in todaystatus" :key="index">
              <td>{{ student.userName }}</td>
              <td>{{ student.batchType }}</td>
              <td>{{ formatDate(student.attendanceDate) }}</td>
              <td>{{ student.scanInTime }}</td>
              <td>{{ student.scanOutTime }}</td>
              <td>{{ student.status }}</td>
            </tr>
       
          <tbody v-if="filteredStudents.length">
  <tr v-for="(student, index) in filteredStudents" :key="index">
    <td>{{ student.userName }}</td>
    <td>{{ student.batchType }}</td>
    <td>{{ formatDate(student.attendanceDate) }}</td>
    <td>{{ student.scanInTime }}</td>
    <td>{{ student.scanOutTime }}</td>
    <td>{{ student.status }}</td>
  </tr>
</tbody>
<tbody v-else>
  <tr>
    <td colspan="6">No records found</td>
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
      filteredStudents() {
    return this.todaystatus.filter((student) => {
      const matchesName = student.userName.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
      const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;

      return matchesName && matchesBatch && matchesStatus;
    });
  },
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
  
  
  <template>
    <div class="page-container">
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn"> Attendance</router-link></li>
        </ul>
      </div>
  
      <div class="main-content">
        <h1 class="page-title">Attendance</h1>
  
        <div class="filters-container">
     
          <div class="filter">
            <label for="nameSearch">Search by Name:</label>
            <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
          </div>
  
          <div class="filter">
            <label for="batchFilter">Filter by Batch:</label>
            <select id="batchFilter" v-model="selectedBatch">
              <option value="">All</option>
              <option value="Morning Batch">Morning Batch</option>
              <option value="Evening Batch">Evening Batch</option>
            </select>
          </div>
      
            <label for="statusFilter">Filter by Status:</label>
            <select id="statusFilter" v-model="selectedStatus">
              <option value="">All</option>
              <option value="Punctual">Punctual</option>
              <option value="Late">Late</option>
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
  
       
        <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>
    
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
          </thead>  <tbody v-if="filteredStudents.length">
  <tr v-for="(student, index) in filteredStudents" :key="index">
    <td>{{ student.userName }}</td>
    <td>{{ student.batchType }}</td>
    <td>{{ formatDate(student.attendanceDate) }}</td>
    <td>{{ student.scanInTime }}</td>
    <td>{{ student.scanOutTime }}</td>
    <td>{{ student.status }}</td>
  </tr>
</tbody>
<tbody v-else>
  <tr>
    <td colspan="6">No records found</td>
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
      return { searchText: '',
        selectedBatch: '',
        selectedStatus: '', 
      };
    },
    mounted() {
  
    this. fetchToday();
  },
    computed: {
     ...mapGetters(['getStatus']),
    todaystatus(){
      return this.getStatus;
    }, filteredStudents() {
    return this.todaystatus.filter((student) => {
      const matchesName = student.userName.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
      // const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;
      const matchesDate = this.selectedDate === '' || student.date === this.selectedDate;
      // return matchesName && matchesBatch && matchesStatus;
      return matchesName && matchesBatch && matchesDate;
    });
  },
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
        exportButton.style.display = 'none'; 
  
        window.print();
  
        setTimeout(() => {
          exportButton.style.display = 'block'; 
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








  <template>
    <div class="page-container">
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn">Attendance</router-link></li>
        </ul>
      </div>
  
      <div class="main-content">
        <h1 class="page-title">Attendance</h1>
  
        <div class="search-container">
          <input
            v-model="searchText.input"
            type="text"
            placeholder="Search by Name, Batch, or Month"
            class="search-input"
            @input="handleSearchInput"
          />
          
        
          <select v-model="searchText.month" @change="handleMonthSelect" class="month-dropdown">
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
  
          <div v-if="showDatePickers" class="date-picker-container">
            <label>From:
              <input type="date" v-model="fromDate" />
            </label>
            <label>To:
              <input type="date" v-model="toDate" />
            </label>
          </div>
  
          <button @click="filterAttendance" class="filter-btn">Search</button>
        </div>
  
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
          <tbody v-if="filteredStudents.length">
            <tr v-for="(student, index) in filteredStudents" :key="index">
              <td>{{ student.userName }}</td>
              <td>{{ student.batchType }}</td>
              <td>{{ formatDate(student.attendanceDate) }}</td>
              <td>{{ student.scanInTime }}</td>
              <td>{{ student.scanOutTime }}</td>
              <td>{{ student.status }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">No records found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        searchText: {
          input: "",
          month: "",
        },
        showDatePickers: false,
        fromDate: "",
        toDate: "",
      };
    },
    computed: {
      ...mapGetters(["getStatus"]),
      filteredStudents() {
        return this.getStatus.filter((student) => {
          const matchesNameOrBatch = 
            student.userName.toLowerCase().includes(this.searchText.input.toLowerCase()) ||
            student.batchType.toLowerCase().includes(this.searchText.input.toLowerCase());
  
          // Handle filtering by month if entered
          const matchesMonth = 
            this.searchText.month && 
            new Date(student.attendanceDate).toLocaleString("default", { month: "long" }).toLowerCase() === this.searchText.month.toLowerCase();
  
          // Handle filtering by date range if month is selected
          const matchesDateRange =
            this.showDatePickers &&
            this.fromDate &&
            this.toDate &&
            new Date(student.attendanceDate) >= new Date(this.fromDate) &&
            new Date(student.attendanceDate) <= new Date(this.toDate);
  
          return (
            matchesNameOrBatch &&
            (matchesMonth || !this.searchText.month) &&
            (matchesDateRange || !this.showDatePickers)
          );
        });
      },
    },
    methods: {
      handleSearchInput() {
        // Reset date range filters if the search text changes
        if (this.searchText.month) {
          this.showDatePickers = true;
        } else {
          this.showDatePickers = false;
        }
        this.fromDate = "";
        this.toDate = "";
      },
      handleMonthSelect() {
        this.showDatePickers = !!this.searchText.month;
      },
      formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      },
      filterAttendance() {
        // Trigger any necessary logic for filtering or sorting
      },
    },
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
  
  .search-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  
  .search-input,
  .month-dropdown,
  .date-picker-container input {
    padding: 8px;
    margin-top: 5px;
    background-color: #bddffb;
    border: 1px solid #a5b9f4;
    border-radius: 4px;
    color: #656363;
    width: 250px;
  }
  
  .filter-btn {
    background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc);
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .filter-btn:hover {
    background-color: #a174f5;
  }
  
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
  </style>-->
  
<!--   
  <template>
    <div class="page-container">
      <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><router-link to="/student">Student Details</router-link></li>
          <li><router-link to="/leave">Leave Request</router-link></li>
          <li><router-link to="/late">Late Request</router-link></li>
          <li><router-link to="/todaysatn"> Attendance</router-link></li>
        </ul>
      </div>
  
      <div class="main-content">
        <h1 class="page-title">Attendance</h1>
  
       
        <div class="filters-container">
         
          <div class="filter">
            <label for="nameSearch">Search by Name:</label>
            <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
          </div>
  
          <div class="filter">
            <label for="batchFilter">Filter by Batch:</label>
            <select id="batchFilter" v-model="selectedBatch">
              <option value="">All</option>
              <option value="Morning Batch">Morning Batch</option>
              <option value="Evening Batch">Evening Batch</option>
            </select>
          </div> <div class="filter">
          <label for="dateFilter">Filter by Date:</label>

          <input 
            id="dateFilter" 
            type="date" 
            v-model="selectedDate" 
            @change="updateFormattedDate"
          />
        </div> 
        </div>
  
       
        <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>
   
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
          </thead>  <tbody v-if="filteredStudents.length">
  <tr v-for="(student, index) in filteredStudents" :key="index">
    <td>{{ student.userName }}</td>
    <td>{{ student.batchType }}</td>
    <td>{{ formatDate(student.attendanceDate) }}</td>
    <td>{{ student.scanInTime }}</td>
    <td>{{ student.scanOutTime }}</td>
    <td>{{ student.status }}</td>
  </tr>
</tbody>
<tbody v-else>
  <tr>
    <td colspan="6">No records found</td>
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
      return { searchText: '',
        selectedBatch: '',
        selectedStatus: '', 
      };
    },
    mounted() {
  
    this. fetchToday();
  },
    computed: {
     ...mapGetters(['getStatus']),
    todaystatus(){
      return this.getStatus;
    }, filteredStudents() {
    return this.todaystatus.filter((student) => {
      const matchesName = student.userName.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;  const matchesDate = this.selectedDate === '' || student.date === this.selectedDate;  return matchesName && matchesBatch && matchesDate;
    });
  },
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
        exportButton.style.display = 'none'; 
  
        window.print();
  
        setTimeout(() => {
          exportButton.style.display = 'block'; 
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
  

 
  





 <template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>


      <div class="filters-container">
        <div class="filter">
          <label for="nameSearch">Search by Name and Batch:</label>
          <div class="search-bar-container">
            <input
              id="nameSearch"
              v-model="searchText"
              type="text"
              placeholder="Enter Name"
            />
           
          <div class="month-selector" @click="toggleMonthDropdown">
            <span>{{ selectedMonth || 'Select Month' }}</span>
            <i class="month-icon">▼</i>
            <div v-if="showMonthDropdown" class="month-dropdown">
            <ul>
              <li
                v-for="(month, index) in months"
                :key="index"
                @click="selectMonth(month)"
              >
                {{ month }}
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div> 

      <div class="filter">
  
        </div>
        </div>

      <div v-if="showDatePicker" class="date-picker-popup">
        <div class="date-picker-container">
          <label for="dateFilter">Select Attendance Date Range:</label>
          <input
            id="fromDate"
            type="date"
            v-model="fromDate"
            @change="updateDateFilter"
          />
          <input
            id="toDate"
            type="date"
            v-model="toDate"
            @change="updateDateFilter"
          />
          <button @click="closeDatePicker">Close</button>
        </div>
      </div>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
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
      searchText: '',
      selectedBatch: '',
      selectedMonth: '',
      showMonthDropdown: false,
      showDatePicker: false,
      months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ],
      fromDate: '',
      toDate: '',
    };
  },
  computed: {
    ...mapGetters(['getStatus']),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      return this.todaystatus.filter((student) => {
        const matchesName = student.userName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
        const matchesMonth = !this.selectedMonth || student.attendanceDate.includes(this.selectedMonth.toLowerCase());
        const matchesDateRange =
          (!this.fromDate || student.attendanceDate >= this.fromDate) &&
          (!this.toDate || student.attendanceDate <= this.toDate);

        return matchesName && matchesBatch && matchesMonth && matchesDateRange;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch('fetchToday');
      } catch (error) {
        console.error(error);
      }
    },
    toggleMonthDropdown() {
      this.showMonthDropdown = !this.showMonthDropdown;
    },
    selectMonth(month) {
      this.selectedMonth = month;
      this.showMonthDropdown = false;
      this.openDatePicker();
    },
    openDatePicker() {
      this.showDatePicker = true;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
    updateDateFilter() {
      // Logic to update the filtered students based on the selected date range
    },
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none';
      window.print();
      setTimeout(() => {
        exportButton.style.display = 'block';
      }, 1000);
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  },
  mounted() {
    this.fetchToday();
  },
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

.search-bar-container {
  display: flex;
  align-items: center;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  background-color: #bddffb;
  border: 1px solid #a5b9f4;
  border-radius: 4px;
  color: #656363;
  width: 250px;
}

.month-dropdown {
  margin-left: 10px;
  cursor: pointer;
}
/* .month-selector {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bddffb;
  padding: 8px;
  width: 250px;
  border-radius: 4px;
  color: #656363;
  border: 1px solid #a5b9f4;
} */

.month-dropdown {
  position: absolute;
  background-color: #97abee;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  width: 250px;
  margin-top: 5px;
  border-radius: 4px;
  z-index: 1;
}

.month-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.month-dropdown ul li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.month-dropdown ul li:hover {
  background-color: #5492f5;
}
.month-options {
  position: absolute;
  background-color: #266ce6;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.month-option {
  padding: 8px;
  cursor: pointer;
}

.month-option:hover {
  background-color: #538ff1;
}

.date-picker-popup {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.date-picker-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #3a86ff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2f72cc;
}

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

th,
td {
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





<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <div class="filters-container">
        <div class="filter">
          <label for="search">Search:</label>
          <div class="search-bar-container">
            <input
              id="search"
              v-model="searchText"
              type="text"
              placeholder="Search by Name or Batch"
            />
            <i class="date-picker-icon" @click="toggleDatePicker">📅</i>
            <date-picker
  v-model="dates"
  multiple
  clearable
  format="YYYY-MM-DD"
  display-format="jMMMM jD"
/>
          </div>
        </div>

        <div v-if="showDatePicker" class="date-picker-popup">
          <div class="filter">
            <label for="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              v-model="fromDate"
              @change="filterByDate"
            />
          </div>
          <div class="filter">
            <label for="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              v-model="toDate"
              @change="filterByDate"
            />
          </div>
        </div>
      </div>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
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
 
      dates: [],

      searchText: '',
      selectedBatch: '',
      showDatePicker: false,
      fromDate: '',
      toDate: '',
    };
  },
  mounted() {
    this.fetchToday();
  },
  computed: {
    ...mapGetters(['getStatus']),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      return this.todaystatus.filter((student) => {
        const matchesNameOrBatch =
          student.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batchType.toLowerCase().includes(this.searchText.toLowerCase());

        const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
        const matchesDate =
          (!this.fromDate || new Date(student.attendanceDate) >= new Date(this.fromDate)) &&
          (!this.toDate || new Date(student.attendanceDate) <= new Date(this.toDate));

        return matchesNameOrBatch && matchesBatch && matchesDate;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch('fetchToday');
      } catch (error) {
        console.error(error);
      }
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    filterByDate() {
      // Trigger computed property update when date changes
    },
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none';

      window.print();

      setTimeout(() => {
        exportButton.style.display = 'block';
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

.filters-container {
  display: flex;
  justify-content: space-between;
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

.search-bar-container {
  display: flex;
  align-items: center;
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

.date-picker-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;
}

.date-picker-popup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  position: absolute;
  top: 100px;
  left: 300px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

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

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th,
td {
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

.status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(40, 40, 157);
  font-weight: bold;
}

@media print {
  .export-btn {
    display: none;
  }
}
</style>
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <div class="filters-container">
        <div class="filter">
         
       
          <label for="dateRange">Select Date Range:</label>
         
          <div class="search-bar-container">


            <input
              id="search"
              v-model="searchText"
              type="text"
              placeholder="Search by Name or Batch"
            />
            <i class="date-picker-icon" @click="toggleDatePicker">📅</i>
         Using Vue3 Datepicker for multi-date selection -->
            <!-- <datepicker
              v-model="dates"
              :multiple="true"
              :clearable="true"
              :format="'YYYY-MM-DD'"
              :display-format="'MMM DD YYYY'"
              placeholder="Select Dates"
            />  -->
      <!-- <Datepicker v-model="selectedDate" />   -->
          <!-- <date-time-picker
        v-model="dateRange"
        type="date"
        range
        format="YYYY-MM-DD"
        :min-date="minDate"
        :max-date="maxDate"
        :clearable="true"
      />  
      <label for="fromDate">From Date:</label>
      <datepicker
        v-model="fromDate"
        format="YYYY-MM-DD"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </div>
    <div class="filter">
      <label for="toDate">To Date:</label>
      <datepicker
        v-model="toDate"
        format="YYYY-MM-DD"
        :min-date="fromDate || minDate"
        :max-date="maxDate"
      />
    </div>
          </div>
      
  
 <div v-if="showDatePicker" class="date-picker-popup">
          <div class="filter">
            <label for="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              v-model="fromDate"
              @change="filterByDate"
            />
          </div>
          <div class="filter">
            <label for="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              v-model="toDate"
              @change="filterByDate"
            />
          </div>
        </div>  
      </div>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// Import Datepicker component from vue3-datepicker
// import Datepicker from 'vue3-datepicker';
// import DateTimePicker from "vue3-date-time-picker";
// // import "vue3-date-time-picker/dist/main.css";
// import Datepicker from 'vue3-datepicker';
// import 'vue3-datepicker/dist/vue3-datepicker.css';
import { mapGetters } from 'vuex';

export default {
  components: {
    // DateTimePicker,
  //  Datepicker, // Register Datepicker component
  },
  // data() {
  //   return {
  //     dates: [], // Store selected dates
  //     searchText: '',
  //     selectedBatch: '',
  //     showDatePicker: false,
  //     fromDate: '',
  //     toDate: '',
  //   };
  // },
  data() {
  return {
    // selectedDate: null,
    dateRange: null,
    // minDate: new Date(2020, 0, 1), 
    // maxDate: new Date(2026, 11, 31),
   
  };
},

  mounted() {
    this.fetchToday();
  },
  computed: {
    ...mapGetters(['getStatus']),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      return this.todaystatus.filter((student) => {
        const matchesNameOrBatch =
          student.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batchType.toLowerCase().includes(this.searchText.toLowerCase());

        const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
        const matchesDate =
          (!this.fromDate || new Date(student.attendanceDate) >= new Date(this.fromDate)) &&
          (!this.toDate || new Date(student.attendanceDate) <= new Date(this.toDate));

        return matchesNameOrBatch && matchesBatch && matchesDate;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch('fetchToday');
      } catch (error) {
        console.error(error);
      }
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    filterByDate() {
      // Trigger computed property update when date changes
    },
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none';

      window.print();

      setTimeout(() => {
        exportButton.style.display = 'block';
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

.filters-container {
  display: flex;
  justify-content: space-between;
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

.search-bar-container {
  display: flex;
  align-items: center;
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

.date-picker-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;
}

.date-picker-popup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  position: absolute;
  top: 100px;
  left: 300px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

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

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th,
td {
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

.status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(40, 40, 157);
  font-weight: bold;
}

@media print {
  .export-btn {
    display: none;
  }
}
</style>

DATE PICKER BUT CANT SELECT TWODATES IN ONE DATEPICKER
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <div class="filters-container">
        <div class="filter">
          
          <label for="dateRange">Select Date Range:</label>
          <label for="search">Search:</label>
          <div class="search-bar-container">
            <input
              id="search"
              v-model="searchText"
              type="text"
              placeholder="Search by Name or Batch"
            />
            <i class="date-picker-icon" @click="toggleDatePicker">📅</i> <datepicker v-model="selectedDate" format="YYYY-MM-DD" :minDate="minDate" :maxDate="maxDate"/>

          </div>
        </div></div>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>import Datepicker from 'vue3-datepicker';

import { mapGetters } from 'vuex';

export default {
  components: {
    Datepicker, // Register Datepicker component
  },
//.....   data() {
//   return {
//     selectedDate: null,
//     minDate: new Date(2020, 0, 1),  // Example min date
//     maxDate: new Date(2026, 11, 31),
   
//   };
// ....},
data() {
  return {
    todaystatus: [], // Initialize as an empty array
    searchText: "",
    fromDate: null,
    toDate: null,
  };
},

mounted() {
  console.log(this.todaystatus);
  this.fetchToday();
},
  //................. mounted() {
  //   this.fetchToday();
  // },
  // computed: {
  //   ...mapGetters(['getStatus']),
  //   todaystatus() {
  //     return this.getStatus;
  //   },
  //   filteredStudents() {
  //     return this.todaystatus.filter((student) => {
  //       const matchesNameOrBatch =
  //         student.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //         student.batchType.toLowerCase().includes(this.searchText.toLowerCase());

  //       const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
  //       const matchesDate =
  //         (!this.fromDate || new Date(student.attendanceDate) >= new Date(this.fromDate)) &&
  //         (!this.toDate || new Date(student.attendanceDate) <= new Date(this.toDate));

  //       return matchesNameOrBatch && matchesBatch && matchesDate;
  //     });
  //   },
  // .................}, 
  computed: {
    ...mapGetters(['getStatus']),
  filteredStudents() {
    return this.todaystatus.filter((student) => {
      const userName = student.userName || ""; 
      const batchType = student.batchType || ""; // Default to an empty string if undefined

      const matchesNameOrBatch =
        userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        batchType.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesDate =
        (!this.fromDate || new Date(student.attendanceDate) >= new Date(this.fromDate)) &&
        (!this.toDate || new Date(student.attendanceDate) <= new Date(this.toDate));

      return matchesNameOrBatch && matchesDate;
    });
  },
},

  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch('fetchToday');
      } catch (error) {
        console.error(error);
      }
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    filterByDate() {
 
    },
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none';

      window.print();

      setTimeout(() => {
        exportButton.style.display = 'block';
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

.filters-container {
  display: flex;
  justify-content: space-between;
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

.search-bar-container {
  display: flex;
  align-items: center;
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

.date-picker-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;
}

.date-picker-popup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  position: absolute;
  top: 100px;
  left: 300px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

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

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th,
td {
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

.status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(40, 40, 157);
  font-weight: bold;
}

@media print {
  .export-btn {
    display: none;
  }
}
</style>






<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

     
      <div class="filters-container">
      
        <div class="filter">
          <label for="nameSearch">Search by Name:</label>
          <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
        </div>

       
        <div class="filter">
          <label for="batchFilter">Filter by Batch:</label>
          <select id="batchFilter" v-model="selectedBatch">
            <option value="">All</option>
            <option value="Morning Batch">Morning Batch</option>
            <option value="Evening Batch">Evening Batch</option>
          </select>
        </div>
        <div class="filter">
          <label for="statusFilter">Filter by Status:</label>
          <select id="statusFilter" v-model="selectedStatus">
            <option value="">All</option>
            <option value="Punctual">Punctual</option>
            <option value="Late">Late</option>
          </select>
        </div>
        
       
      </div>

     
      <div class="export-btn-container">
      <button @click="printPage" class="export-btn">Export to PDF</button>
    </div>
   
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
      
         .........<tr v-for="(student, index) in todaystatus" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>....... 
     
        <tbody v-if="filteredStudents.length">
<tr v-for="(student, index) in filteredStudents" :key="index">
  <td>{{ student.userName }}</td>
  <td>{{ student.batchType }}</td>
  <td>{{ formatDate(student.attendanceDate) }}</td>
  <td>{{ student.scanInTime }}</td>
  <td>{{ student.scanOutTime }}</td>
  <td>{{ student.status }}</td>
</tr>
</tbody>
<tbody v-else>
<tr>
  <td colspan="6">No records found</td>
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
      // ............status: [
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
      // ...............................],
      searchText: '',
      selectedBatch: '',
      selectedStatus: '', // Store date in YYYY-MM-DD format
    };
  },
  mounted() {
  //........... this.currentSpeed = this.students.map(() => 0);
  this. fetchToday();
},
  computed: {
   ...mapGetters(['getStatus']),
  todaystatus(){
    return this.getStatus;
  },
    // ............filteredStudents() {
    //   return this.students.filter(student => {
     
    //     const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
    
    //     const matchesBatch = !this.selectedBatch || student.batch === this.selectedBatch;
      
    //     const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;

    //     return matchesName && matchesBatch && matchesStatus;
    //   });
    //.................. },
    filteredStudents() {
  return this.todaystatus.filter((student) => {
    const matchesName = student.userName.toLowerCase().includes(this.searchText.toLowerCase());
    const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
    const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;

    return matchesName && matchesBatch && matchesStatus;
  });
},
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
/* background: linear-gradient(to top, #86f1f3, #a982e4); */
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
  background: #99d2f8;  
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
  color: #6d7078;
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
  background:#64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.export-btn:hover {
  background-color: #74c1f5;
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
  background:#4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
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



<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

   
      <form id="nav-search-bar-form" @submit.prevent="onSearch" class="nav-search-bar">
        <div class="nav-dropdown">
          <select v-model="selectedCategory" id="searchDropdownBox" class="nav-search-dropdown">
            <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=batch">Batch</option>
            <option value="search-alias=date">Date Range</option>
          </select>
        </div>
        <div class="nav-input-container">
          <input
            v-if="selectedCategory !== 'search-alias=date'"
            type="text"
            id="twotabsearchtextbox"
            v-model="searchQuery"
            class="nav-input"
            placeholder="Search"
          />
          <div v-if="selectedCategory === 'search-alias=date'" class="date-range-container">
            <input
              v-model="startDate"
              type="date"
              id="startDate"
              class="nav-input"
              placeholder="Start Date"
            />
            <input
              v-model="endDate"
              type="date"
              id="endDate"
              class="nav-input"
              placeholder="End Date"
            />
          </div>
        </div>
        .......<template>
          
        </template><button type="submit" id="nav-search-submit-button" class="nav-search-submit">
          Go
        </button> ..... 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
      </form>

     
    ........... <div class="filters-container">
        <div class="filter">
          <label for="batchFilter">Filter by Batch:</label>
          <select id="batchFilter" v-model="selectedBatch">
            <option value="">All</option>
            <option value="Morning Batch">Morning Batch</option>
            <option value="Evening Batch">Evening Batch</option>
          </select>
        </div>
        <div class="filter">
          <label for="statusFilter">Filter by Status:</label>
          <select id="statusFilter" v-model="selectedStatus">
            <option value="">All</option>
            <option value="Punctual">Punctual</option>
            <option value="Late">Late</option>
          </select>
        </div>
      </div> ..........

     
      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

   
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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
   
    <vue3-datepicker
      v-model="date"
      format="dd/MM/yyyy" 
      placeholder="Select Date"
    />
    <p>Selected Date: {{ formattedDate }}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      selectedCategory: "search-alias=aps", 
      searchQuery: "", 
      startDate: "",
      endDate: "", 
      selectedBatch: '', 
      selectedStatus: '', 
    };
  },
  mounted() {
    this.fetchToday();
    this.fetchFilter();
  },
  computed: {
    ...mapGetters(['getStatus']),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      return this.todaystatus.filter((student) => {
        const matchesName = this.selectedCategory === 'search-alias=name' 
          ? student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;

        // const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;

        const matchesBatch =
      this.selectedCategory === 'search-alias=batch'
        ? student.batchType.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;


        const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;

        const matchesDateRange = this.selectedCategory === 'search-alias=date' && this.startDate && this.endDate
          ? new Date(student.attendanceDate) >= new Date(this.startDate) && new Date(student.attendanceDate) <= new Date(this.endDate)
          : true;

        return matchesName && matchesBatch && matchesStatus && matchesDateRange;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch('fetchToday');
      } catch (error) {
        console.error(error);
      }
    },

    async fetchFilter() {
      try {
        await this.$store.dispatch('fetchFilter'); // Call the 'fetchFilter' action
      } catch (error) {
        console.error(error);
      }
    },

    // async fetchAttendanceForUser(payload) {
    //   try {
    
    //     const { userId, year, month } = payload;
    //     const url = `/AdminReg/attendance/user/${userId}/month/${year}-${month}`;

    //     const response = await this.$store.dispatch("fetchAttendance", { url });

    //     console.log("Attendance data:", response);
    //   } catch (error) {
    //     console.error("Error fetching attendance for user:", error);
    //   }
    // },

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
    onSearch() {
      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
      console.log("Start Date:", this.startDate);
      console.log("End Date:", this.endDate);

      // const payload = {
      //   userId: 8,
      //   year: "2025",
      //   month: "01", 
      // };

      // this.fetchAttendanceForUser(payload);
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
  background: #99d2f8;  
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
  color: #6d7078;
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
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.export-btn:hover {
  background-color: #74c1f5;
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
  background: #4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
}

/* Status Coloring */
/* .status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(185, 185, 242);
  font-weight: bold;
} */

/* Print Styling */
@media print {
  .export-btn {
    display: none;
  }
}

/* Navigation Bar Styling */
.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 120px;
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  
}
.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center; /* Center the elements vertically */
}

.nav-input {
  width: 100%;
  padding: 6px 8px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  color:#0a0a0a;

}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center; /* Center the elements vertically */

}

.nav-dropdown select {
  padding: 6px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px;
  
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;


}

.nav-search-submit {
  padding: 6px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Smaller font size */
  
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}




.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px; /* Reduced max-width for a smaller search bar */
  background-color: #f9f9f9; /* Lighter background color */
  padding: 8px;
  border-radius: 5px;
  gap: 8px; /* Reduced gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added light shadow */
}

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 5px 8px; /* Smaller padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px; /* Adjusted width */
  
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 13px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  
}

.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  
}

.nav-input {
  width: 100%;
  padding: 5px 10px; /* Reduced padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center;
}

.nav-search-submit {
  padding: 5px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px; /* Slightly smaller font size */
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-search-submit:focus {
  outline: none; /* Remove outline on focus */
}

.nav-dropdown select:focus,
.nav-input:focus {
  border-color: #0073e6; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 115, 230, 0.3); /* Subtle focus shadow */
}

</style>





<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <form id="nav-search-bar-form" @submit.prevent="onSearch" class="nav-search-bar">
        <div class="nav-dropdown">
          <select v-model="selectedCategory" id="searchDropdownBox" class="nav-search-dropdown">
            <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=batch">Batch</option>
            <option value="search-alias=date">Date Range</option>
          </select>
        </div>

        <div class="nav-input-container">
   
          <div v-if="selectedCategory === 'search-alias=name'">
            <input
              v-model="searchQuery"
              type="text"
              id="studentNameInput"
              class="nav-input"
              placeholder="Enter Student Name"
            />
          </div>

          <div v-if="selectedCategory === 'search-alias=date'" class="date-picker-container">
            <input
              v-model="startDate"
              type="date"
              id="startDate"
              class="nav-input date-picker"
              placeholder="Start Date"
            />
            <input
              v-model="endDate"
              type="date"
              id="endDate"
              class="nav-input date-picker"
              placeholder="End Date"
            />
          </div>

          <input
            v-if="selectedCategory !== 'search-alias=date' && selectedCategory !== 'search-alias=name'"
            type="text"
            id="twotabsearchtextbox"
            v-model="searchQuery"
            class="nav-input"
            placeholder="Search"
          />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </form>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

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
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
            <td>{{ student.status }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
    <vue3-datepicker
      v-model="date"
      format="dd/MM/yyyy"
      placeholder="Select Date"
    />
    <p>Selected Date: {{ formattedDate }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "search-alias=aps",
      searchQuery: "",
      startDate: "",
      endDate: "",
      selectedBatch: "",
      selectedStatus: "",
    };
  },
  mounted() {
    this.fetchToday();
    this.fetchFilter();
  },
  computed: {
    ...mapGetters(["getStatus"]),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      return this.todaystatus.filter((student) => {
        const matchesName = this.selectedCategory === "search-alias=name"
          ? student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;

        const matchesBatch = !this.selectedBatch || student.batchType === this.selectedBatch;
        const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;

        const matchesDateRange = this.selectedCategory === "search-alias=date" && this.startDate && this.endDate
          ? new Date(student.attendanceDate) >= new Date(this.startDate) && new Date(student.attendanceDate) <= new Date(this.endDate)
          : true;

        return matchesName && matchesBatch && matchesStatus && matchesDateRange;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch("fetchToday");
      } catch (error) {
        console.error(error);
      }
    },
    // async fetchFilter() {
    //   const payload={
    //     startDate: this.startDate,
    //     endDate: this.endDate
    //   }
    //   try {
    //     await this.$store.dispatch("fetchFilter",payload);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
//     backend dd mm yyyy.......
//     async fetchFilter() {
//   const payload = {
//     startDate: this.startDate,
//     endDate: this.endDate
//   };

//   try {
//     const success = await this.$store.dispatch("fetchFilter", payload);

//     if (success) {
//       console.log("Filter applied successfully");
//     } else {
//       console.error("Failed to fetch filtered data");
//     }
//   } catch (error) {
//     console.error("Error in fetchFilter:", error);
//    }
// //  },
// backend yyyy mm dd .......
// async fetchFilter() {
//   try {
//     // Convert the frontend dates (MM/DD/YYYY) to backend format (YYYY-MM-DD)
//     const startDate = new Date(this.startDate);
//     const endDate = new Date(this.endDate);

//     // Format the dates as YYYY-MM-DD
//     const formattedStartDate = startDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
//     const formattedEndDate = endDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD

//     // Prepare the payload with the formatted dates
//     const payload = {
//       startDate: formattedStartDate,
//       endDate: formattedEndDate
//     };

//     // Dispatch the action to fetch filtered data
//     const success = await this.$store.dispatch("fetchFilter", payload);

//     if (success) {
//       console.log("Filter applied successfully");
//     } else {
//       console.error("Failed to fetch filtered data");
//     }
//   } catch (error) {
//     console.error("Error in fetchFilter:", error);
//   }
// },
async fetchFilter() {
  try {
    // Convert the frontend dates (MM/DD/YYYY) to backend format (YYYY-MM-DD)
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    // Format the dates as YYYY-MM-DD (backend format)
    const formattedStartDate = startDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    const formattedEndDate = endDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD

    // Prepare the payload with the formatted dates
    const payload = {
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };

    // Dispatch the action to fetch filtered data with the payload
    const success = await this.$store.dispatch("fetchFilter", payload);

    if (success) {
      console.log("Filter applied successfully");
    } else {
      console.error("Failed to fetch filtered data");
    }
  } catch (error) {
    console.error("Error in fetchFilter:", error);
  }
},

    getStatusClass(status) {
      return {
        "status-present": status === "Present",
        "status-absent": status === "Absent",
      };
    },
    printPage() {
      const exportButton = document.querySelector(".export-btn");
      exportButton.style.display = "none"; // Hide button during printing
      window.print();
      setTimeout(() => {
        exportButton.style.display = "block"; // Restore button visibility
      }, 1000);
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    onSearch() {
      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
      console.log("Start Date:", this.startDate);
      console.log("End Date:", this.endDate);
    },
  },
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
  background: #99d2f8;  
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
  color: #68caff;
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
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.export-btn:hover {
  background-color: #74c1f5;
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
  background: #4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
}

/* Status Coloring */
/* .status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(185, 185, 242);
  font-weight: bold;
} */

/* Print Styling */
@media print {
  .export-btn {
    display: none;
  }
}

/* Navigation Bar Styling */
.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 500%;
  max-width: 800px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 120px;
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  
}
.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center; /* Center the elements vertically */
}

.nav-input {
  width: 100%;
  padding: 6px 8px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  color:#0a0a0a;

}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center; /* Center the elements vertically */

}

.nav-dropdown select {
  padding: 6px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px;
  }

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;

}

.nav-search-submit {
  padding: 6px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Smaller font size */
  
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Reduced max-width for a smaller search bar */
  background-color: #9fdcfc; /* Lighter background color */
  padding: 8px;
  border-radius: 5px;
  gap: 8px; /* Reduced gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added light shadow */
}

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 5px 8px; /* Smaller padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px; /* Adjusted width */
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 13px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgb(43, 156, 255);
}

.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
 
}

.nav-input {
  width: 100%;
  padding: 5px 10px; /* Reduced padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center;
  
}

.nav-search-submit {
  padding: 5px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px; /* Slightly smaller font size */
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-search-submit:focus {
  outline: none; /* Remove outline on focus */
}

.nav-dropdown select:focus,
.nav-input:focus {
  border-color: #7ec7ec; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 115, 230, 0.3); /* Subtle focus shadow */
}
.date-picker-container {
  display: flex;
  gap: 10px; /* Adds spacing between the date pickers */
  align-items: center;
}

.date-picker {
  width: 150px; /* Set a fixed width for each date picker */
}
</style>





<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <form @submit.prevent="onSearch" class="nav-search-bar">
        <div class="nav-dropdown">
          <select v-model="selectedCategory" class="nav-search-dropdown">
            <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=batch">Batch</option>
            <option value="search-alias=date">Date Range</option>
          </select>
        </div>

        <div class="nav-input-container">
        
          <input
            v-if="selectedCategory === 'search-alias=name'"
            v-model="searchQuery"
            type="text"
            class="nav-input"
            placeholder="Enter Student Name"
          />

          <div v-if="selectedCategory === 'search-alias=date'" class="date-picker-container">
            <input v-model="startDate" type="date" class="nav-input date-picker" placeholder="Start Date" />
            <input v-model="endDate" type="date" class="nav-input date-picker" placeholder="End Date" />
          </div>

          <input
            v-if="selectedCategory !== 'search-alias=date' && selectedCategory !== 'search-alias=name'"
            v-model="searchQuery"
            type="text"
            class="nav-input"
            placeholder="Search"
          />
        </div>

        <button type="submit" class="search-button">Search</button>
      </form>

      <div v-if="selectedStudentName" class="selected-student">
        <strong>Selected Student:</strong> {{ selectedStudentName }}
      </div>

      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Attendance Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "search-alias=aps",
      searchQuery: "",
      startDate: "",
      endDate: "",
      filteredBySearch: null, // Holds the stable filtered student list by name
      selectedStudentName: null, // Stores the selected student name
    };
  },
  mounted() {
    this.fetchToday();
  },
  computed: {
    ...mapGetters(["getStatus"]),
    todaystatus() {
      return this.getStatus;
    },
    filteredStudents() {
      // Use the stable filtered list if a name search was performed
      let baseList = this.filteredBySearch ?? this.todaystatus;

      // Apply the date range filter only if both start and end dates are selected
      return baseList.filter((student) => {
        if (this.startDate && this.endDate) {
          return (
            new Date(student.attendanceDate) >= new Date(this.startDate) &&
            new Date(student.attendanceDate) <= new Date(this.endDate)
          );
        }
        return true;
      });
    },
  },
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch("fetchToday");
      } catch (error) {
        console.error(error);
      }
    },
    printPage() {
      const exportButton = document.querySelector(".export-btn");
      exportButton.style.display = "none";
      window.print();
      setTimeout(() => {
        exportButton.style.display = "block";
      }, 1000);
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    onSearch() {
      if (this.selectedCategory === "search-alias=name") {
        this.filteredBySearch = this.todaystatus.filter((student) =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        // Store the selected student name
        if (this.filteredBySearch.length > 0) {
          this.selectedStudentName = this.filteredBySearch[0].userName;
        } else {
          this.selectedStudentName = null;
        }
      }
    },
  },
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
  background: #99d2f8;  
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
  color: #68caff;
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
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.export-btn:hover {
  background-color: #74c1f5;
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
  background: #4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
}

/* Status Coloring */
/* .status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(185, 185, 242);
  font-weight: bold;
} */

/* Print Styling */
@media print {
  .export-btn {
    display: none;
  }
}

/* Navigation Bar Styling */
.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 500%;
  max-width: 800px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 120px;
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  
}
.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center; /* Center the elements vertically */
}

.nav-input {
  width: 100%;
  padding: 6px 8px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  color:#0a0a0a;

}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center; /* Center the elements vertically */

}

.nav-dropdown select {
  padding: 6px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px;
  }

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;

}

.nav-search-submit {
  padding: 6px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Smaller font size */
  
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Reduced max-width for a smaller search bar */
  background-color: #9fdcfc; /* Lighter background color */
  padding: 8px;
  border-radius: 5px;
  gap: 8px; /* Reduced gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added light shadow */
}

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 5px 8px; /* Smaller padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px; /* Adjusted width */
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 13px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgb(43, 156, 255);
}

.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
 
}

.nav-input {
  width: 100%;
  padding: 5px 10px; /* Reduced padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center;
  
}

.nav-search-submit {
  padding: 5px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px; /* Slightly smaller font size */
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-search-submit:focus {
  outline: none; /* Remove outline on focus */
}

.nav-dropdown select:focus,
.nav-input:focus {
  border-color: #7ec7ec; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 115, 230, 0.3); /* Subtle focus shadow */
}
.date-picker-container {
  display: flex;
  gap: 10px; /* Adds spacing between the date pickers */
  align-items: center;
}

.date-picker {
  width: 150px; /* Set a fixed width for each date picker */
}
</style>-->

<template>
  <div class="page-container">
    <date-pick
        v-model="date"
        :displayFormat="'DD.MM.YYYY'"
    ></date-pick>
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Attendance</router-link></li>
        <li><router-link to="/filter">Attendance Filter</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance</h1>

      <!-- Search Form -->
      <form @submit.prevent="onSearch" class="nav-search-bar">
        <div class="nav-dropdown">
          <select v-model="selectedCategory" class="nav-search-dropdown">
            <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=batch">Month</option> 
            <option value="search-alias=date">Date Range</option>
          </select>
        </div>
        <div v-if="selectedCategory === 'search-alias=month'" class="month-picker-container">
  <label for="monthPicker">Select Month:</label>
  <input id="monthPicker" v-model="selectedMonth" type="month" class="month-picker" />
</div>

        <div class="nav-input-container">
          <!-- Search by Name with Auto-Suggest -->
          <div v-if="selectedCategory === 'search-alias=name'" class="search-container">
            <input
              v-model="searchQuery"
              type="text"
              class="nav-input"
                placeholder="Search Student Name"
              @input="updateSearchResults"
            />
            <ul v-if="filteredStudentList.length > 0 && selectedCategory === 'search-alias=name'" class="search-results">
    <li v-for="(student, index) in filteredStudentList" :key="index" @click="selectStudent(student)">
      {{ student.userName }}
    </li>
  </ul>
          </div>
        

          <!-- Date Range Picker -->
          <div v-if="selectedCategory === 'search-alias=date'" class="date-picker-container">
    <input v-model="startDate" type="date" class="nav-input date-picker" />
    <input v-model="endDate" type="date" class="nav-input date-picker" />
  </div>
        </div>
       <!-- Month Picker -->
<div v-if="selectedCategory === 'search-alias=month'" class="month-picker-container">
  <label for="monthPicker">Select Month:</label>
  <input
    id="monthPicker"
    v-model="selectedMonth"
    type="month"
  
    class="nav-input month-picker"
  />
</div>

     <div v-if="selectedCategory !== 'search-alias=name' && selectedCategory !== 'search-alias=date'" class="search-container">
  <input v-model="searchQuery" type="text" class="nav-input" placeholder="Search Month" />
</div>



        
        <button type="submit" class="search-button">Search</button> 
      </form>

      <!-- Selected Student Display -->
      <div v-if="selectedStudentName" class="selected-student">
        <strong>Selected Student:</strong> {{ selectedStudentName }}
      </div>


    
      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

      <!-- Attendance Table -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
        
            <th>Attendance Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
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

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "search-alias=aps",
      searchQuery: "",
      startDate: "",
      endDate: "",
      selectedMonth: "",
      filteredBySearch: null, 
      selectedStudentName: null,
    //  selectedStudentMonth: null,
      filteredStudentList: [], 
      refreshInterval: null,
    };
  },
  watch: {
    selectedCategory(newValue) {
      if (newValue === "search-alias=aps") {
        this.resetSearchFields();
      }
    }
  },
  mounted() {
    this.fetchToday();
  },
  beforeUnmount() {
    clearInterval(this.refreshInterval); // Clear interval on component destroy
  },
  //..... computed: {
  //   ...mapGetters(["getStatus"]),
  //   todaystatus() {
  //     return this.getStatus;
  //   },
  //   filteredStudents() {
  //     let baseList = this.filteredBySearch ?? this.todaystatus;

  //     return baseList.filter((student) => {
  //       if (this.startDate && this.endDate) {
  //         return (
  //           new Date(student.attendanceDate) >= new Date(this.startDate) &&
  //           new Date(student.attendanceDate) <= new Date(this.endDate)
  //         );
  //       }
  //       return true;
  //     });
  //   },
  // ... },
  computed: {
  ...mapGetters(["getStatus", "getAnotherStatus"]),
  todaystatus() {
    return this.getStatus;
  },
   filteredStudents() {
    let filteredList = this.todaystatus;

    // Apply name filter if a student is selected
    if (this.searchQuery) {
      filteredList = filteredList.filter(student =>
        student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }


    // Apply date filter if both startDate and endDate are selected
    // if (this.startDate && this.endDate) {
    //   const start = new Date(this.startDate);
    //   const end = new Date(this.endDate);
    //   console.log("Start Date:", start);
    //   console.log("End Date:", end);
    //   filteredList = filteredList.filter(student => {
    //     const studentDate = new Date(student.attendanceDate);

    //     console.log("Student Date:", studentDate);
    //     return studentDate >= start && studentDate <= end;
    //   });
    // }
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      filteredList = filteredList.filter(student => {
        const studentDate = new Date(student.attendanceDate);
        return studentDate >= start && studentDate <= end;
      });
    }
   if (this.selectedCategory === 'search-alias=month' && this.searchQuery) {
      const monthName = this.searchQuery.toLowerCase(); // Convert to lowercase for case-insensitive search
      filteredList = filteredList.filter(student => {
        const studentDate = new Date(student.attendanceDate);
        const studentMonthName = studentDate.toLocaleString('default', { month: 'long' }).toLowerCase(); // Get the full month name
        return studentMonthName.includes(monthName); // Match month name
      });
    }
   
    
    if(this.selected === 'search-alias=date'){
      //api from backend by deva
 
    //    if (this.selectedCategory === "search-alias=date" && this.startDate && this.endDate) {
    //     filteredList = this.filteredByDate(filteredList);
        
    //  }async filterByDate() {
      if (this.selectedCategory === "search-alias=date" && this.startDate && this.endDate) {
        const payload = {
          startDate: this.startDate,
          endDate: this.endDate
        };
        try {
        this.$store.dispatch("fetchFilter",payload);
       } catch (error) {
         console.error(error);
       }
        console.log("Calling fetchFilter action with payload:", payload);
       }

    }

    return filteredList;
  },
},
 // methods: {
  //   async fetchToday() {
  //     try {
  //       await this.$store.dispatch("fetchToday");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   printPage() {
  //     const exportButton = document.querySelector(".export-btn");
  //     exportButton.style.display = "none";
  //     window.print();
  //     setTimeout(() => {
  //       exportButton.style.display = "block";
  //     }, 1000);
  //   },
  //   formatDate(date) {
  //     const [year, month, day] = date.split("-");
  //     return `${day}/${month}/${year}`;
  //   },
  //   updateSearchResults() {
  //     if (this.searchQuery.length > 0) {
  //       this.filteredStudentList = this.todaystatus
  //         .filter((student) => student.userName.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
  //         .sort((a, b) => a.userName.localeCompare(b.userName)); 
  //     } else {
  //       this.filteredStudentList = [];
  //     }
  //   },
  //   selectStudent(student) {
  //     this.selectedStudentName = student.userName;
  //     this.filteredBySearch = [student];
  //     this.filteredStudentList = [];
  //     this.searchQuery = student.userName; 
  //   },
  //   onSearch() {
  //     if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
  //       this.filteredBySearch = this.todaystatus
  //         .filter((student) => student.userName.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
  //         .sort((a, b) => a.userName.localeCompare(b.userName)); 

  //       if (this.filteredBySearch.length > 0) {
  //         this.selectedStudentName = this.filteredBySearch[0].userName;
  //       } else {
  //         this.selectedStudentName = null;
  //       }
  //     }
  //   },
  // },
  
  methods: {
    async fetchToday() {
      try {
        await this.$store.dispatch("fetchToday");
      } catch (error) {
        console.error(error);
      }
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(() => {
        console.log("Refreshing attendance data...");
        this.fetchToday(); // Auto-fetch data every 30 seconds
      }, 10000); // Adjust the interval as needed
    },
    printPage() {
      const exportButton = document.querySelector(".export-btn");
      exportButton.style.display = "none";
      window.print();
      setTimeout(() => {
        exportButton.style.display = "block";
      }, 1000);
    },
    //.... formatDate(date) {
    //   const [year, month, day] = date.split("-");
    //   return `${day}/${month}/${year}`;
    //... },
    formatDate(date) {
    const dateObj = new Date(date);
    const day = ("0" + dateObj.getDate()).slice(-2); 
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); 
    const year = dateObj.getFullYear(); 
    return `${day}/${month}/${year}`; 
  },
    updateSearchResults() {
      if (this.searchQuery.length > 0) {
        this.filteredStudentList = this.todaystatus
          .filter((student) => student.userName.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
          .sort((a, b) => a.userName.localeCompare(b.userName));
      } else {
        this.filteredStudentList = [];
      }
    },
    selectStudent(student) {
      this.selectedStudentName = student.userName;
      this.filteredBySearch = [student];
      this.filteredStudentList = [];
      this.searchQuery = student.userName;
    },
    //.... onSearch() {
    //   if (this.selectedCategory === "All") {
    //     this.resetSearchFields();
    //     return;
    //   }

    //   if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
    //     this.filteredBySearch = this.todaystatus
    //       .filter((student) => student.userName.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
    //       .sort((a, b) => a.userName.localeCompare(b.userName));

    //     if (this.filteredBySearch.length > 0) {
    //       this.selectedStudentName = this.filteredBySearch[0].userName;
    //     } else {
    //       this.selectedStudentName = null;
    //     }
    //   }
    // },
    // resetSearchFields() {
    //   this.searchQuery = "";
    //   this.startDate = "";
    //   this.endDate = "";
    //   this.filteredBySearch = null;
    //   this.selectedStudentName = null;
    //   this.filteredStudentList = [];
    //...... },


  
  onSearch() {
    
    if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
      this.filteredBySearch = this.todaystatus.filter(student =>
        student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.filteredBySearch.length > 0) {
        this.selectedStudentName = this.filteredBySearch[0].userName;
      } else {
        this.selectedStudentName = null;
      }
    }
   
    console.log("Search Triggered:", this.selectedCategory, this.selectedMonth);

if (this.selectedCategory === "search-alias=month") {
  console.log("Filtering by month:", this.selectedMonth);
  this.filteredStudents; 
}

if (this.selectedCategory === "search-alias=aps") {
  this.resetSearchFields();
}
  },

  resetSearchFields() {
    this.searchQuery = "";
    this.startDate = "";
    this.endDate = "";
    this.selectedMonth = "";
    this.selectedStudentName = null;
    this.filteredBySearch = null;
  },
},



};

</script>

<style scoped>
/* Search Results Dropdown */
.search-container {
  position: relative;
}

.search-results {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 8px;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #f0f0f0;
}

/* Selected Student Name Display */
.selected-student {
  margin-top: 10px;
  padding: 10px;
  background-color: #eef;
  border-radius: 5px;
  font-weight: bold;
}
.page-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  padding: 20px;
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
  background: #99d2f8;  
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
  color: #68caff;
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
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.export-btn:hover {
  background-color: #74c1f5;
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
  background: #4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
}

/* Status Coloring */
/* .status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(185, 185, 242);
  font-weight: bold;
} */

/* Print Styling */
@media print {
  .export-btn {
    display: none;
  }
}

/* Navigation Bar Styling */
.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 500%;
  max-width: 800px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 120px;
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  
}
.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center; /* Center the elements vertically */
}

.nav-input {
  width: 100%;
  padding: 6px 8px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  color:#0a0a0a;

}

.date-range-container {
  display: flex;
  gap: 8px; /* Reduced gap */
  width: 100%;
  align-items: center; /* Center the elements vertically */

}

.nav-dropdown select {
  padding: 6px; /* Reduced padding */
  font-size: 14px; /* Smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px;
  }

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;

}

.nav-search-submit {
  padding: 6px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Smaller font size */
  
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  
}

.nav-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Reduced max-width for a smaller search bar */
  background-color: #9fdcfc; /* Lighter background color */
  padding: 8px;
  border-radius: 5px;
  gap: 8px; /* Reduced gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added light shadow */
}

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 5px 8px; /* Smaller padding */
  font-size: 13px; /* Slightly smaller font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* Removes default dropdown arrow */
  width: 100px; /* Adjusted width */
 
}

.nav-dropdown::after {
  content: '\f0d7'; /* FontAwesome down arrow icon */
  font-family: 'FontAwesome';
  font-size: 13px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgb(43, 156, 255);
}

.nav-input-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
 
}

/* .nav-input {
  width: 100%;
  padding: 5px 10px;
  font-size: 13px; 
  border: 1px solid #ccc;
  border-radius: 5px;
} */

/* .date-range-container {
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  
} */

.nav-search-submit {
  padding: 5px 12px; /* Reduced padding */
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px; /* Slightly smaller font size */
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-search-submit:focus {
  outline: none; /* Remove outline on focus */
}

.nav-dropdown select:focus,
.nav-input:focus {
  border-color: #7ec7ec; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 115, 230, 0.3); /* Subtle focus shadow */
}
.date-picker-container {
  display: flex;
  gap: 10px; /* Adds spacing between the date pickers */
  align-items: center;
}

.date-picker {
  width: 150px; /* Set a fixed width for each date picker */
}
/* Month Picker Container */
.month-picker-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

/* Month Picker Input */
.month-picker {
  width: 180px;
  padding: 8px 12px;
  font-size: 16px;
  border: 2px solid #4FC3F7;
  border-radius: 5px;
  background-color: #f9fcff;
  color: #333;
  cursor: pointer;
  text-align: center;
}

/* Ensure both search field and month picker are visible */
.nav-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

</style>




