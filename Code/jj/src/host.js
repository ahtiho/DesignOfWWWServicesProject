const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

// Määritä bodyParser middlewaret
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS-määritykset
const corsOptions = {
    origin: 'https://avara.org'
};
app.use(cors(corsOptions));

// AWS-määritykset
AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();


// Tiedoston latauspalvelin ja S3-lataus yhdistettynä
app.post('/upload', upload.single('file'), (req, res) => {
    // Tarkista, onko tiedosto olemassa
    if (!req.file) {
        return res.status(400).send('Ei tiedostoa lähetetty.');
    }

    const params = {
        Bucket: 'avara',
        Key: Date.now() + '-' + req.file.originalname,
        Body: req.file.buffer
    };

    s3.putObject(params, (err, data) => {
        if (err) {
            res.status(500).send('Virhe ladattaessa tiedostoa S3:een: ' + err.message);
        } else {
            res.status(200).send('Tiedosto ladattu onnistuneesti!');
        }
    });
});

// Tiedoston lataaminen S3:sta
app.get('/download/:filename', (req, res) => {
    const params = {
        Bucket: 'avara',
        Key: req.params.filename
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            return res.status(500).send('Virhe ladattaessa tiedostoa S3:sta: ' + err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data.Body);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
