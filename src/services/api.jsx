import axios from 'axios';

export default axios.create({
    baseURL: "https://mern-scheduler-backend-1.onrender.com/event",
    headers: {
        "Content-type": "application/json"
    }
});