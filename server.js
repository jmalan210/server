require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const EBIRD_BASE = "https://api.ebird.org/v2";
const EBIRD_API_KEY = process.env.EBIRD_API_KEY;



    app.get("/birds", async (req, res) => {
        let { lat, lng } = req.query;
        lat = Number(lat);
        lng = Number(lng);
        const url = `${EBIRD_BASE}/data/obs/geo/recent?lat=${lat}&lng=${lng}`;

        let endpoint;
        switch (type) {
            case "recent":
                endpoint = "data/obs/geo/recent";
                break;
            case "recent-notable":
                endpoint = "data/obs/geo/recent/notable";
        }

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