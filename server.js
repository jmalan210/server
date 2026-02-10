require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());


const EBIRD_API_KEY = process.env.EBIRD_API_KEY;



app.get("//api/us-notable-birds/", async (req, res) => {

    try {
        const response = await fetch(
            "https://api.ebird.org/v2/data/obs/US/recent/notable",
            {
                headers: { "X-eBirdApiToken": EBIRD_API_KEY }
            });

        const birds = await response.json();
  
        if (!birds.length) return res.status(404).json({ error: "No birds found" });

        //sends a random bird back so that everyone gets the same bird for the day
        const today = new Date().toISOString().slice(0, 10);
        let seed = 0;
        for (let c of today) seed += c.charCodeAt(0);

        const index = seed % birds.length;
        const birdOfDay = birds[index];

        res.json(birdOfDay);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});

   

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));