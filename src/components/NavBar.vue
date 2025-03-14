<template>
    <nav class="navbar">
      <div class="navbar-container container">
        <input type="checkbox" id="navbar-toggle" />
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        <ul class="menu-items">
          <li><router-link to="/">Home</router-link></li>
          <!-- <li><router-link to="/adminmain">Adminmainpage</router-link></li> -->
          <li  v-if="!isLogin"><router-link to="/admin">Login</router-link></li>
          <li v-else><router-link to="/admin" @click="logout">Logout</router-link></li>
          <li><router-link to="/about">About</router-link></li>
     
        
        </ul>
        <h1 class="logo">Welcome to attendance app</h1>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    computed:{
      isLogin(){
        return this.$store.state.login;
      }
    },
    methods:{
      logout(){
        this.$store.commit('setLogin',false);
      }
    }
  };
  </script>
  
  <style scoped>
 
  
  
  .navbar input[type='checkbox'],
  .navbar .hamburger-lines {
    display: none;
    color: #ffffff;
    margin-left: 12.5rem;
  }
  
 
  .navbar {
    
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 80px; 
  /* background: #8b9ff0;  */
  /* background: linear-gradient(to left, #00c4cc ,#8b3dff); */
  /* background: linear-gradient(to left, #34dde2 ,#8b3dff); */

   background: #99d2f8;   
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #f5f7fa;
  /* color: #94f7fc; */
  
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    margin-left: 14.5rem;
    margin-bottom: .5rem;
  }
  
  .menu-items {
    order: 2;
    display: flex;
    margin-top: 1rem;
  }
  

  
  .menu-items li {
    list-style: none;
    margin-left: 1.5rem;
    font-size: 1.3rem;
  }
  
  .navbar a {
    color: #f5f7fa;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
  }
  
  
  @media (max-width: 768px) {
    .navbar {
      opacity: 0.95;
    }
  
    .navbar-container input[type='checkbox'],
    .navbar-container .hamburger-lines {
      display: block;
    }
  
    .navbar-container input[type='checkbox']:checked ~ .menu-items {
      transform: translateX(0);
    }
  
    .navbar-container input[type='checkbox']:checked ~ .hamburger-lines .line1 {
      transform: rotate(45deg);
    }
  
    .navbar-container input[type='checkbox']:checked ~ .hamburger-lines .line2 {
      transform: scaleY(0);
    }
  
    .navbar-container input[type='checkbox']:checked ~ .hamburger-lines .line3 {
      transform: rotate(-45deg);
    }
  }
  
  @media (max-width: 500px) {
    .navbar-container input[type='checkbox']:checked ~ .logo {
      display: none;
    }
  }
  </style>
  
  