
export default {
     baseURL: process.env.VUE_APP_BASE_URL, //make this as the default server
      // baseURL:'http://192.168.1.25:5050',
    // baseURL:'http://192.168.1.150:5050',
    // baseURL:'http://192.168.1.45:5050',
    // baseURL:'http://192.168.1.110:5050',

    data: [],
    login: sessionStorage.getItem('login') || false,
    token:'',
    allUsers: [],
    allLate:[],
    batchLateRequests: {} ,
    allLeave:[],
    allStatus:[],
    allForgots:[],
    Qr: '',
    qrStatus:[],
    // studentList: [],
    allRemove:[],

  batchId: [],
  batchType: [],
  attendanceRecords: [],
  wfhRequests: [],
  attendanceRecordswrkhm: [],
  batches: [], 
  leave: [],
  resetPasswordStatus: null,
 };
  