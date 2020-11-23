const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();
app.use(cors({ origin: "*"}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started");
})

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `Classify${file.originalname}`)
    }
})

var upload = multer({ storage: storage})

app.get("/", (req, res) => {
    res.send(
        `<h1 style='text-align: center'>
            Upload your file to get classified
            </h1>`
    );
});

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file
    console.log(file.filename);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
        res.send(file)
})