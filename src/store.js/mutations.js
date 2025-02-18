export default {
    setToken(state, payload) {
      state.token = payload;
    },
    setUsers(state,payload) {
      state.allUsers = payload;
    },
    setLate(state,payload) {
      state.allLate = payload;
    },
    setBatchLateRequests(state, { batchId, requests }) {
      state.batchLateRequests = { ...state.batchLateRequests, [batchId]: requests };
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
    setBatchid(state, payload){
      state.batchId = payload;
    },
<<<<<<< HEAD
    setBatchleaverequests(state, payload) {
      state.batchLeaveRequests = payload;
    },
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_ATTENDANCE(state, attendance) {
      state.attendance = attendance;
    }
=======
   
>>>>>>> bfd0587e5a6d74a756162c2fe4f35c16314a81f7
    };