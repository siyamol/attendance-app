
  
  <!-- <template>
    <div>
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand"></a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/homepage" class="navbar-brand nav-link text-dark">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="book" class="navbar-brand nav-link text-dark">TheBooks</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/adm" class="navbar-brand nav-link text-dark">AdminLogin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tlist" class="navbar-brand nav-link text-dark">TeachersBookList</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <h1 class="thr">Teachers List</h1>
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
        <i class="fa fa-search" aria-hidden="true"></i>  Font Awesome search icon 
      </div>
      <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Division</th>
            <th>Subject</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teacher, index) in filteredTeachers" :key="index">
            <td>{{ teacher.id }}</td>
            <td>
              <input type="text" v-model="teacher.name" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.email" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.class" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.division" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.subject" :disabled="!teacher.editMode">
            </td>
            <td>
              <button v-if="!teacher.editMode" @click="toggleEditMode(index)">Edit/</button>
              <button v-else @click="submitEdit(index)">Submit</button>
              <button @click="deleteTeacher(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
  </template>
  
  // Your script goes here
  
   <script>
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      const teachers = ref([
        { id: 1, name: 'John Doe', email: 'cya@gmail.com', subject: 'Maths', class: '5th', division: 'A', editMode: false },
        { id: 2, name: 'Jane Smith', email: 'jane@gmail.com', subject: 'English', class: '6th', division: 'A', editMode: false },
        { id: 3, name: 'Alice Johnson', email: 'alice@gmail.com', subject: 'Science', class: '7th', division: 'C', editMode: false },
        { id: 4, name: 'Bob Johnson', email: 'bob2@gmail.com', subject: 'Art', class: '8th', division: 'A', editMode: false },
        { id: 5, name: 'Emily Brown', email: 'emily@gmail.com', subject: 'History', class: '9th', division: 'B', editMode: false },
        { id: 6, name: 'Michael Clark', email: 'clark@gmail.com', subject: 'Music', class: '10th', division: 'A', editMode: false }
      ]);
  
      const searchText = ref('');
  
      const filteredTeachers = computed(() => {
        return teachers.value.filter(teacher =>
          teacher.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
          teacher.class.toLowerCase().includes(searchText.value.toLowerCase()) ||
          teacher.subject.toLowerCase().includes(searchText.value.toLowerCase())
        );
      });
  
      const toggleEditMode = (index) => {
        teachers.value[index].editMode = !teachers.value[index].editMode;
      };
  
      const submitEdit = (index) => {
        // You can perform any necessary actions here before submitting the edit
        toggleEditMode(index); // Disables editing mode after submitting
      };
  
      const deleteTeacher = (index) => {
        teachers.value.splice(index, 1);
      };
  
      const search = () => {
        // Function to handle search
        // Since we are using v-model, searchText is automatically updated
      };
  
      return { teachers, searchText, filteredTeachers, toggleEditMode, submitEdit, deleteTeacher, search };
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
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand"></a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/homepage" class="navbar-brand nav-link text-dark">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="book" class="navbar-brand nav-link text-dark">TheBooks</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/adm" class="navbar-brand nav-link text-dark">AdminLogin</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <h1 class="thr">Teachers Book List</h1>
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
      </div>
      <div class="additional-inputs">
        <th>Teachers ID</th> <input type="text" placeholder="Teachers Id">
        <th>Issued Book ID</th>
        <input type="text" placeholder="Issued Book Id">
        <button>Issued Book</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Subject</th>
            <th>BookName</th>
            <th>IssuedDate</th>
            <th>ReturnDate</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teacher, index) in filteredTeachers" :key="index">
            <td>{{ teacher.id }}</td>
            <td>
              <input type="text" v-model="teacher.name" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.class" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.subject" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.BookName" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.IssuedDate" :disabled="!teacher.editMode">
            </td>
            <td>
              <input type="text" v-model="teacher.ReturnDate" :disabled="!teacher.editMode">
            </td>
            <td>
              <button v-if="!teacher.editMode" @click="toggleEditMode(index)">Edit/</button>
              <button v-else @click="submitEdit(index)">Submit</button>
              <button @click="deleteTeacher(index)">Delete</button>
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
      teachers: [
        { id: 1, name: 'John Doe', class: '5th', subject: 'Maths', BookName: 'The Alchemist', IssuedDate: '', Return: '', editMode: false },
        { id: 1, name: 'Siya', class: '8th', subject: 'Maths', BookName: 'It Ends with Us', IssuedDate: '', Return: '', editMode: false },
        { id: 2, name: 'Jane Smith', class: '6th', subject: 'Maths', BookName: 'It Starts with Us', IssuedDate: '', Return: '', editMode: false },
        { id: 3, name: 'Alice Johnson', class: '7th', subject: 'English', BookName: 'Who Sank the Boat', IssuedDate: '', Return: '', editMode: false },
        { id: 4, name: 'Bob Johnson', class: '8th', subject: 'Maths', BookName: 'It', IssuedDate: '', Return: '', editMode: false },
        { id: 5, name: 'Emily Brown', class: '9th', subject: 'Malayalam', BookName: 'Chemmeen', IssuedDate: '', Return: '', editMode: false },
        { id: 6, name: 'Michael Clark', class: '10th', subject: 'Hindi', BookName: 'Aadujeevitham', IssuedDate: '', Return: '', editMode: false }
      ],
      searchText: ''
    };
  },
  computed: {
    filteredTeachers() {
      return this.teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        teacher.class.toLowerCase().includes(this.searchText.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    toggleEditMode(index) {
      this.teachers[index].editMode = !this.teachers[index].editMode;
    },
    submitEdit(index) {
      // You can perform any necessary actions here before submitting the edit
      this.toggleEditMode(index); // Disables editing mode after submitting
    },
    deleteTeacher(index) {
      this.teachers.splice(index, 1);
    },
    search() {
      // Function to handle search
      // Since we are using v-model, searchText is automatically updated
    }
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


almost correct
<template>
  <div>
    
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
     
    </div>
    <table>
    <thead>
        <tr>
         
          <th>Name</th>
          <th>Batch</th>
          <th>Reason for Late</th>
          
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
            <input type="text" v-model="student.batch" :disabled="!student.editMode">
          </td>
          <td>
            <input type="text" v-model="student.reasonforlate" :disabled="!student.editMode">
          </td>
          <td>
            <input type="text" v-model="student.status" :disabled="!student.editMode">
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
     students: [
         { name: 'siya', batch: '', reasonforlate: '', status: '', editMode: false },
        
      ],
      searchText: ''
    };
  },
  computed: {
      filteredStudents() {
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
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Reason for Late</th>
          <th>Status</th>
          <th>Approve</th>
          <th>Deny</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td><input type="text" v-model="student.batch" :disabled="!student.editMode" /></td>
          <td><input type="text" v-model="student.reasonforlate" :disabled="!student.editMode" /></td>
          <td>
            <input type="text" v-model="student.status" :disabled="!student.editMode" />
          </td>
          <td>
            <button @click="approveStudent(index)" :disabled="student.status === 'Denied'">Approve</button>
            
          </td>
          <td>
            <button @click="denyStudentreq(index)" :disabled="student.status === 'Approved'">Deny</button>
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
      students: [
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },  
        { studentName: 'Deva', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false }, 
         { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },
      ],
      searchText: ''
    };
  },
  computed: {
    filteredStudents() {
      if (this.searchText !== '') {
        return this.students.filter(student =>
          student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.reasonforlate.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        return this.students;
      }
    }
  },
  mounted() {
    this.getstudents();
  },
  methods: {
    approveStudent(index) {
      // Update the status to "Approved"
      this.students[index].status = 'Approved';
    },
    denyStudentreq(index) {
      // Update the status to "Denied"
      this.students[index].status = 'Denied';
    },
    async submitEdit(index) {
      try {
        const student = this.students[index];
        const response = await axios.put(`http://192.168.1.11:8080/api/${student.id}`, {
          studentName: student.studentName,
          batch: student.batch,
          reasonforlate: student.reasonforlate,
          status: student.status, // Submit the status too
        });

        if (response.status === 200) {
          alert('Successfully updated');
          this.getstudents(); // Refresh the student list
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getstudents() {
      try {
        const response = await axios.get('http://192.168.1.11:8080/api/allStudents');
        if (response.status === 200) {
          this.students = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 100px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  border: 1px solid #ddd;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover {
  background-color: #45a049;
}

input[type="text"] {
  border: 1px solid #ddd;
  padding: 5px;
  width: 100%;
}

.thr {
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  font-size: 24px;
}
</style>




<template>
  <div>
    <h1 class="thr">Late Request</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name or Batch" @input="search" />
        <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Reason for Late</th>
          <th>Status</th>
          <th>Approve</th>
          <th>Deny</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td><input type="text" v-model="student.batch" :disabled="!student.editMode" /></td>
          <td><input type="text" v-model="student.reasonforlate" :disabled="!student.editMode" /></td>
          <td>
            <input type="text" v-model="student.status" :disabled="!student.editMode" />
          </td>
          <td>
            <button v-if="student.status !== 'Approved'" @click="approveStudent(index)" :disabled="student.status === 'Denied'">Approve</button>
           
          </td>
          <td>
            <button @click="denyStudentreq(index)" :disabled="student.status === 'Approved'">Deny</button>
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
      students: [
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', editMode: false },
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },  
        { studentName: 'Deva', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false }, 
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', editMode: false },
      ],
      searchText: '',
      selectedDate: '', 
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        const matchesNameOrBatch = student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(this.searchText.toLowerCase());

        const matchesDate = this.selectedDate ? student.date === this.selectedDate : true;

        return matchesNameOrBatch && matchesDate;
      });
    }
  },
  mounted() {
    this.getstudents();
  },
  methods: {
    approveStudent(index) {
      
      this.students[index].status = 'Approved';
    },
    denyStudentreq(index) {
     
      this.students[index].status = 'Denied';
    },
    async submitEdit(index) {
      try {
        const student = this.students[index];
        const response = await axios.put(`http://192.168.1.11:8080/api/${student.id}`, {
          studentName: student.studentName,
          batch: student.batch,
          reasonforlate: student.reasonforlate,
          status: student.status, 
        });

        if (response.status === 200) {
          alert('Successfully updated');
          this.getstudents(); 
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getstudents() {
      try {
        const response = await axios.get('http://192.168.1.11:8080/api/allStudents');
        if (response.status === 200) {
          this.students = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    search() {
    
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
  border-radius: 5px;
}

.search-bar input {
  padding: 8px;
  width: 250px;
  margin-right: 10px;
  border: none;
}

.date-picker {
  padding: 8px;
  border: none;
  background-color: transparent;
  width: 120px;
}

table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 100px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  border: 1px solid #ddd;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover {
  background-color: #45a049;
}

input[type="text"] {
  border: 1px solid #ddd;
  padding: 5px;
  width: 100%;
}

.thr {
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  font-size: 24px;
}
</style>




ok
<template>
  <div>
    <h1 class="thr">Late Request</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name or Batch" @input="search" />
        <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Date</th>
          <th>Reason for Late</th>
          <th>Status</th>
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
              <button @click="approveStudent(index)">Approve</button>
              <button :class="getDenyButtonClass(student)" @click="denyStudentreq(index)">Deny</button>
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
        const matchesNameOrBatch = student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = this.selectedDate ? student.date === this.selectedDate : true;
        return matchesNameOrBatch && matchesDate;
      });
    }
  },
  methods: {
    approveStudent(index) {
      this.students[index].status = 'Approved';
    },
    denyStudentreq(index) {
      this.students[index].status = 'Denied'; // Set status to 'Denied'
    },
    getDenyButtonClass(student) {
      return {
        'deny-red': student.status === 'Denied' // Add class if 'Denied'
      };
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
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.status-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.deny-red {
  background-color: red !important;
  color: white;
}

.status-approved {
  color: green;
  font-weight: bold;
  font-size: 16px;
}

.status-denied {
  color: red;
  font-weight: bold;
  font-size: 16px;
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
</style>-->
<!-- 
<template>
  <div>
    <h1 class="thr">Late Request</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name or Batch" @input="search" />
        <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Date</th>
          <th>Reason for Late</th>
          <th>Status</th>
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
              <button :class="getDenyButtonClass(student)" @click="denyStudentreq(index)" class="deny-btn">Deny</button>
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
        const matchesNameOrBatch = student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = this.selectedDate ? student.date === this.selectedDate : true;
        return matchesNameOrBatch && matchesDate;
      });
    }
  },
  methods: {
    approveStudent(index) {
      this.students[index].status = 'Approved';
    },
    denyStudentreq(index) {
      this.students[index].status = 'Denied'; // Set status to 'Denied'
    },
    getDenyButtonClass(student) {
      return {
        'deny-red': student.status === 'Denied', // Apply class if 'Denied'
      };
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
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  width: 150px; /* Fix the column width */
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
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.status-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.deny-red {
  background-color: red !important;
  color: white;
}

.status-approved {
  color: green;
  font-weight: bold;
  font-size: 16px;
}

.status-denied {
  color: red;
  font-weight: bold;
  font-size: 16px;
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
</style> 
perfect
<template>
  <div>
    <h1 class="thr">Late Request</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name or Batch" @input="search" />
        <input type="date" v-model="selectedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Date</th>
          <th class="reason-column">Reason for Late</th>
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
        const matchesNameOrBatch = student.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = this.selectedDate ? student.date === this.selectedDate : true;
        return matchesNameOrBatch && matchesDate;
      });
    }
  },
  methods: {
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


seachbar ok
<template>
  <div>
    <h1 class="thr">Late Request</h1>
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
          <th class="reason-column">Reason for Late</th>
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
</style>
<template>
  <div>
    <h1 class="thr">Late Request</h1>
    <div class="search-bar-container ms-5">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
        <input type="date" v-model="formattedDate" @change="search" class="date-picker" />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>Date</th>
          <th class="reason-column">Reason for Late</th>
          <th class="status-column">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td>{{ student.studentName }}</td>
          <td>{{ student.batch }}</td>
          <td>{{ formatDate(student.date) }}</td>
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
      formattedDate: '', // To bind the formatted date
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
      if (this.formattedDate) {
        this.selectedDate = this.formatDateToISOString(this.formattedDate);
      } else {
        this.selectedDate = '';
      }
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
    formatDate(dateString) {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    },
    formatDateToISOString(dateString) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
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
    <h1 class="thr">Late Request</h1>
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
          <th class="reason-column">Reason for Late</th>
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
  background-color: #004d40;
}

.deny-btn {
  background-color: red;
}

.status-approved {
  background-color: #004d40;
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
  border-color: #004d40;
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
      <h1 class="thr">Late Request</h1>
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
            <th class="reason-column">Reason for Late</th>
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
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Ensure fixed column width */
}

th, td {
  /* border: 5px solid #e2d5f7; */
  /* border: 5px solid #e6def4;  */
  /* border: 5px solid #e1f0f5;  */
  border: 5px solid #a9e6fb; 
  padding: 12px;
  text-align: center;
}

th {
  /* background: linear-gradient(to right, rgb(106, 111, 243), #89b5e4); */
  background: linear-gradient(to left, #4830e8 ,#a485f2);
  
   /* background: #96a8ce;  */
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  /* background-color: #d5bef6; */
 
  background-color:#c6c4f8;
}

tbody tr:nth-child(odd) {
 
  background-color: #c0bdf7;
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


.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5); 
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
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

.thr {
  text-align: center;
  margin-top: 10px;
  font-size: 28px;
  color: #6b61f3;
}

.icon {
  margin-right: 10px;
}

input:focus {
  outline: none;
  border-color: #d4bbff;
  box-shadow: 0 0 5px #c9b1f2(76, 175, 80, 0.3);
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
      <h1 class="thr">Late Request</h1>
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
            <th class="reason-column">Reason for Late</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.date }}</td>
            <td class="reason-column">
        
              <div v-if="student.voiceNote">
                <audio :src="student.voiceNote" controls></audio>
              </div>
              <div v-else>
                {{ student.reasonforlate }}
              </div>
            </td>
            
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
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: '' },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: '' },
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: 'path/to/voice-note.mp3' },  // Example with voice note
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: 'path/to/voice-note.mp3' },  // Example with voice note
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
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
  background-color:#c6c4f8;
}

tbody tr:nth-child(odd) {
  background-color: #c0bdf7;
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  font-size: 12px;
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
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
}

.status-approved {
  color: rgb(34, 193, 34);
  font-weight: bold;
}

.status-denied {
  color: rgb(243, 73, 73);
  font-weight: bold;
}

.reason-column {
  min-width: 250px;
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.audio-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.audio-player {
  max-width: 150px;
  height: auto;
  margin-top: 5px;
}

.audio-player audio {
  width: 100%;
  height: 30px;
}

.reason-column div {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>







with three dots
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
      <h1 class="thr">Late Request</h1>
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
            <th class="reason-column">Reason for Late</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.studentName }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.date }}</td>
            <td class="reason-column">
             Check if voiceNote exists and display accordingly 
              <div v-if="student.voiceNote">
                <audio v-if="student.voiceNote" :src="student.voiceNote" controls class="audio-player"></audio>
              </div>
              <div v-else>
                {{ student.reasonforlate }}
              </div>
            </td>
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
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: '' },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: '' },
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: 'path/to/voice-note.mp3' },  // Example with voice note
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: 'path/to/voice-note.mp3' },  // Example with voice note
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
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

th {
  background: linear-gradient(to left, #4830e8 ,#a485f2);
  color: #fcffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color:#c6c4f8;
}

tbody tr:nth-child(odd) {
  background-color: #c0bdf7;
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
 
  font-size: 12px;
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
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
}

.status-approved {
  color: rgb(77, 98, 229);
  font-weight: bold;
}

.status-denied {
  color: rgb(40, 40, 157);
  font-weight: bold;
}

.reason-column {
  min-width: 250px;
  max-width: 280px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.audio-player {
  max-width: 300px;
  max-height: 35px;
}


</style>




''''''''''''''BOX SEARCH BAR WITH AUDIO FUNCTION'''''''''''
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
      <h1 class="thr">Late Request</h1>
      <div class="filters-container">
        <div class="filter">
          <label for="nameSearch">Search by Name:</label>
          <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
        </div>
      
        <div class="filter">
          <label for="batchFilter">Filter by Batch:</label>
          <select id="batchFilter" v-model="selectedBatch" type="text" placeholder="Enter Batch">
            <option value="">All</option>
            <option value="morning batch">Morning</option>
            <option value="evening batch">Evening</option>
          </select>
        </div>
     <div class="search-bar-container ms-5">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name/Batch" @input="search" /> -->
          <!-- <input type="date"> -->
           <!-- <input type="date" v-model="selectedDate" @change="search" class="date-picker" placeholder="YYYY-MM-DD"/>  -->
        <!-- </div> 
      </div> 
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Date</th>
            <th class="reason-column">Reason for Late</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
  <tbody>
    <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.date }}</td>
             <td class="reason-column"> -->
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
              <!-- <div>
                {{ student.reason }}
              </div>
            </td> 
            <td>
              <div v-if="student.status == 'PENDING'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">Approve</button>
                <button @click="denyStudentreq(index)" class="deny-btn">Deny</button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">{{ student.status }}</span>
              </div>
            </td>
          </tr>
        </tbody>
         
         <tbody v-if="filteredStudents.length">
  <tr v-for="(student, index) in filteredStudents" :key="index">
    <td>{{ student.name }}</td>
    <td>{{ student.batch }}</td>
    <td>{{ student.date }}</td>
    <td>{{ student.reason }}</td>
    <td>
      <div v-if="student.status === 'PENDING'" class="status-buttons">
        <button @click="approveStudent(index)" class="approve-btn">Approve</button>
        <button @click="denyStudentreq(index)" class="deny-btn">Deny</button>
      </div>
      <div v-else>
        <span :class="getStatusClass(student.status)">{{ student.status }}</span>
        
      </div>
    </td>
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

<scirpt>

export default {
  data() {
    return {
      selectedDate: '',  
      students: [
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: '' },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: '' },
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: 'path/to/voice-note-1.mp3' },  
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: 'path/to/voice-note-2.mp3' },  
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
      ],
      playbackSpeeds: [1, 1.5, 2],
      currentSpeed: [],
      searchText: '',
    };
  },
  mounted() {
    this.currentSpeed = this.students.map(() => 0);
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
    search() {},

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

    togglePlaybackSpeed(index) {
      this.currentSpeed[index] = (this.currentSpeed[index] + 1) % this.playbackSpeeds.length;
      const audio = this.$refs.audioPlayers[index];
      if (audio) {
        audio.playbackRate = this.playbackSpeeds[this.currentSpeed[index]];
      }
    }
  }
};
</script> -->  
<!-- <script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      selectedDate: '', 
      students: [
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: '' },
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: '' },
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
        { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: 'path/to/voice-note-1.mp3' },  
        { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: 'path/to/voice-note-2.mp3' },  
        { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
      ],
      playbackSpeeds: [1, 1.5, 2],
      currentSpeed: [],
      searchText: '',
    };
  },
  mounted() {
    this.currentSpeed = this.students.map(() => 0);
  },
  computed: {
    filteredStudents() {
      const formattedDate = this.selectedDate ? dayjs(this.selectedDate).format('DD-MM-YYYY') : '';
      
      return this.students.filter(student => {
        const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = formattedDate ? student.date === formattedDate : true;
        return matchesName && matchesDate;
      });
    }
  },
  methods: {
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

    togglePlaybackSpeed(index) {
      this.currentSpeed[index] = (this.currentSpeed[index] + 1) % this.playbackSpeeds.length;
      const audio = this.$refs.audioPlayers[index];
      if (audio) {
        audio.playbackRate = this.playbackSpeeds[this.currentSpeed[index]];
      }
    }
  }
};
</script> 
<script>

 import dayjs from 'dayjs';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

      selectedDate: '', 
      selectedBatch: '',
      // students: [
      //   { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-12-18', voiceNote: '' },
      //   { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: '' },
      //   { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-12-20', voiceNote: '' },
      //   { studentName: 'Siya', batch: 'morning', reasonforlate: 'Traffic', status: '', date: '2024-11-18', voiceNote: 'path/to/voice-note-1.mp3' },  
      //   { studentName: 'Reshma', batch: 'morning', reasonforlate: 'Family emergency', status: '', date: '2024-11-19', voiceNote: 'path/to/voice-note-2.mp3' },  
      //   { studentName: 'Deva', batch: 'evening', reasonforlate: 'Overslept', status: '', date: '2024-11-20', voiceNote: '' },
      // ],
      // playbackSpeeds: [1, 1.5, 2],
      // currentSpeed: [],
      searchText: '',
      
    };
  },
  mounted() {
    // this.currentSpeed = this.students.map(() => 0);
    this.fetchLateRequest();
  },
  computed: {
    ...mapGetters(['getLate']),
    lateRequests(){
      return this.getLate;
    },
    filteredStudents() {
   
      // const formattedSelectedDate = this.selectedDate ? dayjs(this.selectedDate).format('DD-MM-YYYY') : '';
      
      // return this.students.filter(student => {
      //   const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
        

      //   const formattedStudentDate = dayjs(student.date).format('DD-MM-YYYY');
        
      //   const matchesDate = formattedSelectedDate ? formattedStudentDate === formattedSelectedDate : true;
        
      //   return matchesName && matchesDate;
        
      // });

      const formattedSelectedDate = this.selectedDate
        ? dayjs(this.selectedDate).format('YYYY-MM-DD')
        : '';

      return this.lateRequests.filter((student) => {
        const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesBatch = student.batch.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = formattedSelectedDate
          ? dayjs(student.date).format('YYYY-MM-DD') === formattedSelectedDate
          : true;

        return (matchesName || matchesBatch) && matchesDate;
      });
    }
  },
  methods: {
    async fetchLateRequest(){
      try{
        await this.$store.dispatch('allLates'); 
      }catch (error) {
          console.error(error);
      } 
    },
    async approveStudent(index) {
      // this.students[index].status = 'Approved';
      const payload = this.lateRequests[index].id;
      try{
        const res = await this.$store.dispatch('approveLate', payload); 
        if(res){
          this.fetchLateRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },
    
    async denyStudentreq(index) {
      // this.students[index].status = 'Denied';
      const payload = this.lateRequests[index].id;
      try{
      const res = await this.$store.dispatch('denyLate', payload); 
      if(res){
          this.fetchLateRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },

    getStatusClass(status) {
      if (status === 'Approved') return 'status-approved';
      if (status === 'Denied') return 'status-denied';
      return '';
    },

    // togglePlaybackSpeed(index) {
    //   this.currentSpeed[index] = (this.currentSpeed[index] + 1) % this.playbackSpeeds.length;
    //   const audio = this.$refs.audioPlayers[index];
    //   if (audio) {
    //     audio.playbackRate = this.playbackSpeeds[this.currentSpeed[index]];
    //   }
    // }
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
  display: block;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #a39ad9;
}
.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom:1px;
  font-size: 28px;
  color: #2f6ff9;
}

.main-content {
  flex: 11;
  padding: 20px;
  background-color: rgb(204, 238, 245);
  align-items: center;
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

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  font-size: 12px;
}

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
}

/* .status-approved {
  color: rgb(77, 98, 229);
  font-weight: bold;
} */

/* .status-denied {
  color: rgb(40, 40, 157);
  font-weight: bold;
} */

.approve-btn {
  color: green; /* Text color for the Approve button */
  font-weight: bold; /* Makes the text bold */
  border: none; /* Optional: remove button borders */
  background: transparent; /* Optional: transparent background */
  cursor: pointer; /* Changes cursor to pointer */
}

.deny-btn {
  color: red; /* Text color for the Deny button */
  font-weight: bold; /* Makes the text bold */
  border: none; /* Optional: remove button borders */
  background: transparent; /* Optional: transparent background */
  cursor: pointer; /* Changes cursor to pointer */
}

/* Optional: Add hover effect */
.approve-btn:hover {
  text-decoration: underline;
}

.deny-btn:hover {
  text-decoration: underline;
}
.reason-column {
  min-width: 250px;
  max-width: 280px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* .icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
} */

.audio-player {
  max-width: 300px;
  max-height: 35px;
}

/* .audio-container {
  display: flex;
  align-items: center;
  position: relative;
} */

/* .audio-player {
  flex: 1;
} */
/* 
.speed-toggle-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.speed-toggle-btn:hover {
  background-color: #0056b3;
} */

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
  width: 250px;
  
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
       <h1 class="thr">Late Request</h1>
       <div class="filters-container">
         <div class="filter">
           <label for="nameSearch">Search by Name:</label>
           <input id="nameSearch" v-model="searchText" type="text" placeholder="Enter Name" />
         </div>
      
         <div class="filter">
           <label for="batchFilter">Filter by Batch:</label>
           <select id="batchFilter" v-model="selectedBatch" type="text" placeholder="Enter Batch">
             <option value="">All</option>
             <option value="morning batch">Morning</option>
             <option value="evening batch">Evening</option>
           </select>
         </div>

      </div> 
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Date</th>
            <th class="reason-column">Reason for Late</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody v-if="filteredStudents.length">
  <tr v-for="(student, index) in filteredStudents" :key="index">
    <td>{{ student.name }}</td>
    <td>{{ student.batch }}</td>
    <td>{{ student.date }}</td>
    <td>{{ student.reason }}</td>
    <td>
      <div v-if="student.status === 'PENDING'" class="status-buttons">
        <button @click="approveStudent(index)" class="approve-btn">Approve</button>
        <button @click="denyStudentreq(index)" class="deny-btn">Deny</button>
      </div>
      <div v-else>
        <span :class="getStatusClass(student.status)">{{ student.status }}</span>
        
      </div>
    </td>
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

 import dayjs from 'dayjs';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

      selectedDate: '', 
      selectedBatch: '',
      searchText: '',
      
    };
  },
  mounted() {  this.fetchLateRequest();
  },
  computed: {
    ...mapGetters(['getLate']),
    lateRequests(){
      return this.getLate;
    },
    filteredStudents() { const formattedSelectedDate = this.selectedDate
        ? dayjs(this.selectedDate).format('YYYY-MM-DD')
        : '';

      return this.lateRequests.filter((student) => {
        const matchesName = student.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesBatch = student.batch.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesDate = formattedSelectedDate
          ? dayjs(student.date).format('YYYY-MM-DD') === formattedSelectedDate
          : true;

        return (matchesName || matchesBatch) && matchesDate;
      });
    }
  },
  methods: {
    async fetchLateRequest(){
      try{
        await this.$store.dispatch('allLates'); 
      }catch (error) {
          console.error(error);
      } 
    },
    async approveStudent(index) { const payload = this.lateRequests[index].id;
      try{
        const res = await this.$store.dispatch('approveLate', payload); 
        if(res){
          this.fetchLateRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },
    
    async denyStudentreq(index) {

      const payload = this.lateRequests[index].id;
      try{
      const res = await this.$store.dispatch('denyLate', payload); 
      if(res){
          this.fetchLateRequest();
        }
      }catch (error) {
          console.error(error);
      } 
    },

    getStatusClass(status) {
      if (status === 'Approved') return 'status-approved';
      if (status === 'Denied') return 'status-denied';
      return '';
    }, }
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
 .thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom:1px;
  font-size: 28px;
  color: #2f6ff9;
} 

.main-content {
  flex: 11;
  padding: 20px;
  background-color: rgb(204, 238, 245);
  align-items: center;
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

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  font-size: 12px;
}

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5);
}

.deny-btn {
  background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8);
}

.approve-btn:hover {
  text-decoration: underline;
}

.deny-btn:hover {
  text-decoration: underline;
}
.reason-column {
  min-width: 250px;
  max-width: 280px;
  word-wrap: break-word;
  overflow-wrap: break-word;
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
  width: 250px;
  
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
      </ul>
    </div>

    <div class="main-content">
      <h1 class="thr">Late Request</h1>
      <!-- <div class="filters-container">
        <div class="filter">
          <label for="searchBar">Search:</label>
          <input
            id="searchBar"
            v-model="searchText"
            type="text"
            placeholder="Search by Name or Batch"
          />
        </div>
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
  
        <!-- <i class="fa fa-search" aria-hidden="true"></i>   -->
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Date</th>
            <th class="reason-column">Reason for Late</th>
            <th class="status-column">Today's Status</th>
          </tr>
        </thead>
        <tbody v-if="filteredStudents.length >0">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.date }}</td>
            <td>{{ student.reason }}</td>
            <td>
              <div v-if="student.status === 'PENDING'" class="status-buttons">
                <button @click="approveStudent(index)" class="approve-btn">
                  Approve
                </button>
                <button @click="denyStudentreq(index)" class="deny-btn">
                  Deny
                </button>
              </div>
              <div v-else>
                <span :class="getStatusClass(student.status)">
                  {{ student.status }}
                </span>
              </div>
            </td>
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
// import dayjs from 'dayjs';
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchText: "", 
    };
  },
  mounted() {
    this.fetchLateRequest();
  },
  computed: {
    ...mapGetters(["getLate"]),
    lateRequests() {
      // return this.getLate;
      return Array.isArray(this.getLate) ? this.getLate : [];
    },
    filteredStudents() {
      if (this.lateRequests.length > 0) {
      // if (this.lateRequests && this.lateRequests.length > 0) {
    return this.lateRequests.filter((student) => {
      const search = this.searchText.toLowerCase();
      const matchesName = student.name.toLowerCase().includes(search);
      const matchesBatch = student.batch.toLowerCase().includes(search);
      return matchesName || matchesBatch;
    });
  }
  return [];
    },
  },
  methods: {
    async fetchLateRequest() {
      try {
        await this.$store.dispatch("allLates");
      } catch (error) {
        console.error(error);
      }
    },
    async approveStudent(index) {
      const payload = this.lateRequests[index].id;
      try {
        const res = await this.$store.dispatch("approveLate", payload);
        if (res) {
          this.fetchLateRequest();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async denyStudentreq(index) {
      const payload = this.lateRequests[index].id;
      try {
        const res = await this.$store.dispatch("denyLate", payload);
        if (res) {
          this.fetchLateRequest();
        }
      } catch (error) {
        console.error(error);
      }
    },
    getStatusClass(status) {
      if (status === "Approved") return "status-approved";
      if (status === "Denied") return "status-denied";
      return "";
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
  /* background-color: #9dd0ff; */
}

.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 1px;
  font-size: 28px;
  color: #6d7078;
}

.main-content {
  flex: 11;
  padding: 20px;
  background-color: rgb(204, 238, 245);
  align-items: center;
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
table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
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
  /* background: linear-gradient(to left, #4830e8, #a485f2); */
  background:#4FC3F7;
  color: #ffffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(odd) {
  background-color: #81D4FA;
}

button {
  border: 1px solid #ddd;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 4px;
  min-width: 80px;
  font-size: 12px;
}

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  /* background: linear-gradient(to right, rgb(109, 93, 172), #6a96f5); */
  background:#87CEEB;
}

.deny-btn {
  /* background: linear-gradient(to right, rgb(106, 110, 218), #6e92b8); */
  background:#89d2fd ;
}

.reason-column {
  min-width: 250px;
  max-width: 280px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
/* 

 
  .search-bar {
    width: 250px;
    border: none; /* Remove the border */

  
  
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
  .search-bar {
  display: flex;
  align-items: center;
  width: 250px;
  border: 1px solid #ccc; /* Add border to create the box */
  border-radius: 6px; /* Add rounded corners */
  padding: 5px; /* Add padding for inner spacing */
  background-color: rgb(255, 249, 249); /* Ensure a clear background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.search-bar input[type="text"] {
  border: none; /* Remove inner input border */
  outline: none; /* Remove focus outline */
  width: calc(100% - 30px); /* Full width minus space for icon */
  padding: 5px; /* Add padding for better spacing */
  font-size: 14px; /* Adjust text size */
}

.search-bar i {
  margin-left: 10px; /* Add spacing between the icon and input */
  color: #888; /* Icon color */
  cursor: pointer; /* Change cursor to pointer for interactivity */
}

</style>


