
<template>
    <section>
      <base-card>
        <div class="carousel-text">
          <h2>PTF</h2>
          <h2>ADMIN MANAGEMENT</h2>
          <p>
            Stay Accurate with our Attendance Management System.<br />
            Automate end-to-end attendance tracking,<br />
            Track students attendance in real-time,<br />
            Gain a clear picture of attendance patterns.
          </p>
        </div>
        </base-card>
    </section>
        </template><style scoped>
.carousel-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(8, 8, 8);
  background: rgba(247, 246, 248, 0.5);
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  margin: 0px auto;
  max-width: 1500px;
  background-color: rgb(242, 242, 242);
  margin-top: 120px;
 
}

.carousel-text h2 {
  margin: 5px 0;
  font-size: 32px;
  
  font-weight: bold;
  text-decoration: underline;
}

.carousel-text p {
  font-size: 30px;
  margin-top: 80px;
  line-height: 1.5;
  color: #080808;
  
}
</style> 
<!-- 
<template>
  <div class="nav-container">
    <form id="nav-search-bar-form" @submit.prevent="onSearch" role="search" class="nav-search-bar">
      <div class="nav-dropdown">
        <select
          v-model="selectedCategory"
          id="searchDropdownBox"
          class="nav-search-dropdown"
          aria-describedby="searchDropdownDescription"
        >
          <option value="search-alias=aps">All</option>
          <option value="search-alias=name">Name</option>
          <option value="search-alias=batch">Batch</option>
          <option value="search-alias=date">Date</option>
        </select>
      </div>
      <div class="nav-input-container">
        <input
          type="text"
          id="twotabsearchtextbox"
          v-model="searchQuery"
          class="nav-input"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <button type="submit" id="nav-search-submit-button" class="nav-search-submit">
        Go
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "search-alias=aps",
      searchQuery: "", 
    };
  },
  methods: {
    onSearch() {

      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
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
.nav-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-input-container {
  flex-grow: 1;
}
.nav-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-search-submit {
  padding: 8px 15px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.nav-search-submit:hover {
  background-color: #005bb5;
}
</style>  





<template>
  <div class="nav-container">
    <form id="nav-search-bar-form" @submit.prevent="onSearch" role="search" class="nav-search-bar">
      <div class="nav-dropdown">
        <select
          v-model="selectedCategory"
          id="searchDropdownBox"
          class="nav-search-dropdown"
          aria-describedby="searchDropdownDescription"
        >
          <option value="search-alias=aps">All</option>
          <option value="search-alias=name">Name</option>
          <option value="search-alias=batch">Batch</option>
          <option value="search-alias=date">Date</option>
        </select>
      </div>
      <div class="nav-input-container">
        <input
          v-if="selectedCategory !== 'search-alias=date'" 
          type="text"
          id="twotabsearchtextbox"
          v-model="searchQuery"
          class="nav-input"
          placeholder="Search"
          aria-label="Search"
        />
        <input
          v-if="selectedCategory === 'search-alias=date'" 
          type="date"
          id="attendanceDate"
          v-model="attendanceDate"
          class="nav-input"
          placeholder="Select Date"
        />
      </div>
      <button type="submit" id="nav-search-submit-button" class="nav-search-submit">
        Go
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "search-alias=aps", 
      searchQuery: "", 
      attendanceDate: "",
    };
  },
  methods: {
    onSearch() {
    
      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
      console.log("Attendance Date:", this.attendanceDate); 
    },
  },
};
</script>

<style scoped>
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
.nav-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-input-container {
  flex-grow: 1;
}
.nav-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-search-submit {
  padding: 8px 15px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.nav-search-submit:hover {
  background-color: #005bb5;
}
</style>-->


<!-- 
<template>
  <div class="nav-container">
    <form id="nav-search-bar-form" @submit.prevent="onSearch" role="search" class="nav-search-bar">
      <div class="nav-dropdown">
        <select
          v-model="selectedCategory"
          id="searchDropdownBox"
          class="nav-search-dropdown"
          aria-describedby="searchDropdownDescription"
        >
          <option value="search-alias=aps">All</option>
          <option value="search-alias=name">Name</option>
          <option value="search-alias=batch">Batch</option>
          <option value="search-alias=date">Date Range</option>
        </select>
      </div>


      <div v-if="selectedCategory === 'search-alias=date'" class="date-range-container">
        <DateRangePicker 
          v-model="selectedDates" 
          :placeholder="'Select Date Range'" 
        />
      </div>

      <div v-if="selectedCategory !== 'search-alias=date'" class="nav-input-container">
        <input
          type="text"
          id="twotabsearchtextbox"
          v-model="searchQuery"
          class="nav-input"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <button type="submit" id="nav-search-submit-button" class="nav-search-submit">
        Go
      </button>
    </form>
  </div>
</template>

<script>

import DateRangePicker from "vue3-date-range-picker";
import "vue3-date-range-picker/dist/style.css"; 

export default {
  components: {
    DateRangePicker,
  },
  data() {
    return {
      selectedCategory: "search-alias=aps",
      searchQuery: "", 
      selectedDates: [], 
    };
  },
  methods: {
    onSearch() {
    
      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
      if (this.selectedCategory === "search-alias=date") {
        console.log("Start Date:", this.selectedDates[0]);
        console.log("End Date:", this.selectedDates[1]);
      }
    },
  },
};
</script>

<style scoped>
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
.nav-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-input-container {
  flex-grow: 1;
}
.nav-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.date-range-container {
  flex-grow: 1;
}
.nav-search-submit {
  padding: 8px 15px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.nav-search-submit:hover {
  background-color: #005bb5;
}
</style> 

<template>
  <div class="nav-container">
    <form id="nav-search-bar-form" @submit.prevent="onSearch" role="search" class="nav-search-bar">
      <div class="nav-dropdown">
        <select
          v-model="selectedCategory"
          id="searchDropdownBox"
          class="nav-search-dropdown"
          aria-describedby="searchDropdownDescription"
        >
          <option value="search-alias=aps">All</option>
          <option value="search-alias=name">Name</option>
          <option value="search-alias=batch">Batch</option>
          <option value="search-alias=date">Date Range</option>
        </select>
      </div>
      <div class="nav-input-container">
        <input
          v-if="selectedCategory !== 'search-alias=date'"
          type="text"
          id="twotabsearchtextbox"
          v-model="searchQuery"
          class="nav-input"
          placeholder="Search"
          aria-label="Search"
        />
        <div v-if="selectedCategory === 'search-alias=date'" class="date-range-container">
          <input
            v-model="startDate"
            type="date"
            id="startDate"
            class="nav-input"
            placeholder="Start Date"
          />
          <input
            v-model="endDate"
            type="date"
            id="endDate"
            class="nav-input"
            placeholder="End Date"
          />
        </div>
      </div>
      <button type="submit" id="nav-search-submit-button" class="nav-search-submit">
        Go
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "search-alias=aps", // Default category
      searchQuery: "", // Search query entered by the user
      startDate: "", // Store the start date for the date range
      endDate: "", // Store the end date for the date range
    };
  },
  methods: {
    onSearch() {
      // Handle the search logic here
      console.log("Category:", this.selectedCategory);
      console.log("Search Query:", this.searchQuery);
      console.log("Start Date:", this.startDate); // Log the start date
      console.log("End Date:", this.endDate); // Log the end date
    },
  },
};
</script>

<style scoped>
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
.nav-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.nav-input-container {
  flex-grow: 1;
}
.nav-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.date-range-container {
  display: flex;
  gap: 10px;
  width: 100%;
}
.nav-search-submit {
  padding: 8px 15px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.nav-search-submit:hover {
  background-color: #005bb5;
}
</style>-->