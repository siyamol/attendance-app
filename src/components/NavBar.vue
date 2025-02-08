<!-- <template>
    <nav class="navbar">
      <div class="navbar-container container">
        <input type="checkbox" id="navbar-toggle" />
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        <ul class="menu-items">
          <li><a href="#">Home</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#"></a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
        <h1 class="logo">Welcome </h1>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html {
    font-size: 62.5%;
  }
  
  .navbar input[type='checkbox'],
  .navbar .hamburger-lines {
    display: none;
  }
  
  .container {
    max-width: 1200px;
    width: 90%;
    margin: auto;
  }
  
  .navbar {
    box-shadow: 0px 5px 10px 0px #aaa;
    position: fixed;
    width: 100%;
    background: #fff;
    color: #000;
    opacity: 0.85;
    z-index: 100;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    height: 64px;
    align-items: center;
  }
  
  .menu-items {
    order: 2;
    display: flex;
  }
  .logo {
    order: 1;
    font-size: 2.3rem;
  }
  
  .menu-items li {
    list-style: none;
    margin-left: 1.5rem;
    font-size: 1.3rem;
  }
  
  .navbar a {
    color: #444;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
  }
  
  .navbar a:hover {
    color: #117964;
  }
  
  @media (max-width: 768px) {
    .navbar {
      opacity: 0.95;
    }
  
    .navbar-container input[type='checkbox'],
    .navbar-container .hamburger-lines {
      display: block;
    }
  
    .navbar-container {
      display: block;
      position: relative;
      height: 64px;
    }
  
    .navbar-container input[type='checkbox'] {
      position: absolute;
      display: block;
      height: 32px;
      width: 30px;
      top: 20px;
      left: 20px;
      z-index: 5;
      opacity: 0;
      cursor: pointer;
    }
  
    .navbar-container .hamburger-lines {
      display: block;
      height: 28px;
      width: 35px;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  
    .navbar-container .hamburger-lines .line {
      display: block;
      height: 4px;
      width: 100%;
      border-radius: 10px;
      background: #333;
    }
  
    .navbar-container .hamburger-lines .line1 {
      transform-origin: 0% 0%;
      transition: transform 0.3s ease-in-out;
    }
  
    .navbar-container .hamburger-lines .line2 {
      transition: transform 0.2s ease-in-out;
    }
  
    .navbar-container .hamburger-lines .line3 {
      transform-origin: 0% 100%;
      transition: transform 0.3s ease-in-out;
    }
  
    .navbar .menu-items {
      padding-top: 100px;
      background: #fff;
      height: 100vh;
      max-width: 300px;
      transform: translate(-150%);
      display: flex;
      flex-direction: column;
      margin-left: -40px;
      padding-left: 40px;
      transition: transform 0.5s ease-in-out;
      box-shadow: 5px 0px 10px 0px #aaa;
      overflow: scroll;
    }
  
    .navbar .menu-items li {
      margin-bottom: 1.8rem;
      font-size: 1.1rem;
      font-weight: 500;
    }
  
    .logo {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 2.5rem;
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
          <li><router-link to="/login">Login</router-link></li> 
          <li><router-link to="/admin">Admin</router-link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <h1 class="logo">Welcome</h1>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html {
    font-size: 62.5%;
  }
  
  .navbar input[type='checkbox'],
  .navbar .hamburger-lines {
    display: none;
  }
  
  .container {
    max-width: 1200px;
    width: 90%;
    margin: auto;
  }
  
  .navbar {
    box-shadow: 0px 5px 10px 0px #aaa;
    position: fixed;
    width: 100%;
    background: #fff;
    color: #000;
    opacity: 0.85;
    z-index: 100;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    height: 64px;
    align-items: center;
  }
  
  .menu-items {
    order: 2;
    display: flex;
  }
  
  .logo {
    order: 1;
    font-size: 2.3rem;
  }
  
  .menu-items li {
    list-style: none;
    margin-left: 1.5rem;
    font-size: 1.3rem;
  }
  
  .navbar a {
    color: #444;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
  }
  
  .navbar a:hover {
    color: #117964;
  }
  
  @media (max-width: 768px) {
    .navbar {
      opacity: 0.95;
    }
  
    .navbar-container input[type='checkbox'],
    .navbar-container .hamburger-lines {
      display: block;
    }
  
    .navbar-container {
      display: block;
      position: relative;
      height: 64px;
    }
  
    .navbar-container input[type='checkbox'] {
      position: absolute;
      display: block;
      height: 32px;
      width: 30px;
      top: 20px;
      left: 20px;
      z-index: 5;
      opacity: 0;
      cursor: pointer;
    }
  
    .navbar-container .hamburger-lines {
      display: block;
      height: 28px;
      width: 35px;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  
    .navbar-container .hamburger-lines .line {
      display: block;
      height: 4px;
      width: 100%;
      border-radius: 10px;
      background: #333;
    }
  
    .navbar-container .hamburger-lines .line1 {
      transform-origin: 0% 0%;
      transition: transform 0.3s ease-in-out;
    }
  
    .navbar-container .hamburger-lines .line2 {
      transition: transform 0.2s ease-in-out;
    }
  
    .navbar-container .hamburger-lines .line3 {
      transform-origin: 0% 100%;
      transition: transform 0.3s ease-in-out;
    }
  
    .navbar .menu-items {
      padding-top: 100px;
      background: #fff;
      height: 100vh;
      max-width: 300px;
      transform: translate(-150%);
      display: flex;
      flex-direction: column;
      margin-left: -40px;
      padding-left: 40px;
      transition: transform 0.5s ease-in-out;
      box-shadow: 5px 0px 10px 0px #aaa;
      overflow: scroll;
    }
  
    .navbar .menu-items li {
      margin-bottom: 1.8rem;
      font-size: 1.1rem;
      font-weight: 500;
    }
  
    .logo {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 2.5rem;
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
  </style>-->
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
          <li><router-link to="/admin">Login</router-link></li>
          <li><router-link to="/admin">Logout</router-link></li>
          <li><router-link to="/about">About</router-link></li>
     
        
        </ul>
        <h1 class="logo">Welcome to attendance app</h1>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
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
  
  