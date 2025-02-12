
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
    getQrStatus: (state) => state.qrStatus,
    getRemove: (state) => state.allRemove,
    getAnotherStatus: (state) => state.anotherStatus,
    getBatch: (state) => state.batch,
    getBatches: (state) => state.batches,
    getBatchToEdit: (state) => state.batchToEdit,
 };
  