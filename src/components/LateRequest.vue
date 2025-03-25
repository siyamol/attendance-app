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
      <h1 class="thr">Late Request</h1>

      <!-- Search and Filter Section -->
      <div class="filter-container">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input v-model="searchText" type="text" placeholder="Search by Name/Batch" @input="search" />
        </div>

        <!-- Batch Dropdown -->
        <select v-model="selectedBatch" @change="fetchBatchLateRequests" class="batch-dropdown">
          <option value="">Select Batch</option>
          <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.name }}</option>
        </select>
      </div>

      <!-- Table Section -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Date</th>
            <th>Reason for Late</th>
            <th>Today's Status</th>
          </tr>
        </thead>
        <tbody v-if="filteredStudents.length > 0">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchText: "",
      selectedBatch: "",
        batches: [],
    };
  },
  computed: {
    ...mapGetters(['getLate', 'getBatchLateRequests', 'getBatches','getBatchid']),
    lateRequests() {
      return this.selectedBatch ? this.getBatchLateRequests(this.selectedBatch) : this.getLate;
    },
    filteredStudents() {
      if (this.lateRequests && this.lateRequests.length > 0) {
        return this.lateRequests.filter((student) => {
          const search = this.searchText.toLowerCase();
          const matchesName = student.name.toLowerCase().includes(search);
          const matchesBatch = student.batch.toLowerCase().includes(search);
          return matchesName || matchesBatch;
        });
      }
      return []; // Return an empty array if lateRequests is undefined or empty
    },
    // },
  },
  methods: {
    ...mapActions(['fetchLateRequest', 'fetchBatchLateRequests', 'approveLate', 'denyLate','fetchAllBatches']),
    // async fetchBatchLateRequests() {
    //   if (this.selectedBatch) {
    //     await this.fetchBatchLateRequests(this.selectedBatch);
    //   }
    // },
    // async approveStudent(index) {
    //   const payload = this.lateRequests[index].id;
    //   try {
    //     const res = await this.approveLate(payload);
    //     if (res) {
    //       await this.fetchLateRequest();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  //   async fetchBatchLateRequests() {
  //   if (this.selectedBatch) {
  //     try {
  //       // Fetch batch-specific late requests
  //       await this.$store.dispatch('fetchBatchLateRequests', this.selectedBatch);
  //     } catch (error) {
  //       console.error("Error fetching batch late requests:", error);
  //     }
  //   }
  // },
  async fetchBatchLateRequests() {
      if (this.selectedBatch) {
        try {
        await this.fetchBatchLateRequests(this.selectedBatch);
      } catch (error) {
      console.error("Error fetching batch late requests:", error);
        }
      }
    },
  
  async approveStudent(index) {
      const payload = this.lateRequests[index].id;
      try {
        const res = await this.approveLate(payload);
        if (res) {
          await this.fetchLateRequest();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async denyStudentreq(index) {
      const payload = this.lateRequests[index].id;
      try {
        const res = await this.denyLate(payload);
        if (res) {
          await this.fetchLateRequest();
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
    search() {
      // This method is required to trigger the filter operation when the input changes
    },
  },
  async mounted() {
    await this.fetchLateRequest();
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

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #cfccfc;
  padding: 5px;
  border-radius: 8px;
  background-color: #dffbfb;
  flex: 1;
  max-width: 250px;
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
  width: 200px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #cfccfc;
  padding: 5px;
  border-radius: 8px;
  
  flex: 1;
  max-width: 250px;
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
  background: #4FC3F7;
  color: #ffffff;
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