"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
var Resolutions;
(function (Resolutions) {
    Resolutions[Resolutions["P144"] = 0] = "P144";
    Resolutions[Resolutions["P240"] = 1] = "P240";
    Resolutions[Resolutions["P360"] = 2] = "P360";
    Resolutions[Resolutions["P480"] = 3] = "P480";
    Resolutions[Resolutions["P720"] = 4] = "P720";
    Resolutions[Resolutions["P1080"] = 5] = "P1080";
    Resolutions[Resolutions["P1440"] = 6] = "P1440";
    Resolutions[Resolutions["P2160"] = 7] = "P2160";
})(Resolutions || (Resolutions = {}));
// Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)
const dbVideo = {
    video: [
        {
            id: 1,
            title: "Video 1",
            author: "Author 1",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: "Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)",
            publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
            availableResolutions: [Resolutions.P144, Resolutions.P240]
        },
        {
            id: 2,
            title: "Video 2",
            author: "Author 2",
            canBeDownloaded: true,
            minAgeRestriction: 7,
            createdAt: "Fri Sep 19 2025 04:20:20 GMT+0300 (Moscow Standard Time)",
            publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
            availableResolutions: [Resolutions.P144, Resolutions.P240]
        },
        {
            id: 3,
            title: "Video 3",
            author: "Author 3",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: "Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)",
            publicationDate: "Fri Sep 19 2025 05:40:00 GMT+0300 (Moscow Standard Time)",
            availableResolutions: [Resolutions.P144, Resolutions.P240]
        }
    ]
};
app.get('/hometask_01/api/videos', (req, res) => {
    const foundVideo = dbVideo.video;
    res
        .status(exports.HTTP_STATUS.OK_200)
        .send(foundVideo);
});
app.get('/wtf', (req, res) => {
    res.send(' WTF !');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
