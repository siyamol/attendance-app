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


 
