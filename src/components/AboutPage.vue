
<template>
    <section>
      <div class="carousels-text"></div>
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
        </template>
        <!-- <style scoped>
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
</style>  -->

<style scoped>
/* Page Layout */
.page-container {
  display: flex;
  min-height: 100vh;
  background: #f2f2f2;
}





/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
}

/* Hero Section */
.carousel-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #080808;
  background: rgba(205, 178, 233, 0.5);
  padding: 30px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 20px auto;
  background: #d8eefc; 
}

.carousel-text h2 {
  margin: 5px 0;
  font-size: 32px;
  font-weight: bold;
  text-decoration: underline;
  color: #4fc3f7;
}

.carousel-text p {
  font-size: 20px;
  margin-top: 15px;
  line-height: 1.5;
  color: #080808;
}

/* Filters */
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.filter {
  display: flex;
  align-items: center;
  background-color: #dffbfb;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cfccfc;
  flex: 1;
  max-width: 250px;
  height: 35px;
}

.filter input,
.filter select {
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
}

.batch-dropdown {
  appearance: none;
  cursor: pointer;
}

/* Export Button */
.export-btn-container {
  text-align: right;
  margin-bottom: 10px;
}

.export-btn {
  background: #64b5f6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.export-btn:hover {
  background: #4fc3f7;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #a9e6fb;
}

th {
  background: #4fc3f7;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #b3e5fc;
}

tbody tr:nth-child(odd) {
  background-color: #81d4fa;
}

/* Remove Button */


.remove-btn:hover {
  background-color: #388eeb;
}

/* Print Styles */
@media print {
  .export-btn {
    display: none;
  }
}

/* Responsive Design */
@media (max-width: 900px) {
  .page-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    text-align: center;
    padding: 20px;
  }

  .filters-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filter {
    max-width: 100%;
    margin-bottom: 10px;
  }

  .carousel-text {
    padding: 20px;
  }
}

.carousels-text {
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
<!-- <template>
  <section>
    <div class="carousel-text"></div>
    <div class="login-form">
      <div class="reset-password">
        <h3>Reset Password</h3>
      </div>
      <div class="form-group">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Enter Email*" 
        />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>

      <div class="form-group password-field">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter New Password*"
        />
        <button
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "👁" : "👁️‍🗨️" }}
        </button>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>

      <div class="form-group password-field">
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          placeholder="Confirm New Password*"
        />
        <button
          type="button"
          class="toggle-password"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          {{ showConfirmPassword ? "👁" : "👁️‍🗨️" }}
        </button>
        <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
      </div>

      <button @click="resetPassword" class="primary-button">Reset Password</button>

      <div class="register-prompt">
        <p>
          Remember your password? 
          <router-link to="/login">Login here</router-link>
        </p>
      </div>
    </div>
    <router-view></router-view>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      :color="snackbarColor"
      location="center"
    >
      {{ message }}
    </v-snackbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      showPassword: false,
      showConfirmPassword: false,
      snackbar: false,
      message: "",
      snackbarColor: "success"
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "Email is required";
        return false;
      }
      if (!emailRegex.test(this.email)) {
        this.emailError = "Please enter a valid email";
        return false;
      }
      this.emailError = "";
      return true;
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = "Password is required";
        return false;
      }
      if (this.password.length < 8) {
        this.passwordError = "Password must be at least 8 characters";
        return false;
      }
      this.passwordError = "";
      return true;
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordError = "Please confirm your password";
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Passwords do not match";
        return false;
      }
      this.confirmPasswordError = "";
      return true;
    },
    async resetPassword() {
      if (!this.validateEmail() || !this.validatePassword() || !this.validateConfirmPassword()) {
        return;
      }

      try {
        await this.$store.dispatch("resetPassword", { 
          email: this.email,
          password: this.password
        });
        this.message = "Password reset successfully";
        this.snackbarColor = "success";
        this.snackbar = true;
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        console.error(error);
        this.message = error.message || "Failed to reset password";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    }
  }
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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #d8f5fa;
  margin-top: 70px;
  border: 1px solid #8ddbf7;
}

.login-form input {
  width: 100%;
  height: 45px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #beedfe;
  background-color: rgb(241, 253, 255);
  border-radius: 8px;
}

.password-field {
  position: relative;
}

.password-field input {
  width: calc(100% - 40px);
  padding-right: 40px;
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
  font-family: "Georgia", serif;
}

.error {
  color: #dc3545;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  display: block;
}

a {
  color: rgb(101, 138, 201);
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #8ddbf7;
}
</style> -->
