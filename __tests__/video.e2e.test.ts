import request from "supertest";
import app, {HTTP_STATUS} from "../src";


describe("/videos CRUD", () => {
  beforeAll(async () => {
    await request(app).delete('/testing/all-data')
  })

  it('should return video api', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('video api');
  })

  it("should return 200 and []", async () => {
    await request(app)
      .get('/videos')
      .expect(HTTP_STATUS.OK_200, [])
  })

  it("should return 404 not existing video", async () => {
    await request(app)
      .get('/videos/2')
      .expect(HTTP_STATUS.NOT_FOUND_404)
  })

  it("shouldn't  create video with incorrect params ", async () => {
    await request(app)
      .post('/videos')
      .send({ title: "   "})
      .expect(HTTP_STATUS.BAD_REQUEST_400)
  })

})
