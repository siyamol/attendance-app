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
          </tr>
        </tbody>
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
import { mapGetters, mapActions } from 'vuex';

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
      userId: 1, // Replace with dynamic user ID if needed
      batchId: null,
      isLoading: true,
    };
  },
  mounted() {
    // this.currentSpeed = this.students.map(() => 0);
    this.fetchLeaveRequest();
    this.fetchUserLeaveRequestsData();
  },
  computed: {
    ...mapGetters(['getLeave', 'getUserLeaveRequests']),
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
    // return this.leaveRequest.filter((student) => {
      if (!Array.isArray(this.userLeaveRequests)) {
        return [];
      }
      return this.userLeaveRequests.filter((student) => {
      const searchText = this.searchText.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchText) ||
        student.batch.toLowerCase().includes(searchText)
      );
    });
  },


  },
  methods: {
    ...mapActions(['fetchLeaves', 'fetchUserLeaveRequests', 'approveLeave', 'denyLeave']),
    async fetchLeaveRequest(){
      // try{
      //   await this.$store.dispatch('fetchLeaves'); 
      // }
    
      try {
        await this.fetchLeaves();
      } 
      catch (error) {
          console.error(error);
      } 
    },
    // async fetchUserLeaveRequests() {
    //   try {
    //     await this.$store.dispatch('fetchUserLeaveRequests', this.userId); 
    //   } catch (error) {
    //     console.error(error);
    //   } 
    // },
    async fetchUserLeaveRequestsData() {
      this.isLoading = true;
      try {
        await this.fetchUserLeaveRequests(this.userId);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async approveStudent(index) {
      // this.students[index].status = 'Approved';
      // const payload = this.leaveRequest[index].id;
      const payload = this.userLeaveRequests[index].id;
      try{
        const res = await this. this.approveLeave(payload);
        if(res){
          //  this.leaveRequest[index].status = 'Approved';
          // this.fetchLeaveRequest();
          this.userLeaveRequests[index].status = 'Approved';
          // this.fetchUserLeaveRequests();
          this.fetchUserLeaveRequestsData();
        }
      }catch (error) {
          console.error(error);  
      } 
    },
    async denyStudentreq(index) {
      // this.students[index].status = 'Denied';
      // const payload = this.leaveRequest[index].id;
            const payload = this.userLeaveRequests[index].id;
      try{
        const res = await this.denyLeave(payload);
      if(res){
        this.userLeaveRequests[index].status = 'Denied';
        this.fetchUserLeaveRequestsData();
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
