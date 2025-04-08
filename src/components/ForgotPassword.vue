<!-- <template>
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
   -->
   <!-- <template>
    <section>
      <div class="reset-password">
        <h2>Reset Password</h2>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Enter New Password*" />
       
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
  
        <div class="form-group">
          <input v-model="confirmPassword" type="password" placeholder="Confirm New Password*" />
          
          <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
        </div>
        
        <button @click="resetPassword" class="btn" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : 'Reset Password' }}
        </button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        successMessage: '',
        errorMessage: '',
        isLoading: false
      };
    },
  
    computed: {
      ...mapGetters(['getForgotpass']),
    },
  
    methods: {
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !this.email 
          ? 'Email is required' 
          : !emailRegex.test(this.email)
            ? 'Please enter a valid email address'
            : '';
        
        return this.emailError === '';
      },
  
      validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        this.passwordError = !this.password
          ? 'Password is required'
          : !passwordRegex.test(this.password)
            ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
            : '';
  
        this.confirmPasswordError = !this.confirmPassword
          ? 'Please confirm your password'
          : this.confirmPassword !== this.password
            ? 'Passwords do not match'
            : '';
  
        return this.passwordError === '' && this.confirmPasswordError === '';
      },
  
      async resetPassword() {
        // Clear previous messages
        this.successMessage = '';
        this.errorMessage = '';
        
        // Validate inputs
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
          return;
        }
        
        // Prepare payload
        const payload = {
          email: this.email,
          newPassword: this.password,
          confirmPassword: this.confirmPassword
        };
        
        try {
          this.isLoading = true;
          const result = await this.$store.dispatch('resetPassword', payload);
          
          if (result.success) {
            this.successMessage = result.message || 'Password successfully updated!';
            // Reset form fields on success
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          } else {
            this.errorMessage = result.message || 'Failed to reset password. Please try again.';
          }
        } catch (error) {
          this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
          console.error('Reset password error:', error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  };
  </script> -->
<!--   
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
  
   -->
<!-- 
<style scoped>
.reset-password {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  background-color: #d8f5fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #8ddbf7;
  margin-top: 70px;
}

.reset-password h2 {
  text-align: center;
  font-size: 32px;
  color: rgb(101, 138, 201);
  margin-bottom: 30px;
}

.reset-password input {
  width: calc(100% - 40px);
  height: 45px;
  padding-left: 15px;
  border: 1px solid #beedfe;
  background-color: rgb(241, 253, 255);
  border-radius: 8px;
  margin-top: 10px;
}

.reset-password input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
  border-color: rgb(27, 29, 83);
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
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
  margin-top: 20px;
}

.primary-button:hover {
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
.primary-button:hover {

background: #8ddbf7;
}
.navbar {
  background: #0077b6;
  padding: 15px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}



.reset-password {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  background-color: #d8f5fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #8ddbf7;
  margin-top: 40px;
}

.reset-password h2 {
  text-align: center;
  font-size: 32px;
  color: rgb(101, 138, 201);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.reset-password input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  border: 1px solid #beedfe;
  background-color: rgb(241, 253, 255);
  border-radius: 8px;
  margin-top: 8px;
  box-sizing: border-box;
}

.reset-password input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
  border-color: rgb(27, 29, 83);
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
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

.btn {
  width: 100%;
  height: 45px;
  border: none;
  background: #99d2f8;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.btn:hover {
  background: #8ddbf7;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: left;
}

.success {
  color: green;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
}

.btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style> -->
<template>
  <section>
    <div class="carousel-text"></div>
    <div class="reset-password">
      <h2>Reset Password</h2>
      <div class="form-group">
        <input v-model="email" type="email" placeholder="Enter Email*" />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      
      <div class="form-group password-field">
        <input v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Enter New Password*" />
        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
          {{ passwordVisible ?  '👁️‍🗨️' : '👁️' }}
        </button>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>

      <div class="form-group password-field">
        <input v-model="confirmPassword" :type="confirmPasswordVisible ? 'text' : 'password'" placeholder="Confirm New Password*" />
        <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
          {{ confirmPasswordVisible ? '👁️‍🗨️' : '👁️' }}
        </button>
        <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
      </div>
      
      <button @click="resetPassword" class="btn" :disabled="isLoading">
        {{ isLoading ? 'Processing...' : 'Reset Password' }}
      </button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      successMessage: '',
      errorMessage: '',
      isLoading: false,
      passwordVisible: false,
      confirmPasswordVisible: false
    };
  },

  computed: {
    ...mapGetters(['getForgotpass']),
  },

  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !this.email 
        ? 'Email is required' 
        : !emailRegex.test(this.email)
          ? 'Please enter a valid email address'
          : '';
      
      return this.emailError === '';
    },

    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      this.passwordError = !this.password
        ? 'Password is required'
        : !passwordRegex.test(this.password)
          ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
          : '';

      this.confirmPasswordError = !this.confirmPassword
        ? 'Please confirm your password'
        : this.confirmPassword !== this.password
          ? 'Passwords do not match'
          : '';

      return this.passwordError === '' && this.confirmPasswordError === '';
    },

    async resetPassword() {
      // Clear previous messages
      this.successMessage = '';
      this.errorMessage = '';
      
      // Validate inputs
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (!isEmailValid || !isPasswordValid) {
        return;
      }
      
      // Prepare payload
      const payload = {
        email: this.email,
        newPassword: this.password,
        confirmPassword: this.confirmPassword
      };
      
      try {
        this.isLoading = true;
        const result = await this.$store.dispatch('resetPassword', payload);
        
        if (result.success) {
          this.successMessage = result.message || 'Password successfully updated!';
          // Reset form fields on success
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          // Reset visibility state
          this.passwordVisible = false;
          this.confirmPasswordVisible = false;
        } else {
          this.errorMessage = result.message || 'Failed to reset password. Please try again.';
        }
      } catch (error) {
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
        console.error('Reset password error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.reset-password {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  background-color: #d8f5fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #8ddbf7;
  margin-top: 40px;
}

.reset-password h2 {
  text-align: center;
  font-size: 32px;
  color: rgb(101, 138, 201);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.reset-password input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  padding-right: 60px; /* Make room for the toggle button */
  border: 1px solid #beedfe;
  background-color: rgb(241, 253, 255);
  border-radius: 8px;
  margin-top: 8px;
  box-sizing: border-box;
}

.reset-password input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
  border-color: rgb(27, 29, 83);
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 19px; /* Adjusted to better align with input */
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 12px;
  padding: 5px;
  z-index: 1; /* Ensure it's above the input */
}

.toggle-password:hover {
  color: #000;
}

.btn {
  width: 100%;
  height: 45px;
  border: none;
  background: #99d2f8;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.btn:hover {
  background: #8ddbf7;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: left;
}

.success {
  color: green;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
}

.btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
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

</style>
