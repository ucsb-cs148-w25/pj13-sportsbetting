// CONNECT TO FIRESTORE using string link

// CONNECT TO FIRESTORE using string link
// npm install firebase-admin
// you must create firestore and add config/serviceAccountKey.json
// dont push to main, sensitive info
// config/db.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db;
export async function connectDB() {
    if (!db) {
        try {
            // Initialize Firestore
            admin.initializeApp({
                credential: admin.credential.cert('backend/config/serviceAccountKey.json'),
                // databaseURL: process.env.FIREBASE_DATABASE_URL, // Optional for Firestore
            });

            db = admin.firestore(); // Create a Firestore instance
            console.log("Connected to Firestore database");
        } catch (error) {
            console.error("Error connecting to Firestore:", error.message);
            process.exit(1); // Exit the process on failure
        }
    }
    return db; // Return the existing Firestore instance
}


