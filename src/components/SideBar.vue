<!-- <template>
    <div> -->
      <!-- <h2>Sidebar</h2>
      <ul> -->
        <!-- <li><a href="#">Student Details</a></li> -->
        <!-- Use router-link for navigation -->
        <!-- <li><router-link to="/late-request">Late Request</router-link></li>
        <li><a href="#">Leave Request</a></li>-->
        
      <!-- </ul> -->
    <!-- </div>
  </template> -->
<!--   
  <script>
  export default {
    name: 'SideBar',
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
    
  display: flex;
  justify-content: space-between; /* Ensure items are spaced evenly */
  align-items: center; /* Center items vertically */
  height: 60px; /* Fixed height */
  background: #fff; /* Background color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for depth */

  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    height: 40px;
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

    .navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
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
  
   -->
   <template>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item link to="/student-details">
          <v-list-item-content>
            <v-list-item-title>Student Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-list-item link to="/leave-request">
          <v-list-item-content>
            <v-list-item-title>Leave Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-list-item link to="/late-request">
          <v-list-item-content>
            <v-list-item-title>Late Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    name: 'SideNavbar',
  };
  </script>
  
  <style scoped>
 
  </style>
  