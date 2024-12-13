<!-- <template>
    <div class="reset-password">
      <h2>Reset Password</h2>
      <form @submit.prevent="updatePassword">
        <input v-model="newPassword" type="password" placeholder="Enter new password*" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm new password*" />
        <button type="submit">Reset Password</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        message: '',
      };
    },
    methods: {
      async updatePassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.message = 'Passwords do not match.';
          return;
        }
        try {
       
          await this.$store.dispatch('resetPassword', {
            password: this.newPassword,
            token: this.$route.query.token,
          });
          this.message = 'Password has been reset successfully.';
        } catch (error) {
          this.message = 'Failed to reset password.';
        }
      },
    },
  };
  </script>
   <template>
  <div class="reset-password">
    <h2>Reset Password</h2>
    <form @submit.prevent="updatePassword" class="login-form">
      <input v-model="newPassword" type="password" placeholder="Enter new password*" />
      <input v-model="confirmPassword" type="password" placeholder="Confirm new password*" />
      <button type="submit" class="primary-button">Reset Password</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      message: '',
    };
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.message = 'Passwords do not match.';
        return;
      }
      try {
      
        await this.$store.dispatch('resetPassword', {
          password: this.newPassword,
          token: this.$route.query.token, 
        });
        this.message = 'Password has been reset successfully.';
      } catch (error) {
        this.message = 'Failed to reset password.';
      }
    },
  },
};
</script>

<style scoped>
.reset-password {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
  border: 1px solid #8ddbf7;
}

.reset-password h2 {
  text-align: center;
  font-size: 32px;
  color: rgb(101, 138, 201);
  margin-bottom: 30px;
}

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 45px;
  border: 1px solid #8ddbf7;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: 1px solid #8ddbf7;
}

.login-form input:focus {
  border-color: rgb(27, 29, 83);
  outline: none;
  box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
}

.primary-button {
  width: 100%;
  height: 45px;
  border: none;
  background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc);
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-button:hover {
  background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc);
}

.message {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: rgb(1, 145, 248);
}

.message.success {
  color: green;
}

.message.error {
  color: red;
}
</style>-->
<template>
    <section>
      <div class="reset-password">
        <h2>Reset Password</h2>
     
        
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
  export default {
    data() {
      return {
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
        successMessage: '', // Holds the success message
      };
    },
  
    methods: {
      validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        this.passwordError = !passwordRegex.test(this.password)
          ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
          : '';
  
        // Validate confirm password matches the password
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
  padding: 20px;
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
  background: linear-gradient(to left, #4830e8, #0fa6ed, #4830e8, #0fe4fc);
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
    background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  
  .reset-password button:hover {
    background: linear-gradient(to left, #4830e8 ,#0fa6ed, #4830e8,#0fe4fc);
    
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
  