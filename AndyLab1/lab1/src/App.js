import React from "react";

function App() {
    return (
        <div style={styles.container}>
            {/* Top navigation buttons */}
            <div style={styles.navbar}>
                <button style={styles.button}>Home</button>
                <button style={styles.button}>About</button>
                <button style={styles.button}>Bet Now</button>
                <button style={styles.button}>Contact</button>
            </div>

            {/* Welcome Message */}
            <h1 style={styles.header}>Hello, welcome to SportsBetting! 🎉</h1>

            {/* Your Name in the Middle */}
            <h2 style={styles.name}>Andy Jin</h2>
        </div>
    );
}

// Inline Styles
const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    navbar: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: "5px",
    },
    header: {
        fontSize: "28px",
        marginBottom: "20px",
    },
    name: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "40px",
    },
};

export default App;
