// GET POST PUT DELETE
import { connectDB } from "../config/db.js"
const db = connectDB();
export async function getList(req, res) {
    console.log("get Function")
    try {
        const listRef = db.collection("lists");
        console.log(listRef)
        const snapshot = await listRef.get();

        if (snapshot.empty) {
            return res.status(200).json({ success: true, data: [] });
        }

        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, data: list });
    } catch (error) {
        console.log("Error getting list: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const postList = async (req, res) => { // /api/(document id) -> json  into db
    try {
        const fields = req.body; // Exclude `id` field from the request body (if present)
        const documentId = req.params.id; // Extract the document ID from the URL

        if (!documentId) {
            return res.status(400).json({ success: false, message: "Document ID is required in the URL" });
        }

        if (!Object.keys(fields).length) {
            return res.status(400).json({ success: false, message: "Request body must include fields to add" });
        }

        const docRef = db.collection('lists').doc(documentId);

        await docRef.set(fields, { merge: true });


        res.status(201).json({ success: true, id: docRef.id, data: fields });
    } catch (error) {
        console.log("Error creating list: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const putList = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const docRef = db.collection("lists").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        await docRef.update(updatedData);

        res.status(200).json({ success: true, message: "Document updated successfully" });
    } catch (error) {
        console.log("Error updating list: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const docRef = db.collection("lists").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        await docRef.delete();

        res.status(200).json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        console.log("Error deleting list: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
