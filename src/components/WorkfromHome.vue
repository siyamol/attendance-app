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