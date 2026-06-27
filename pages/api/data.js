import * as fs from "fs"

export default function data(req, res) {
    
    const searchQuery = req.query.q

    
    fs.readFile(`LinksData/first-link.json`, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "File padhne me dikkat aayi" })
        }

        try {
            const jsonData = JSON.parse(data) 
            if (!searchQuery) {
                return res.status(200).json(jsonData)
            }

           
            const filteredResults = jsonData.filter(item => {
                return item.slug && item.slug.toLowerCase().includes(searchQuery.toLowerCase())
            })

            
            res.status(200).json(filteredResults)

        } catch (parseError) {
            res.status(500).json({ error: "JSON format sahi nahi hai" })
        }
    })
}