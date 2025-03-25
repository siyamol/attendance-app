import { createStore } from 'vuex';

export default createStore({
  state: {
    latitude: null,
    longitude: null,
    flag: false  // Example flag, modify as needed
  },
  mutations: {
    setLatitude(state, lat) {
      state.latitude = lat;
    },
    setLongitude(state, lng) {
      state.longitude = lng;
    },
    setFlag(state, flag) {
      state.flag = flag;
    }
  },
  getters: {
    getFlag: state => state.flag,
    getLatitude: state => state.latitude,
    getLongitude: state => state.longitude
  },
  actions: {
    // Define any actions if needed
  }
});