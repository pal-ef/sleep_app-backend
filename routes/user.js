const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all users
router.get("/", async (req, res) => {
    const [result] = await pool.query("SELECT * FROM users");
    res.json(result);
});

// Create new user
router.post("/", async (req, res) => {
    const { username, name, phone, email, password } = req.body;
    const [result] = await pool.query(
        `INSERT INTO users (username, name, phone, email, password) VALUES(?,?,?,?,?)`,
        [username, name, phone, email, password]
    );
    
    if(result) {
        res.json({message: "Account was created successfully"})
    } else {
        res.json({message: "An error has ocurred"})
    }
});

// Get user data
router.get("/:id", async (req, res) => {
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [
        req.params.id,
    ]);
    res.json(result[0]);
});

// Update user
router.put("/:id", async (req, res) => {
    // Verify if such user exists
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
        req.params.id,
    ]);

    // If there's such user update the data
    if (user[0]) {
        const { username, name, phone } = req.body;

        const [result] = await pool.query(
            "UPDATE users SET username = ?, name = ?, phone = ? WHERE ID = ?",
            [username, name, phone, req.params.id]
        );

        if(result) {
            res.json(result);
        } else {
            res.status(500).json({message: "An error has ocurred"});
        }

    } else {
        res.status(303).send("User was not found");
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    // Verify if such user exists
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
        req.params.id,
    ]);

    // If there's such user delete it
    if (user[0]) {
        const [result] = await pool.query("DELETE FROM users WHERE ID = ?", [
            req.params.id,
        ]);
        res.json(result[0]);
    } else {
        res.status(303).send("User does not exists");
    }
});

// Verify credentials (insecure)
router.post("/credentials", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const [result] = await pool.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    if(result[0]) {
        res.json(result[0]);
    } else {
        res.json({message:"user not found"});
    }
});

module.exports = router;
