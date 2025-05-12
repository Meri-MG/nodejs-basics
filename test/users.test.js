import request from 'supertest';
import server from '../src/index.js';

process.env.PORT = 4001

describe('Users API', () => {
  let createdUserId;

  test('GET /api/users should return empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/users → should create a new user', async () => {
    const newUser = {
      username: "alice",
      age: 28,
      hobbies: ["reading", "hiking"]
    };

    const res = await request(server).post('/api/users').send(newUser)

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual("alice");
    expect(res.body.age).toEqual(28);
    expect(res.body.hobbies).toEqual(["reading", "hiking"]);
    createdUserId = res.body.id;
  });

  it('GET /api/users/:id → should return the created user', async () => {
    const res = await request(server).get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
    expect(res.body.username).toEqual("alice");
  });

  it('PUT /api/users/:id → should update the user', async () => {
    const updatedUser = {
      username: "alice_updated",
      age: 29,
      hobbies: ["swimming"]
    };

    const res = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.username).toEqual("alice_updated");
    expect(res.body.age).toEqual(29);
    expect(res.body.hobbies).toEqual(["swimming"]);
  });

  it('DELETE /api/users/:id → should delete the user', async () => {
    const res = await request(server).delete(`/api/users/${createdUserId}`);

    expect(res.status).toBe(204);
    expect(res.body).toEqual("");
  });

  it('GET /api/users/:id → should return 404 after deletion', async () => {
    const res = await request(server).get(`/api/users/${createdUserId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("User not found");
  });
});
