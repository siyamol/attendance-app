export default {
    setToken(state, payload) {
      state.token = payload;
    },
    setLogin(state, payload) {
      state.login = payload;
      sessionStorage.setItem('login', payload);
    },
    setUsers(state,payload) {
      state.allUsers = payload;
    },
    setLate(state,payload) {
      state.allLate = payload;
    },
    // setBatchLateRequests(state, { batchId, requests }) {
    //   state.batchLateRequests = { ...state.batchLateRequests, [batchId]: requests };
    // },
    setBatchLateRequests(state, payload) {
      state.batchLateRequests = payload;
    },
    setLeave(state,payload) {
      state.allLeave = payload;
    },
    setUserLeaveRequests(state, payload) {
      state.userLeaveRequests = payload;
    },
    setStatus(state,payload) {
      state.allStatus = payload;
    },
    setQr(state,payload) {
      state.Qr = payload;
    },
    forgotPassword(state,payload) {
     state.allForgots = payload;
    },
    setQrStatus(state,payload) {
      state.qrStatus = payload;
    },
    // setRemove(state,payload) {
    //   state.allRemove = payload;
    // },
    setRemove(state, userId) {
    state.allRemove.push(userId); 
    },
    setAnotherStatus(state, payload) {
      state.anotherStatus = payload;
    },
    setBatch(state, payload) {
      state.batch = payload;
    },
    // setBatches(state, payload) {
    //   state.batches = payload;
    // },
    // setBatchToEdit(state, payload) {
    //   state.batchToEdit = payload;
    // },
    fetchBatch(state, payload){
    state.batch = payload;
    },
    setGetall(state, payload) {
      state.getall = payload;
     },
    // setBatchid(state, payload){
    //   state.batchId = payload;
    // },
    setBatchleaverequests(state, payload) {
      state.batchLeaveRequests = payload;
    },
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    set_ATTENDANCE(state, attendance) {
      state.attendance = attendance;
    },
    SET_BATCH_LIST(state, batchList) {
      state.batchList = batchList;
    },
    // SET_ATTENDANCE_RECORDS(state, attendanceRecords) {
    //   state.attendanceRecords = attendanceRecords;
    // },
    // setBatchId(state, payload) {
    //   state.batchId = payload;
    // },
    // Ensure you have this mutation
setBatchId(state, payload) {
  state.batchId = payload;
},
    setBatchType(state, payload) {
      state.batchType = payload;
    },
    setAttendanceRecords(state, payload) {
      state.attendanceRecords = payload;
    },
    setAttendanceRecordswrk(state, payload) {
      state.attendanceRecordswrkhm = payload;
    },
    SET_BATCHES(state, batches) {
      state.batches = batches; 
    },
   

    
    setLeaveWfh(state, payload) {
      state.leaveWfh = payload;
    },
    // setWfhRequests(state, payload) {
    //   state.wfhRequests = payload;
    // },
    setWfhRequests(state, payload) {
      state.wfhRequests = Array.isArray(payload) ? payload : []; // Ensure payload is an array
    },
    // setResetPasswordStatus(state, status) {
    //   state.resetPasswordStatus = status;
    // },
   

setResetPasswordStatus(state, status) {
  state.resetPasswordStatus = status;
},
    };