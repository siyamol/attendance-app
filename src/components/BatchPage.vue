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
      </ul>
    </div>

    <div class="main-content">
      <h2>Manage Batches</h2>

<!-- Form to Add Batches -->
<form @submit.prevent="addBatch" class="batch-form">
  <input v-model="name" type="text" placeholder="Batch Name" required />
  <input v-model="startTime" type="time" required />
  <input v-model="endTime" type="time" required />
  <button type="submit" class="add-btn">Add</button>
</form>

<!-- Display Added Batches -->
<table>
  <thead>
    <tr>
      <th>Batch Name</th>
      <th>Starting Time</th>
      <th>Ending Time</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(batch) in batches" :key="batch.id">
      <td>{{ batch.batchName }}</td>
      <td>{{ batch.startTime }}</td>
      <td>{{ batch.endTime }}</td>
      <td>
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
      // batches: [], 
      newBatch: { name: "", startTime: "", endTime: "" },
    };
  },
  computed: {
    ...mapGetters(['getBatch']),
    batches() {
      return this.getBatch;
    }
  },
  mounted(){
    this.$store.dispatch('fetchbatch');
  },
  methods: {
    // Add Batch Function
    async addBatch() {
      if (!this.name || !this.startTime || !this.endTime) {
        alert("Please fill all fields.");
        return;
      }
      const formattedStartTime = this.startTime + ":00";
      const formattedEndTime = this.endTime + ":00";
      const payload = {
        batchName: this.name,
        startTime: formattedStartTime,
        endTime: formattedEndTime
      } 
      try{
        const res = await this.$store.dispatch('addBatch', payload); 
        if(res){
          alert("successfully added!!!");
          this.$store.dispatch('fetchbatch');

        }
      }catch (error) {
          console.error(error);
      } 
      // this.batches.push({ ...this.newBatch }); 
      // this.newBatch = { name: "", startTime: "", endTime: "" }; 
    },

    // Delete Batch Function
    async deleteBatch(index) {
      // this.batches.splice(index, 1);
     
    if (confirm('Are you sure you want to remove this batch?')) {
      const payload = index;
      try {
        const res = await this.$store.dispatch('dltBatch', payload);
        if(res){
          this.$store.dispatch('fetchbatch');
        }
      } catch (error) {
        console.error('Error removing batch:', error);
      }
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

tbody tr:nth-child(odd) {
  background-color: #B3E5FC;
}

tbody tr:nth-child(even) {
  background-color: #81D4FA;
}


</style>
