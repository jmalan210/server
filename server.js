require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express;

app.use(cors());

const EBIRD_API_KEY = process.env.EBIRD_API_KEY;

app.get("/birds", async (req, res) => {
        try {const response = await fetch("https://api.ebird.org/v2/data/obs/US-CA/recent", {
        headers: { "X-eBirdAPIToken": EBIRD_API_KEY }
    });

    const birds = await response.json();
    res.json(birds);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from eBird" });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));