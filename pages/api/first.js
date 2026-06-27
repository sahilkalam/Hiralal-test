import * as fs from "fs"

export default function first(req, res) {
  fs.readFile(`LinksData/${req.query.slug}.json`, "utf-8", (err, data) => {
    // 1. Pehle check karein ki koi error toh nahi aaya
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    // 2. Agar sab sahi hai, toh data send karein
    console.log("data send");
    res.status(200).json(JSON.parse(data));
  });
}