import express, {Request, Response} from "express";

const app = express()
const port = process.env.port || 3000
app.use(express.json());

export const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

enum Resolutions { P144= "P144", P240 = "P240", P360 = "P360", P480 = "P480", P720= "P720", P1080="P1080", P1440="P1440", P2160="P2160" }

type videoType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: number | null,
  createdAt: string,
  publicationDate: string,
  availableResolutions: Resolutions[],
}

type videoTypeCreate = {
  "title": string,
  "author": string,
  "availableResolutions": Resolutions[],
}
// Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)
const dbVideo: { content: videoType[] } = {
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
}

app.get('/', (req: Request, res: Response) => {
    res.send('video api')
  }
)

app.get('/hometask_01/api/videos', (req: Request, res: Response<videoType[]>) => {
  const foundVideo: videoType[] = dbVideo.content;

  res
    .status(HTTP_STATUS.OK_200)
    .send(foundVideo)
})

app.post('/hometask_01/api/videos', (req: Request<{},{}, videoTypeCreate>, res: Response<videoType>) => {
  const createdVideo: videoType = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(Date.now() + 1).toISOString(),
    availableResolutions: req.body.availableResolutions

  }
  dbVideo.content.push(createdVideo)

  res
    .status(HTTP_STATUS.CREATED_201)
    .json(createdVideo)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default app;
