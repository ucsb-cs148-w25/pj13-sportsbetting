// CONNECT TO FIRESTORE using string link

// CONNECT TO FIRESTORE using string link
// npm install firebase-admin
// you must create firestore and add config/serviceAccountKey.json
// dont push to main, sensitive info
// config/db.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
    try {
        // Initialize Firestore
        admin.initializeApp({
            credential: admin.credential.cert('./backend/config/serviceAccountKey.json'),
            // databaseURL: process.env.FIREBASE_DATABASE_URL, // Optional for Firestore
        });

        const db = admin.firestore(); // Create a Firestore instance
        console.log("Connected to Firestore database");
        return db; // Return the Firestore instance for further use
    } catch (error) {
        console.log("Error connecting to Firestore:", error.message);
        process.exit(1); // Exit the process on failure
    }
}


