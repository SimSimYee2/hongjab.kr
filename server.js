const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const SERP_API_KEY = "c090b8f837f5e81533876305ad4a5a846d527fb40e6aa8e74f15b81f31a2dc58
";

app.use(cors());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        q: query + " 여행 혼잡도",
        engine: "google",
        api_key: SERP_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from SerpAPI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
