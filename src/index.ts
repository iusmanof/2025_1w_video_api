import express, {Request, Response} from "express";

const app = express()
const port = process.env.port || 3000

export const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

enum Resolutions { P144, P240, P360, P480, P720, P1080, P1440, P2160 }

type videoType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: number
  createdAt: string,
  publicationDate: string,
  availableResolutions: Resolutions[],
}
// Fri Sep 19 2025 04:37:29 GMT+0300 (Moscow Standard Time)
const dbVideo: { video: videoType[] } = {
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
    }]
}

app.get('/', (req: Request, res: Response) => {
    res.send('video api')
  }
)

app.get('/api/videos', (req: Request, res: Response<videoType[]>) => {
  const foundVideo: videoType[] = dbVideo.video;

  res
    .status(HTTP_STATUS.OK_200)
    .send(foundVideo)
})

app.get('/wtf', (req: Request, res: Response) => {
  res.send(' WTF !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default app;
