<!-- <template>
    <section>
      <base-card>
        <h2>Welcome!</h2>
        <div class="register">
          <div class="form-group">
            <input v-model="name" type="text" placeholder="Enter Name" />
            <span v-if="nameError" class="error">{{ nameError }}</span>
          </div>
  
          <div class="form-group">
            <input v-model="email" type="text" placeholder="Enter Email" />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
  
          <div class="form-group">
            <input v-model="password" type="password" placeholder="Enter Password" />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          
          <div class="form-group">
            <input v-model="Batch" type="number" placeholder="Enter Batch" />
            <span v-if="batchError" class="error">{{ batchError }}</span>
          </div>
  
          <button @click="register" class="btn">Register</button>
        </div> -->
        <!-- <p>Already a user?<router-link to='/login'>Login</router-link>
        </p>  
          </base-card>
          <router-view></router-view>
    </section>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        nameError: '',
        emailError: '',
        passwordError: '',
      };
    },
    methods: {
      validate() {
        const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name) ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)' : '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';


        const batchRegex = 
      this.emailError = !batchRegex.test(this.batch) ? 'Select the Batch' : '';



        return (
          this.nameError === '' &&
          this.emailError === '' &&
          this.passwordError === ''
        );
      },
      register() {
        if (this.validate()) {
          
     
          this.$router.push('/login');
        }
      }
      
    }
  };
  </script>
<style scoped>
.register {
  max-width: 400px; /* Set a max width for the form */
  margin: auto; /* Center the form */
  padding: 20px; /* Add padding to the form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #f9f9f9; /* Light background color */
}

.register input {
  width: 100%; /* Full width */
  height: 45px; /* Increased height for better touch targets */
  padding-left: 15px; /* Adjusted padding */
  margin-bottom: 15px; /* Space between inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 4px; /* Rounded corners for inputs */
  transition: border-color 0.3s; /* Smooth transition for focus */
}

.register input:focus {
  border-color: skyblue; /* Change border color on focus */
  outline: none; /* Remove default outline */
}

.form-group {
  margin-bottom: 30px; /* Reduced margin between form groups */
}

.register button {
  width: 100%; /* Full width button */
  height: 45px; /* Consistent button height */
  border: none; /* Remove default border */
  background: skyblue; /* Button background color */
  color: #fff; /* Text color */
  font-size: 16px; /* Increased font size for readability */
  border-radius: 4px; /* Rounded corners for button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Smooth transition for hover effect */
}

.register button:hover {
  background: rgb(16, 100, 133); /* Darker color on hover */
}

.error {
  color: red; /* Error text color */
  font-size: 14px; /* Increased font size for better visibility */
  margin-top: 5px; /* Space above error messages */
}
</style>





<template>
  <section>
    <base-card>
      <h2>Welcome!</h2>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="form-group">
          <select v-model="batch" placeholder="Select Batch">
            <option value="" disabled selected>Select Batch</option> 
            <option value="morning">Morning Batch</option>
            <option value="afternoon">Afternoon Batch</option>
          </select>
          <span v-if="batchError" class="error">{{ batchError }}</span>
        </div>

        <button @click="register" class="btn">Register</button>
      </div>
     
      </p>  
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      batch: '', // Added batch property
      nameError: '',
      emailError: '',
      passwordError: '',
      batchError: '', // Added batch error property
    };
  },
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name) ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)' : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      // Check for batch selection
      this.batchError = this.batch === '' ? 'Select a Batch' : ''; // Validate batch selection

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === '' &&
        this.batchError === '' // Ensure batch error is also checked
      );
    },
    register() {
      if (this.validate()) {
        // Proceed with registration logic here
        this.$router.push('/login'); // Redirect to login after successful registration
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px; /* Set a max width for the form */
  margin: auto; /* Center the form */
  padding: 20px; /* Add padding to the form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #f9f9f9; /* Light background color */
}

.register input,
.register select {
  width: 100%; /* Full width */
  height: 45px; /* Increased height for better touch targets */
  padding-left: 15px; /* Adjusted padding */
  margin-bottom: 15px; /* Space between inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 4px; /* Rounded corners for inputs */
  transition: border-color 0.3s; /* Smooth transition for focus */
}

.register input:focus,
.register select:focus {
  border-color: skyblue; /* Change border color on focus */
  outline: none; /* Remove default outline */
}

.form-group {
  margin-bottom: 30px; /* Reduced margin between form groups */
}

.register button {
  width: 100%; /* Full width button */
  height: 45px; /* Consistent button height */
  border: none; /* Remove default border */
  background: skyblue; /* Button background color */
  color: #fff; /* Text color */
  font-size: 16px; /* Increased font size for readability */
  border-radius: 4px; /* Rounded corners for button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Smooth transition for hover effect */
}

.register button:hover {
  background: rgb(16, 100, 133); /* Darker color on hover */
}

.error {
  color: red; /* Error text color */
  font-size: 14px; /* Increased font size for better visibility */
  margin-top: 5px; /* Space above error messages */
}
</style>






<template>
  <section>
     <nav-bar /> Add the NavBar component here 
    <base-card>
      <h2>PTF</h2>
      <h2>TIME&ATTENDANCE</h2>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="form-group">
          <select v-model="batch" placeholder="Select Batch">
            <option value="" disabled selected>Select Batch</option> 
            <option value="morning">Morning Batch</option>
            <option value="afternoon">Afternoon Batch</option>
          </select>
          <span v-if="batchError" class="error">{{ batchError }}</span>
        </div>

        <button @click="register" class="btn">Register</button>
      </div>
    </base-card>
    <div class="table-container"></div>
    <router-view></router-view>
  </section>
</template>

<script>
// import NavBar from './NavBar.vue'; // Adjust the import path based on the actual file location

export default {
  components: {
    // NavBar, // Register the NavBar component
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      batch: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      batchError: '',
    };
  },
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name) ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)' : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      this.batchError = this.batch === '' ? 'Select a Batch' : '';

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === '' &&
        this.batchError === ''
      );
    },
    register() {
      if (this.validate()) {
        this.$router.push('/login'); // Redirect to login after successful registration
      }
    }
  }
};
</script>

<style scoped>

.register {
  max-width: 400px; /* Set a max width for the form */
  margin: auto; /* Center the form */
  padding: 20px; /* Add padding to the form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #f9f9f9; /* Light background color */
  margin-top: 100px; /* Adjust as needed */
  border: 1px solid #e0e0e0; /* Subtle border */
}

.register input,
.register select {
  width: 100%; /* Full width */
  height: 45px; /* Increased height for better touch targets */
  padding-left: 15px; /* Adjusted padding */
  margin-bottom: 15px; /* Space between inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 4px; /* Rounded corners for inputs */
  transition: border-color 0.3s; /* Smooth transition for focus */

  
}

.register input:focus,
.register select:focus {
  border-color: skyblue; /* Change border color on focus */
  outline: none; /* Remove default outline */

}

.form-group {
  margin-bottom: 30px; /* Reduced margin between form groups */

}

.register button {
  width: 100%; /* Full width button */
  height: 45px; /* Consistent button height */
  border: none; /* Remove default border */
  background: skyblue; /* Button background color */
  color: #fff; /* Text color */
  font-size: 16px; /* Increased font size for readability */
  border-radius: 4px; /* Rounded corners for button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Smooth transition for hover effect */
 
  
}

.register button:hover {
  background: rgb(16, 100, 133); /* Darker color on hover */
 
}

.error {
  color: red; /* Error text color */
  font-size: 14px; /* Increased font size for better visibility */
  margin-top: 2px; /* Space above error messages */
}


.table-container {
  margin-top: 0px; /* Space above the table */
  padding: 100px;

}
.section {
  padding-top: 50px; /* Match this to the height of your navbar */
  
}

nav-bar {
  height: 50px; /* or whatever height you prefer */
  position: fixed; /* Keeps the navbar fixed at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it's on top of other content */
  
}

</style>-->


<!-- 
<template>
  <section>
   
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>

    <base-card>
      <h2>PTF</h2>
      <h2>TIME & ATTENDANCE</h2>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <div class="form-group">
          <select v-model="batch" placeholder="Select Batch">
            <option value="" disabled selected>Select Batch</option> 
            <option value="morning">Morning Batch</option>
            <option value="afternoon">Afternoon Batch</option>
          </select>
          <span v-if="batchError" class="error">{{ batchError }}</span>
        </div>

        <button @click="register" class="btn">Register</button>
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
      ],
      name: '',
      email: '',
      password: '',
      batch: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      batchError: '',
    };
  },
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name)
        ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)'
        : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      this.batchError = this.batch === '' ? 'Select a Batch' : '';

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === '' &&
        this.batchError === ''
      );
    },
    register() {
      if (this.validate()) {
        this.$router.push('/login'); // Redirect to login after successful registration
      }
    },
  },
};
</script>


<style scoped>

.register {
  max-width: 400px; /* Set a max width for the form */
  margin: auto; /* Center the form */
  padding: 20px; /* Add padding to the form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #f9f9f9; /* Light background color */
  margin-top: 100px; /* Adjust as needed */
  border: 1px solid #e0e0e0; /* Subtle border */
}

.register input,
.register select {
  width: 100%; /* Full width */
  height: 45px; /* Increased height for better touch targets */
  padding-left: 15px; /* Adjusted padding */
  margin-bottom: 15px; /* Space between inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 4px; /* Rounded corners for inputs */
  transition: border-color 0.3s; /* Smooth transition for focus */

  
}

.register input:focus,
.register select:focus {
  border-color: skyblue; /* Change border color on focus */
  outline: none; /* Remove default outline */

}

.form-group {
  margin-bottom: 30px; /* Reduced margin between form groups */

}

.register button {
  width: 100%; /* Full width button */
  height: 45px; /* Consistent button height */
  border: none; /* Remove default border */
  background: skyblue; /* Button background color */
  color: #fff; /* Text color */
  font-size: 16px; /* Increased font size for readability */
  border-radius: 4px; /* Rounded corners for button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Smooth transition for hover effect */
 
  
}

.register button:hover {
  background: rgb(16, 100, 133); /* Darker color on hover */
 
}

.error {
  color: red; /* Error text color */
  font-size: 14px; /* Increased font size for better visibility */
  margin-top: 2px; /* Space above error messages */
}


.table-container {
  margin-top: 0px; /* Space above the table */
  padding: 100px;

}
.section {
  padding-top: 50px; /* Match this to the height of your navbar */
  
}

nav-bar {
  height: 50px; /* or whatever height you prefer */
  position: fixed; /* Keeps the navbar fixed at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it's on top of other content */
  
}


</style> 






<template>
  <section>
  
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      >
      
        <div class="carousel-text">
          <h2>PTF</h2>
          <h2>ADMIN MANAGEMENT</h2>
        </div>
      </v-carousel-item>
    </v-carousel>

    <base-card>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

      
          <select v-model="batch" placeholder="Select Batch">
            <option value="" disabled selected>Select Batch</option> 
            <option value="morning">Morning Batch</option>
            <option value="afternoon">Afternoon Batch</option>
          </select>
          <span v-if="batchError" class="error">{{ batchError }}</span>
        </div> 

        <button @click="register" class="btn">Register</button>
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
        { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrFOqG6PjPhS0sFukUOQzE4GYBe8e7Rw56Q&s' },
      ],
      name: '',
      email: '',
      password: '',
      batch: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      batchError: '',
    };
  },
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name)
        ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)'
        : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      this.batchError = this.batch === '' ? 'Select a Batch' : '';

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === '' &&
        this.batchError === ''
      );
    },
    register() {
      if (this.validate()) {
        this.$router.push('/login'); // Redirect to login after successful registration
      }
    },
  },
};
</script>

<style scoped>

.carousel-text {
  position: absolute;
  top: 80;
  left: 80;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  color: white;
  background: rgba(0, 0, 0, 0.4); /* Slightly transparent background */
  text-align: center; /* Center text */
  padding: 10px;
  border-radius: 5px;
}

.carousel-text h2 {
  margin: 5px 0; /* Adjust as needed for spacing */
  font-size: 32px; /* Increase font size for visibility */
  font-weight: bold;
}

.carousel-text h2 {
  margin: 80;
  font-size: 24px;
  font-weight: bold;
}

/* Form styling */
.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.register input,
.register select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.register input:focus,
.register select:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
}

.form-group {
  margin-bottom: 30px;
}

.register button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.register button:hover {
  background: rgb(0, 9, 132);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 2px;
}
</style>-->

<!-- 
<template>
  <section>
   
    <v-carousel :show-arrows="false" height="300px">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
      >
  
        <div class="carousel-text">
          <h2>PTF</h2>
          <h2>ADMIN MANAGEMENT</h2>
    
    Stay Accurate with our Attendance Management System.<div></div>
    Automate end-to-end attendance tracking,
    Track employee attendance in real-time,
    Gain a clear picture of attendance patterns
   
        </div>
      </v-carousel-item>
    </v-carousel>

    <base-card>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name*" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="register" class="btn">Register</button>
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: 'https://example.com/image1.jpg' },
        { src: 'https://example.com/image2.jpg' },
        { src: 'https://example.com/image3.jpg' },
      ],
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name)
        ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)'
        : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === ''
      );
    },
    register() {
      if (this.validate()) {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.carousel-text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(21, 5, 52, 0.5);
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  z-index: 1;
}

.carousel-text h2 {
  margin: 5px 0;
  font-size: 32px;
  font-weight: bold;
}


.v-carousel-item::v-deep img {
  display: none !important;
}

.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.register input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.register input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
}

.register button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.register button:hover {
  background: rgb(0, 9, 132);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 2px;
}
</style> -->


<template>
  <section>

    <div class="carousel-text">
      <h2>PTF</h2>
      <h2>ADMIN MANAGEMENT</h2>
      <p>
        Stay Accurate with our Attendance Management System.<br />
        Automate end-to-end attendance tracking,<br />
        Track students attendance in real-time,<br />
        Gain a clear picture of attendance patterns
      </p>
    </div>
  
    <base-card>
      <div class="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name*" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="register" class="btn">Register</button>
        <p>Already have an account ? <router-link to="/admin">Login here</router-link></p>
      </div>
    </base-card>
  </section>
 
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      
    };
  },
  
  methods: {
    validate() {
      const nameRegex = /^[a-zA-Z]{3,15}$/;
      this.nameError = !nameRegex.test(this.name)
        ? 'Enter a valid name (3 to 15 letters, no numbers or special symbols)'
        : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return (
        this.nameError === '' &&
        this.emailError === '' &&
        this.passwordError === ''
      );
    },

//     async register() {
//       const payload = {
//           "name":this.name,
//           "email": this.email,
//           "password": this.password
//       }
//       console.log("payload",payload)
   
//       try{
//          const response = await this.$store.dispatch('adminRegister',payload)
//          console.log("status",response)
//          if(response){
//           this.$router.push('/admin');
//           console.log('Admin register successful');
//          }
//       }
//       catch(error){
//         alert(error.message)
//       }
        
//       }

//   },
// };
  
async register() {
  if (this.validate()) { // Ensure validation is called
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    // console.log("payload", payload);

    try {
      const response = await this.$store.dispatch('adminRegister', payload);
      console.log('Response:', response);
    // try {
    //   const response = await this.$store.dispatch('adminRegister', payload);
    //   console.log("status", response);

      if (response) {
        // this.$router.push('/admin');
        this.$router.push('/adminmain');
        // console.log('Admin register successful');
        console.log('Navigating to admin main page...');
      }
      else {
        console.error('Registration failed. Response not as expected.');
      }
    } catch (error) {
      // alert(error.message);
      alert('Registration failed: ' + error.message);
    }
  } else {
    console.error('Validation failed. Please correct the errors and try again.');
  }
}
  }
}

</script>

<style scoped>
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
  margin: px auto;
  max-width: 1500px;
  background-color: rgb(194, 235, 243);
}

.carousel-text h2 {
  margin: 5px 0;
  font-size: 32px;
  font-weight: bold;
}

.carousel-text p {
  font-size: 18px;
  margin-top: 10px;
  line-height: 1.5;
  color: #080808;
  
}

.register {

  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  
  border: 1px solid #e0e0e0;
  border: 1px solid #8ddbf7;
  
}

.register input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 11px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  border: 1px solid #8ddbf7;
  
}

.register input:focus {
  background:#fff;
  outline: none;
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.register button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  
}

.register button:hover {
  background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
  
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 2px;
}

</style>
