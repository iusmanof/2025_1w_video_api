import express, {Request, Response} from "express";
const app = express()
const port = process.env.port || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello vercel!')
})

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello test!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
