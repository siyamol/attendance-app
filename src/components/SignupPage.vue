<!-- <template>
    <base-card>
   
    <div class="log-in">
  <input type="text" v-model="email" placeholder="Enter Email"/>
  <span v-if="emailError" class="error">{{ emailError }}</span>
  </div>
  <div class="log-in">
  <input type="password" v-model="password" placeholder="Enter Password"/>
  <span v-if="passwordError" class="error">{{ passwordError }}</span>
  
  </div> -->
  <!-- <button @click="login" class="btn">Login</button> -->
  <!-- <router-link to='/userhome'>Login</router-link>
    </base-card>
  </template>
  <script>
  export default{
  
    data() {
      return {
       email: '',
        password: '',
        emailError:'',
        passwordError:''
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


       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !emailRegex.test(this.email) ? 'Select the batch' : '';
  

          return (
           
            this.emailError === '' &&
            this.passwordError === ''
          );
        },
      }
  };
  
  </script>
  <style scoped>
  .log-in input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 10px; /* Reduced margin between input and error */
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
  }
  .error{
    color:rgb(235, 40, 40);
    }
  </style> -->