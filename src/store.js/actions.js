import axios from 'axios';
export default {
async adminLogin({ rootGetters,commit }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/login`, payload);
    if (response.status >= 200 && response.status < 300) {
      commit('setToken', response.data.token);
      commit('setLogin', true); 
      return true;
    }
    return false ;
  } catch (error) {
    throw Error(error?.response?.data||'login failed');
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
async fetchStatus({rootGetters,commit}) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getQrStatus`)
    if(response.status >= 200 || response.status<300) {
      commit('setQrStatus',response.data);
    }
  } catch (error) {
    console.error(error);
  }
},

async fetchBatchLateRequests({ commit, rootGetters }, batchId) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/late-requests?batchId=${batchId}`);
  
    commit('setBatchLateRequests', { batchId, requests: response.data });
  } catch (error) {
    console.error("Error fetching batch late requests:", error);
  }
},
// async approveLate({ rootGetters }, payload) {
//   try {
//     const response = await axios.post(`${rootGetters.getURL}/AdminReg/approveLateRequest/${payload}`);
//     if (response.status >= 200 && response.status < 300) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//   }
// },
// async denyLate({ rootGetters }, payload) {
//   try {
//     const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectLateRequest/${payload}`);
//     if (response.status >= 200 && response.status < 300) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//   }
// },
// async fetchUserLeaveRequests({ rootGetters, commit }, userId) {
//   try {
//     const response = await axios.get(`${rootGetters.getURL}/UserReg/leave-requests?userId=${userId}`);
//     if (response.status >= 200 && response.status < 300) {
//       const data = Array.isArray(response.data) ? response.data : [];
//         commit('setUserLeaveRequests', data); 
//         return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//     commit('setUserLeaveRequests', []); // Fallback to an empty array on error
//       return false;
//   }
// },
// async approveLeave({ rootGetters }, payload) {
//   try {
//     const response = await axios.post(`${rootGetters.getURL}/AdminReg/approveLeaveRequest/${payload}`);
//     if (response.status >= 200 && response.status < 300) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//   }
// },
async denyLeave({ rootGetters }, payload) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectLeaveRequest/${payload}`);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
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
async approveLates({ rootGetters }, payload) {
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
async denyLates({ rootGetters }, payload) {
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
async approveLeaves({ rootGetters }, payload) {
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

async fetchFilter({ rootGetters, commit }, payload) {
  try {
    // Convert frontend date format (MM/DD/YYYY) to backend format (YYYY-MM-DD)
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);

    // Format the date as YYYY-MM-DD (backend format)
    const formattedStartDate = startDate.toISOString().split('T')[0]; 
    const formattedEndDate = endDate.toISOString().split('T')[0]; 

    // Assuming 'userId' is also passed in the payload
    const userId = payload.userId || 2; // Default to userId=2 if not provided

    // Make the API request with the formatted dates and userId
    const response = await axios.get(
      `${rootGetters.getURL}/AdminReg/attendance/userDate-range?userId=${userId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    );

    if (response.status >= 200 && response.status < 300) {
      commit('setStatus', response.data); 
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error in fetchFilter:", error);
  }
},

async removeUser({  rootGetters,commit }, userId) {
  try {
     const response = await axios.delete(`${rootGetters.getURL}/AdminReg/deleteUser/${userId}`);
  
     if (response.status === 200) {
      commit('removeUserFromState', userId);
      return true; 
    }
  } catch (error) {
    console.error('Error removing user:', error);
    return false; 
  }
},

async fetchbatch({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getAllBatches`);
    if (response.status >= 200 && response.status < 300) {
      commit('setBatch', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async dltBatch({  rootGetters }, payload) {
  try {
     const response = await axios.delete(`${rootGetters.getURL}/AdminReg/deleteBatch?id=${payload}`);
  
     if (response.status >= 200 && response.status < 300) {

      return true; 
    }
  } catch (error) {
    console.error('Error removing user:', error);
    return false; 
  }
},

async getallbatchType({ rootGetters,commit }, payload) {
  try {
     const response = await axios.get(`${rootGetters.getURL}/AdminReg/getAllBatchType`,payload);
  
     if (response.status >= 200 && response.status < 300) {
      commit('setGetall',response.data);
      return true; 
    }
  } catch (error) {
    console.error('Error removing user:', error);
    return false; 
  }
},

async getallbatchId({ rootGetters,commit }, payload) {
  try {
     const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today?batchId=${payload}`);
    if (response.status >= 200 && response.status < 300) {
      commit('state.batchId',response.data);
      return true; 
    }
  } catch (error) {
    console.error('Error removing user:', error);
    return false; 
  }
},

async fetchStudents({ commit }) {
  const response = await axios.get('/AdminReg/students');
  commit('SET_STUDENTS', response.data);
},
async fetchBatchTypes({ commit }) {
  try {
    const response = await axios.get("/AdminReg/getAllBatchType");
    commit("SET_BATCH_TYPES", response.data);
  } catch (error) {
    console.error("Error fetching batch types:", error);
  }
},
async addBatch({  rootGetters }, payload) {
  try {
    const response = await axios.post(
      `${rootGetters.getURL}/AdminReg/addBatch?batchTypeId=${payload.id}`,
      payload.data
    );

    if (response.status >= 200 && response.status < 300) {
      // commit('ADD_BATCH', response.data); 
      return true; // Indicate success
    }
  } catch (error) {
    console.error('Error adding batch:', error);
    // throw error; // Rethrow the error to handle it in the component
  }
},

async updateBatch({ rootGetters, dispatch },payload ) {
  try {
    // const response = await axios.put(`${rootGetters.getURL}/AdminReg/updateBatchType=${payload}`);
    // const response = await axios.put(`${rootGetters.getURL}/AdminReg/updateBatchType=${payload}`);
    const response = await axios.put(`${rootGetters.getURL}/AdminReg/updateBatch?id=${payload.id}&batchTypeId=${payload.batchTypeId}`,payload.data);

   if (response.status >= 200 && response.status < 300) {
      await dispatch("fetchBatch");
      return true; 
    }
    
  } catch (error) {
    console.error("Error updating batch:", error);
 }
 return false;
},
async fetchAttendanceRecords({ commit, rootGetters }, batchId) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today?batchId=${batchId}`);
    if (response.status >= 200 && response.status < 300) {
      commit('setAttendanceRecords', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return false;
  }
},
async fetchAllBatches({ commit, rootGetters }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getAllBatches`);
    if (response.status >= 200 && response.status < 300) {
      commit('setBatchId', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error fetching batches:', error);
    return false;
  }
},
async fetchAtn({rootGetters, commit},payload){
  try{
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today?batchId=${payload}`);
    if (response.status >= 200 && response.status < 300) {
      commit('setAttendanceRecords', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error fetching batches:', error);
    return false;
  }
  
},

async fetchAttendanceRecordswrk({ commit, rootGetters }, batchId) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today?batchId=${batchId}`);
    if (response.status >= 200 && response.status < 300) {
      commit('setAttendanceRecordswrk', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return false;
  }
},
async fetchAtnwrk({rootGetters, commit},payload){
  try{
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/attendance/today?batchId=${payload}`);
  
    if (response.status >= 200 && response.status < 300) {
      commit('setAttendanceRecordswrk', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error fetching batches:', error);
    return false;
  }
  
},
async fetchLeaveshome({ rootGetters,commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/LeaveWfh`);
    if (response.status >= 200 && response.status < 300) {
      commit('setLeavehome', response.data); 
      return true;
    }
    return false ;
  } catch (error) {
    console.error(error);
  }
},
async fetchLeaveWfh({ commit, rootGetters }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/LeaveWfh`);
    if (response.status >= 200 && response.status < 300) {
      commit('setLeaveWfh', response.data);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
},


async approveWorkFromHomeRequest({ rootGetters }, requestId) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/approveWorkFromHomeRequest/${requestId}`);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
},

async rejectWorkFromHomeRequest({ rootGetters }, requestId) {
  try {
    const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectWorkFromHomeRequest/${requestId}`);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
},
async fetchWfhRequestsByStatusAndBatch({ commit, rootGetters }, { status, batchId }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/getWfhRequestsByStatusAndBatch?status=${status}&batchId=${batchId}`);
    if (response.status >= 200 && response.status < 300) {
      commit('setWfhRequests', response.data);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
},

};





