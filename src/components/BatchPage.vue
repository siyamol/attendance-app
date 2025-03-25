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
      <h2 class="mb">Manage Batches</h2>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="notificationMessage" class="notification">{{ notificationMessage }}</div>
      
      <form @submit.prevent="isEditing ? updateBatch() : addBatch()" class="batch-form">
        <input v-model="batchName" type="text" placeholder="Batch Name" required />
        
        <div class="location-container">
          <input v-model="location" type="text" placeholder="Select a location" class="location-input" readonly />
          <button type="button" @click="navigateToMap" class="location-btn">
            <span class="location-icon"> 🗺️</span>
          </button>
        </div>
        
        <input v-model="startTime" type="time" required />
        <input v-model="endTime" type="time" required />
    
        <select v-model="batchType" class="batch-type-box" required> 
          <option value="">Select Batch Type</option>
          <option v-for="type in batchTypes" :key="type.id" :value="type.id">
            {{ type.batchType }}
          </option>
        </select>
    
        <button type="submit" class="add-btn">{{ isEditing ? "Update" : "Add" }}</button>
        <button v-if="isEditing" type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
      </form>
      
      <div class="input-container">
        <label>Latitude:</label>
        <input type="text" v-model="storedLat" readonly />
        <label>Longitude:</label>
        <input type="text" v-model="storedLng" readonly />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Batch Name</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
            <th>Batch Type</th>
            <th>Location Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="batch in batches" :key="batch.id">
            <td>{{ batch.batchName }}</td>
            <td>{{ batch.startTime }}</td>
            <td>{{ batch.endTime }}</td>
            <td>{{ batch.batchType.batchType }}</td>
            <td>{{ batch.location || 'Not specified' }}</td>
            <td>
              <button @click="editBatch(batch)" class="edit-btn">Edit</button>
              <button @click="deleteBatch(batch.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      notificationMessage: "",
      errorMessage: "",
      batchId: null,
      batchType: "",  
      batchName: "",
      startTime: "",
      endTime: "",
      location: "",
      storedLat: "",
      storedLng: "",
      isEditing: false, 
    };
  },
  computed: {
    ...mapGetters(["getBatchid","getType"]),
    batchTypes() {
      return this.getType;
    },
    batches() {
      return this.getBatchid; 
    }
  },
  mounted() {
    this.$store.dispatch('getallbatchType');
    this.fetchBatches();
    
    if (this.$route.query.lat && this.$route.query.lng) {
      this.storedLat = this.$route.query.lat;
      this.storedLng = this.$route.query.lng;
      this.location = this.$route.query.location || "Selected Location"; 
    }
  },
  methods: {
    navigateToMap() {
      this.$router.push({ path: '/map', query: { location: this.location || '' } });
    },
    async fetchBatches() {
      try {
        await this.$store.dispatch("fetchAllBatches");
      } catch (error) {
        this.errorMessage = "Failed to fetch batches. Please try again.";
      }
    },
async addBatch() {
  if (!this.batchType || !this.batchName || !this.startTime || !this.endTime || !this.location) {
    this.errorMessage = "Please fill all fields.";
    return;
  }

  const payload = {
    id: this.batchType,
    data: {
      batchName: this.batchName,
      startTime: this.startTime + ":00",
      endTime: this.endTime + ":00",
      location: this.location,  // Sending location
      batchLatitude: this.storedLat,  // Sending latitude
      batchLongitude: this.storedLng  // Sending longitude
    },
  };

  try {
    const res = await this.$store.dispatch("addBatch", payload);
    if (res) {
      this.fetchBatches();
      this.resetForm();
      this.showNotification("Batch successfully added!");
    }
  } catch (error) {
    console.error("Error adding batch:", error);
  }
},

    async updateBatch() {
      if (!this.batchId) {
        this.errorMessage = "No batch selected for update.";
        return;
      }
      const payload = {
        id: this.batchId,
        data: {
          batchName: this.batchName,
          startTime: this.startTime + ":00",
          endTime: this.endTime + ":00",
          location: this.location || '',
          batchType: this.batchType
        },
      };
      try {
        await this.$store.dispatch("updateBatch", payload);
        this.fetchBatches();
        this.resetForm();
        this.showNotification("Batch successfully updated!");
      } catch (error) {
        console.error("Error updating batch:", error);
      }
    },
    async deleteBatch(batchId) {
      try {
        await this.$store.dispatch("deleteBatch", batchId);
        this.fetchBatches();
        this.showNotification("Batch successfully deleted!");
      } catch (error) {
        console.error("Error deleting batch:", error);
      }
    },
    editBatch(batch) {
      this.batchId = batch.id;
      this.batchName = batch.batchName;
      this.startTime = batch.startTime;
      this.endTime = batch.endTime;
      this.batchType = batch.batchType.id;
      this.location = batch.location || '';
      this.isEditing = true;
    },
    resetForm() {
      this.batchId = null;
      this.batchName = "";
      this.startTime = "";
      this.endTime = "";
      this.batchType = "";
      this.location = "";
      this.isEditing = false;
    },
    cancelEdit() {
      this.resetForm();
    },
    showNotification(message) {
      this.notificationMessage = message;
      setTimeout(() => {
        this.notificationMessage = "";
      }, 3000);
    }
  }
};
</script>



<style scoped>
tbody tr:nth-child(odd) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(even) {
  background-color: #81D4FA;
}
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

.batch-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
        
.batch-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
        
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
        
.add-btn {
  background-color: rgb(19, 123, 187);
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
}

.add-btn:hover {
  background-color: darkgreen;
}

table {
  width: 100%;
  border-collapse: collapse;
}
        
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
        
.delete-btn {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
        
.delete-btn:hover {
  background-color: darkred;
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
  background:#4FC3F7;
  color: #fcffff;
  font-weight: bold;
}

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

.main-content {
  flex: 10;
  padding: 20px;
  background-color: rgb(204, 238, 245);
}

.batch-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgb(179, 221, 248);
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background-color: rgb(91, 178, 233);
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
}

.add-btn:hover {
  background-color: rgb(112, 200, 248);
}

.cancel-btn {
  background-color: rgb(91, 178, 233);
  color:  rgb(255, 255, 255);
  padding: 8px 15px;
  border: none;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: darkgray;
}

.edit-btn {
  background-color: rgb(132, 185, 251);
  color: white;
  padding: 5px 26px;
  border: none;
  cursor: pointer;
}

.delete-btn {
  background-color: rgb(215, 176, 255);
  color: white;
  padding: 5px 18px;
  border: none;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: rgb(254, 174, 242);
}

.edit-btn{
  background-color: rgb(142, 201, 253);
}

.batch-type-box {
  width: 14%; /* Adjust as needed */
  padding: 10px;
  border: 2px solid #007bff; /* Blue border */
  border-radius: 5px;
  /* Light gray background */
  font-size: 16px;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  background-color: rgb(179, 221, 248);
  padding: 8px 15px;
  border: none;
}

.batch-type-box:focus {
  border-color: #0056b3; /* Darker blue on focus */
  background-color: #a8f4fa; /* White background on focus */
}

.error-message {
  color: red;
  margin-bottom: 10px;
  font-weight: bold;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #db4aff;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.mb {
  text-align: center;
  margin-top: 0px;
  margin-right: 205px;
  margin-bottom: 20px;
  font-size: 28px;
  color: #6d7078;
}

.location-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.location-input {
  width: 150px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: 0;
}

.location-btn {
  background-color: #29B6F6;
  color: white;
  height: 36px;
  width: 36px;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.location-btn:hover {
  background-color: #0288D1;
}

.location-icon {
  font-size: 20px;
}
</style>