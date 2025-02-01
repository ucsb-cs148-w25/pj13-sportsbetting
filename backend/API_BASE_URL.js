// Load environment variables from the .env file
import dotenv from 'dotenv';
dotenv.config();

const BACKEND_SERVER_PORT = process.env.PORT || 5000;
const BACKEND_SERVER_HOST = process.env.BACKEND_SERVER_HOST || 'http://localhost';

let API_BASE_URL;

if (process.env.NODE_ENV === 'production') {
    API_BASE_URL = process.env.BACKEND_SERVER_URL;
} else {
    API_BASE_URL = `${BACKEND_SERVER_HOST}:${BACKEND_SERVER_PORT}`;
}

export default API_BASE_URL;

