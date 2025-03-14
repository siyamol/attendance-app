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
      <h1 class="page-title">Attendance</h1>

        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
        </div>
     

      <form @submit.prevent="onSearch" class="nav-search-bar">
     
        <div class="nav-dropdown">
          <select v-model="selectedBatchName" class="batch-filter-container" required> 
  <option value="">Select Batch</option>
  <option v-for="batch in batches" :key="batch.id" :value="batch.id">
    {{ batch.batchName }}
  </option>
</select> 
          <!-- <select v-model="selectedBatch" class="nav-search-dropdown">
            <option value="">Select Batch</option>
            <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.batchName }}</option>
          </select> -->
          <!-- <select v-model="selectedCategory" class="nav-search-dropdown"> -->
            <!-- <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=batch">Batch</option> -->
          <!-- </select>  -->
        </div> 

        <!-- <div v-if="selectedCategory === 'search-alias=batch'" class="batch-filter-container"> -->
          <!-- <select v-model="selectedBatchName" class="nav-search-dropdown"> -->
            <!-- <option value="">Select Batch</option> -->
            <!-- <option v-for="batch in batchNames" :key="batch.id" :value="batch.id">{{ batch.batchName }}</option>
          </select> -->
          
        <!-- </div> -->
        <!-- <button type="submit" class="search-button">Search</button> -->
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in attendanceRecords" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ student.batchId }}</td>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      // selectedBatch: '', 
      selectedBatchType: "all",
      selectedBatchName: "",
      searchQuery: "",
      filteredStudentList: [],
      selectedStudentName: null,
      showBatchNameDropdown: false,
    };
  },
  computed: {
    ...mapGetters(["getBatchid", "getBatchType", "getAttendanceRecords"]),
    batches() {
      return this.getBatchid; 
    },
    attendanceRecords(){
      return this.getAttendanceRecords;
    },
    // filteredStudents() {
    //   let filteredList = this.getAttendanceRecords;

    //   if (this.selectedBatchType === "custom" || this.selectedBatchType === "regular") {
    //     if (this.selectedBatchName) {
    //       filteredList = filteredList.filter((student) => student.batchId === this.selectedBatchName);
    //     }
    //   }

    //   if (this.searchQuery && this.selectedBatchType === "name") {
    //     filteredList = filteredList.filter((student) =>
    //       student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
    //     );
    //   }

    //   return filteredList;
    // },
  },
  methods: {
    ...mapActions(['fetchAllBatches', 'fetchAttendanceRecords']),
    async onSearch() {
       if (this.selectedBatch) {
         await this.fetchAttendanceRecords(this.selectedBatch); 
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
      const dateObj = new Date(date);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
   async mounted() {
     await this.fetchAllBatches(); // Fetch batches when the component is mounted
  },
  watch:{
    async selectedBatchName(newBatch) {
      if(newBatch) {
        await this.$store.dispatch('fetchAtn',newBatch)
      }
    }
  }

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

/* Batch Filter Container */
.batch-filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
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

@media print {
  .export-btn {
    display: none;
  }
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
  max-width: 800px;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
}
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #cfccfc;
  padding: 5px;
  border-radius: 8px;
  background-color: #dffbfb;
  flex: 1; 
  max-width: 250px; 
}

.search-bar input {
  padding: 8px;
  width: 100%;
  height: 25px;
  border: none;
  border-radius: 4px;
  outline: none;
}


.batch-dropdown {
  width: 200px; 
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #cfccfc;
  padding: 5px;
  border-radius: 8px;
  background-color: #dffbfb;
  flex: 1; 
  max-width: 250px; 
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
  appearance: none;
  width: 120px;
}

.nav-dropdown::after {
  content: '\f0d7';
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
  align-items: center;
}

.nav-input {
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #0a0a0a;
}

.search-button {
  padding: 6px 12px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.search-button:hover {
  background-color: #005bb5;
}
</style>