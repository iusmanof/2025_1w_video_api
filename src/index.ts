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

enum Resolutions {
  P144 = "P144",
  P240 = "P240",
  P360 = "P360",
  P480 = "P480",
  P720 = "P720",
  P1080 = "P1080",
  P1440 = "P1440",
  P2160 = "P2160"
}

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

type videoTypeUpdate = {
  "title": string,
  "author": string,
  "availableResolutions": Resolutions[],
  "canBeDownloaded": boolean,
  "minAgeRestriction": number,
  "publicationDate": string
}

type ErrorMesage = {
  "message": string,
  "field": string,
}

let dbVideo: videoType[] = []

app.get('/', (req: Request, res: Response) => {
    res.send('video api')
  }
)

app.get('/videos', (req: Request, res: Response<videoType[]>) => {
  res
    .status(HTTP_STATUS.OK_200)
    .send(dbVideo)
})

app.get('/videos/:id', (req: Request<{ id: number }>, res: Response) => {
  const foundVideo: videoType | undefined = dbVideo.find(v => v.id === +req.params.id)

  if (!foundVideo) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("No video found.")
  }
  res.status(200).json(foundVideo)
})

app.post('/videos', (req: Request<{}, {}, videoTypeCreate>, res: Response<videoType | {
  errorsMessages: ErrorMesage[]
}>) => {
  const {title, author, availableResolutions} = req.body

  const errorMsg: ErrorMesage[] = []

  if (!title) errorMsg.push({message: "Title is required", field: "title"})
  if (title && title.length > 40) errorMsg.push({message: "Title maxLength is 40", field: "title"})
  if (!author) errorMsg.push({message: "Author is required", field: "author"})
  if(author && author.length > 20) errorMsg.push({message: "Author max length is 20", field: "author"})
  if (!availableResolutions) errorMsg.push({message: "AvailableResolutions is required", field: "availableResolutions"})
  if (availableResolutions.every(r => Object.values(Resolutions).includes(r))) errorMsg.push({message: "AvailableResolutions Invalid", field: "availableResolutions"})

  if (errorMsg.length > 0) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({errorsMessages: errorMsg})
  }

  const createdVideo: videoType = {
    id: Math.floor(Math.random() * 1000000),
    title: title!,
    author: author!,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    availableResolutions: availableResolutions || []

  }
  dbVideo = [...dbVideo, createdVideo]
  res
    .status(HTTP_STATUS.CREATED_201)
    .json(createdVideo)
})

app.put('/videos/:id', (req: Request<{ id: number }, {}, videoTypeUpdate>, res: Response) => {
  const videoInd = dbVideo.findIndex(v => v.id === +req.params.id)

  if (videoInd === -1) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({message: "Video not found."})
  }

  const videoUpdate: videoType = {
    ...dbVideo[videoInd],
    title: req.body.title,
    author: req.body.author,
    availableResolutions: req.body.availableResolutions,
    canBeDownloaded: req.body.canBeDownloaded,
    minAgeRestriction: req.body.minAgeRestriction,
    publicationDate: req.body.publicationDate
  }

  dbVideo = [
    ...dbVideo.slice(0, videoInd),
    videoUpdate,
    ...dbVideo.slice(videoInd + 1)
  ];
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

app.delete('/videos/:id', (req: Request<{ id: string }>, res: Response) => {
  const videoInd = dbVideo.findIndex(v => v.id === +req.params.id)
  if (videoInd === -1) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  }

  dbVideo = dbVideo.filter(v => v.id !== +req.params.id)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
  dbVideo = []

  res.status(204).send("All data is deleted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;
