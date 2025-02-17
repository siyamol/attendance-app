
export default {
    getURL: (state) =>state.baseURL,
    getData: (state) => state.data,
    getToken: (state) => state.getToken,
    getUsers: (state) => state.allUsers,
    getLate: (state) => state.allLate,
    getBatchLateRequests: (state) => (batchId) => state.batchLateRequests[batchId] || [],
    getLeave: (state) => state.allLeave,
    getStatus: (state) => state.allStatus,
    getQr:(state) => state.Qr,
    getForgotpass: (state) => state.allForgots,
    getQrStatus: (state) => state.qrStatus,
    getRemove: (state) => state.allRemove,
    getAnotherStatus: (state) => state.anotherStatus,
    //  getBatch: (state) => state.batch,
    // getBatchType: (state) => state.batchType,
    // getBatchToEdit: (state) => state.batchToEdit,
    getBatch: (state) => state.batch,
    getType:(state) => state.getall,
    getBatchid:(state) => state.batchId,
    getUserLeaveRequests: (state) => state.userLeaveRequests,
 };
  