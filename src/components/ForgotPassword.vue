<template>
    <section>
      <div class="reset-password">
        <h2>Reset Password</h2>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Enter Email*" />
          <span v-if="emaildError" class="error">{{ emailError }}</span>
        </div>
        
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter New Password*" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
  
        <div class="form-group">
          <input v-model="confirmPassword" type="password" placeholder="Confirm New Password*" />
          <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
        </div>
        
        <button @click="resetPassword" class="btn">Reset Password</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </section>
  </template>
  <script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        email:'',
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
        successMessage: '',
      };
    },



  mounted() {
 
     this.fetchForgotPassword();
  },



  
computed: {
    ...mapGetters(['getForgotpass']),
  forgotPassword(){
       return this.getForgotpass;
    }
  },
    methods: {
      async fetchForgotPassword(){
      try{
        await this.$store.dispatch('fetchForgot'); 
      }catch (error) {
          console.error(error);
      } 
    },
      validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        this.passwordError = !passwordRegex.test(this.password)
          ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
          : '';
  
        this.confirmPasswordError = this.confirmPassword !== this.password
          ? 'Passwords do not match'
          : '';
  
        return this.passwordError === '' && this.confirmPasswordError === '';
      },
  
      resetPassword() {
        if (this.validatePassword()) {
          // Assuming password is valid, show success message
          this.successMessage = 'Password successfully updated!';
          
          // Reset password logic here (e.g., calling an API to reset password)
          
          // Optionally, you can clear the password fields
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        } else {
          this.successMessage = ''; // Clear success message if validation fails
        }
      }
    }
  }
  </script>
  <style scoped>
 .reset-password {
  max-width: 500px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #8ddbf7;
  margin-top: 150px;
 
}

.reset-password h2 {

  text-align: center;
  font-size: 32px;
  color: rgb(101, 138, 201);
  margin-bottom: 30px;
  
}
  .reset-password input {
    width: 100%;
    height: 45px;
    padding-left: 15px;
    margin-bottom: 11px;
    border: 1px solid #ffffff;
    border-radius: 4px;
    transition: border-color 0.3s;
    border: 1px solid #8ddbf7;
    margin-top: 20px;
  
  }
  
  .reset-password input:focus {
    background: #ffffff;
    outline: none;
    border-color: rgb(27, 29, 83);
    box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
    border: 1px solid #8ddbf7;
    margin-top: 20px;
 
    border-color: rgb(27, 29, 83);
  }
  
.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  /* background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc); */
  background:#99d2f8;  
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

}
  .reset-password button {
    width: 100%;
    height: 45px;
    border: none;
    /* background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc); */
    background:#99d2f8;  
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  
  .reset-password button:hover {
    /* background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc); */
    background: #8ddbf7;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 2px;
  }
  
  .success {
    color: green;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  