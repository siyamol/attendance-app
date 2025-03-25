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
      <h1 class="page-title">Student Details</h1>

      <div class="filters-container">
        <!-- Search Input on Left -->
        <div class="filter search-filter">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search icon" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input
            id="nameSearch"
            v-model="searchText"
            type="text"
            placeholder="Search by Name"
            @input="fetchUsers"
          />
        </div>

        <!-- Batch Dropdown on Right -->
        <div class="filter batch-filter">
          <select v-model="selectedBatch" @change="fetchWfhRequestsByBatch" class="batch-dropdown">
            <option value="">Select Batch</option>
            <option v-for="batch in batches" :key="batch.id" :value="batch.id">
              {{ batch.batchName }}
            </option>
          </select>
        </div>
      </div>

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
          </tr>
        </thead>
        <tbody v-if="filteredStudents.length">
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.batchName }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phoneNumber }}</td>
            <td>
              <button @click="removeStudent(student.userId)" class="remove-btn">Remove</button>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchText: "",
      selectedBatch: "",
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getBatchid"]),
    batches() {
      return this.getBatchid;
    },
    filteredStudents() {
      return this.getUsers.filter((student) => {
        const nameMatch = student.name.toLowerCase().startsWith(this.searchText.toLowerCase().trim());
        const batchMatch = this.selectedBatch === "" || student.batchName === this.selectedBatch;
        return nameMatch && batchMatch;
      });
    },
  },
  methods: {
    ...mapActions(["allUsers", "removeUser", "fetchAllBatches"]),
    async fetchUsers() {
      try {
        await this.allUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async removeStudent(userId) {
      if (confirm("Are you sure you want to remove this student?")) {
        try {
          await this.removeUser(userId);
          this.fetchUsers();
        } catch (error) {
          console.error("Error removing student:", error);
        }
      }
    },
    printPage() {
      const exportButton = document.querySelector(".export-btn");
      exportButton.style.display = "none";
      window.print();
      setTimeout(() => {
        exportButton.style.display = "block";
      }, 1000);
    },
  },
  async mounted() {
    await this.fetchAllBatches();
    await this.fetchUsers();
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

.page-title {
  text-align: center;
  font-size: 28px;
  color: #6d7078;
  border-bottom: 2px solid #c6ddff;
  display: inline-block;
  padding-bottom: 5px;
}

/* Filters Container */
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 0 10px;
}

.filter {
  display: flex;
  align-items: center;
  background-color: #dffbfb;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cfccfc;
    flex: 1;
  max-width: 250px;
  height: 35px;
}


.search-filter {
  justify-content: flex-start;
}

.batch-filter {
  justify-content: flex-end;
}

.filter input,
.filter select {
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  outline: none;
  font-size: 17px;
}

.batch-dropdown {
  appearance: none;
  cursor: pointer;
}

.export-btn-container {
  text-align: right;
  margin-bottom: 10px;
}

button.export-btn {
  background: #64b5f6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  width: 99%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #a9e6fb;
}

th {
  background: #4fc3f7;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #b3e5fc;
}

tbody tr:nth-child(odd) {
  background-color: #81d4fa;
}

.remove-btn {
  background-color: rgb(75, 171, 231);
  color: white;
  padding: 5px 13px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

@media print {
  .export-btn {
    display: none;
  }
}
</style>
