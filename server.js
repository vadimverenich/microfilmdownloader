const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-links', async (req, res) => {
    const { number } = req.body;
    const apiUrl = `https://www.familysearch.org/das/v2/dgs:${number.padStart(9, '0')}/children`;

    try {
        const response = await axios.get(apiUrl);
        const jsonData = response.data;

        // Вывод полного ответа сервера в консоль
        console.log('Response Data:', jsonData);

        const links = generateLinks(jsonData);
        res.json({ links });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

function generateLinks(jsonData) {
    if (!jsonData || !jsonData.baseUrl || !jsonData.children) {
        console.error('Error: Invalid JSON structure.');
        return [];
    }

    const baseUrl = jsonData.baseUrl;
    const children = jsonData.children;
    const links = [];

    for (let i = 0; i < children.length; i++) {
        const apid = children[i].apid;
        const name = children[i].name;

        if (!apid || !name) {
            console.error(`Error: Missing apid or name attribute in children element at index ${i}.`);
            continue;
        }

        const linkUrl = `${baseUrl}${apid}/dist.jpg`;
        links.push({ name, linkUrl });
    }

    return links;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
