
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











async fetchLateRequest({ rootGetters, commit }) {
  try {
    const response = await axios.get(`${rootGetters.getURL}/AdminReg/late-requests`);
    commit('setLate', response.data);
  } catch (error) {
    console.error(error);
  }
},
// async fetchBatchLateRequests({ commit, rootGetters }, batchId) {
//   try {
//     const response = await axios.get(`${rootGetters.getURL}/UserReg/late-requests?batchId=${batchId}`);
//     commit('setBatchLateRequests', { batchId, requests: response.data });
//   } catch (error) {
//     console.error(error);
//   }
// },
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
// async denyLeaves({ rootGetters }, payload) {
//   try {
//     const response = await axios.post(`${rootGetters.getURL}/AdminReg/rejectLeaveRequest/${payload}`);
//     if (response.status >= 200 && response.status < 300) {
 
//       return true;
//     }
//     return false ;
//   } catch (error) {
//     console.error(error);
//   }
// },






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
// async fetchFilter({ rootGetters,commit },payload) {
//   try {
//     const response = await axios.get(`${rootGetters.getURL}/AdminReg/date-range?startDate=${payload.startDate}&endDate=${payload.endDate}`);
//     if (response.status >= 200 && response.status < 300) {
//       commit('setStatus', response.data); 
//       return true;
//     }
//     return false ;
//   } catch (error) {
//     console.error(error);
//   }
// // },
// Backend dd mmm yyyyy
// async fetchFilter({ rootGetters, commit }, payload) {
//   try {
//     const formatDate = (dateString) => {
//       if (!dateString) return ''; 
//       const [month, day, year] = dateString.split('/');
//       return `${day}/${month}/${year}`; 
//     };

//     const startDateFormatted = formatDate(payload.startDate);
//     const endDateFormatted = formatDate(payload.endDate);

//     const response = await axios.get(
//       `${rootGetters.getURL}/AdminReg/date-range?startDate=${startDateFormatted}&endDate=${endDateFormatted}`
//     );

//     if (response.status >= 200 && response.status < 300) {
//       commit('setStatus', response.data);
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error in fetchFilter:", error);
//     return false; 
//   }
// }
//  backend yyyy mm dd
// async fetchFilter({ rootGetters, commit }, payload) {
//   try {
  
//     const startDate = new Date(payload.startDate);
//     const endDate = new Date(payload.endDate);

  
//     const formattedStartDate = startDate.toISOString().split('T')[0]; 
//     const formattedEndDate = endDate.toISOString().split('T')[0]; 

    
//     const response = await axios.get(
//       `${rootGetters.getURL}/AdminReg/date-range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//     );
    
//     if (response.status >= 200 && response.status < 300) {
//       commit('setStatus', response.data); 
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//   }
// }
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



// async deleteUser({ commit }, userId) {
//   try {
//     const response = await axios.delete(`/AdminReg/deleteUser/7`, {
//       params: { id: userId }  
//     });

//     if (response.status >= 200 && response.status < 300) {
//       commit('removeUser', userId);
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error deleting user:", error.response ? error.response.data : error.message);
//     return false;
//   }
// },

// async fetchStudents({ commit }) {
//   try {
//     const response = await axios.get('/AdminReg/getAllStudents');  
//     commit('setStudents', response.data);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//   }
// },

// async deleteStudent({ commit }, studentId) {
//   try {
   
//     const response = await axios.delete(`/AdminReg/deleteUser/${studentId}`);
    
//     if (response.status >= 200 && response.status < 300) {
     
//       commit('removeStudent', studentId);
//       return true;  
//     }
    
//     return false;  
//   } catch (error) {
//     console.error('Error deleting student:', error);
//     return false;
//   }
// }const actions = {
  // async fetchUsers({ commit, rootGetters }) {
  //   try {
  //     const response = await axios.get(`${rootGetters.getURL}/AdminReg/getUsers`);
  //     console.log("Fetched students:", response.data);
  //     commit('setUsers', response.data); 
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // },

  // async deleteUser({ commit, rootGetters }, userId) {
  //   try {
  //     const response = await axios.delete(`${rootGetters.getURL}/AdminReg/deleteUser?id=${userId}`);
  //     if (response.status >= 200 && response.status < 300) {
  //       commit('removeStudent', userId); 
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //     return false;
  //   }
  // }async fetchFilter({ rootGetters,commit },payload) {
//   try {
//     const response = await axios.get(`${rootGetters.getURL}/AdminReg/date-range?startDate=${payload.startDate}&endDate=${payload.endDate}`);
//     if (response.status >= 200 && response.status < 300) {
//       commit('setStatus', response.data); 
//       return true;
//     }
//     return false ;
//   } catch (error) {
//     console.error(error);
//   }
// // },

// async removeUser({ rootGetters, commit }, userId) {
//   try {
//     const response = await axios.delete(`${rootGetters.getURL}/AdminReg/deleteUser/${userId}`);
    
//     if (response.status >= 200 && response.status < 300) {
//       commit('setRemove', userId); 
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return false;
//   }
// }
// async removeUser({ rootGetters, commit }, userId) {
//   try {
//     const response = await axios.delete(`${rootGetters.getURL}/AdminReg/deleteUser/${userId}`);
    
//     if (response.status >= 200 && response.status < 300) {
//       commit('setRemove', userId); 
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return false;
//   }
// }

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

// async updateBatch({ rootGetters, dispatch },payload ) {
//   try {
//     // const response = await axios.put(`${rootGetters.getURL}/AdminReg/updateBatchType=${payload}`);
//     // const response = await axios.put(`${rootGetters.getURL}/AdminReg/updateBatchType=${payload}`);
//     const response = await axios.post(`${rootGetters.getURL}/AdminReg/updateBatch?batchTypeId=${payload.id}`,payload.data);

//    if (response.status >= 200 && response.status < 300) {
//       await dispatch("fetchBatch");
//       return true; 
//     }
    
//   } catch (error) {
//     console.error("Error updating batch:", error);
//  }
//  return false;
// },
// async updateBatch({ rootGetters, dispatch }, payload) {
//   try {
//     const response = await axios.put(
//       `${rootGetters.getURL}/AdminReg/updateBatch?id=${payload.id}&batchTypeId=${payload.batchTypeId}`,
//       payload.data
//     );

//     if (response.status >= 200 && response.status < 300) {
//       await dispatch("fetchbatch"); // Fetch updated batches
//       return true;
//     }
//   } catch (error) {
//     console.error("Error updating batch:", error);
//   }
//   return false;
// },

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
// async fetchStudents({ commit }) {
//   const response = await axios.get('/AdminReg/students');
//   commit('SET_STUDENTS', response.data);
// },
// async fetchAttendance({ commit }, { userId, startDate, endDate }) {
//   const response = await axios.get(`/AdminReg/attendance/userDate-range?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
//   commit('SET_ATTENDANCE', response.data);
// }
async fetchStudents({ commit }) {
  const response = await axios.get('/AdminReg/students');
  commit('SET_STUDENTS', response.data);
},
 // Fetch all batches from the backend





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

// async fetchAllBatches({ commit }) {
//   try {
//     const response = await axios.get('/AdminReg/getAllBatches'); // Fetch batches from API
//     commit('SET_BATCHES', response.data); // Save batches to state
//   } catch (error) {
//     console.error('Error fetching batches:', error);
//   }
// },
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





