"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
app.use(express_1.default.json());
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
var Resolutions;
(function (Resolutions) {
    Resolutions["P144"] = "P144";
    Resolutions["P240"] = "P240";
    Resolutions["P360"] = "P360";
    Resolutions["P480"] = "P480";
    Resolutions["P720"] = "P720";
    Resolutions["P1080"] = "P1080";
    Resolutions["P1440"] = "P1440";
    Resolutions["P2160"] = "P2160";
})(Resolutions || (Resolutions = {}));
let dbVideo = [];
app.get('/', (req, res) => {
    res.send('video api');
});
app.get('/videos', (req, res) => {
    res
        .status(exports.HTTP_STATUS.OK_200)
        .send(dbVideo);
});
app.get('/videos/:id', (req, res) => {
    const foundVideo = dbVideo.find(v => v.id === +req.params.id);
    if (!foundVideo) {
        res.status(exports.HTTP_STATUS.NOT_FOUND_404).send("No video found.");
    }
    res.status(200).json(foundVideo);
});
app.post('/videos', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const errorMsg = [];
    if (!title)
        errorMsg.push({ message: "Title is required", field: "title" });
    if (title && title.length > 40)
        errorMsg.push({ message: "Title maxLength is 40", field: "title" });
    if (!author)
        errorMsg.push({ message: "Author is required", field: "author" });
    if (author && author.length > 20)
        errorMsg.push({ message: "Author max length is 20", field: "author" });
    if (!availableResolutions)
        errorMsg.push({ message: "AvailableResolutions is required", field: "availableResolutions" });
    if (availableResolutions && !availableResolutions.every(r => Object.values(Resolutions).includes(r)))
        errorMsg.push({ message: "AvailableResolutions Invalid", field: "availableResolutions" });
    if (errorMsg.length > 0) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errorMsg });
    }
    const createdVideo = {
        id: Math.floor(Math.random() * 1000000),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: availableResolutions || []
    };
    dbVideo = [...dbVideo, createdVideo];
    res
        .status(exports.HTTP_STATUS.CREATED_201)
        .json(createdVideo);
});
app.put('/videos/:id', (req, res) => {
    const { title, author, availableResolutions, minAgeRestriction, canBeDownloaded } = req.body;
    const videoInd = dbVideo.findIndex(v => v.id === +req.params.id);
    const errorMsg = [];
    if (videoInd === -1) {
        errorMsg.push({ message: "id is not fine", field: "id" });
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errorMsg });
    }
    if (!title)
        errorMsg.push({ message: "Title is required", field: "title" });
    if (title && title.length > 40)
        errorMsg.push({ message: "Title maxLength is 40", field: "title" });
    if (!author)
        errorMsg.push({ message: "Author is required", field: "author" });
    if (author && author.length > 20)
        errorMsg.push({ message: "Author max length is 20", field: "author" });
    if (!availableResolutions || availableResolutions.length === 0)
        errorMsg.push({ message: "At least one resolution should be added", field: "availableResolutions" });
    if (minAgeRestriction && (minAgeRestriction > 18 || minAgeRestriction < 1))
        errorMsg.push({ message: "minAgeRestriction max 18 min 1", field: "minAgeRestriction" });
    if (!canBeDownloaded) {
        errorMsg.push({ message: "CanBeDownloaded is required", field: "canBeDownloaded" });
    }
    if (errorMsg.length > 0) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errorMsg });
    }
    const videoUpdate = Object.assign(Object.assign({}, dbVideo[videoInd]), { title: req.body.title, author: req.body.author, availableResolutions: req.body.availableResolutions, canBeDownloaded: req.body.canBeDownloaded, minAgeRestriction: req.body.minAgeRestriction, publicationDate: req.body.publicationDate });
    dbVideo = [
        ...dbVideo.slice(0, videoInd),
        videoUpdate,
        ...dbVideo.slice(videoInd + 1)
    ];
    res.status(exports.HTTP_STATUS.NO_CONTENT_204).send();
});
app.delete('/videos/:id', (req, res) => {
    const videoInd = dbVideo.findIndex(v => v.id === +req.params.id);
    if (videoInd === -1) {
        res.status(exports.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    }
    dbVideo = dbVideo.filter(v => v.id !== +req.params.id);
    res.status(exports.HTTP_STATUS.NO_CONTENT_204).send();
});
app.delete('/testing/all-data', (req, res) => {
    dbVideo = [];
    res.status(204).send("All data is deleted");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
