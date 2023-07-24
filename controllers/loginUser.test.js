/*
Condition:
1. A successful response should have a status code of 200.
2. The response should return a token.
3. The response should return an object with two fields: email and subscription, both with the data type String.
4. Error handling: email or password is wrong, no password or email field passed, empty object passed

https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
*/

const request = require('supertest');
const mongoose = require('mongoose');

const { loginUser } = require('./users');
const app = require('../app');

require('dotenv').config();
const { DB_HOST, PORT } = process.env;

describe('loginUser controller', () => {
  let server;

  beforeAll(async () => {
    mongoose
      .connect(DB_HOST)
      .then(() => (server = app.listen(PORT)))
      .catch(e => process.exit(1));
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    });
  });

  // must be an existing user in the database
  test('should respond with status code 200 and return a token and user object', async () => {
    const res = await request(app).post('/users/login', loginUser).send({
      email: 'gadar.andre@gmail.com',
      password: 'qwerty123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });

  // email or password is wrong
  test('should throw an error with status code 401 if email or password is wrong', async () => {
    const res = await request(app).post('/users/login', loginUser).send({
      email: 'test_example@example.com',
      password: 'qwerty123',
    });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      message: 'Email or password is wrong',
    });
  });

  // no email field passed
  test('should return an error with status code 400 if no email field is passed', async () => {
    const res = await request(app)
      .post('/users/login', loginUser)
      .send({ password: 'qwerty123' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Missing required email field',
    });
  });

  // no password field passed
  test('should return an error with status code 400 if no password field is passed', async () => {
    const res = await request(app)
      .post('/users/login', loginUser)
      .send({ email: 'example@example.com' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Missing required password field',
    });
  });

  // empty object passed
  test('should throw an error with status code 400 if an empty object is passed', async () => {
    const res = await request(app).post('/users/login', loginUser).send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Missing fields',
    });
  });
});
