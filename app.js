const express = require("express");
const axios = require("axios");
const fs = require("fs");
const data2 = require("./data")
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    try {
        // too many requests...
        // const response = await axios.get("https://api.publicapis.org/entries");
        // const data = response.data.entries;
        const jsonkeys = Object.keys(data2[0]);
        const headerData = jsonkeys.join(",");

        const rowData = data2.map((item) => {
            item.API = item.API.replaceAll(",", "")
            item.Description = item.Description.replaceAll(",", "");
            return jsonkeys.map((key) => item[key]).join(",");
        });

        const json2csv = `${headerData}\n${rowData.join("\n")}`;

        // similar method to fe but able to use fs module to handle this.
        fs.writeFileSync("output.csv", json2csv)

        fs.closeSync(2)
        res.send("File saved successfully!");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
