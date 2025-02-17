<!-- <template>
  <div class="page-container">
    <div class="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><router-link to="/student">Student Details</router-link></li>
        <li><router-link to="/leave">Leave Request</router-link></li>
        <li><router-link to="/late">Late Request</router-link></li>
        <li><router-link to="/todaysatn"> Attendance</router-link></li>
<<<<<<< HEAD
        <li><router-link to="/batch">Batch</router-link></li>
=======
     
>>>>>>> 7a37809e3a6358da34f09cbdd1975d198f97634c
        <li><router-link to="/filter">Attendance Filter</router-link></li>
        <li><router-link to="/batch">Batch</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <h2>Manage Batches</h2>

<form @submit.prevent="addBatch" class="batch-form">
  <input v-model="name" type="text" placeholder="Batch Name" required />
  <input v-model="startTime" type="time" required />
  <input v-model="endTime" type="time" required />
  <button type="submit" class="add-btn">Add</button>
</form>


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
      //.... this.batches.push({ ...this.newBatch }); 
      //.... this.newBatch = { name: "", startTime: "", endTime: "" }; 
    },


    async deleteBatch(index) {
      //... this.batches.splice(index, 1);
     
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

 
</style>-->
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
      </ul>
    </div>

    <div class="main-content">
      <h2>Manage Batches</h2>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="isEditing ? updateBatch() : addBatch()" class="batch-form">
        <!-- Form inputs -->
        
      <!-- <form @submit.prevent="isEditing ? updateBatch() : addBatch()" class="batch-form"> -->
        <input v-model="batchName" type="text" placeholder="Batch Name" required />
        <input v-model="startTime" type="time" required />
        <input v-model="endTime" type="time" required />
        <!-- <select v-model="batchType" class="batch-type-box" required>

     <option value="Select Batch Type">Select Batch Type</option> 
 
    <option value="morning">morning</option>
    <option value=""></option>
    <option value=""></option>
  </select> -->
  <select v-model="batchType" class="batch-type-box" required>
    <!-- <option value="">Select Batch Type</option>
    <option value=""></option>
    <option value=""></option> -->
    <option value="">Select Batch Type</option>
    <option v-for="type in batchTypes" :key="type.id" :value="type.id">
      {{ type.batchType }}
    </option>
  </select>
        <button type="submit" class="add-btn">{{ isEditing ? "Update" : "Add" }}</button>
        <button v-if="isEditing" type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
      </form>

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
          <tr v-for="batch in batches" :key="batch.id">
            <td>{{ batch.batchName }}</td>
            <td>{{ batch.startTime }}</td>
            <td>{{ batch.endTime }}</td>
            <td>{{ batch.batchType }}</td>
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
import { mapGetters} from 'vuex';

export default {
  data() {
    return {
      batchId: null,
      batchType: "",  
      batchName: "",
      startTime: "",
      endTime: "",
      isEditing: false, 
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["getBatch","getType"]),
    batchTypes() {
      return this.getType;
    },
    batches() {
      return this.getBatch;
    }
  },


  // async fetchBatchTypes() {
  //     const success = await this.$store.dispatch("getallbatchType");
  //     if (success) {
  //       console.log('Batch types fetched successfully');
  //     } else {
  //       console.log('Failed to fetch batch types');
  //     }
  //   },
  mounted() {
    this.$store.dispatch("fetchbatch");
    this.$store.dispatch('getallbatchType');

  },
  methods: {
    isDuplicateBatch() {
      return this.batches.some(
        (batch) =>
          batch.batchName.toLowerCase() === this.batchName.toLowerCase() &&
          batch.batchType === this.batchType
      );
    },
    async addBatch() {
      this.errorMessage = "";
      if (!this.batchType || !this.batchName || !this.startTime || !this.endTime) {

       this.errorMessage = "Please fill all fields.";
        return;
      
      }
          // Check for duplicate batch name
          if (this.isDuplicateBatch()) {
        this.errorMessage = "A batch with the same name already exists for this batch type.";
        return;
      }
      const payload = {
        id:this.batchType,
        data:{
        batchName: this.batchName,
        startTime: this.startTime + ":00",
        endTime: this.endTime + ":00",
      }
      };

      try {
        const res = await this.$store.dispatch("addBatch", payload);
        if (res) {
          alert("Batch successfully added!");
          // this.$store.dispatch("fetchbatch");
          // this.resetForm();
          await this.$store.dispatch("fetchbatch"); // Fetch updated batches
          this.resetForm(); // Reset form fields
        }
      } catch (error) {
        console.error("Error adding batch:", error);
      }
    },

  
    editBatch(batch) {
      this.batchId = batch.id;
      this.batchName = batch.batchName;
      this.startTime = batch.startTime;
      this.endTime = batch.endTime;
       this.batchType = batch.batchType;
      this.isEditing = true;
    },

    async updateBatch() {
      this.errorMessage = "";
      if (!this.batchName || !this.startTime || !this.endTime) {
        // alert("Please fill all fields.");
        this.errorMessage = "Please fill all fields.";
        return;
      }
      if (this.isDuplicateBatch() && !this.isEditing) {
        this.errorMessage = "A batch with the same name already exists for this batch type.";
        return;
      }
      const payload = {
        id: this.batchId,
        data: {
      batchName: this.batchName,
      startTime: this.startTime,
      endTime: this.endTime,
    }
     
      };

      try {
        const res = await this.$store.dispatch("updateBatch", payload);
        if (res) {
          alert("Batch successfully updated!");
          this.$store.dispatch("fetchbatch");
          this.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    async deleteBatch(index) {
      if (confirm("Are you sure you want to remove this batch?")) {
        try {
          const res = await this.$store.dispatch("dltBatch", index);
          if (res) {
            this.$store.dispatch("fetchbatch");
          }
        } catch (error) {
          console.error("Error removing batch:", error);
        }
      }
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.batchId = null;
      this.batchType = "";
      this.batchName = "";
      this.startTime = "";
      this.endTime = "";
      this.isEditing = false;
    },
  },
  
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
</style>