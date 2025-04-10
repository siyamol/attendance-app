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
      
      <div class="ms-5 d-flex justify-content-between me-3">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name" @input="search" />
        </div>
        
        <div class="filter">
          
          <select id="batchFilter" v-model="searchBatch">
            <option value="">Select Batch</option>
            
          </select>
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
        <tbody v-if="filteredLeaveRequest && filteredLeaveRequest.length > 0">
          <tr v-for="(student, index) in filteredLeaveRequest" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.fromDate ? formatDate(student.fromDate) : '' }}</td>
            <td>{{ student.toDate ? formatDate(student.toDate) : '' }}</td>
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
  data() {
    return {
      searchText: "",
      searchBatch: "",
      userId: 1, 
      isLoading: true,
    };
  },
  mounted() {
    this.fetchLeaveRequest();
    this.fetchUserLeaveRequestsData();
  },
  computed: {
    ...mapGetters(['getLeave', 'getUserLeaveRequests']),
    userLeaveRequests() {
      return Array.isArray(this.getUserLeaveRequests) ? this.getUserLeaveRequests : [];
    },
    filteredLeaveRequest() {
      return this.userLeaveRequests.filter((student) => {
        const searchText = this.searchText.toLowerCase();
        const batchFilter = this.searchBatch.toLowerCase();
        return (
          (student.name.toLowerCase().includes(searchText) || searchText === "") &&
          (student.batch.toLowerCase() === batchFilter || batchFilter === "")
        );
      });
    },
  },
  methods: {
    ...mapActions(['fetchLeaves', 'fetchUserLeaveRequests', 'approveLeave', 'denyLeave']),
    async fetchLeaveRequest() {
      try {
        await this.fetchLeaves();
      } catch (error) {
        console.error(error);
      }
    },
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
      const payload = this.userLeaveRequests[index].id;
      try {
        const res = await this.approveLeave(payload);
        if (res) {
          this.userLeaveRequests[index].status = 'Approved';
          this.fetchUserLeaveRequestsData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async denyStudentreq(index) {
      const payload = this.userLeaveRequests[index].id;
      try {
        const res = await this.denyLeave(payload);
        if (res) {
          this.userLeaveRequests[index].status = 'Denied';
          this.fetchUserLeaveRequestsData();
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
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
    search() {}
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
  height: 40px;
  
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

.filter {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  width: 250px;
  height: 30px;

} 
input,
select {
  padding: 8px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #cfccfc;
  margin-top: 5px;
   width: 220px;
   height: 39px;
   
  
}

.search-bar {
  display: flex;
  align-items: center;
  width: 250px;
  border: 1px solid #ccc; 
  border-radius: 6px; 
  padding: 5px; 
  background-color: #dffbfb;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}

.search-bar input[type="text"] {
  border: none; 
  outline: none; 
  width: calc(100% - 30px); 
  padding: 5px;
  font-size: 14px; 
  margin-bottom:3px;
  margin-top:3px;
   background-color: #dffbfb;
      font-size: 1rem
}
  
.search-bar i {
    margin-left: 9px; 
  }
.search-bar i {
  margin-left: 10px; 
  color: #888; 
  cursor: pointer;
   
}

.reason-column {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal; 
  min-width: 110px;
  max-width: 50px;
}

</style>
