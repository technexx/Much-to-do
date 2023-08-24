import { createDomElements } from "./domElements.js"
import { setEventListeners } from "./eventListeners.js"
import { compareAsc, format } from 'date-fns'
import './style.css';
import { testPopulation } from "./databaseOps.js";

testPopulation()
createDomElements()
setEventListeners()