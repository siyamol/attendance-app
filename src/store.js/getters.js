
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
    filteredAttendance: (state) => state.attendance,
    // getBatchList: (state) => state.batchList, // Get all batches
    // getAttendanceRecords: (state) => state.attendanceRecords,
    getBatchId: (state) => state.batchId,
    getBatchType: (state) => state.batchType,
    getAttendanceRecords: (state) => state.attendanceRecords,
    getAttendanceRecordswrk:(state) => state.attendanceRecordswrkhm,
    SET_BATCH_TYPES(state, payload) {
        state.batchTypes = payload; // Mutation to update batch types
    
    },
    getBatchList: (state) => state.batchList, // Getter to retrieve all batches
    getCustomBatches: (state) => state.batchList.filter((batch) => batch.type === "custom"), // Getter for custom batches
    getRegularBatches: (state) => state.batchList.filter((batch) => batch.type === "regular"), // Getter for regular batches
    getBatches: (state) => state.batches,
   




    getLeaveWfh: (state) => state.leaveWfh,
    getWfhRequests: (state) => state.wfhRequests,
};
  