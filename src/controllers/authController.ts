import dotenv from 'dotenv';
import mongodb from '../database/mongooseClient';
import { ObjectId } from 'mongodb';
import path from 'path';
import axios from 'axios';
import { Request, Response } from 'express';

dotenv.config();

const getIndex = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
};

const getAuth = async (req: Request, res: Response): Promise<void> => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}`,
  );
};

const oAuthCallback = async (req: { query: { code: string } }, res: Response): Promise<void> => {
  const { code } = req.query;
  const body = {
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.GITHUB_OAUTH_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', body, opts);
    const token = response.data.access_token;
    console.log(`My Token: ${token}`);
    res.redirect('/?token=' + token);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export {
  getIndex,
  getAuth,
  oAuthCallback
};

