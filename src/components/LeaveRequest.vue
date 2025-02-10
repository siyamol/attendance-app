<!-- 
<template>
    <div> -->
      <!-- <nav class="navbar">
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
      </nav> -->
      <!-- <h1 class="thr">Leave Request</h1>
      <div class="search-bar ms-5">
        <div class="search">
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            <input v-model="searchText" type="text" placeholder="Search" @input="search" />
          </div>
          
        </div>
         <input type="text" v-model="searchText" placeholder="Search by Name, Date, or Batch">
        <i class="fa fa-search" aria-hidden="true"></i>  
         Removed Font Awesome search icon  
      </div>
      <table>
      <thead>
          <tr>
           
            <th>Name</th>
            <th>Batch</th>
            <th>Reason for Leave</th>
            
            <th>Status</th>
            <th>Approve</th>
            <th>Deny</th>
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
  /* Your existing CSS styles */
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
  
  /* Remove the box around buttons */
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
      <h1 class="thr">Leave Request</h1>
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
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Status</th>
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
          { studentName: 'Siya', batch: 'morning', reasonforlate: 'Religious observances', status: '', date: '2024-11-18' },
          { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19' },
          { studentName: 'Deva', batch: 'evening', reasonforlate: 'sick', status: '', date: '2024-11-20' },
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
        // Triggered on input or date change
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
  </style> -->
<!--   
  <template>
  <div>
    <h1 class="thr">Leave Request</h1>
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
          <th>Number of Days</th>
          <th>Type of Leave</th>
          <th class="reason-column">Reason for Leave</th>
          <th class="status-column">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td>{{ student.batch }}</td>
          <td>{{ formatDate(student.date) }}</td>
          
          <td>{{ student.numberOfDays }}</td>
          <td>{{ student.typeOfLeave }}</td>
          <td>{{ student.reasonForLeave }}</td>
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
        { studentName: 'Siya', batch: 'morning', date: '2024-11-18', numberOfDays: 2, typeOfLeave: 'Casual', reasonForLeave: 'Family emergency', status: '' },
        { studentName: 'Reshma', batch: 'morning', date: '2024-11-19', numberOfDays: 1, typeOfLeave: 'Sick', reasonForLeave: 'Medical appointment', status: '' },
        { studentName: 'Deva', batch: 'evening', date: '2024-11-20', numberOfDays: 3, typeOfLeave: 'Casual', reasonForLeave: 'Travel plans', status: '' },
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
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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
  width: 95%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #004d40;
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
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.approve-btn {
  background-color: #004d40;
}

.deny-btn {
  background-color: red;
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-denied {
  color: red;
  font-weight: bold;
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
</style> 
<template>
  <div>
    <h1 class="thr">Leave Request</h1>
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

          <th>From Date</th>
          <th>To Date</th>
          <th>Number of Days</th>
          <th>Type of Leave</th>
          <th class="reason-column">Reason for Leave</th>
          <th class="status-column">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td>{{ student.batch }}</td>
         
          <td>{{ formatDate(student.fromDate) }}</td>
          <td>{{ formatDate(student.toDate) }}</td>
          <td>{{ student.numberOfDays }}</td>
          <td>{{ student.typeOfLeave }}</td>
          <td>{{ student.reasonForLeave }}</td>
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
        { studentName: 'Siya', batch: 'morning', date: '2024-11-18', fromDate: '2024-11-17', toDate: '2024-11-19', numberOfDays: 2, typeOfLeave: 'Casual', reasonForLeave: 'Family emergency', status: '' },
        { studentName: 'Reshma', batch: 'morning', date: '2024-11-19', fromDate: '2024-11-19', toDate: '2024-11-19', numberOfDays: 1, typeOfLeave: 'Sick', reasonForLeave: 'Medical appointment', status: '' },
        { studentName: 'Deva', batch: 'evening', date: '2024-11-20', fromDate: '2024-11-20', toDate: '2024-11-22', numberOfDays: 3, typeOfLeave: 'Casual', reasonForLeave: 'Travel plans', status: '' },
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
      // Triggered on input or date change
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
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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
  width: 95%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #004d40;
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
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.approve-btn {
  background-color: #004d40;
}

.deny-btn {
  background-color: red;
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-denied {
  color: red;
  font-weight: bold;
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
</style>


<template>
  <div class="page-container">
   
    <div class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
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
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.typeOfLeave }}</td>
            <td>{{ student.reasonForLeave }}</td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { studentName: 'Siya', batch: 'morning', date: '2024-11-18', fromDate: '2024-11-17', toDate: '2024-11-19', numberOfDays: 2, typeOfLeave: 'Casual', reasonForLeave: 'Family emergency', status: '' },
        { studentName: 'Reshma', batch: 'morning', date: '2024-11-19', fromDate: '2024-11-19', toDate: '2024-11-19', numberOfDays: 1, typeOfLeave: 'Sick', reasonForLeave: 'Medical appointment', status: '' },
        { studentName: 'Deva', batch: 'evening', date: '2024-11-20', fromDate: '2024-11-20', toDate: '2024-11-22', numberOfDays: 3, typeOfLeave: 'Casual', reasonForLeave: 'Travel plans', status: '' },
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
      // Triggered on input or date change
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
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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
  padding: 20px;
  background: linear-gradient(to top, #7fd7da, #8e4eef); /* Same gradient as navbar */
  color: white;

  border-right: 1px solid #ddd;

  padding: 50px;
  border-radius: px; /* Adds rounded edges */

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
  opacity: 0.;
  

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
.date-picker {
  padding: 8px;
  border: none;
  background-color: rgb(255, 255, 255);
  width: 120px;
  border-radius: 4px;
}


table {
  width: 95%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color:#9575CD;
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
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.approve-btn {
  background-color: #BBDEFB;
}

.deny-btn {
  background-color: rgb(220, 56, 56);
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-denied {
  color: red;
  font-weight: bold;
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

</style>

<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
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
            <th>From Date</th>
            <th>To Date</th>
            <th class="number-days">Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td class="number-days">{{ student.numberOfDays }}</td>
            <td>{{ student.typeOfLeave }}</td>
            <td>{{ student.reasonForLeave }}</td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { studentName: 'Siya', batch: 'morning', date: '2024-11-18', fromDate: '2024-11-17', toDate: '2024-11-19', numberOfDays: 2, typeOfLeave: 'Casual', reasonForLeave: 'Family emergency', status: '' },
        { studentName: 'Reshma', batch: 'morning', date: '2024-11-19', fromDate: '2024-11-19', toDate: '2024-11-19', numberOfDays: 1, typeOfLeave: 'Sick', reasonForLeave: 'Medical appointment', status: '' },
        { studentName: 'Deva', batch: 'evening', date: '2024-11-20', fromDate: '2024-11-20', toDate: '2024-11-22', numberOfDays: 3, typeOfLeave: 'Casual', reasonForLeave: 'Travel plans', status: '' },
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
      // Triggered on input or date change
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
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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

.date-picker {
  padding: 8px;
  width: 120px;
  border-radius: 4px;
}

table {
  width: 95%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #9575CD;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

th.number-days, td.number-days {
  width: 8%;
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.approve-btn {
  background-color: #BBDEFB;
}

.deny-btn {
  background-color: rgb(220, 56, 56);
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-denied {
  color: red;
  font-weight: bold;
}

.thr {
  text-align: center;
  font-size: 28px;
  color: #333;
}

.icon {
  margin-right: 10px;
}
</style>
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
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
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.typeOfLeave }}</td>
            <td>{{ student.reasonForLeave }}</td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { studentName: 'Siya', batch: 'morning', date: '2024-11-18', fromDate: '2024-11-17', toDate: '2024-11-19', numberOfDays: 2, typeOfLeave: 'Casual', reasonForLeave: 'Family emergency', status: '' },
        { studentName: 'Reshma', batch: 'morning', date: '2024-11-19', fromDate: '2024-11-19', toDate: '2024-11-19', numberOfDays: 1, typeOfLeave: 'Sick', reasonForLeave: 'Medical appointment', status: '' },
        { studentName: 'Deva', batch: 'evening', date: '2024-11-20', fromDate: '2024-11-20', toDate: '2024-11-22', numberOfDays: 3, typeOfLeave: 'Casual', reasonForLeave: 'Travel plans', status: '' },
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
      // Triggered on input or date change
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
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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
  padding: 20px;
  background: linear-gradient(to top, #7fd7da, #8e4eef);
  color: white;
  border-right: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 20px;
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
}

.search-bar input {
  padding: 8px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  width: 120px;
  border-radius: 4px;
}

table {
  width: 95%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #9575CD;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #f1f1f1;
}

.status-buttons button {
  margin-right: 10px;
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.approve-btn {
  background-color: #BBDEFB;
}

.deny-btn {
  background-color: rgb(220, 56, 56);
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-denied {
  color: red;
  font-weight: bold;
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
</style>
ok
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
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
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.leaveType }}</td>
            <td>{{ student.reasonForLeave }}</td>
            <td>
              <div v-if="student.status !== 'Approved' && student.status !== 'Denied'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">Approve</button>
                <button @click="denyStudent(index)" class="deny-btn">Deny</button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">{{ student.status }}</span>
              </div>
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
        {
          studentName: "Siya",
          batch: "morning",
          fromDate: "2024-11-15",
          toDate: "2024-11-18",
          numberOfDays: 4,
          leaveType: "Sick",
          reasonForLeave: "Fever",
          status: "",
        },
        {
          studentName: "Reshma",
          batch: "morning",
          fromDate: "2024-11-19",
          toDate: "2024-11-21",
          numberOfDays: 3,
          leaveType: "Casual",
          reasonForLeave: "Travel",
          status: "",
        },
      ],
      searchText: "",
      selectedDate: "",
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) => {
        const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate =
          this.selectedDate &&
          (student.fromDate === this.selectedDate || student.toDate === this.selectedDate);
        return matchesName && (!this.selectedDate || matchesDate);
      });
    },
  },
  methods: {
    search() {
      // Triggered on input or date change
    },
    approveStudent(index) {
      this.students[index].status = "Approved";
    },
    denyStudent(index) {
      this.students[index].status = "Denied";
    },
    getStatusClass(status) {
      if (status === "Approved") return "status-approved";
      if (status === "Denied") return "status-denied";
      return "";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB"); // Format to DD/MM/YYYY
    },
  },
};
</script>

<style scoped>
/* Copy all styles from the previous table component */
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
}

.search-bar input {
  padding: 8px;
  width: 250px;
  height: 25px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: rgb(255, 255, 255);
  width: 120px;
  border-radius: 4px;
}
table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed;
}

th,
td {
  border: 1px solid #a9e6fb;
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

/* Adjust column width for 'Number of Days' */
th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}

/* Adjust Reason column width */
th.reason-column,
td.reason-column {
  width: 130px;
}

/* Button Styling */
button {
  border: 1px solid #ddd;
  padding: 4px 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 70px;
  font-size: 10px;
}

button:hover {
  transform: scale(1.05);
}

/* Status buttons layout */
.status-buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
}

/* Status text classes */
.status-approved {
  color: rgb(90, 148, 255);
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: rgb(121, 73, 252);
  font-weight: bold;
  font-size: 14px;
}

/* Title Styling */
.table-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
  color: #4b3dbf;
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
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
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
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.leaveType }}</td>
            <td>{{ student.reasonForLeave }}</td>
            <td>
              <div v-if="student.status !== 'Approved' && student.status !== 'Denied'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">Approve</button>
                <button @click="denyStudent(index)" class="deny-btn">Deny</button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">{{ student.status }}</span>
              </div>
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
        {
          studentName: "Siya",
          batch: "morning",
          fromDate: "2024-11-15",
          toDate: "2024-11-18",
          numberOfDays: 4,
          leaveType: "Sick",
          reasonForLeave: "Fever",
          status: "",
        },
        {
          studentName: "Reshma",
          batch: "morning",
          fromDate: "2024-11-19",
          toDate: "2024-11-21",
          numberOfDays: 3,
          leaveType: "Casual",
          reasonForLeave: "Travel",
          status: "",
        },
        {
          studentName: "Siya",
          batch: "morning",
          fromDate: "2024-11-15",
          toDate: "2024-11-18",
          numberOfDays: 4,
          leaveType: "Sick",
          reasonForLeave: "Fever",
          status: "",
        },
        {
          studentName: "Reshma",
          batch: "morning",
          fromDate: "2024-11-19",
          toDate: "2024-11-21",
          numberOfDays: 3,
          leaveType: "Casual",
          reasonForLeave: "Travel",
          status: "",
        },
      ],
      searchText: "",
      selectedDate: "",
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) => {
        const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate =
          this.selectedDate &&
          (student.fromDate === this.selectedDate || student.toDate === this.selectedDate);
        return matchesName && (!this.selectedDate || matchesDate);
      });
    },
  },
  methods: {
    search() {

    },
    approveStudent(index) {
      this.students[index].status = "Approved";
    },
    denyStudent(index) {
      this.students[index].status = "Denied";
    },
    getStatusClass(status) {
      if (status === "Approved") return "status-approved";
      if (status === "Denied") return "status-denied";
      return "";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
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
  flex: 10;
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
}

.search-bar input {
  padding: 8px;
  width: 250px;
  height: 25px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: rgb(255, 255, 255);
  width: 120px;
  border-radius: 4px;
}


table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed;

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

th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}

th.reason-column,
td.reason-column {
  width: 130px;
}


th.status-column,
td.status-column {
  width: 190px;
}


button {
  border: 1px solid #ddd;
  padding: 6px 12px; 
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  min-height: 33px;
  font-size: 10px;
}

button:hover {
  transform: scale(1.05);
}
.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom:1px;
  font-size: 28px;
  color: #2f6ff9;
}


.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;

}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5); 
  font-size: 12px;
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
  font-size: 12px;
}

.status-approved {
  color: rgb(90, 148, 255);
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: rgb(121, 73, 252);
  font-weight: bold;
  font-size: 14px;
}
th.reason-column, td.reason-column {
  width: 250px; 
}
</style>


 -->
 <!-- <template>
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
      <h1 class="thr">Leave Request</h1>
      <div class="search-bar-container ms-5">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name" />
          <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
        </div>
      </div>
      <div class="audio-player-container">
    
    <audio v-if="audioSrc" controls>
      <source :src="audioSrc" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <p v-else>Audio file not available</p>
  </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ formatDate(student.fromDate) }}</td>
            <td>{{ formatDate(student.toDate) }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.leaveType }}</td>
            <td>{{ student.reasonForLeave }}</td>
            <td>
              <div v-if="student.status !== 'Approved' && student.status !== 'Denied'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">Approve</button>
                <button @click="denyStudent(index)" class="deny-btn">Deny</button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">{{ student.status }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      audioSrc: "https://www.coothead.co.uk/audio/You-Cant-Always-Get-What-You-Want.mp3", // or set conditionally
      students: [
        {
          studentName: "Siya",
          batch: "morning",
          fromDate: "2024-11-15",
          toDate: "2024-11-18",
          numberOfDays: 4,
          leaveType: "Sick",
          reasonForLeave: "Fever",
          status: "",
        },
        {
          studentName: "Reshma",
          batch: "morning",
          fromDate: "2024-11-19",
          toDate: "2024-11-21",
          numberOfDays: 3,
          leaveType: "Casual",
          reasonForLeave: "Travel",
          status: "",
        },
      ],
      searchText: "",
      selectedDate: "",
    };
  },
  computed: {
  filteredStudents() {
    return this.students.filter((student) => {
      const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDate =
        this.selectedDate &&
        (new Date(student.fromDate) <= new Date(this.selectedDate) && new Date(student.toDate) >= new Date(this.selectedDate));
      return matchesName && (!this.selectedDate || matchesDate);
    });
  },
},

  methods: {
    approveStudent(index) {
      if (window.confirm("Are you sure you want to approve this leave request?")) {
        this.students[index].status = "Approved";
      }
    },
    denyStudent(index) {
      if (window.confirm("Are you sure you want to deny this leave request?")) {
        this.students[index].status = "Denied";
      }
    },
    getStatusClass(status) {
      if (status === "Approved") return "status-approved";
      if (status === "Denied") return "status-denied";
      return "";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
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
  flex: 10;
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
}

.search-bar input {
  padding: 8px;
  width: 250px;
  height: 25px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: rgb(255, 255, 255);
  width: 120px;
  border-radius: 4px;
}


table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed;

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

th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}

th.reason-column,
td.reason-column {
  width: 130px;
}


th.status-column,
td.status-column {
  width: 190px;
}


button {
  border: 1px solid #ddd;
  padding: 6px 12px; 
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  min-height: 33px;
  font-size: 10px;
}

button:hover {
  transform: scale(1.05);
}
.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom:1px;
  font-size: 28px;
  color: #2f6ff9;
}


.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;

}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5); 
  font-size: 12px;
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
  font-size: 12px;
}

.status-approved {
  color: rgb(90, 148, 255);
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: rgb(121, 73, 252);
  font-weight: bold;
  font-size: 14px;
}
th.reason-column, td.reason-column {
  width: 250px; 
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
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
        <li><router-link to="/filter">Attendance Filter</router-link></li>
        <li><router-link to="/batch">batch</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Leave Request</h1>
      <!-- <div class="search-bar-container ms-5">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name/Batch" />
          <input type="date" v-model="selectedDate" class="date-picker" />  -->
          
          <!-- <input type="date" v-model="selectedDate" @change="search" class="date-picker" /> -->
        <!-- </div>
      </div> -->
      
      <!-- <div class="filters-container">
        <div class="filter">
          <label for="nameSearch">Search by Name:</label>
          <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
        </div>
      
        <div class="filter">
          <label for="batchFilter">Filter by Batch:</label>
          <select id="batchFilter" v-model="searchBatch" type="text" placeholder="Enter Batch">
            <option value="">All</option>
            <option value="morning batch">Morning</option>
            <option value="evening batch">Evening</option>
          </select>
        </div>
      </div>    -->
      <!-- Date Picker -->
        <!-- <div class="filter">
          <label for="dateFilter">Filter by Date:</label>

          <input 
            id="dateFilter" 
            type="date" 
            v-model="selectedDate" 
            @change="updateFormattedDate"
          />
        </div> -->
        
        <div class=" ms-5 d-flex justify-content-end me-3">
        <div class="search">
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            <input v-model="searchText" type="text" placeholder="Search by Name/Batch" @input="search" />
          </div>
          
        </div>
  
      
      </div> 
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
            <!-- <th>Reason for Leave</th>
            <th>Today's Status</th> -->
          </tr>
        </thead>
        <tbody v-if="filteredLeaveRequest && filteredLeaveRequest.length > 0">
        <!-- <tbody v-if="leaveRequest && leaveRequest.length >0"> -->
          <!-- <tr v-for="(student, index) in leaveRequest" :key="index"> -->
            <tr v-for="(student, index) in filteredLeaveRequest" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.fromDate? formatDate(student.fromDate) : '' }}</td>
            <td>{{ student.toDate? formatDate(student.toDate) : '' }}</td>
            <td>{{ student.numberOfDays }}</td>
            <td>{{ student.leaveType }}</td>
             <td class="reason-column">{{ student.reason }}</td>
             <td>
              <div v-if="student.status == 'PENDING'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">Approve</button>
                <button @click="denyStudentreq(index)" class="deny-btn">Deny</button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">{{ student.status }}</span>
              </div>
            </td>
   <!-- <td class="status-column">
   
    </td>
           -->
            <!-- <td class="reason-column">
              <div v-if="student.voiceNote">
                <audio v-if="student.voiceNote" controls>
                  <source :src="student.voiceNote" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div v-else>
                {{ student.reasonForLeave }}
              </div>
            </td> -->
            <!-- <td class="reason-column"> -->
              <!-- <div v-if="student.voiceNote">
                <div class="audio-container">
                  <audio
                    ref="audioPlayers"
                    :src="student.voiceNote"
                    controls
                    class="audio-player"
                  ></audio>
                </div>
               </div> -->
              <!-- <div v-else>
                {{ student.reason }}
              </div> -->
            <!-- </td>  -->

            <!-- <td class="reason-column">
  <div v-if="student.voiceNote">
    <audio controls>
      <source :src="student.voiceNote" type="audio/mpeg" />
      Your browser does not support the audio element. Please try a different browser.
    </audio>
  </div>
  <div v-else>
    The audio is not available.
  </div>
</td> -->
</tr>
        </tbody>
        <!-- <tbody v-else>
          <tr>
            <td colspan="5">No records found</td>
         
          </tr>
       </tbody> -->
       <tbody v-else>
          <tr>
            <td colspan="8">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // name: "AudioPlayer",
  data() {
    return {
      // audioSrc: "https://www.coothead.co.uk/audio/You-Cant-Always-Get-What-You-Want.mp3",
      // students: [
      //   {
      //     studentName: "Siya",
      //     batch: "morning",
      //     fromDate: "2024-11-15",
      //     toDate: "2024-11-18",
      //     numberOfDays: 4,
      //     leaveType: "Sick",
      //     reasonForLeave: "Fever",
      //     voiceNote: "", // Add voiceNote field
      //     status: "",
      //   },
      //   {
      //     studentName: "Reshma",
      //     batch: "morning",
      //     fromDate: "2024-11-19",
      //     toDate: "2024-11-21",
      //     numberOfDays: 3,
      //     leaveType: "Casual",
      //     reasonForLeave: "Travel",
      //     voiceNote: "https://www.coothead.co.uk/audio/sample-audio.mp3", // Add voiceNote field with a URL
      //     status: "",
      //   },
      // ],
      searchText: "",
    
    };
  },
  mounted() {
    // this.currentSpeed = this.students.map(() => 0);
    this.fetchLeaveRequest();
  },
  computed: {
    ...mapGetters(['getLeave']),
    leaveRequest(){
      // return this.getLeave;
      return Array.isArray(this.getLeave) ? this.getLeave : [];
    },
    // filteredStudents() {
    //   return this.students.filter((student) => {
    //     const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
    //     const matchesDate =
    //       this.selectedDate &&
    //       (new Date(student.fromDate) <= new Date(this.selectedDate) && new Date(student.toDate) >= new Date(this.selectedDate));
    //     return matchesName && (!this.selectedDate || matchesDate);
    //   });
    // },
    filteredLeaveRequest() {
    // Return filtered data based on the searchText
    return this.leaveRequest.filter((student) => {
      const searchText = this.searchText.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchText) ||
        student.batch.toLowerCase().includes(searchText)
      );
    });
  },


  },
  methods: {
    async fetchLeaveRequest(){
      try{
        await this.$store.dispatch('fetchLeaves'); 
      }catch (error) {
          console.error(error);
      } 
    },
    async approveStudent(index) {
      // this.students[index].status = 'Approved';
      const payload = this.leaveRequest[index].id;
      try{
        const res = await this.$store.dispatch('approveLeave', payload); 
        if(res){
          this.leaveRequest[index].status = 'Approved';
          this.fetchLeaveRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },
    async denyStudentreq(index) {
      // this.students[index].status = 'Denied';
      const payload = this.leaveRequest[index].id;
      try{
      const res = await this.$store.dispatch('denyLeave', payload); 
      if(res){
        this.leaveRequest[index].status = 'Denied';
          this.fetchLeaveRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },

    getStatusClass(status) {
      if (status === "Approved") return "status-approved";
      if (status === "Denied") return "status-denied";
      return "";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },

    search() {
      // This method is required to trigger the filter operation when the input changes
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
  flex: 10;
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
}

.search-bar input {
  padding: 8px;
  width: 250px;
  height: 25px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: rgb(255, 255, 255);
  width: 120px;
  border-radius: 4px;
}


table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed;

}

th,
td {
  border: 5px solid #a9e6fb;
  padding: 12px;
  text-align: center;
}

th {
  /* background: linear-gradient(to left, #4830e8, #a485f2); */
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

th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}

th.reason-column,
td.reason-column {
  width: 130px;
}


th.status-column,
td.status-column {
  width: 190px;
}


button {
  border: 1px solid #ddd;
  padding: 6px 12px; 
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  min-height: 33px;
  font-size: 10px;
}

button:hover {
  transform: scale(1.05);
}
.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom:1px;
  font-size: 28px;
  color: #6d7078;
}


.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;

}

.approve-btn {
  /* background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);  */
  background:#87CEEB;
  font-size: 12px;
}

.deny-btn {
  /* background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8); */
  background:#89d2fd ;
  font-size: 12px;
}

.status-approved {
  color: rgb(90, 148, 255);
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: rgb(121, 73, 252);
  font-weight: bold;
  font-size: 14px;
}
th.reason-column, td.reason-column {
  width: 330px; 
}
.reason-column {
  min-width: 2500px;
  max-width: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.audio-player {
  max-width: 300px;
  max-height: 35px;
}

/* .icon {
  width: 1px;
  height: 1px;
  margin-right: 10px;
} 
/* 
.audio-player {
  max-width: 20px;
  max-height: 5px;
} */

/* .audio-container {
  display: flex;
  align-items: center;
  position: relative;

} */
/* 
.audio-player {
  flex: 100;
} */

/* .speed-toggle-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007bff;
  color: white;
  border: none;

  border-radius: 20%;
  font-size: 140px;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
} */

/* .speed-toggle-btn:hover {
  background-color: #0056b3;
} */
 
/* .filters-container {
  display: flex;
  justify-content: space-around;
  margin: 1px 100;
  flex-wrap: wrap;
  

} */

 
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
  /* background-color: #bddffb; */
  /* border: 1px solid #a5b9f4;  */
  margin-bottom: 1px;
  /* border-radius: 4px; */
  width: 250px;
  
}

.search-bar {
  display: flex;
  align-items: center;
  width: 250px;
  border: 1px solid #ccc; /* Add border to create the box */
  border-radius: 6px; /* Add rounded corners */
  padding: 5px; /* Add padding for inner spacing */
  background-color: rgb(255, 249, 249);/* Ensure a clear background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.search-bar input[type="text"] {
  border: none; /* Remove inner input border */
  outline: none; /* Remove focus outline */
  width: calc(100% - 30px); /* Full width minus space for icon */
  padding: 5px; /* Add padding for better spacing */
  font-size: 14px; /* Adjust text size */
  margin-bottom:3px;
  margin-top:3px;
}
  
.search-bar i {
    margin-left: 9px; /* Adjust icon spacing */
  }
.search-bar i {
  margin-left: 10px; 
  color: #888; 
  cursor: pointer; 
}








/* 

th:nth-child(1),
td:nth-child(1) {
  width: 200px; 
}

th:nth-child(2),
td:nth-child(2) {
  width: 150px; 
}

th:nth-child(3),
td:nth-child(3) {
  width: 150px; 
}

th:nth-child(4),
td:nth-child(4) {
  width: 150px; 
}

th:nth-child(5),
td:nth-child(5) {
  width: 100px; 
}

th:nth-child(6),
td:nth-child(6) {
  width: 150px; 
}

th.reason-column,
td.reason-column {
  width: 330px;  
}

th.status-column,
td.status-column {
  width: 150px; 
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px; 
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  min-height: 33px;
  font-size: 10px;
}

button:hover {
  transform: scale(1.05);
}

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background:#87CEEB;
  font-size: 12px;
}

.deny-btn {
  background:#89d2fd ;
  font-size: 12px;
}

.status-approved {
  color: rgb(90, 148, 255);
  font-weight: bold;
  font-size: 14px;
}

.status-denied {
  color: rgb(121, 73, 252);
  font-weight: bold;
  font-size: 14px;
} */

.reason-column {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal; /* Allow word breaks */
  min-width: 110px;
  max-width: 50px; /* Adjustable maximum width */
}

</style>
