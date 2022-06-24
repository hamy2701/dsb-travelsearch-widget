<script setup lang="ts">
import { ref, onMounted } from 'vue'
import json from './assets/stations.json';

const props = defineProps({
  toDestination: String
})

const openToStation = ref(false);
let openFromStation = ref(false);
const fromStation = ref("");
const toStation = ref(props.toDestination != null ? props.toDestination : "");
const displayErrorMessage = ref(false);
function closeDropdown() {
  if(this.openFromStation) {
    this.openFromStation = false;
  }
}

onMounted(() => {
  console.log('todestination', props.toDestination);
})



function selectFromStation() {
  this.openFromStation = true;
  this.openToStation = false;
}

function selectToStation() {
  this.openToStation = true;
  this.openFromStation = false;
}


function goToTravelSearch() {
  if (fromStation == null || toStation == null) {
    this.displayErrorMessage = true;
    return;
  }
  window.open(`https://www.dsb.dk/#fra=${this.fromStation},til=${this.toStation},voksen=1,ung=1,over65=1,barn=1,under12=1,reservation=5,orange=true`)
}

function onFromStationValueSelected(station) {
  this.fromStation = station;
  this.openFromStation = false;
}

function onToStationValueSelected(station) {
  this.toStation = station;
  this.openToStation = false;
}

const stationResults = json.map(x => x.name);
</script>

<template>
  <div class="dsb-container">
    <div class="dsb-center">
    <h3 class="dsb-headline">Rejs nemt og bæredygtigt med toget</h3>
    <p class="error-message" v-if="displayErrorMessage">Du mangler at udfylde nogen felter</p>
    <span class="dsb-input-dropdown">
    <input class="dsb-input" placeholder="Fra:" v-model="fromStation" v-on:click="selectFromStation()" />
      <span v-if="openFromStation" class="dsb-search-result">
        <ul class="dsb-station-list">
          <li class="dsb-station-item" v-for="data in stationResults" v-on:click="onFromStationValueSelected(data)">{{data}}</li>
        </ul>
      </span>
    </span>
    <span class="dsb-input-dropdown">
    <input class="dsb-input" placeholder="Til:" v-model="toStation"  v-on:click="selectToStation()" />
          <span v-if="openToStation" class="dsb-search-result">
        <ul class="dsb-station-list">
          <li class="dsb-station-item" v-for="data in stationResults" v-on:click="onToStationValueSelected(data)">{{data}}</li>
        </ul>
      </span>
    </span>
    <button class="dsb-button" v-on:click="goToTravelSearch()">Søg rejse</button>
    </div>

  </div>
</template>

<style scoped>
@font-face {
    font-family: via-office;
    src: url(./fonts/viaoffice-regular-webfont.ttf);
}

h1, h2, h3, li, p {
  font-family: via-office;
} 

.error-message {
  color: #b41730;
}

.dsb-headline {
    position: relative;
    font-family: via-office;
    max-width: 75%;
    justify-self: center;
    justify-content: center;
    padding: 5px;
}
  
.dsb-container {
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 300px;
    background-color: #E2E2E2;
    justify-content: center;
    display: flex;

}

.dsb-center {
    position: relative;
    max-width: 350px;
    max-height: 250px;
}

.dsb-search-result {
  position: absolute;
    width: 360px;
    max-height: 188px;
    background-color: #c9c1c1;
  overflow-y: scroll;

}

.dsb-station-list {
  height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
}

.dsb-station-list:nth-child(odd) {
  background-color: #E2E2E2;
}

.dsb-station-item:nth-child(even) {
  background-color: #8f8e8e;
}

::-webkit-scrollbar {
  background: transparent;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #3c3f58;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #00233c;
}

.dsb-station-item {
  list-style-type: none;
width: 100%;
    min-height: 40px;
    padding-top: 12px;
}

.dsb-station-item:hover {
  opacity: 0.5;
  cursor: pointer;
}

.dsb-input {
  margin-bottom: 5px;
  min-width: 100%;
  min-height: 38px;
  border-radius: 2px;
  border: 0;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  text-indent: 20px;
  background: url(./assets/logo-02.png) right no-repeat ;
  background-size: 22px;
  padding: 5px;
  background-position-x: 98%;
  background-color: white;

}

.dsb-input:focus {
  outline:none;
  border: 0;
}



.dsb-button {
  float: right;
    margin-top: 10px;
  font-family: via-office;
  transition: white 0.2s;

  flex: auto;

  display: inline-grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  gap: 1em;
  align-items: center;
  justify-content: center;

  background-color: #b41730;
  color: white;

  border: 0;
  border-radius: 5px;
  padding: 16px;
  min-width: 50px;

  white-space: nowrap;
  letter-spacing: 0.05em;

  cursor: pointer;
}

.dsb-button:hover {
  opacity: 0.5;
}


</style>
