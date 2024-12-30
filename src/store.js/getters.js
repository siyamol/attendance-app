
export default {
    getURL: (state) =>state.baseURL,
    getData: (state) => state.data,
    getToken: (state) => state.getToken,
    getUsers: (state) => state.allUsers,
    getLate: (state) => state.allLate,
    getLeave: (state) => state.allLeave,
    getStatus: (state) => state.allStatus,
    getQr:(state) => state.Qr,
    getForgotpass: (state) => state.allForgots,
  };
  