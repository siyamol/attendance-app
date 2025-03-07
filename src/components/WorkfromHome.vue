<!-- <template>
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
        <h1 class="thr">Work from Home</h1>
        
      <form @submit.prevent="onSearch" class="nav-search-bar">
     
     <div class="nav-dropdown">
       <select v-model="selectedBatchName" class="batch-filter-container" required> 
<option value="">Select Batch</option>
<option v-for="batch in batches" :key="batch.id" :value="batch.id">
 {{ batch.batchName }}
</option>
</select> 
</div>
<button type="submit" class="search-button">Search</button>
</form>
       
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
              <th>Reason for Leave</th>
              <th>Today's Status</th> 
            </tr>
          </thead>
          <tbody v-if="filteredLeaveRequest && filteredLeaveRequest.length > 0">
           <tbody v-if="leaveRequest && leaveRequest.length >0"> 
             <tr v-for="(student, index) in leaveRequest" :key="index"> 
              <tr v-for="(student, index) in filteredLeaveRequest" :key="index">
                <td>{{ student.userName }}</td>
                <td>{{ student.batchId }}</td>
              <td>{{ student.batchType }}</td>
              <td>{{ student.fromDate? formatDate(student.fromDate) : '' }}</td>
              <td>{{ student.toDate? formatDate(student.toDate) : '' }}</td>
              <td>{{ student.numberOfDays }}</td>
              <td>{{ student.leaveType }}</td>
              <td class="reason-column">{{ request.reason }}</td>
               <td>
                <div v-if="student.status == 'PENDING'" class="status-buttons">
                  <button @click="approveStudent(request.id)" class="approve-btn">Approve</button>
                  <button @click="denyStudentreq(request.id)" class="deny-btn">Deny</button>
                </div>
                <div v-else>
                  <span :class="getStatusClass(request.status)">{{request.status }}</span>
                </div>
              </td>
    
  </tr>
          </tbody>
           <tbody v-else>
            <tr>
              <td colspan="5">No records found</td>
           
            </tr>
         </tbody> 
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
      
        searchText: "",
        selectedBatchType: "all",
        selectedBatchName: "",
      searchQuery: "",
      filteredStudentList: [],
      selectedStudentName: null,
      showBatchNameDropdown: false,
        // userId: 1, // Replace with dynamic user ID if needed
        // batchId: null,
        // isLoading: true,
      };
    },
  //   mounted() {
  //  this.fetchData();
  //   },
  async mounted() {
    await this.fetchAllBatches(); // Fetch batches when the component is mounted
  },

    computed: {
      ...mapGetters(["getLeaveWfh","getBatchId", "getBatchType", "getAttendanceRecords", "getAttendanceRecordswrk"]),
      batches() {
      return this.getBatchId; 
    },
    attendanceRecords() {
      return this.getAttendanceRecordswrk; // Use the getter to access attendance records
    },
    filteredStudents() {
      let filteredList = this.getAttendanceRecords;

      if (this.selectedBatchType === "custom" || this.selectedBatchType === "regular") {
        if (this.selectedBatchName) {
          filteredList = filteredList.filter((student) => student.batchId === this.selectedBatchName);
        }
      }

      if (this.searchQuery && this.selectedBatchType === "name") {
        filteredList = filteredList.filter((student) =>
          student.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filteredList;
    },
    //   fileredWfhRequests(){
    //     if (!Array.isArray(this.getWfhRequests)) {
    //       return [];
    //   }
    //   return this.getWfhRequests.filter((request) => {
    //     const searchText = this.searchText.toLowerCase();
    //     return (
    //       request.userName.toLowerCase().includes(searchText) ||
    //       request.batchName.toLowerCase().includes(searchText)
    //     );
    //   });
    // },
    
    
    
    

      // filteredStudents() {
      //   return this.students.filter((student) => {
      //     const matchesName = student.studentName.toLowerCase().includes(this.searchText.toLowerCase());
      //     const matchesDate =
      //       this.selectedDate &&
      //       (new Date(student.fromDate) <= new Date(this.selectedDate) && new Date(student.toDate) >= new Date(this.selectedDate));
      //     return matchesName && (!this.selectedDate || matchesDate);
      //   });
      // },
      
    },
    methods: {
      ...mapActions(['fetchLeaveWfh','approveWorkFromHomeRequest','rejectWorkFromHomeRequest', 'fetchWfhRequestsByStatusAndBatch','fetchAllBatches','fetchAttendanceRecords','fetchAttendanceRecordswrk']),
      
      async fetchData(){
      try {
          await this.fetchLeaveWfh();
          await this.fetchWfhRequestsByStatusAndBatch({ status: 'Pending',btchId:1})
        } 
        catch (error) {
            console.error(error);
        } 
      },
      async fetchUserLeaveRequests() {
        try {
          await this.$store.dispatch('fetchUserLeaveRequests', this.userId); 
        } catch (error) {
          console.error(error);
        } 
      },
      async approveRequest(requestId) {
       const success = await this.approveWorkFromHomeRequest(requestId);
       if (success) {await this.fetchData();
       }
      },
      async rejectRequest(requestId) {
       const success = await this.rejectWorkFromHomeRequest(requestId);
       if(success){
        await this.fetchData();
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
  
      // search() {
      //   // This method is required to trigger the filter operation when the input changes
      // },
      async onSearch() {
      if (this.selectedBatch) {
        await this.fetchAttendanceRecords(this.selectedBatch); 
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
   -->

  <!--
  
  DROPDOWN WITH SEARCH BUTTON 
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
        <h1 class="thr">Work from Home Requests</h1>
  
        <div class="ms-5 d-flex justify-content-end me-3">
          <div class="search">
            <div class="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
              <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
            </div>
          </div>
        </div>
  

        <div class="filter-container ms-5">
          <select v-model="selectedBatch" class="batch-dropdown">
            <option value="">Select Batch</option>
            <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.batchName }}</option>
          </select>
          <button @click="fetchWfhRequestsByBatch" class="search-button">Search</button>
        </div>

        <table>
          <thead>
            <tr>
              .... <th>Name</th>
              <th>Batch</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th> ....
              <th>Name</th>
            <th>Batch</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Number of Days</th>
            <th>Type of Leave</th>
            <th class="reason-column">Reason for Leave</th>
            <th class="status-column">Today's Status</th>
            <th class="action">Action</th>
            </tr>
          </thead>


          <tbody v-if="filteredWfhRequests.length > 0">
          .......... <tr v-for="(student, index) in filteredWfhRequests" :key="index"></tr>.....
            <tr v-for="(request, index) in filteredWfhRequests" :key="index">
              <td>{{ request.userName }}</td>
              <td>{{ request.batchName }}</td>
              <td>{{ formatDate(request.fromDate) }}</td>
              <td>{{ formatDate(request.toDate) }}</td>
              <td>{{ student.numberOfDays }}</td>
              <td>{{ student.leaveType }}</td>
               <td>{{ request.reason }}</td> 
             ... <td class="reason-column">{{ request.reason }}</td> ...
              
              <td>
              <span :class="getStatusClass(request.status)">{{ request.status }}</span></td>
              
              <td>
                <div v-if="request.status === 'PENDING'" class="status-buttons">
                  <button @click="approveWfhRequest(request.id)" class="approve-btn">Approve</button>
                  <button @click="denyWfhRequest(request.id)" class="deny-btn">Deny</button>
                </div>
               </td>
            </tr>
        </tbody>
      <tbody v-else>
            <tr>
              <td colspan="9">No records found</td>
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
        searchText: "",
        selectedBatch: "",
        wfhRequests: [],
      };
    },
    computed: {
      ...mapGetters(['getBatchid', 'getWfhRequests']),
      batches() {
        return this.getBatchid;
      },
    //   filteredWfhRequests() {
    //     return this.wfhRequests.filter((request) => {
    //       const searchText = this.searchText.toLowerCase();
    //       return (
    //         request.userName.toLowerCase().includes(searchText) ||
    //         request.batchName.toLowerCase().includes(searchText)
    //       );
    //     });
    //   },
    // },
       filteredWfhRequests() {
      // Ensure this.wfhRequests is an array before calling .filter()
      return Array.isArray(this.wfhRequests)
        ? this.wfhRequests.filter((request) => {
            const searchText = this.searchText.toLowerCase();
            return (
              request.userName.toLowerCase().includes(searchText) ||
              request.batchName.toLowerCase().includes(searchText)
            );
          })
        : [];
    },
  },
  
    methods: {
      ...mapActions(['fetchAllBatches', 'fetchWfhRequestsByStatusAndBatch', 'approveWorkFromHomeRequest', 'rejectWorkFromHomeRequest']),
      // async fetchWfhRequestsByBatch() {
      //   if (this.selectedBatch) {
      //     const payload = {
      //       status: "PENDING",
      //       batchId: this.selectedBatch,
      //     };
      //     await this.fetchWfhRequestsByStatusAndBatch(payload);
      //     this.wfhRequests = this.getWfhRequests;
      //   }
      // },
      async fetchWfhRequestsByBatch() {
  if (this.selectedBatch) {
    const payload = {
      status: "PENDING",
      batchId: this.selectedBatch,
    };
    try {
      await this.fetchWfhRequestsByStatusAndBatch(payload);
    
      this.wfhRequests = Array.isArray(this.getWfhRequests) ? this.getWfhRequests : [];
    } catch (error) {
      console.error("Error fetching Work from Home requests:", error);
      this.wfhRequests = []; 
    }
  }
},
      async approveWfhRequest(requestId) {
        try {
          const response = await this.approveWorkFromHomeRequest(requestId);
          if (response) {
            await this.fetchWfhRequestsByBatch();
          }
        } catch (error) {
          console.error("Error approving request:", error);
        }
      },
      async denyWfhRequest(requestId) {
        try {
          const response = await this.rejectWorkFromHomeRequest(requestId);
          if (response) {
            await this.fetchWfhRequestsByBatch();
          }
        } catch (error) {
          console.error("Error denying request:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB");
      },
      getStatusClass(status) {
        if (status === "APPROVED") return "status-approved";
        if (status === "DENIED") return "status-denied";
        return "";
      },
      search() {

      },
    },
    async mounted() {
      await this.fetchAllBatches();
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
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: rgb(204, 238, 245);
  }
  
  .thr {
    text-align: center;
    margin-top: 0px;
    margin-bottom: 1px;
    font-size: 28px;
    color: #6d7078;
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
  
  .filter-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  .batch-dropdown {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px; 
  }
  
  .search-button {
    padding: 8px 16px;
    background-color: #4FC3F7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #3da8d9;
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
  
  .status-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  .approve-btn {
    background: #87CEEB;
    font-size: 12px;
  }
  
  .deny-btn {
    background: #89d2fd;
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
  </style> 
  dropdown without search button
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
        <h1 class="thr">Work from Home Requests</h1>
  
       
        <div class="ms-5 d-flex justify-content-end me-3">
          <div class="search">
            <div class="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
              <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
            </div>
          </div>
        </div>

        <div class="batch-filter-container ms-5">
          <select v-model="selectedBatch" @change="fetchWfhRequestsByBatch">
            <option value="">Select Batch</option>
            <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.batchName }}</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody v-if="filteredWfhRequests.length > 0">
            <tr v-for="(request, index) in filteredWfhRequests" :key="index">
              <td>{{ request.userName }}</td>
              <td>{{ request.batchName }}</td>
              <td>{{ formatDate(request.fromDate) }}</td>
              <td>{{ formatDate(request.toDate) }}</td>
              <td>{{ request.reason }}</td>
              <td>
                <span :class="getStatusClass(request.status)">{{ request.status }}</span>
              </td>
              <td>
                <div v-if="request.status === 'PENDING'" class="status-buttons">
                  <button @click="approveWfhRequest(request.id)" class="approve-btn">Approve</button>
                  <button @click="denyWfhRequest(request.id)" class="deny-btn">Deny</button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7">No records found</td>
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
        searchText: "",
        selectedBatch: "",
        wfhRequests: [],
      };
    },
    computed: {
      ...mapGetters(['getBatchid', 'getWfhRequests']),
      batches() {
        return this.getBatchid;
      },
      filteredWfhRequests() {
        return this.wfhRequests.filter((request) => {
          const searchText = this.searchText.toLowerCase();
          return (
            request.userName.toLowerCase().includes(searchText) ||
            request.batchName.toLowerCase().includes(searchText)
          );
        });
      },
    },
    methods: {
      ...mapActions(['fetchAllBatches', 'fetchWfhRequestsByStatusAndBatch', 'approveWorkFromHomeRequest', 'rejectWorkFromHomeRequest']),
      async fetchWfhRequestsByBatch() {
        if (this.selectedBatch) {
          const payload = {
            status: "PENDING",
            batchId: this.selectedBatch,
          };
          await this.fetchWfhRequestsByStatusAndBatch(payload);
          this.wfhRequests = this.getWfhRequests;
        }
      },
      async approveWfhRequest(requestId) {
        try {
          const response = await this.approveWorkFromHomeRequest(requestId);
          if (response) {
            await this.fetchWfhRequestsByBatch();
          }
        } catch (error) {
          console.error("Error approving request:", error);
        }
      },
      async denyWfhRequest(requestId) {
        try {
          const response = await this.rejectWorkFromHomeRequest(requestId);
          if (response) {
            await this.fetchWfhRequestsByBatch();
          }
        } catch (error) {
          console.error("Error denying request:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB");
      },
      getStatusClass(status) {
        if (status === "APPROVED") return "status-approved";
        if (status === "DENIED") return "status-denied";
        return "";
      },
      search() {
        // This method is required to trigger the filter operation when the input changes
      },
    },
    async mounted() {
      await this.fetchAllBatches();
    },
  };
  </script>
  
  <style scoped>
  /* Reuse the same styles from your Leave Request page */
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
  
  .thr {
    text-align: center;
    margin-top: 0px;
    margin-bottom: 1px;
    font-size: 28px;
    color: #6d7078;
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
  
  .batch-filter-container {
    margin: 20px 0;
  }
  
  .batch-filter-container select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 250px;
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
  
  .status-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  .approve-btn {
    background: #87CEEB;
    font-size: 12px;
  }
  
  .deny-btn {
    background: #89d2fd;
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
  </style> -->
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
      <h1 class="thr">Work from Home Requests</h1>

      <!-- Search and Filter Section -->
      <div class="filter-container">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
        </div>

     
        <select v-model="selectedBatch" @change="fetchWfhRequestsByBatch" class="batch-dropdown">
          
          <option value="">Select Batch</option>
          
          <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.batchName }}</option>
        </select>
      </div>

   
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="filteredWfhRequests.length > 0">
          <tr v-for="(request, index) in filteredWfhRequests" :key="index">
            <td>{{ request.userName }}</td>
            <td>{{ request.batchName }}</td>
            <td>{{ formatDate(request.fromDate) }}</td>
            <td>{{ formatDate(request.toDate) }}</td>
            <td>{{ request.reason }}</td>
            <td>
              <span :class="getStatusClass(request.status)">{{ request.status }}</span>
            </td>
            <td>
              <div v-if="request.status === 'PENDING'" class="status-buttons">
                <button @click="approveWfhRequest(request.id)" class="approve-btn">Approve</button>
                <button @click="denyWfhRequest(request.id)" class="deny-btn">Deny</button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7">No records found</td>
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
      searchText: "",
      selectedBatch: "",
      wfhRequests: [],
    };
  },
  computed: {
    ...mapGetters(['getBatchid', 'getWfhRequests']),
    batches() {
      return this.getBatchid;
    },
    filteredWfhRequests() {
      return this.wfhRequests.filter((request) => {
        const searchText = this.searchText.toLowerCase();
        return (
          request.userName.toLowerCase().includes(searchText) ||
          request.batchName.toLowerCase().includes(searchText)
        );
      });
    },
  },
  methods: {
    ...mapActions(['fetchAllBatches', 'fetchWfhRequestsByStatusAndBatch', 'approveWorkFromHomeRequest', 'rejectWorkFromHomeRequest']),
    async fetchWfhRequestsByBatch() {
      if (this.selectedBatch) {
        const payload = {
          status: "PENDING",
          batchId: this.selectedBatch,
        };
        await this.fetchWfhRequestsByStatusAndBatch(payload);
        this.wfhRequests = this.getWfhRequests;
      }
    },
    async approveWfhRequest(requestId) {
      try {
        const response = await this.approveWorkFromHomeRequest(requestId);
        if (response) {
          await this.fetchWfhRequestsByBatch();
        }
      } catch (error) {
        console.error("Error approving request:", error);
      }
    },
    async denyWfhRequest(requestId) {
      try {
        const response = await this.rejectWorkFromHomeRequest(requestId);
        if (response) {
          await this.fetchWfhRequestsByBatch();
        }
      } catch (error) {
        console.error("Error denying request:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
    getStatusClass(status) {
      if (status === "APPROVED") return "status-approved";
      if (status === "DENIED") return "status-denied";
      return "";
    },
    search() {
      // This method is required to trigger the filter operation when the input changes
    },
  },
  async mounted() {
    await this.fetchAllBatches();
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

.main-content {
  flex: 1;
  padding: 20px;
  background-color: rgb(204, 238, 245);
}

.thr {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 1px;
  font-size: 28px;
  color: #6d7078;
}

/* Filter Container */
.filter-container {
  display: flex;
  justify-content: space-between; /* Align items with space between */
  align-items: center;
  margin: 20px 0;
  padding: 0 20px; /* Add padding to prevent touching edges */
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #cfccfc;
  padding: 5px;
  border-radius: 8px;
  background-color: #dffbfb;
  flex: 1; /* Allow search bar to take remaining space */
  max-width: 250px; /* Limit search bar width */
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


  width: 200px; /* Fixed width for dropdown */
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

.status-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.approve-btn {
  background: #87CEEB;
  font-size: 12px;
}

.deny-btn {
  background: #89d2fd;
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
</style>