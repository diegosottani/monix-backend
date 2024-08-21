import express from 'express';
import { post_signup } from './post_signup.js';
import { post_login, get_google_login, post_google_callback } from './post_login.js';
import { post_logout } from './post_logout.js';
import { post_refresh_token } from './post_refresh_token.js';
import { get_users } from '../api/auth/user/get_users.js';
import { post_reset_password } from './post_reset_password.js';

export const root_router = express.Router();
root_router.post('/signup', post_signup);
root_router.post('/login', post_login);
root_router.post('/logout', post_logout);
root_router.post('/refresh_token', post_refresh_token);
root_router.get('/auth/google', get_google_login);
root_router.post('/auth/google/callback', post_google_callback);
root_router.get('/users', get_users);
root_router.post('/reset_password', post_reset_password);

