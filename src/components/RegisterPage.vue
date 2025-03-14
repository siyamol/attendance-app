<template>
  <section>

    <div class="carousel-text">
      <!-- <h2>PTF</h2> -->
      <!-- <h2>ADMIN MANAGEMENT</h2>
      <p>
        Stay Accurate with our Attendance Management System.<br />
        Automate end-to-end attendance tracking,<br />
        Track students attendance in real-time,<br />
        Gain a clear picture of attendance patterns
      </p>-->
       <!-- <div class="reset-password">
      
      <h3>Register</h3></div> -->
    </div>  
  
    <base-card>
      <div class="register">
        <div class="reset-password">
      
      <h3>Register</h3></div>
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Enter Name*" />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="form-group">
          <input v-model="email" type="text" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
<!-- 
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div> -->
        <div class="form-group password-field d-flex">
  <div class="password-wrapper">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      placeholder="Enter Password*"
      id="password"
      class="password-input"
    />
    <span
      type="button"
      class="toggle-password"
      @click="showPassword = !showPassword"
    >
      {{ showPassword ? "👁" : "👁️‍🗨️" }}
    </span>
  </div>
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
      showPassword: false, 
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

.register {

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

.register input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* transition: border-color 0.3s; */
  border: 1px solid #beedfe;
    background-color: rgb(241, 253, 255);
    border-radius: 8px;

}

.register input:focus {
  /* background:#fff; */

  border-color: rgb(252, 252, 253);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
  
}

.register button {
  width: 100%;
  height: 45px;
  border: none;
  /* background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc); */
  background: #99d2f8;  
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  
}

.register button:hover {
  /* background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc); */
  background: #8ddbf7;
  
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 2px;
}
.main-content {
  flex-grow: 1;  
  padding: 2px;
}

.reset-password h3 {
  text-align: center; 
  font-size: 32px; 
  color: rgb(101, 138, 201); 
  margin-bottom: 30px; 
  font-family:"Georgia", serif; 
}




















.password-wrapper {
  position: relative;
  width: 100%;
}

.password-input {
  width: 100%;
  padding: 10px 40px 10px 10px; /* Space for the icon */
  height: 45px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: rgb(241, 253, 255);
  font-size: 16px;
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}

.toggle-password {
  position: absolute;
  right: 10px; /* Position the icon on the right side */
  top: 50%;
  transform: translateY(-75%);
  cursor: pointer;
  font-size: 18px;
  color: #666;
}

.toggle-password:hover {
  color: #000;
}

.password-input:focus {
  border-color: rgb(252, 252, 253);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.password-input::placeholder {
  color: #bbb;
}

.error {
  color: red;
  font-size: 12px;
}


</style>
