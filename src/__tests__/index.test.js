import request from 'supertest';
import app from '../app';

describe('[X] API service is working', () => {

  test('API Service is reachable', async() => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
  });
  
});
