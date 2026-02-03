require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const EBIRD_BASE = "https://api.ebird.org/v2";
const EBIRD_API_KEY = process.env.EBIRD_API_KEY;

app.get("/", (req, res) => {
    console.log("HIT /");
    res.send("Server is alive");
})

app.get("/birds/recent", async (req, res) => {

    
    console.log("HIT/birds/recent");
    console.log(req.query);
    const { lat, lng } = req.query;
    const url = `${EBIRD_BASE}/data/obs/geo/recent?lat=${lat}&lng=${lng}`;

    try {const response = await fetch(url, {
    headers: { "X-eBirdApiToken": EBIRD_API_KEY }
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