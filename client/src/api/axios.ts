import axios from "axios";

axios.defaults.baseURL = process.env.API_PATH || 'http://localhost:8000/'