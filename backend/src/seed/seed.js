import dotenv from 'dotenv';
import seed from './seedRunner.js';
import { disconnectDB } from '../config/db.js';

dotenv.config();

seed()
  .then(() => disconnectDB())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
