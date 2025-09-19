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
// Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)
let dbVideo = {
    content: [
    // {
    //   id: 1,
    //   title: "Video 1",
    //   author: "Author 1",
    //   canBeDownloaded: true,
    //   minAgeRestriction: 18,
    //   createdAt: "Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)",
    //   publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
    //   availableResolutions: [Resolutions.P144, Resolutions.P240]
    // },
    // {
    //   id: 2,
    //   title: "Video 2",
    //   author: "Author 2",
    //   canBeDownloaded: true,
    //   minAgeRestriction: 7,
    //   createdAt: "Fri Sep 19 2025 04:20:20 GMT+0300 (Moscow Standard Time)",
    //   publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
    //   availableResolutions: [Resolutions.P144, Resolutions.P240]
    // },
    // {
    //   id: 3,
    //   title: "Video 3",
    //   author: "Author 3",
    //   canBeDownloaded: true,
    //   minAgeRestriction: 18,
    //   createdAt: "Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)",
    //   publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
    //   availableResolutions: [Resolutions.P144, Resolutions.P240]
    // }
    ]
};
app.get('/', (req, res) => {
    res.send('video api');
});
app.get('/hometask_01/api/videos', (req, res) => {
    // if (!dbVideo.content) {
    //   res.send(404)
    // }
    let foundVideo = dbVideo.content;
    res
        .status(exports.HTTP_STATUS.OK_200)
        .send(foundVideo);
});
app.get('/hometask_01/api/videos/:id', (req, res) => {
    const foundVideo = dbVideo.content.find(v => v.id === +req.params.id);
    if (!foundVideo) {
        res.status(exports.HTTP_STATUS.NOT_FOUND_404).send("No video found.");
    }
    res.status(200).json(foundVideo);
});
app.post('/hometask_01/api/videos', (req, res) => {
    const createdVideo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(Date.now() + 1).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    dbVideo.content = [...dbVideo.content, createdVideo];
    res
        .status(exports.HTTP_STATUS.CREATED_201)
        .json(createdVideo);
});
app.put('/hometask_01/api/videos/:id', (req, res) => {
    const videoInd = dbVideo.content.findIndex(v => v.id === +req.params.id);
    if (!videoInd) {
        res.status(exports.HTTP_STATUS.NOT_FOUND_404).json({ message: "Video not found." });
    }
    const videoUpdate = Object.assign(Object.assign({}, dbVideo.content[videoInd]), { title: req.body.title, author: req.body.author, availableResolutions: req.body.availableResolutions });
    dbVideo.content = [
        ...dbVideo.content.slice(0, videoInd),
        videoUpdate,
        ...dbVideo.content.slice(videoInd + 1)
    ];
    res.status(exports.HTTP_STATUS.NO_CONTENT_204).send(videoUpdate);
});
app.delete('/hometask_01/api/videos/:id', (req, res) => {
    dbVideo.content = dbVideo.content.filter(v => v.id !== +req.params.id);
    res.send(exports.HTTP_STATUS.NO_CONTENT_204);
});
app.delete('/hometask_01/api/testing/all-data', (req, res) => {
    dbVideo.content = [];
    res.status(exports.HTTP_STATUS.NO_CONTENT_204).json({ description: "All data is deleted" });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
