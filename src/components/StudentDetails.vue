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
        <li><router-link to="/batch">Batch</router-link></li>
        <li><router-link to="/wrk">Work from Home</router-link></li>
      </ul>
    </div>
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
        <button class="export-btn" @click="printPage">Export PDF</button>

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
            <td>{{ student.batchName}}</td>
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
      const exportButton = document.querySelector(".export-btn");
      exportButton.style.display = "none";
      window.print();
      setTimeout(() => {
        exportButton.style.display = "block";
      }, 1000);
    },
    // Method to update the formatted date when a date is selected
    // updateFormattedDate() {
    //   if (this.selectedDate) {
    //     const [year, month, day] = this.selectedDate.split('-');
    //     this.formattedDate = `${day}/${month}/${year}`;
    //   }
    // },
    formatDate(date) {
      const dateObj = new Date(date);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },
 
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