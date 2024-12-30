
// import axios from 'axios';

// export default {
//   async adminLogin({ commit,rootGetters},payload) {
//     try {
//       console.log("action payload",payload)

//       const response = await axios.post(`${rootGetters.getURL}/AdminReg/login` , payload);
//       if(response.status >= 200 && response.status < 300){
//         console.log("response",response)
//         commit('setToken', response.data.token);
//         return response.status;
//       }
     
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // return null; 
//       console.error('Detailed error:', error.response?.data);
//       return error.response?.data?.message || 'An error occurred';
//     }
//   },




  
// Example Vuex action








import axios from 'axios';

export default {
async adminLogin({ rootGetters,commit }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/login`, payload);
    if (response.status >= 200 && response.status < 300) {
      commit('setToken', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async adminRegister ({rootGetters }, payload) {
  try {
    console.log("action payload",payload)
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/reg`, payload);
    if(response.status >= 200 && response.status < 300){
      return true;
    }
    
  } catch (error) {
    console.error('Error posting data:', error);
    // throw Error(error.response? (error.response.data.message??error.response.data) :error.message);


    console.error('Detailed error:', error.response?.data); 
    throw new Error(error.response?.data?.message ?? error.message);
  }
},
async generateQr({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/generateQr`);
    if (response) {
      commit('setQr', response.data); 
      console.log(response.data)
      return true
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
},
async allUsers({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getAllUsers`);
    if (response.status >= 200 && response.status < 300) {
      commit('setUsers', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async allLates({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getLateRequestsForToday`);
    if (response.status >= 200 && response.status < 300) {
      commit('setLate', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async fetchLeaves({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getLeaveRequestsForToday`);
    if (response.status >= 200 && response.status < 300) {
      commit('setLeave', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async fetchToday({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today`);
    if (response.status >= 200 && response.status < 300) {
      commit('setStatus', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async approveLate({ rootGetters }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/approveLateRequest/${payload}`);
    if (response.status >= 200 && response.status < 300) {
      // commit('setToken', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async denyLate({ rootGetters }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectLateRequest/${payload}`);
    if (response.status >= 200 && response.status < 300) {
      // commit('setToken', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async approveLeave({ rootGetters }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/approveLeaveRequest/${payload}`);
    if (response.status >= 200 && response.status < 300) {
      // commit('setToken', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async denyLeave({ rootGetters }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectLeaveRequest/${payload}`);
    if (response.status >= 200 && response.status < 300) {
      // commit('setToken', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async forgotPassword({ rootGetters,commit }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/forgot-password`, payload);
    if (response.status >= 200 && response.status < 300) {
      commit('forgotPassword', response.data.token); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
};
