import express, {Request, Response} from "express";
const app = express()
const port = process.env.port || 3000

app.get('/', (req: Request, res: Response) => {
  res
    .sendStatus(200)
    .send('Hello WTF !')
})

app.get('/wtf', (req: Request, res: Response) => {
  res.send(' WTF !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
