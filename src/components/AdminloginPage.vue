<!-- <template>
    <section>
      <base-card>
        <h2>Welcome!</h2>
        <div class="Login">
          
  
          <div class="form-group">
            <input v-model="email" type="text" placeholder="Enter Email" />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
  
          <div class="form-group">
            <input v-model="password" type="password" placeholder="Enter Password" />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
       
          <button @click="Login" class="btn">Login</button>
        </div>
        
      </base-card>
      <router-view></router-view>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
       
        email: '',
        password: '',
        emailError: '',
        passwordError: '',

      };
    },
    methods: {
      validate() {
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';
  
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        this.passwordError = !passwordRegex.test(this.password)
          ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
          : '';
  
      
  
        return (
    
          this.emailError === '' &&
          this.passwordError === '' 
         // Ensure batch error is also checked
        );
      },
      register() {
        if (this.validate()) {
          // Proceed with registration logic here
          this.$router.push('/home'); // Redirect to login after successful registration
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
    <nav-bar />
    <base-card>
      <h2>Admin page !</h2>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>

import NavBar from './NavBar.vue'; 
export default {
  components: { NavBar },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

        return this.emailError === '' && this.passwordError === '';
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
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 100px; /* Adjust as needed */
  border: 1px solid #e0e0e0; /* Subtle border */
}

.login-form input,
.login-form select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s; /* Added transition for shadow */
}

.login-form input:focus,
.login-form select:focus {
  border-color: skyblue;
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5); /* Soft glow effect */
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to right, #007bff, #0056b3); /* Gradient background */
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s; /* Added transition for transform */
}

.primary-button:hover {
  background: rgb(16, 100, 133); 
  transform: translateY(-2px); /* Lift effect on hover */
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333; /* Darker color for better readability */
  margin-bottom: 20px; /* Space between heading and form */
}
</style>









<template>
  <section>
    <base-card>
      <h2>Admin page!</h2>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
// import NavBar from './NavBar.vue';

export default {
  // components: { NavBar },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return this.emailError === '' && this.passwordError === '';
    },
    login() {
      if (this.validate()) {
        // Implement your admin login logic here (e.g., API call, authentication)
        console.log('Admin login successful (placeholder)'); // Replace with actual logic
      }
    },
  },
};
</script>

<style scoped>


.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 100px; /* Adjust as needed */
  border: 1px solid #e0e0e0; /* Subtle border */
}

.login-form input,
.login-form select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s; /* Added transition for shadow */
}

.login-form input:focus,
.login-form select:focus {
  border-color: skyblue;
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5); /* Soft glow effect */
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to right, #007bff, #0056b3); /* Gradient background */
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s; /* Added transition for transform */
}

.primary-button:hover {
  background: rgb(16, 100, 133); 
  transform: translateY(-2px); /* Lift effect on hover */
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333; /* Darker color for better readability */
  margin-bottom: 20px; /* Space between heading and form */
}</style>












<template>
  <section>
    <base-card>
      <h2>Admin Page!</h2>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return this.emailError === '' && this.passwordError === '';
    },
    login() {
      if (this.validate()) {
        // Navigate to the admin main page
        this.$router.push('/adminmain');
        console.log('Admin login successful');
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 100px; /* Adjust as needed */
  border: 1px solid #e0e0e0; /* Subtle border */
}

.login-form input,
.login-form select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s; /* Added transition for shadow */
}

.login-form input:focus,
.login-form select:focus {
  border-color:  rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5); /* Soft glow effect */
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3); /* Gradient background */
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s; /* Added transition for transform */
}

.primary-button:hover {
  background:  rgb(27, 29, 83); 
  transform: translateY(-2px); /* Lift effect on hover */
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333; /* Darker color for better readability */
  margin-bottom: 20px; /* Space between heading and form */
}
</style>

<template>
  <section>
    <base-card>
      <h2>Admin Page!</h2>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      // this.passwordError = !passwordRegex.test(this.password)
      //   ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
      //   : '';

      // return this.emailError === '' && this.passwordError === '';
      return true; // Always return true since validation is commented out.
    },
    login() {
      if (this.validate()) {
        // Navigate to the admin main page
        this.$router.push('/adminmain');
        console.log('Admin login successful');
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 100px;
  border: 1px solid #e0e0e0;
}

.login-form input,
.login-form select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.login-form input:focus,
.login-form select:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.primary-button:hover {
  background: rgb(27, 29, 83);
  transform: translateY(-2px);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>

<template>
  <section>
    <base-card>
      <h2>Admin Page!</h2>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>

      
        <div class="register-prompt">
          <p>Are you a new user? <router-link to="/login">Register here</router-link></p>
        </div>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      return true; // Always return true since validation is commented out.
    },
    login() {
      if (this.validate()) {
        // Navigate to the admin main page
        this.$router.push('/adminmain');
        console.log('Admin login successful');
      }
    },
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.primary-button:hover {

  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
  transform: translateY(-2px);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.register-prompt {
  text-align: center;
  margin-top: 15px;
}
</style>
  







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
        Gain a clear picture of attendance patterns
      </p>''</div>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>

        <div class="register-prompt">
          <p>Are you a new user? <router-link to="/login">Register here</router-link></p>
        </div>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      return true;
    },
    login() {
      if (this.validate()) {
        this.$router.push('/adminmain');
        console.log('Admin login successful');
      }
    },
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 1px; /* Reduced margin for closer spacing */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 15px; /* Reduced margin for closer input boxes */
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.register-prompt {
  text-align: center;
  margin-top: 15px;
}
</style>

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
        Gain a clear picture of attendance patterns
      </p></div>
      
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

 
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return this.emailError === '' && this.passwordError === '';
    },
    login() {
      if (this.validate()) {
       
        this.$router.push('/adminmain');
        console.log('Admin login successful');
      }
    },
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 100px;
  border: 1px solid #e0e0e0;
}

.login-form input,
.login-form select {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.login-form input:focus,
.login-form select:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 30px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.primary-button:hover {
  background: rgb(27, 29, 83);
  transform: translateY(-2px);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>


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
        Gain a clear picture of attendance patterns
      </p></div>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>

        <div class="register-prompt">
          <p>Are you a new user? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
 methods: {
  //   validate() {
      
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //     this.passwordError = !passwordRegex.test(this.password)
  //       ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
  //       : '';

    //   return this.emailError === '' && this.passwordError === '';
    
    },
    async login() {
      const payload = {
          "email": this.email,
          "password": this.password
      }
      console.log("payload",payload)
    
         const response = await this.$store.dispatch('adminLogin',payload)
         console.log("status",response)
         if(response){
          this.$router.push('/adminmain');
          console.log('Admin login successful');
          }
       
        
    //   }
    // },
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 1px; /* Reduced margin for closer spacing */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 15px; /* Reduced margin for closer input boxes */
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.register-prompt {
  text-align: center;
  margin-top: 15px;
}
</style>

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
          Gain a clear picture of attendance patterns
        </p>
      </div>
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>

        <div class="register-prompt">
          <p>Are you a new user? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate()
     {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return this.emailError === '' && this.passwordError === '';
    },
    async login() {
      if (!this.validate()) {
        return; 
      }

      const payload = {
        email: this.email,
        password: this.password
      };
      console.log("payload", payload);

      const response = await this.$store.dispatch('adminLogin', payload);
      console.log("status", response);

      // Ensure response is successful (you may need to adjust this condition based on your action)
      if (response && response.success) { 
        console.log('Navigation initiated');
        this.$router.push('/adminmain'); // Adjust the path based on your router configuration
        // console.log('Admin login successful');
      } else {
        // Handle unsuccessful login (e.g., show an error message)
        console.error('Login failed. Check your credentials.');
      }
    }
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 1px; /* Reduced margin for closer spacing */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 15px; /* Reduced margin for closer input boxes */
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(27, 29, 83);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {
  background: linear-gradient(to right, rgb(27, 29, 83), #0056b3);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.register-prompt {
  text-align: center;
  margin-top: 15px;
}
</style>


compelecode with validatin

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
      <div class="login-form">
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <button @click="login" class="primary-button">Login</button>
        
       

        <div class="register-prompt">
          <p>Are you a new user ? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
    </base-card>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? 'Enter a valid email address' : '';

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !passwordRegex.test(this.password)
        ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
        : '';

      return this.emailError === '' && this.passwordError === '';
    },
    async login() {
      if (!this.validate()) {
        return;
      }

      const payload = {
        email: this.email,
        password: this.password
      };
      console.log("payload", payload);

      const response = await this.$store.dispatch('adminLogin', payload);
      console.log("status", response);

      if (response && response.success) {
        console.log('Navigation initiated');
        this.$router.push('/adminmain');
      } else {
        console.error('Login failed. Check your credentials.');
      }
    },
    navigateToLateMain() {
      this.$router.push('/late'); 
    }
  },
};
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
  margin: 20px auto;
  max-width: 1500px;
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 1px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.form-group {
  margin-bottom: 15px;
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {
  background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
}

.secondary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: rgb(85, 85, 85);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 15px;
}

.secondary-button:hover {
  background: linear-gradient(to right, rgb(85, 85, 85), #666);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.register-prompt {
  text-align: center;
  margin-top: 15px;
}
</style>



<template>
  
  <section>
 ..    
    <base-card>..
      <div class="carousel-text"> 
       
    
        ....<div class="main-content">
      <h2>Login</h2>
      <hr />

    </div>.. 
    
      </div>
     <div class="login-form">
      <div class="reset-password">
      
      <h3>Login</h3></div>
        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" @keyup.enter="login"/>
        </div>

        <button @click="login" class="primary-button">Login</button>

        <div class="register-prompt">
        ... <p><router-link to="/">Forgot Password?</router-link></p>....
          <p class="forgot-password">
      <router-link to="/forgot">Forgot Password?</router-link>
    </p>
          <p>Are you a new user ? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
   .. </base-card>.. 
    <router-view></router-view>
  </section>
  <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="danger"
      location="center"
    >
      {{ error }}
 </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      error: ''
    };
  },
  methods: {
    async login() {
      const payload = {
        "email": this.email,
        "password": this.password
      };
      try{
      const response = await this.$store.dispatch('adminLogin', payload);
      console.log("status", response);

      if (response) {
        console.log('Navigation initiated');
        this.$router.push('/adminmain');
      }
    }catch (error) {
    console.error(error);
    this.error = error;
    this.snackbar = true;
  }
    }
  },
};
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
  margin: 0px auto;
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #d8f5fa;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
  border: 1px solid #8ddbf7;
  
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: 1px solid #beedfe;
    background-color: rgb(241, 253, 255);
    border-radius: 8px;
}

.login-form input:focus {
  border-color: rgb(252, 252, 253);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
 
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;

  background: #99d2f8;  
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {

  background: #8ddbf7;
}

 .register-prompt {
  text-align: center;
  margin-top: 15px;
  
} 

.reset-password h3 {
  text-align: center; 
  font-size: 32px; 
  color: rgb(101, 138, 201);
  margin-bottom: 30px; 
  font-family:"Georgia", serif; 
}
  

  
</style>-->


<template>
  <section>
    <div class="carousel-text"></div>
    <div class="login-form">
      <div class="reset-password">
        <h3>Login</h3>
      </div>
      <div class="form-group">
        <input v-model="email" type="text" placeholder="Enter Email*" />
      </div>

      <div class="form-group password-field">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter Password*"
          @keyup.enter="login"
        />
        <button
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "👁" : "👁️‍🗨️" }}
        </button>
      </div>

      <button @click="login" class="primary-button">Login</button>

      <div class="register-prompt">
        <p class="forgot-password">
          <router-link to="/forgot">Forgot Password?</router-link>
        </p>
        <p>
          Are you a new user ?
          <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
    <router-view></router-view>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="danger"
      location="center"
     >
      {{ error }}
    </v-snackbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      snackbar: false,
      error: "",
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.$store.dispatch("adminLogin", payload);
        console.log("status", response);

        if (response) {
          console.log("Navigation initiated");
          this.$router.push("/adminmain");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.password-field {
  position: relative;
}

.password-field input {
  width: calc(100% - 40px); /* Adjusted to fit the toggle button */
  padding-right: 40px; /* Space for the toggle button */
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.toggle-password:hover {
  color: #000;
}


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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #d8f5fa;
  margin-top: 70px;
  border: 1px solid #e0e0e0;
  border: 1px solid #8ddbf7;
  
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: 1px solid #beedfe;
    background-color: rgb(241, 253, 255);
    border-radius: 8px;
}

.login-form input:focus {
  border-color: rgb(252, 252, 253);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
 
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;

  background: #99d2f8;  
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {

  background: #8ddbf7;
}

 .register-prompt {
  text-align: center;
  margin-top: 15px;
  
} 

.reset-password h3 {
  text-align: center; 
  font-size: 32px; 
  color: rgb(101, 138, 201);
  margin-bottom: 30px; 
  font-family:"Georgia", serif; 
}
  

  

</style>


 
