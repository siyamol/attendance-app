<!-- 
<template>
    <div>
       <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand"></a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/homepage" class="navbar-brand nav-link text-dark">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="book" class="navbar-brand nav-link text-dark">Adminmainpage</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/adm" class="navbar-brand nav-link text-dark">AdminLogin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tlist" class="navbar-brand nav-link text-dark">contact</router-link>
            </li>
          </ul>
        </div>
      </nav> 
      <h1 class="thr">Late Request</h1>
      <div class="search-bar ms-5">
        <div class="search">
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            <input v-model="searchText" type="text" placeholder="Search" @input="search" />
          </div>
          
        </div>
         <input type="text" v-model="searchText" placeholder="Search by Name, Class, or Subject">
        <i class="fa fa-search" aria-hidden="true"></i>  
         Removed Font Awesome search icon  
      </div>
      <table>
      <thead>
          <tr>
           
            <th>Name</th>
            <th>Batch</th>
            <th>Reason for Late</th>
            
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.id }}</td>
            <td>
              <input type="text" v-model="student.studentName" :disabled="!student.editMode">
            </td>
            <td>
              <input type="text" v-model="student.email" :disabled="!student.editMode">
            </td>
            <td>
              <input type="text" v-model="student.standard" :disabled="!student.editMode">
            </td>
            <td>
              <input type="text" v-model="student.division" :disabled="!student.editMode">
            </td>
            <td>
              <input type="text" v-model="student.subject" :disabled="!student.editMode">
            </td>
           <td>
          <input type="text" v-model="teacher.teacherID" :disabled="!teacher.editMode">
            </td>
             <td>
          <input type="text" v-model="teacher.bookID" :disabled="!teacher.editMode">
             </td>
            <td> 
              <button v-if="!student.editMode" @click="toggleEditMode(index)">Approve</button>
              <button v-else @click="submitEdit(index)">Submit</button>
            </td>
            <td>
              <button @click="denyStudentreq(index)">Deny</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        teachers: [
           { id: 1, name: 'John Doe', email: 'cya@gmail.com', subject: 'Maths', class: '5th', division: 'A', editMode: false },
           { id: 2, name: 'Jane Smith', email: 'jane@gmail.com', subject: 'English', class: '6th', division: 'A', editMode: false },
           { id: 3, name: 'Alice Johnson', email: 'alice@gmail.com', subject: 'Science', class: '7th', division: 'C', editMode: false },
           { id: 4, name: 'Bob Johnson', email: 'bob2@gmail.com', subject: 'Art', class: '8th', division: 'A', editMode: false },
           { id: 5, name: 'Emily Brown', email: 'emily@gmail.com', subject: 'History', class: '9th', division: 'B', editMode: false },
           { id: 6, name: 'Michael Clark', email: 'clark@gmail.com', subject: 'Music', class: '10th', division: 'A', editMode: false }
        ],
        searchText: ''
      };
    },
    computed: {
        filteredTeachers() {
        if(this.searchText !== '')
        {
          return this.students.filter(student =>
          student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.standard.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.subject.toLowerCase().includes(this.searchText.toLowerCase()) 
        );
        } else
        return this.students; 
      }
    },
    mounted(){
  this.getteachers();
    },
    methods: {
      toggleEditMode(index) {
        this.students[index].editMode = !this.students[index].editMode;
      },
      async submitEdit(index) {
        this.toggleEditMode(index); 
        try{
              const student=this.students[index];
  
              const response = await axios.put(`http://192.168.1.11:8080/api/${student.id}`,{
                
                "studentName" :student.studentName,
                "standard":student.standard,
                "division":student.division,
                "subject":student.subject,
              });
              if(response.status===200){
                alert('successfully updated')
                this.students[index].editable = false;
                this.getteachers();
              }
            }
            catch(error){
  console.error(error)
            }
             
      },
      async deleteStudent(index) {
        try{
          const studentid=this.students[index].id
          const response = await axios.delete(`http://192.168.1.11:8080/api/${studentid}`, {
          })
          if (response.status===200){
            alert('successfully deleted')
            this.getteachers()
          }
        }
          catch(error){
          alert(error)
          console.error(error)
        }
      },
      async getteachers(){
  try{
    const response = await axios.get('http://192.168.1.11:8080/api/allTeachers')
    if(response.status===200){
      this.students = response.data
    }                                                                                             
  }
  catch(error){
    console.error(error)
  }
     },
     
    }
  };
  </script>
  
  <style scoped>
  
  table {
    width: 70%;
    border-collapse: collapse;
    margin-top: 100px;
    margin-left: 250px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  table input[type="text"] { 
    border: none; /* Remove the border */
    outline: none; /* Remove the outline box */
    width: 100%; /* Expand the input field to fill the available space */
    padding: 4px; /* Add some padding to the input field */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }
  
  .thr {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 2px;
    padding: 8px;
  }
  

  table button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }
  .navbar {
    background-color: #f4c807;
    color: #150101;
    padding: 5px 0;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  .navbar-brand {
    font-size: 1.5rem;
    text-decoration: white;
    color: #fff;
  }
  
  .navbar-nav {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    display: flex;
  }
  
  .nav-item {
    margin-right: 20px;
  
  }
  
  .nav-link {
    text-decoration:white;
    color: #fff;
  }
  
  .search-bar {
    width: 250px;
    border: none; /* Remove the border */
    border-bottom: 1px solid black; /* Add bottom border */
  }
  
  .search-bar input[type="text"] {
    border: none; /* Remove border */
    outline: none; /* Remove outline */
    width: 100%; /* Full width */
    padding: 4px; /* Add padding */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }
  
  /* Rest of your CSS */
  
  .search-bar {
    display: flex;
    align-items: center;
    width: 250px;
    border: none; /* Remove the border */
    border-bottom: 1px solid black; /* Add bottom border */
  }
  
  .search-bar input[type="text"] {
    border: none; /* Remove border */
    outline: none; /* Remove outline */
    width: calc(100% - 30px); /* Full width minus space for icon */
    padding: 4px; /* Add padding */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }
  
  .search-bar i {
    margin-left: 5px; /* Adjust icon spacing */
  }
  
  /* Rest of your CSS */
</style> 




<template>
  <div>
    <h1 class="thr">student Details</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
        <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Date</th>
        
          <th class="status-column">Today's Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td>{{ student.batch }}</td>
          <td>{{ student.date }}</td>
          <td>{{ student.reasonforlate }}</td>
          <td>
            <div v-if="student.status !== 'Approved' && student.status !== 'Denied'" class="status-buttons">
              <button @click="approveStudent(index)" class="approve-btn">Approve</button>
              <button @click="denyStudentreq(index)" class="deny-btn">Deny</button>
            </div>
            <div v-else>
              <span :class="getStatusClass(student.status)">{{ student.status }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18' },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19' },
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20' },
      ],
      searchText: '',
      selectedDate: '',
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = this.selectedDate ? student.date === this.selectedDate : true;
        return matchesName && matchesDate;
      });
    }
  },
  methods: {
    search() {

    },
    approveStudent(index) {
      this.students[index].status = 'Approved';
    },
    denyStudentreq(index) {
      this.students[index].status = 'Denied';
    },
    getStatusClass(status) {
      if (status === 'Approved') return 'status-approved';
      if (status === 'Denied') return 'status-denied';
      return '';
    }
  }
};
</script>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  padding: 8px;
  width: 250px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: transparent;
  width: 120px;
  border-radius: 4px;
}

table {
  width: 90%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Ensure fixed column width */
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}
button {
  border: 1px solid #ddd;
  padding: 6px 12px; /* Reduced padding for smaller buttons */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px; /* Reduced width */
  font-size: 12px; /* Smaller text */
}

button:hover {
  transform: scale(1.05);
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background-color: green;
}

.deny-btn {
  background-color: red;
}

.status-approved {
  color: green;
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: red;
  font-weight: bold;
  font-size: 14px;
}

.thr {
  text-align: center;
  margin-top: 10px;
  font-size: 28px;
  color: #333;
}

.icon {
  margin-right: 10px;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

/* Fixed column widths */
th:nth-child(1), td:nth-child(1),
th:nth-child(2), td:nth-child(2),
th:nth-child(3), td:nth-child(3),
th:nth-child(5), td:nth-child(5) {
  width: 150px; /* Same width for these columns */
}

th.reason-column, td.reason-column {
  width: 250px; /* Make the Reason for Late column wider */
}
 </style>






<template>
  <div>
    <h1 class="page-title">Admin Student Details</h1>
    <div class="search-bar-container">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Email</th>
          <th class="status-column">Today's Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.name }}</td>
          <td>{{ student.batch }}</td>
          <td>{{ student.email }}</td>
          <td>
            <span :class="getStatusClass(student.status)">
              {{ student.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      students: [
        { name: 'Siya', batch: 'Morning', email: 'siya@example.com', status: 'Present' },
        { name: 'Reshma', batch: 'Morning', email: 'reshma@example.com', status: 'Absent' },
        { name: 'Deva', batch: 'Evening', email: 'deva@example.com', status: 'Present' },
      ],
      searchText: '',
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    getStatusClass(status) {
      if (status === 'Present') return 'status-present';
      if (status === 'Absent') return 'status-absent';
      return '';
    }
  }
};
</script>
<style scoped>
.page-title {
  text-align: center;
  font-size: 28px;
  margin-top: 10px;
  color: #333;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  padding: 8px;
  width: 250px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
}

table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #4CAF50;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

.status-present {
  color: green;
  font-weight: bold;
}

.status-absent {
  color: red;
  font-weight: bold;
}
</style>


<template>
  <div>
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
        <input id="dateFilter" v-model="selectedDate" type="date" />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Email</th>
          <th>Date</th>
          <th class="status-column">Today's Status</th>
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
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        // Name filter
        const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
        // Batch filter
        const matchesBatch = this.selectedBatch === '' || student.batch === this.selectedBatch;
        // Date filter
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
  },
};
</script>
<style scoped>
.page-title {
  text-align: center;
  font-size: 28px;
  margin-top: 10px;
  color: #333;
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
  margin: 10px;
}

input, select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #4CAF50;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

.status-present {
  color: green;
  font-weight: bold;
}

.status-absent {
  color: red;
  font-weight: bold;
}
</style>

ok


<template>
  <div>
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
        <input id="dateFilter" v-model="selectedDate" type="date" />
      </div>
    </div>

  
    <button @click="printPage" class="export-btn">Export to PDF</button>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Email</th>
          <th>Date</th>
          <th class="status-column">Today's Status</th>
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
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        // Name filter
        const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
        // Batch filter
        const matchesBatch = this.selectedBatch === '' || student.batch === this.selectedBatch;
        // Date filter
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
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none'; // Hide button while printing

      window.print(); // Trigger print dialog

      setTimeout(() => {
        exportButton.style.display = 'block'; // Show button again after printing
      }, 1000);
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 28px;
  margin-top: 10px;
  color: #333;
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
  margin: 10px;
}

input, select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button.export-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

button.export-btn:hover {
  background-color: #45a049;
}

table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #4CAF50;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

.status-present {
  color: green;
  font-weight: bold;
}

.status-absent {
  color: red;
  font-weight: bold;
}

/* Hide export button during print */
@media print {
  .export-btn {
    display: none;
  }
}
</style>









<template>


  <div>
   
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
        <input id="dateFilter" v-model="selectedDate" type="date" />
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
          <th>Email</th>
          <th>Date</th>
          <th class="status-column">Today's Status</th>
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
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        // Name filter
        const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
        // Batch filter
        const matchesBatch = this.selectedBatch === '' || student.batch === this.selectedBatch;
        // Date filter
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
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none'; // Hide button while printing

      window.print(); // Trigger print dialog

      setTimeout(() => {
        exportButton.style.display = 'block'; // Show button again after printing
      }, 1000);
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 28px;
  margin-top: 10px;
  color: #000000;
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
  margin: 10px;
}

input, select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


.export-btn-container {
  text-align: right; 
  margin-bottom: 20px;
}

button.export-btn {
  background-color: #004d40;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
  float: right; 
}

button.export-btn:hover {
  background-color: #004d40;
}

table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #004d40;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

.status-present {
  color:  #004d40;;
  font-weight: bold;
}

.status-absent {
  color: red;
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
          <input id="dateFilter" v-model="selectedDate" type="date" />
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
            <th>Email</th>
            <th>Date</th>
            <th>Today's Status</th>
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
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none'; 

      window.print(); 

      setTimeout(() => {
        exportButton.style.display = 'block'; 
      }, 1000);
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
  background: linear-gradient(to top, #7fd7da, #8e4eef); /* Same gradient as navbar */
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
</style>-->

<template>
  <div class="page-container">
   
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
        <li><router-link to="/batch">batch</router-link></li>
      </ul>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <h1 class="page-title">Student Details</h1>
      <div class="filters-container">
   
        <div class="filter">
          <label for="nameSearch">Search by Name:</label>
          <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
        </div>
        
        <div class="filter">
          <label for="batchFilter">Filter by Batch:</label>
          <select id="batchFilter" v-model="selectedBatch">
            <option value="">All</option>
            <option value="morning batch">Morning</option>
            <option value="evening batch">Evening</option>
          </select>
        </div>
        <!-- Date Picker -->
         <!-- <div class="filter">
          <label for="dateFilter">Filter by Date:</label>

          <input 
            id="dateFilter" 
            type="date" 
            v-model="selectedDate" 
            @change="updateFormattedDate"
          />
        </div>  -->
      </div>

      <!-- Export Button (moved to right) -->
      <div class="export-btn-container">
        <button @click="printPage" class="export-btn">Export to PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Remove Student</th>
            <!-- <th>Date</th>
            <th>Today's Status</th> -->
          </tr>
        </thead>
    
          <tbody v-if="filteredStudents.length">
            
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batchId }}</td>
            <td>{{ student.email }}</td> 
            <td>{{ student.phoneNumber }}</td>
            <td><button @click="removeStudent(student.userId)" class="remove-btn">Remove</button></td>
         
          
       
         
            <!-- <td>{{ student.date }}</td> -->
            <!-- <td>
              <span :class="getStatusClass(student.status)">
                {{ student.status }}
              </span>
            </td> -->
          </tr>
        </tbody>
        <tbody v-else>
  <tr>
    <td colspan="5">No records found</td>
  </tr>
</tbody>

      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { mapGetters} from 'vuex';
export default {
  data() {
    return {
      // students: [
      //   { name: 'Siya', batch: 'Morning', email: 'siya@example.com', date: '2024-11-20', status: 'Present' },
      //   { name: 'Reshma', batch: 'Morning', email: 'reshma@example.com', date: '2024-11-19', status: 'Absent' },
      //   { name: 'Deva', batch: 'Evening', email: 'deva@example.com', date: '2024-11-20', status: 'Present' },
      //   { name: 'Ameya', batch: 'Morning', email: 'si@example.com', date: '2024-11-30', status: 'Present' },
      //   { name: 'Resh', batch: 'Morning', email: 'reshu@example.com', date: '2024-11-3', status: 'Absent' },
      //   { name: 'Devi', batch: 'Evening', email: 'devi@example.com', date: '2024-11-19', status: 'Present' },
      // ],
      searchText: '',
      selectedBatch: '',
      // selectedDate: '', 
      // formattedDate: '', 
    };
  },
  computed: {
    ...mapGetters(['getUsers']),
    students(){
      return this.getUsers;
    },
    filteredStudents() {
  return this.students.filter(student => {
    // const matchesName = student.name && student.name.toLowerCase().includes(this.searchText.toLowerCase());
    const matchesName = student.name && student.name.toLowerCase().startsWith(this.searchText.toLowerCase().trim());
    const matchesBatch = this.selectedBatch === ''||
    (student.batch && student.batch.toLowerCase().trim() === this.selectedBatch.toLowerCase().trim());
    // student.batch === this.selectedBatch;
    
    // const matchesDate = this.selectedDate === '' || student.date === this.selectedDate;
    return matchesName && matchesBatch
    // && matchesDate
    ;
  });
},

  },
  methods: {
    ...mapActions(['allUsers', 'removeUser']), // Import removeUser action
    // getStatusClass(status) {
    //   if (status === 'Present') return 'status-present';
    //   if (status === 'Absent') return 'status-absent';
    //   return '';
    // },
    //  async fetchUsers() {
    //   try{
    //      await this.$store.dispatch('allUsers'); 
    //    }catch (error) {
    //        console.error(error);
    //    } 
    //  },
     async removeStudent(userId) {
    if (confirm('Are you sure you want to remove this student?')) {
      try {
        const res = await this.$store.dispatch('removeUser', userId);
        if(res){
          this.fetchUsers();
        }
      } catch (error) {
        console.error('Error removing student:', error);
      }
    }
  },

  async fetchUsers() {
      try {
        await this.$store.dispatch('allUsers'); 
      } catch (error) {
        console.error(error);
      }
    },
  // async removeStudent(userId) {
  //     const confirmDelete = confirm('Are you sure you want to remove this student?');

  //     if (confirmDelete) {
  //       const success = await this.removeUser(userId); 

  //       if (success) {
  //         alert('Student removed successfully!');
       
  //         this.filteredStudents = this.filteredStudents.filter(student => student.id !== userId);
          
  //       } else {
  //         alert('Failed to remove student. Please try again.');
  //       }
  //     }
  //   },

},
    printPage() {
      const exportButton = document.querySelector('.export-btn');
      exportButton.style.display = 'none'; 

      window.print(); 

      setTimeout(() => {
        exportButton.style.display = 'block'; 
      }, 1000);
    },
    // Method to update the formatted date when a date is selected
    // updateFormattedDate() {
    //   if (this.selectedDate) {
    //     const [year, month, day] = this.selectedDate.split('-');
    //     this.formattedDate = `${day}/${month}/${year}`;
    //   }
    // },

  watch: {
    // Watch selectedDate to update formattedDate
    // selectedDate(newDate) {
    //   if (newDate) {
    //     const [year, month, day] = newDate.split('-');
    //     this.formattedDate = `${day}/${month}/${year}`;
    //   }
    // },
  },
  mounted(){
  this.fetchUsers();
  }
};
</script>

<style scoped>
/* Your existing styles */.page-container {
  display: flex;
  min-height: 100vh;
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
  /* background: linear-gradient(to left, #4830e8 ,#a485f2); */
  /* background: #80D8FF; */
  background:#4FC3F7;
  color: #fcffff;
  font-weight: bold;
}
tbody tr:nth-child(even) {
  /* background-color: #c6c4f8; */
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  /* background-color: #c0bdf7; */
  background-color: #81D4FA;
}
/* .status-present {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-absent {
  color: rgb(40, 40, 157);
  font-weight: bold;
} */




  .page-title {
  text-align: center;
  font-size: 28px;
  margin-top: 0px;
  color:#64B5F6;
  border-bottom: 2px solid #c6ddff; /* Adjust thickness and color */
  display: inline-block; /* Ensures the border is only as wide as the text */
  padding-bottom: 5px; /* Adds space between the text and underline */
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
  /* background-color: #bddffb;
  border: 1px solid #a5b9f4;  */
  background-color: #bddffb;
  border: 1px solid #B3E5FC;
  margin-bottom: 1px;
  border-radius: 4px;
  width: 250px;
  
}

.export-btn-container {
  text-align: right;
  margin-bottom: 2px;
  
}

button.export-btn {
/* 
    background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc); */
    background:#64B5F6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
}

/* button.export-btn:hover {
  background-color:#a174f5;
} */

table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  /* border: 5px solid #99cee1;around the raw */
  padding: 12px;
  text-align: center;
}

@media print {
  .export-btn {
    display: none;
  }
}
.remove-btn {
  display: block; /* Ensure visibility */
  background-color: rgb(75, 171, 231); /* Highlight */
  color: white;
  padding: 5px 13px;
  border: none;
  cursor: pointer;
  margin-left:45px;
  border-radius: 6px;
}
</style>