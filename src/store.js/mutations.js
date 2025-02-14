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
    setLeave(state,payload) {
      state.allLeave = payload;
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
    }
    };