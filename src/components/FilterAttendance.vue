<!-- 
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
        <h1 class="page-title">Attendance Filter</h1>
  

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
        <div v-if="selectedCategory === 'search-alias=date'" class="date-picker-container">
      <input v-model="startDate" type="date" class="nav-input date-picker" />
      <input v-model="endDate" type="date" class="nav-input date-picker" />
    </div>
          </div>
   
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="index">
              <td>{{ student.userName }}</td>
              <td>{{ student.batchType }}</td>
              <td>{{ formatDate(student.attendanceDate) }}</td>
              <td>{{ student.scanInTime }}</td>
              <td>{{ student.scanOutTime }}</td>
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
       filteredStudentList: [], 
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
    computed: {
    ...mapGetters(["getStatus", "getAnotherStatus"]),
    todaystatus() {
      return this.getStatus;
    },
     filteredStudents() {
      let filteredList = this.todaystatus;
  
  
      if (this.searchQuery) {
        filteredList = filteredList.filter(student =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
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
    color:#0a0a0a;
  
  }
  
  .date-range-container {
    display: flex;
    gap: 8px; 
    width: 100%;
    align-items: center; 
  }
  
  .nav-dropdown select {
    padding: 6px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    appearance: none; 
    width: 100px;
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
  
  .nav-search-submit {
    padding: 6px 12px; 
    background-color: #0073e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px; 
    
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
    max-width: 500px; 
    background-color: #9fdcfc;
    padding: 8px;
    border-radius: 5px;
    gap: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  }
  
  .nav-dropdown {
    position: relative;
    display: inline-block;
  }
  
  .nav-dropdown select {
    padding: 5px 8px;
    font-size: 13px; 
    border: 1px solid #ccc;
    border-radius: 5px;
    appearance: none; 
    width: 100px; 
   
  }
  
  .nav-dropdown::after {
    content: '\f0d7'; 
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


  .nav-search-submit {
    padding: 5px 12px; 
    background-color: #0073e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px; 
  }
  
  .nav-search-submit:hover {
    background-color: #005bb5;
    
  }
  
  .nav-search-submit:focus {
    outline: none;
  }
  
  .nav-dropdown select:focus,
  .nav-input:focus {
    border-color: #7ec7ec;
    box-shadow: 0 0 5px rgba(0, 115, 230, 0.3); 
  }
  .date-picker-container {
    display: flex;
    gap: 10px; 
    align-items: center;
  }
  
  .date-picker {
    width: 150px; 
  }
 
  .month-picker-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  

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
  .nav-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
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
        <li><router-link to="/filter">Attendance Filter</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance Filter</h1>
      
      <form @submit.prevent="onSearch" class="nav-search-bar">
        <select v-model="selectedCategory" class="nav-search-dropdown">
          <option value="search-alias=aps">All</option>
          <option value="search-alias=name">Name</option>
          <option value="search-alias=month">Month</option>
          <option value="search-alias=date">Date Range</option>
        </select>

        <div v-if="selectedCategory === 'search-alias=name'">
          <input v-model="searchQuery" type="text" placeholder="Search Student Name" @input="updateSearchResults" />
          <ul v-if="filteredStudentList.length">
            <li v-for="(student, index) in filteredStudentList" :key="index" @click="selectStudent(student)">
              {{ student.userName }}
            </li>
          </ul>
        </div>
        
        <div v-if="selectedCategory === 'search-alias=month'">
          <input v-model="selectedMonth" type="month" />
        </div>

        <div v-if="selectedCategory === 'search-alias=date'">
          <input v-model="startDate" type="date" />
          <input v-model="endDate" type="date" />
        </div>
        
        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Attendance Date</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
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
      selectedStudentName: null,
      filteredStudentList: [],
    };
  },
  computed: {
    ...mapGetters(["getStatus"]),
    filteredStudents() {
      let filteredList = this.getStatus;
      
      if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
        filteredList = filteredList.filter(student =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      if (this.selectedCategory === "search-alias=month" && this.selectedMonth) {
        const selectedYearMonth = this.selectedMonth;
        filteredList = filteredList.filter(student => {
          const studentYearMonth = new Date(student.attendanceDate).toISOString().slice(0, 7);
          return studentYearMonth === selectedYearMonth;
        });
      }
      
      if (this.selectedCategory === "search-alias=date" && this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        filteredList = filteredList.filter(student => {
          const studentDate = new Date(student.attendanceDate);
          return studentDate >= start && studentDate <= end;
        });
      }
      
      return filteredList;
    },
  },
  watch: {
    selectedMonth() {
      this.onSearch();
    }
  },
  methods: {
    onSearch() {
      if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
        this.filteredStudentList = this.getStatus.filter(student =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    selectStudent(student) {
      this.selectedStudentName = student.userName;
      this.searchQuery = student.userName;
      this.filteredStudentList = [];
    },
    formatDate(date) {
      const d = new Date(date);
      return ("0" + d.getDate()).slice(-2) + "/" + 
       ("0" + (d.getMonth() + 1)).slice(-2) + "/" + 
       d.getFullYear();

    }
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
  background: #8ddbf7;
  padding: 20px;
}
.sidebar h2 {
  font-size: 20px;
  color: white;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: rgb(204, 238, 245);
}
.page-title {
  text-align: center;
  font-size: 28px;
  color: #68caff;
}
input, select {
  padding: 8px;
  border: 1px solid #a5b9f4;
  border-radius: 4px;
  width: 250px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #a9e6fb;
  padding: 12px;
  text-align: center;
}
th {
  background: #4FC3F7;
  color: white;
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
background: #99d2f8;  

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
        <li><router-link to="/filter">Attendance Filter</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance Filter</h1>
      
      <form @submit.prevent="onSearch" class="nav-search-bar">
        <div class="nav-dropdown">
          <select v-model="selectedCategory" class="nav-search-dropdown">
            <option value="search-alias=aps">All</option>
            <option value="search-alias=name">Name</option>
            <option value="search-alias=month">Month</option>
            <option value="search-alias=date">Date Range</option>
          </select>
        </div>

        <div v-if="selectedCategory === 'search-alias=name'" class="search-container">
          <input v-model="searchQuery" type="text" class="nav-input" placeholder="Search Student Name" @input="updateSearchResults" />
          <ul v-if="filteredStudentList.length" class="search-results">
            <li v-for="(student, index) in filteredStudentList" :key="index" @click="selectStudent(student)">
              {{ student.userName }}
            </li>
          </ul>
        </div>
        
        <div v-if="selectedCategory === 'search-alias=month'" class="month-picker-container">
          <label for="monthPicker">Select Month:</label>
          <input id="monthPicker" v-model="selectedMonth" type="month" class="month-picker" />
        </div>

        <div v-if="selectedCategory === 'search-alias=date'" class="date-picker-container">
          <input v-model="startDate" type="date" class="nav-input date-picker" />
          <input v-model="endDate" type="date" class="nav-input date-picker" />
        </div>
        
        <button type="submit" class="search-button">Search</button>
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
   
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
         
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
      selectedCategory: "search-alias=aps",
      searchQuery: "",
      startDate: "",
      endDate: "",
      selectedMonth: "",
      selectedStudentName: null,
      filteredStudentList: [],
    };
  },
  computed: {
    filteredStudents() {
      let filteredList = this.students;
      if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
        filteredList = filteredList.filter(student =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory === "search-alias=month" && this.selectedMonth) {
        const selectedYearMonth = this.selectedMonth;
        filteredList = filteredList.filter(student => {
          const studentYearMonth = new Date(student.attendanceDate).toISOString().slice(0, 7);
          return studentYearMonth === selectedYearMonth;
        });
      }
      if (this.selectedCategory === "search-alias=date" && this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        filteredList = filteredList.filter(student => {
          const studentDate = new Date(student.attendanceDate);
          return studentDate >= start && studentDate <= end;
        });
      }
      return filteredList;
    },
  },
  methods: {
    onSearch() {
      if (this.selectedCategory === "search-alias=name" && this.searchQuery) {
        this.filteredStudentList = this.students.filter(student =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    printPage() {
  const exportButton = document.querySelector(".export-btn");
  exportButton.style.display = "none"; // Hide the button before printing
  window.print(); // Open the print dialog
  setTimeout(() => {
    exportButton.style.display = "block"; // Show the button again after printing
  }, 1000);
},
    selectStudent(student) {
      this.selectedStudentName = student.userName;
      this.searchQuery = student.userName;
      this.filteredStudentList = [];
    },
    formatDate(date) {
      const d = new Date(date);
      return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    }
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
  background: #8ddbf7;
  padding: 20px;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: rgb(204, 238, 245);
}

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
@media print {
  .export-btn {
    display: none;
  }
}
 </style>-->
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
      </ul>
    </div>

    <div class="main-content">
      <h1 class="page-title">Attendance Filter</h1>

      <form @submit.prevent="onSearch" class="nav-search-bar">
        <!-- Student Name Search Field -->
        <div class="filter-container">
          <label class="filter-label">Select a Student</label>
           <input 
            v-model="searchQuery" 
            type="text" 
            class="nav-input" 
            placeholder="Enter Student Name" 
            @input="updateSearchResults" 
          />
          <ul v-if="filteredStudentList.length" class="search-results">
            <li v-for="(student, index) in filteredStudentList" :key="index" @click="selectStudent(student)">
              {{ student.userName }}
            </li>
          </ul>
        </div> 
        <!-- <select v-model="selectedStudent" class="nav-input">
            <option value="" disabled>Select a student</option>
            <option v-for="student in students" :key="student.userId" :value="student">
              {{ student.userName }}
            </option>
          </select>
        </div> -->
        <!-- Date Range Picker (Always Visible) -->
        <div class="date-range-container">
          <label class="filter-label"></label>
          <div class="date-picker-wrapper">
            <input v-model="startDate" type="date" class="nav-input date-picker" placeholder="Start Date" />
            <input v-model="endDate" type="date" class="nav-input date-picker" placeholder="End Date" />
          </div>
        </div>
        <button type="submit" class="nav-search-submit" @click="onSearch">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
</button>



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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredAttendance" :key="index">


            <td>{{ student.userName }}</td>
            <td>{{ student.batchType }}</td>
            <td>{{ formatDate(student.attendanceDate) }}</td>
            <td>{{ student.scanInTime }}</td>
            <td>{{ student.scanOutTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
export default {
  data() {
    return {
      searchQuery: "",
      selectedStudent: null, // Store the selected student
      startDate: this.getDefaultStartDate(),
      endDate: this.getDefaultEndDate(),
      filteredStudentList: [],
     
    };
  },
  //   selectedStudent: null, // Store the selected student object
  //     startDate: this.getDefaultStartDate(),
  //     endDate: this.getDefaultEndDate(),
  //   };
  // },
  computed: {
    ...mapGetters(['filteredAttendance']),
    // filtered() {
    //   let filteredList = this.students;
    //   if (this.selectedStudent) {
    //     filteredList = filteredList.filter(student =>
    //       student.userName.toLowerCase().includes(this.selectedStudent.toLowerCase())
    //     );
    //   }
    //  if (this.startDate && this.endDate) {
    //     const start = new Date(this.startDate);
    //     const end = new Date(this.endDate);
    //     filteredList = filteredList.filter(student => {
    //       const studentDate = new Date(student.attendanceDate);
    //       return studentDate >= start && studentDate <= end;
    //     });
    //   }

    //   return filteredList;
    // }
  },
  methods: {
    // ...mapActions(['fetchStudents', 'fetchAttendance']),
    // updateSearchResults() {
    //   if (!this.searchQuery) {
    //     this.filteredStudentList = [];
    //     return;
    //   }
    updateSearchResults() {
      if (!this.searchQuery) {
        this.filteredStudentList = [];
        return;
      }
      this.filteredStudentList = this.students.filter(student =>
        student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    
  },
  selectStudent(student) {
      this.selectedStudent = student;
      this.searchQuery = student.userName;
      this.filteredStudentList = [];
    },
    async onSearch() {
      if (!this.selectedStudent) {
        alert("Please select a student");
        return;
      }
      await this.$store.dispatch('fetchAttendance', {
        userId: this.selectedStudent.userId,
        startDate: this.startDate,
        endDate: this.endDate
      });
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
      const d = new Date(date);
      return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    },
    getDefaultStartDate() {
      let today = new Date();
      today.setDate(today.getDate() - 7); // Set default start date to 7 days ago
      return today.toISOString().split("T")[0];
    },
    getDefaultEndDate() {
      return new Date().toISOString().split("T")[0]; // Default end date is today
    }
  },
  // onSearch() {
   
  //   if (!this.searchQuery.trim()) {
  //     alert("Please enter a search query");
  //     return;
  //   }

  //   this.filteredStudents = this.students.filter(student =>
  //     student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // },
  async created() {
    await this.$store.dispatch('fetchStudents');
  }
};
</script>

<style scoped>

.filter-container {
  display: flex;
  flex-direction: column;

}

.filter-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  width: 145px;
}

.date-range-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;
}

.date-picker-wrapper {
  display: flex;
  gap: 10px;
}

.date-picker {
  width: 100px;
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


.export-btn-container {
  text-align: right;
  margin-bottom: 20px;
}

.export-btn {
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.export-btn:hover {
  background-color: #74c1f5;
}

@media print {
  .export-btn {
    display: none;
  }
}
.page-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background: #8ddbf7;
  padding: 20px;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: rgb(204, 238, 245);
}


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


.selected-student {
  margin-top: 1px;
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
  color:#0a0a0a;

}

.date-range-container {
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center; 

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

.nav-search-submit {
  padding: 6px 12px; 
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; 
  
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
  max-width: 550px; 
  background-color: #9fdcfc; 
  padding: 8px;
  border-radius: 5px;
  gap: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown select {
  padding: 5px 8px; /* Smaller padding */
  font-size: 13px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; 
  width: 100px;
 
}

.nav-dropdown::after {
  content: '\f0d7'; 
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



.nav-search-submit {
  padding: 5px 12px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px; 
}

.nav-search-submit:hover {
  background-color: #005bb5;
  
}

.nav-search-submit:focus {
  outline: none; 
}
/* 
.nav-dropdown select:focus,
.nav-input:focus {
  border-color: #7ec7ec;
  box-shadow: 0 0 5px rgba(0, 115, 230, 0.3);
} */
.date-picker-container {
  display: flex;
  gap: 10px; 
  align-items: center;
}

.date-picker {
  width: 150px; 
}




.nav-search-submit {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  box-shadow: none;
}


.nav-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
@media print {
  .export-btn {
    display: none;
  }
}
.nav-search-submit {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-search-submit svg {
  width: 20px;
  height: 20px;
  color: #fffeff;
  transition: transform 0.2s ease-in-out;
}

.nav-search-submit:hover svg {
  transform: scale(1.1);
  color: #ffffff;
}

.search-results {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 20%;
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

.filter-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.filter-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.nav-input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}

.date-range-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.date-picker-wrapper {
  display: flex;
  gap: 10px;
}

.date-picker {
  width: 150px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}

.nav-search-submit {
  padding: 8px 16px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.nav-search-submit:hover {
  background-color: #005bb5;
}

.export-btn-container {
  text-align: right;
  margin-bottom: 20px;
}

.export-btn {
  background: #64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.export-btn:hover {
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
  border: 1px solid #a9e6fb;
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

</style>