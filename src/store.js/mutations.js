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
    }
  };