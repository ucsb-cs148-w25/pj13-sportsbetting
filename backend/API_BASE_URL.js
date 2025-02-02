// Load environment variables from the .env file
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BACKEND_SERVER_PORT = process.env.PORT || 5000;
const BACKEND_SERVER_HOST = process.env.BACKEND_SERVER_HOST || 'http://localhost';

let API_BASE_URL;

if (process.env.NODE_ENV === 'production') {
    API_BASE_URL = process.env.BACKEND_SERVER_URL;
} else {
    API_BASE_URL = `${BACKEND_SERVER_HOST}:${BACKEND_SERVER_PORT}`;
}

export default API_BASE_URL;

