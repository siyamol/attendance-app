<!-- 

<template>
  <div class="page-container">

    <div class="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
 
      
        
        <li><router-link to="/leave">Leave Request</router-link></li>
 
        <li><router-link to="/late">Late Request</router-link></li>
        <li><a href="#">Logout</a></li>
    
   
      </ul>
    </div>

    <div class="main-content">
      <h1>Student Information <i style="font-size: 13px; font-weight: normal">prathibhatheeram</i></h1>
      <hr /><br />
      <form @submit.prevent="addRecord">
        <div class="form-container">
          <fieldset id="bg_table">
            <table id="add_student_table">
              <tr>
                <th colspan="2">Add Student</th>
              </tr>
              <tr>
                <td>First name</td>
                <td>
                  <input v-model="formData.firstName" type="text" required />
                </td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>
                  <input v-model="formData.lastName" type="text" required />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input v-model="formData.email" type="email" required />
                </td>
              </tr>
              <tr>
                <td>Hired date</td>
                <td>
                  <input v-model="formData.hireDate" type="text" id="datepicker" required />
                </td>
              </tr>
              <tr>
                <td>Batch</td>
                <td>
                  <input v-model="formData.batch" type="number" required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Add Student" />
                </td>
                <td v-html="errorMessage"></td>
              </tr>
            </table>
          </fieldset>

          <fieldset>
            <table id="student_table" border="1" cellpadding="5px" style="border-collapse:collapse" width="100%">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Hired Date</th>
                <th>Batch</th>
                <th>Action</th>
              </tr>
              <tr v-for="(student, index) in students" :key="index">
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.hireDate }}</td>
                <td>{{ student.batch }}</td>
                <td>
                  <button @click="deleteRecord(index)">Remove</button>
                </td>
              </tr>
            </table>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/all.css';

export default {
  name: 'StudentInfo',
  setup() {
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      hireDate: '',
      batch: ''
    });

    const students = ref([]);
    const errorMessage = ref('');

    const addRecord = () => {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.hireDate || !formData.batch) {
        errorMessage.value = "<span style='color:red'>Please fill in all fields</span>";
        return;
      }

      students.value.push({ ...formData });

      formData.firstName = '';
      formData.lastName = '';
      formData.email = '';
      formData.hireDate = '';
      formData.batch= '';

      errorMessage.value = '';
    };

    const deleteRecord = (index) => {
      students.value.splice(index, 1);
    };

    onMounted(() => {
      $('#datepicker').datepicker({
        showOn: 'button',
        buttonImage: 'http://i0.wp.com/advfam.com.br/wp-content/uploads/2016/01/calendario.png',
        buttonImageOnly: true,
        buttonText: 'Select date',
        onSelect: function (dateText) {
          formData.hireDate = dateText;
        }
      });
    });

    return {
      formData,
      students,
      errorMessage,
      addRecord,
      deleteRecord
    };
  }
}; 
</script>
 
<style scoped>
/* Page Layout */
.page-container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f4f4f4;
  border-right: 2px solid #ccc;
}

.sidebar h2 {
  text-align: center;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
}

.sidebar ul li a:hover {
  color: #4CAF50;
}

.main-content {
  flex: 1;
  padding: 20px;
}

h1 {
  text-align: center;
}

.ui-datepicker-trigger {
  width: 23px;
}

#bg_table {
  background: url('https://lidtop.files.wordpress.com/2015/01/05c.jpg');
}

#student_table {
  margin-top: 20px;
  width: 100%;
  text-align: left;
}

#student_table th, #student_table td {
  padding: 10px;
}

#student_table th {
  background-color: #f2f2f2;
  border: 2px solid #170303;
}

#student_table td {
  background-color: #ffffff;
  border: 2px solid #000000;
}

input[type="submit"] {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: 2px solid #4d0606;
  cursor: pointer;
}

button {
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

input[type="text"], input[type="email"], input[type="number"] {
  padding: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus {
  border-color: #4caf50;
  outline: none;
}
</style>

 -->

<!-- 
 <style scoped>
 
 
 .page-container {
   display: flex;
   max-width: 1300px;
   margin: 0 auto;
   background-color: #f1f5f8;
   font-family: 'Arial', sans-serif;
 }
 

 
 .sidebar {
   width: 250px;
   padding: 30px;
   background: linear-gradient(135deg, #4caf50, #81c784);
   color: white;
   border-right: 2px solid #ccc;
   box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
 }
 
 .sidebar h2 {
   text-align: center;
   font-size: 28px;
   margin-bottom: 20px;
 }
 
 .sidebar ul {
   list-style-type: none;
   padding: 0;
 }
 
 .sidebar ul li {
   margin: 15px 0;
 }
 
 .sidebar ul li a {
   text-decoration: none;
   color: white;
   font-size: 18px;
   font-weight: 600;
   display: block;
   padding: 12px 18px;
   border-radius: 5px;
   transition: all 0.3s ease;
 }
 
 .sidebar ul li a:hover {
   background-color: #388e3c;
   transform: scale(1.05);
 }
 
 .sidebar ul li a:active {
   background-color: #2c6f2f;
 }

 .main-content {
   flex: 1;
   padding: 40px;
   background-color: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   text-align: center;
   font-size: 36px;
   color: #333;
   margin-bottom: 20px;
   font-family: 'Roboto', sans-serif;
 }
 
 h1 i {
   font-size: 14px;
   color: #888;
 }
 
 hr {
   border: 1px solid #4CAF50;
   margin-bottom: 30px;
 }
 
 #student_table {
   margin-top: 30px;
   width: 100%;
   text-align: left;
   border-collapse: collapse;
 }
 
 #student_table th, #student_table td {
   padding: 15px;
   border: 1px solid #ddd;
 }
 
 #student_table th {
   background-color: #4caf50;
   color: white;
   font-size: 18px;
 }
 
 #student_table td {
   background-color: #f9f9f9;
   color: #333;
   font-size: 16px;
 }
 
 #student_table td button {
   padding: 6px 14px;
   background-color: #f44336;
   color: white;
   border: none;
   border-radius: 6px;
   cursor: pointer;
   transition: all 0.3s ease;
 }
 
 #student_table td button:hover {
   background-color: #d32f2f;
   transform: scale(1.1);
 }
 

 form {
   margin-top: 30px;
   background: #fafafa;
   padding: 25px;
   border-radius: 8px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }
 
 input[type="submit"] {
   padding: 12px 30px;
   background-color: #a3f3a6;
   color: white;
   border: 2px solid #cceccd;
   border-radius: 4px;
   cursor: pointer;
   font-size: 18px;
   transition: background-color 0.3s ease;
 }
 
 input[type="submit"]:hover {
   background-color: #c9f8cc;
 }
 
 input[type="text"], input[type="email"], input[type="number"], input[type="date"] {
   padding: 12px 20px;
   border: 2px solid #ccc;
   border-radius: 6px;
   width: 100%;
   margin-bottom: 20px;
   font-size: 16px;
   transition: border 0.3s ease;
 }
 
 input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus, input[type="date"]:focus {
   border-color: #a0e9a2;
   outline: none;
   box-shadow: 0 0 8px rgba(220, 237, 221, 0.5);
 }
 

 table {
   width: 100%;
   margin-top: 20px;
   text-align: left;
   border-collapse: collapse;
 }
 
 table th, table td {
   padding: 15px;
   border: 1px solid #ddd;
 }
 
 table th {
   background-color: #42b7b3;
   color: #333;
 }
 
 table td {
   background-color: #ffffff;
   color: #333;
 }
 

 span {
   color: #f44336;
   font-weight: bold;
   font-size: 16px;
 }
 </style> 
 <style scoped>

.page-container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 250px;
  padding: 30px;
  background-color: #e0f7fa;
  color: #333;
  border-right: 2px solid #ddd;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #00796b;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #00796b;
  font-size: 18px;
  font-weight: 500;
  display: block;
  padding: 12px 18px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #b2dfdb;
  transform: scale(1.05);
}

.main-content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 i {
  font-size: 14px;
  color: #888;
}

hr {
  border: 1px solid #4caf50;
  margin-bottom: 30px;
}

#student_table {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

#student_table th, #student_table td {
  padding: 12px;
  border: 1px solid #ddd;
}

#student_table th {
  background-color: #e8f5e9;
  color: #333;
  font-size: 16px;
}

#student_table td {
  background-color: #ffffff;
  color: #333;
  font-size: 14px;
}

#student_table td button {
  padding: 6px 14px;
  background-color: #80deea;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#student_table td button:hover {
  background-color: #4dd0e1;
  transform: scale(1.1);
}


form {
  margin-top: 30px;
  background: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

input[type="submit"] {
  padding: 12px 30px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
  background-color: #388e3c;
}

input[type="text"], input[type="email"], input[type="number"], input[type="date"] {
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  transition: border 0.3s ease;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus, input[type="date"]:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}


table {
  width: 100%;
  margin-top: 20px;
  text-align: left;
  border-collapse: collapse;
}

table th, table td {
  padding: 15px;
  border: 1px solid #ddd;
}

table th {
  background-color: #f1f8e9;
  color: #333;
}

table td {
  background-color: #ffffff;
  color: #333;
}

span {
  color: #e57373;
  font-weight: bold;
  font-size: 16px;
}
</style> good
<style scoped>
/* Page Layout */
.page-container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  padding: 30px;
  background-color: #e0f7fa;
  color: #f02b2b;
  border-right: 2px solid #ddd;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #00796b;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #00796b;
  font-size: 18px;
  font-weight: 500;
  display: block;
  padding: 12px 18px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #b2dfdb;

}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 i {
  font-size: 14px;
  color: #421212;
}

hr {
  border: 1px solid #4caf50;
  margin-bottom: 30px;
}

#student_table {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

#student_table th, #student_table td {
  padding: 12px;
  border: 1px solid #ddd;
}

#student_table th {
  background-color: #e8f5e9;
  color: #333;
  font-size: 16px;
}

#student_table td {
  background-color: #ffffff;
  color: #333;
  font-size: 14px;
}

#student_table td button {
  padding: 6px 14px;
  background-color: #80deea;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#student_table td button:hover {
  background-color: #4dd0e1;
  transform: scale();
}

/* Form Styling */
form {
  margin-top: 30px;
  background: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

input[type="submit"] {
  padding: 10px 25px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
  background-color: #388e3c;
}

input[type="text"], input[type="email"], input[type="number"], input[type="date"] {
  padding: 8px 15px;
  border: 2px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;  /* Reduced font size */
  transition: border 0.3s ease;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus, input[type="date"]:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

/* Table Styling */
table {
  width: 100%;
  margin-top: 20px;
  text-align: left;
  border-collapse: collapse;
}

table th, table td {
  padding: 15px;
  border: 1px solid #ddd;
}

table th {
  background-color: #f1f8e9;
  color: #333;
}

table td {
  background-color: #ffffff;
  color: #333;
}

/* Error Message */
span {
  color: #e57373;
  font-weight: bold;
  font-size: 16px;
}
</style>
<style scoped>
/* Page Layout */
.page-container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  padding: 30px;
  background-color: #e0f7fa;
  color: #f02b2b;
  border-right: 2px solid #ddd;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #00796b;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #00796b;
  font-size: 18px;
  font-weight: 500;
  display: block;
  padding: 12px 18px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #b2dfdb;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 i {
  font-size: 14px;
  color: #421212;
}

hr {
  border: 1px solid #4caf50;
  margin-bottom: 30px;
}

/* Student Table */
#student_table {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

#student_table th, #student_table td {
  padding: 12px;
  border: 1px solid #ddd;
}

#student_table th {
  background-color: #e8f5e9;
  color: #333;
  font-size: 16px;
}

#student_table td {
  background-color: #ffffff;
  color: #333;
  font-size: 14px;
}

#student_table td button {
  padding: 6px 14px;
  background-color: #80deea;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#student_table td button:hover {
  background-color: #4dd0e1;
  transform: scale(1.05);
}

/* Form Styling */
form {
  margin-top: 30px;
  background: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

input[type="submit"] {
  padding: 10px 25px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 0;  /* Align button to the left */
  width: auto;
}

input[type="submit"]:hover {
  background-color: #388e3c;
}

input[type="text"], input[type="email"], input[type="number"], input[type="date"], select {
  padding: 8px 15px;
  border: 2px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;  /* Reduced font size */
  transition: border 0.3s ease;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus, input[type="date"]:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

/* Reduce input field size */
input[type="text"], input[type="email"], input[type="number"], input[type="date"], select {
  max-width: 300px; /* Restricting max width to make them more compact */
  margin-right: auto; /* Centering the fields */
}

/* Table Styling */
table {
  width: 100%;
  margin-top: 20px;
  text-align: left;
  border-collapse: collapse;
}

table th, table td {
  padding: 15px;
  border: 1px solid #ddd;
}

table th {
  background-color: #f1f8e9;
  color: #333;
}

table td {
  background-color: #ffffff;
  color: #333;
}

/* Error Message */
span {
  color: #e57373;
  font-weight: bold;
  font-size: 16px;
}
</style>

withouttable
<style scoped>

.page-container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  padding: 30px;
  background-color: #e0f7fa;
  color: #f02b2b;
  border-right: 2px solid #ddd;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #00796b;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #00796b;
  font-size: 18px;
  font-weight: 500;
  display: block;
  padding: 12px 18px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #b2dfdb;
}

.main-content {
  flex: 1;
  padding: 40px;
  background-color: #b1e5ae;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 i {
  font-size: 14px;
  color: #421212;
}

hr {
  border: 1px solid #4caf50;
  margin-bottom: 30px;
}

#student_table {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

#student_table th, #student_table td {
  padding: 12px;
  border: 1px solid #ddd;
}

#student_table th {
  background-color: #e8f5e9;
  color: #333;
  font-size: 16px;
}

#student_table td {
  background-color: #ffffff;
  color: #333;
  font-size: 14px;
}

#student_table td button {
  padding: 6px 14px;
  background-color: #80deea;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#student_table td button:hover {
  background-color: #4dd0e1;
  transform: scale();
}

form {
  margin-top: 30px;
  background: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

input[type="submit"] {
  padding: 10px 25px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
  background-color: #388e3c;
}

input[type="text"], input[type="email"], input[type="number"], input[type="date"], select {
  padding: 8px 15px;
  border: 2px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;  
  transition: border 0.3s ease;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="number"]:focus, input[type="date"]:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

input[type="date"]::-webkit-calendar-picker-indicator {
  transform: scale(0.8); 
}

fieldset {
  border: none;
  padding: 0;
}

.error {
  color: red;
  font-size: 12px;
}

#errorMessage {
  color: red;
}
</style>
almost ok
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>

    <div class="main-content">
      <h1>Student Information <i style="font-size: 13px; font-weight: normal">prathibhatheeram</i></h1>
      <hr /><br />

    
      <div class="search-container">
        <input
          v-model="searchQuery.name"
          type="text"
          placeholder="Search by name"
        />
        <input
          v-model="searchQuery.batch"
          type="number"
          placeholder="Search by batch"
        />
        <input
          v-model="searchQuery.hireDate"
          type="text"
          id="search-datepicker"
          placeholder="Search by hire date"
        />
        <button @click="filterStudents">Search</button>
        <button @click="resetFilter">Reset</button>
      </div>

      <form @submit.prevent="addRecord">
        <div class="form-container">
          <fieldset id="bg_table">
            <table id="add_student_table">
              <tr>
                <th colspan="2">Add Student</th>
              </tr>
              <tr>
                <td>First name</td>
                <td><input v-model="formData.firstName" type="text" required /></td>
              </tr>
              <tr>
                <td>Last name</td>
                <td><input v-model="formData.lastName" type="text" required /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input v-model="formData.email" type="email" required /></td>
              </tr>
              <tr>
                <td>Hired date</td>
                <td><input v-model="formData.hireDate" type="text" id="datepicker" required /></td>
              </tr>
              <tr>
                <td>Batch</td>
                <td><input v-model="formData.batch" type="number" required /></td>
              </tr>
              <tr>
                <td><input type="submit" value="Add Student" /></td>
                <td v-html="errorMessage"></td>
              </tr>
            </table>
          </fieldset>

          <fieldset>
            <table id="student_table" border="1" cellpadding="5px" style="border-collapse:collapse" width="100%">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Hired Date</th>
                <th>Batch</th>
                <th>Action</th>
              </tr>
              <tr v-for="(student, index) in filteredStudents" :key="index">
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.hireDate }}</td>
                <td>{{ student.batch }}</td>
                <td><button @click="deleteRecord(index)">Remove</button></td>
              </tr>
            </table>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from 'vue';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/all.css';

export default {
  name: 'StudentInfo',
  setup() {
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      hireDate: '',
      batch: ''
    });

    const searchQuery = reactive({
      name: '',
      batch: '',
      hireDate: ''
    });

    const students = ref([]);
    const errorMessage = ref('');

    const filteredStudents = computed(() => {
      return students.value.filter((student) => {
        const matchesName =
          !searchQuery.name ||
          student.firstName.toLowerCase().includes(searchQuery.name.toLowerCase());
        const matchesBatch =
          !searchQuery.batch || student.batch === parseInt(searchQuery.batch);
        const matchesHireDate =
          !searchQuery.hireDate || student.hireDate === searchQuery.hireDate;

        return matchesName && matchesBatch && matchesHireDate;
      });
    });

    const addRecord = () => {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.hireDate || !formData.batch) {
        errorMessage.value = "<span style='color:red'>Please fill in all fields</span>";
        return;
      }

      students.value.push({ ...formData });

      formData.firstName = '';
      formData.lastName = '';
      formData.email = '';
      formData.hireDate = '';
      formData.batch = '';

      errorMessage.value = '';
    };

    const deleteRecord = (index) => {
      students.value.splice(index, 1);
    };

    const filterStudents = () => {
      
    };

    const resetFilter = () => {
      searchQuery.name = '';
      searchQuery.batch = '';
      searchQuery.hireDate = '';
    };

    onMounted(() => {
      $('#datepicker').datepicker({
        showOn: 'button',
        buttonImage: 'http://i0.wp.com/advfam.com.br/wp-content/uploads/2016/01/calendario.png',
        buttonImageOnly: true,
        buttonText: 'Select date',
        onSelect: function (dateText) {
          formData.hireDate = dateText;
        }
      });

      $('#search-datepicker').datepicker({
        showOn: 'focus',
        dateFormat: 'dd/mm/yy',
        onSelect: function (dateText) {
          searchQuery.hireDate = dateText;
        }
      });
    });

    return {
      formData,
      searchQuery,
      students,
      errorMessage,
      filteredStudents,
      addRecord,
      deleteRecord,
      filterStudents,
      resetFilter
    };
  }
};
</script>
<style scoped>
.page-container {
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Sidebar */
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

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
}

h1 {
  font-size: 26px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

#add_student_table {
  width: 100%;
  border-spacing: 10px;
  text-align: left;
}

#add_student_table th {
  font-size: 18px;
  text-align: left;
  padding-bottom: 10px;
}

#add_student_table td {
  padding: 8px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"],
select {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input[type="submit"] {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

input[type="submit"]:hover {
  background-color: #388e3c;
}

/* Table */
#student_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

#student_table th {
  background-color: #00796b;
  color: white;
  padding: 10px;
  font-size: 16px;
}

#student_table td {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
}

#student_table td button {
  background-color: #e53935;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

#student_table td button:hover {
  background-color: #c62828;
}

/* Search Bar */
.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #388e3c;
}

</style>
<template>
  <div class="page-container">
    <div class="sidebar">
      <h2></h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>

    <div class="main-content">
      <h2>Admin Page <i style="font-size: 30px; font-weight: normal">prathibhatheeram</i></h2>
      <hr /><br />

   
       <div class="search-container">
        <input
          v-model="searchQuery.name"
          type="text"
          placeholder="Search by name"
        />
        <select v-model="searchQuery.batch">
          <option value="">All</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
        </select>
        <input
          v-model="searchQuery.hireDate"
          type="text"
          id="search-datepicker"
          placeholder="Search by hire date"
        />
        <button @click="filterStudents">Search</button>
        <button @click="resetFilter">Reset</button>
      </div> -->

      <!-- <form @submit.prevent="addRecord">
        <div class="form-container">
          <fieldset id="bg_table">
            <table id="add_student_table">
              <tr>
                <th colspan="2">Add Student</th>
              </tr>
              <tr>
                <td>First name</td>
                <td><input v-model="formData.firstName" type="text" required /></td>
              </tr>
              <tr>
                <td>Last name</td>
                <td><input v-model="formData.lastName" type="text" required /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input v-model="formData.email" type="email" required /></td>
              </tr>
              <tr>
                <td>Hired date</td>
                <td><input v-model="formData.hireDate" type="text" id="datepicker" required /></td>
              </tr>
              <tr>
                <td>Batch</td>
                <td>
                  <select v-model="formData.batch" required>
                    <option value="" disabled>Select Batch</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><input type="submit" value="Add Student" /></td>
                <td v-html="errorMessage"></td>
              </tr>
            </table>
          </fieldset>

          <fieldset>
            <table id="student_table" border="1" cellpadding="5px" style="border-collapse:collapse" width="100%">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Hired Date</th>
                <th>Batch</th>
                <th>Action</th>
              </tr>
              <tr v-for="(student, index) in filteredStudents" :key="index">
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.hireDate }}</td>
                <td>{{ student.batch }}</td>
                <td><button @click="deleteRecord(index)">Remove</button></td>
              </tr>
            </table>
          </fieldset>
        </div>
      </form> 
    </div>
  </div>
</template>
<script>
// import { ref, reactive, onMounted, computed } from 'vue';
// import $ from 'jquery';
// import 'jquery-ui/ui/widgets/datepicker';
// import 'jquery-ui/themes/base/all.css';

// export default {
//   name: 'StudentInfo',
//   setup() {
//     const formData = reactive({
//       firstName: '',
//       lastName: '',
//       email: '',
//       hireDate: '',
//       batch: ''
//     });

//     const searchQuery = reactive({
//       name: '',
//       batch: '',
//       hireDate: ''
//     });

//     const students = ref([]);
//     const errorMessage = ref('');

//     const filteredStudents = computed(() => {
//       return students.value.filter((student) => {
//         const matchesName =
//           !searchQuery.name ||
//           student.firstName.toLowerCase().includes(searchQuery.name.toLowerCase());
//         const matchesBatch =
//           !searchQuery.batch || searchQuery.batch === 'All' || student.batch === searchQuery.batch;
//         const matchesHireDate =
//           !searchQuery.hireDate || student.hireDate === searchQuery.hireDate;

//         return matchesName && matchesBatch && matchesHireDate;
//       });
//     });

//     const addRecord = () => {
//       if (!formData.firstName || !formData.lastName || !formData.email || !formData.hireDate || !formData.batch) {
//         errorMessage.value = "<span style='color:red'>Please fill in all fields</span>";
//         return;
//       }

//       students.value.push({ ...formData });

//       formData.firstName = '';
//       formData.lastName = '';
//       formData.email = '';
//       formData.hireDate = '';
//       formData.batch = '';

//       errorMessage.value = '';
//     };

//     const deleteRecord = (index) => {
//       students.value.splice(index, 1);
//     };

//     const filterStudents = () => {
      
//     };

//     const resetFilter = () => {
//       searchQuery.name = '';
//       searchQuery.batch = '';
//       searchQuery.hireDate = '';
//     };

//     onMounted(() => {
//       $('#datepicker').datepicker({
//         showOn: 'button',
//         buttonImage: 'http://i0.wp.com/advfam.com.br/wp-content/uploads/2016/01/calendario.png',
//         buttonImageOnly: true,
//         buttonText: 'Select date',
//         onSelect: function (dateText) {
//           formData.hireDate = dateText;
//         }
//       });

//       $('#search-datepicker').datepicker({
//         showOn: 'focus',
//         dateFormat: 'dd/mm/yy',
//         onSelect: function (dateText) {
//           searchQuery.hireDate = dateText;
//         }
//       });
//     });

//     return {
//       formData,
//       searchQuery,
//       students,
//       errorMessage,
//       filteredStudents,
//       addRecord,
//       deleteRecord,
//       filterStudents,
//       resetFilter
//     };
//   }
// };
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
/* .main-content { */
  /* flex-grow: 1;
  padding: 20px;
  background: #f9f9f9;
}

h1 {
  font-size: 24px;
  color: #34495e;
}

hr {
  border: 1px solid #ddd;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.search-container input[type="text"],
.search-container select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 200px;
}

.search-container button {
  padding: 10px 15px;
  background-color: #34495e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.search-container button:hover {
  background-color:  #34495e;
}

button[type="reset"] {
  background-color: #e74c3c;
}

button[type="reset"]:hover {
  background-color: #c0392b;
}


table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

table th {
  background: #34495e;
  color: #fff;
}

table tr:nth-child(even) {
  background: #f2f2f2;
}




form {
  margin-bottom: 30px;
}

form table {
  margin: auto;
}

form input[type="text"],
form input[type="email"],
form select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form input[type="submit"] {
  background: #052e49;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

form input[type="submit"]:hover {
  background: #052e49;
}


@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    padding: 10px;
  }
} */
</style>-->



<!-- 


<template>
  <div class="page-container">
    <div class="sidebar">
      <h2></h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn">Today's Attendance</router-link></li>
 
      </ul>
    </div>
  </div>
     <div class="main-content">
      <h2> <i style="font-size: 30px; font-weight: normal">prathibhatheeram</i></h2>
      <hr /><br />
    </div> 
  
</template>
<script>
</script>

<style scoped>

.page-container {
  display: flex;
  
  min-height: 100vh;
  font-family: Arial, sans-serif;
  
  background-color: rgb(120, 206, 223);
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #b6ade5;
  color: white;
  border-right: 1px solid #ddd;
    background: linear-gradient(to top, #7fd7da, #8e4eef);
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
  background-color: #a39ad9;
}
.main-content {

  background-color: rgb(120, 206, 223);
}


</style>  -->
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
        <li><router-link to="/batch">batch</router-link></li>
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
