require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const EBIRD_BASE = "https://api.ebird.org/v2";
const EBIRD_API_KEY = process.env.EBIRD_API_KEY;



app.get("/birds/:type", async (req, res) => {
    const { type } = req.params;
        let { lat, lng } = req.query;
        lat = Number(lat);
        lng = Number(lng);
        

    const types = ["recent", "recent-notable"];
    if (!types.includes(type)) {
        return res.status(400).json({ error: "Invalid type" });
    }
    
        const endpoint=
        type === "recent"
            ? "data/obs/geo/recent"
            : "data/obs/geo/recent/notable";
    const url = `${EBIRD_BASE}/${endpoint}?lat=${lat}&lng=${lng}&back=7&maxResults=30`;


   
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