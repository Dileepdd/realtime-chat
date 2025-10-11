# Auth Module

## Install
npm install git+https://github.com/your-username/auth-module.git

## Usage
import { signup, login, authMiddleware } from "auth-module";

app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.get("/api/users/me", authMiddleware, getMe);
