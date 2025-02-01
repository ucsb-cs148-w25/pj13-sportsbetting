import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' }); // Explicitly load from backend directory

const checkToken = (req) => {
    try {
        console.log(req.headers);
        const token = req.headers['authorization'];
        if (!token) {
            throw new Error('Authorization header is missing (Need to provide key-value pair of Authorization: <token>)');
        }
        const serverToken = process.env.BACKEND_SERVER_TOKEN;
        if (token !== serverToken) {
            throw new Error('Invalid token: ' + token);
        }
        return true;
    } catch (error) {
        throw new Error(`Token validation error: ${error.message}`);
    }
};

export { checkToken };