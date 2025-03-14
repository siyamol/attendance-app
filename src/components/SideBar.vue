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
  