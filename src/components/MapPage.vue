<template>
  <div>
    <h2></h2>

    <!-- Search Bar -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        placeholder="Search location"
        @input="fetchSuggestions"
        @keyup.enter="searchLocation"
      />
      <button @click="searchLocation">Search</button>

      <!-- Search Suggestions -->
      <ul v-if="suggestions.length" class="suggestions">
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.display_name }}
        </li>
      </ul>
    </div>

    <!-- Map Container -->
    <div id="map" ref="mapContainer"></div>

    <!-- Floating Locate Button -->
    <button class="locate-btn" @click="getUserLocation"> Locate Me📍</button>

    <!-- Confirmation Popup in the Center of Map -->
    <div v-if="showPopup" class="popup" :style="popupStyle">
      <p>Do you want to store this location?</p>
      <button @click="confirmLocation(true)">Yes</button>
      <button @click="confirmLocation(false)">No</button>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export default {
  data() {
    return {
      map: null,
      marker: null,
      searchQuery: "",
      suggestions: [],
      locationDetails: null,
      showPopup: false,
      tempLat: null,
      tempLng: null,
      tempName: "",
      storedLat: "",
      storedLng: "",
      storedName: "",
      popupStyle: {},
    };
  },
  mounted() {
    this.initMap();
    this.getUserLocation();
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([9.4981, 76.3388], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      this.map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        this.tempLat = lat;
        this.tempLng = lng;
        this.showPopupAtCenter();
        await this.reverseGeocode(lat, lng);
      });

      window.addEventListener("resize", this.showPopupAtCenter);
    },

    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.map.setView([lat, lng], 13);
            this.placeMarker(lat, lng);
            await this.reverseGeocode(lat, lng);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Enable location services to use this feature.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    },

    placeMarker(lat, lng) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40],
        }),
      }).addTo(this.map);

      this.map.setView([lat, lng], 13);
    },

    async reverseGeocode(lat, lng) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        if (response.data) {
          this.tempName = response.data.display_name;
          this.locationDetails = {
            name: this.tempName,
            lat,
            lng,
          };

          if (this.marker) {
            this.marker
              .bindPopup(`📍 ${this.tempName} <br> 🗺️ Lat: ${lat}, Lng: ${lng}`)
              .openPopup();
          }
        }
      } catch (error) {
        console.error("Error fetching location name:", error);
      }
    },

    async fetchSuggestions() {
      if (this.searchQuery.length < 3) {
        this.suggestions = [];
        return;
      }

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${this.searchQuery}&format=json`
        );
        this.suggestions = response.data;
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    },

    async searchLocation() {
      if (this.suggestions.length > 0) {
        this.selectSuggestion(this.suggestions[0]);
      }
    },

    async selectSuggestion(suggestion) {
      this.searchQuery = suggestion.display_name;
      this.tempLat = suggestion.lat;
      this.tempLng = suggestion.lon;
      this.tempName = suggestion.display_name;
      this.suggestions = [];

      this.map.setView([this.tempLat, this.tempLng], 13);
      this.placeMarker(this.tempLat, this.tempLng);
      this.showPopupAtCenter();
    },

    confirmLocation(store) {
      if (store) {
        this.storedLat = this.tempLat;
        this.storedLng = this.tempLng;
        this.storedName = this.tempName;

        // Navigate to the batch page
        this.$router.push({
          path: "/batch",
          query: {
            name: this.storedName,
            lat: this.storedLat,
            lng: this.storedLng,
          },
        });
      }
      this.showPopup = false;
    },

    showPopupAtCenter() {
      this.showPopup = true;
      const mapContainer = this.$refs.mapContainer;
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        this.popupStyle = {
          top: `${rect.top + rect.height / 2 - 50}px`,
          left: `${rect.left + rect.width / 2 - 75}px`,
        };
      }
    },
  },
};
</script>

<style>
#map {
  height: 536px;
  width: 100%;
  margin-top: 80px;
  border-radius: 10px;
  position: relative;
}

.search-container {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  margin-top: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.search-container input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.search-container button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.suggestions li:hover {
  background: #f0f0f0;
}


.locate-btn {
  position: absolute;
  top: 10px;
  margin-top: 100px;
  right: 10px;
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.popup {
  position: fixed;
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
}

.popup p {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;  /* Proper spacing between buttons */
  gap: 20px; /* Adjust the gap between buttons */
  margin-top: 15px;
}

.popup button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  color: rgb(26, 5, 5);
  text-transform: uppercase;
  min-width: 100px; /* Ensures button size consistency */
}

.yes-btn {
  background: linear-gradient(45deg, #28a745, #218838);
  box-shadow: 0px 3px 6px rgba(0, 128, 0, 0.2);
}

.yes-btn:hover {
  background: linear-gradient(45deg, #218838, #1e7e34);
}

.no-btn {
  background: linear-gradient(45deg, #dc3545, #c82333);
  box-shadow: 0px 3px 6px rgba(255, 0, 0, 0.2);
}

.no-btn:hover {
  background: linear-gradient(45deg, #c82333, #bd2130);
}


</style>
