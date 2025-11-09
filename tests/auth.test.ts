import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../src/routes/auth.route';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.disconnect();
});

describe('Auth Module', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should not signup with invalid email', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'user2',
      email: 'invalid-email',
      password: 'password123',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should login existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
