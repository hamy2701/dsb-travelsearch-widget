import { defineCustomElement } from 'vue';
import TravelSearch from './travel-search.ce.vue'


const element = defineCustomElement(TravelSearch);

customElements.define("travel-search", element);