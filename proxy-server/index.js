const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3003;

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/naverapi', async (req, res) => {
    try {
        const response = await axios.post(
            process.env.SENTIMENT_URL,
            { content: req.body.content },
            {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_ID,
                    'X-NCP-APIGW-API-KEY': process.env.CLOVA_PW,
                    'Content-Type': 'application/json',
                },
            }
        );

        const d = response.data.sentences[0].sentiment;
        res.send(d);
    } catch (error) {
        console.error(error);
        res.send('neutral');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
