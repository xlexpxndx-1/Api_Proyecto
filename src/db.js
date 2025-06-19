import { createPool } from "mysql2/promise";
import {
  BD_HOST,
  BD_DATABASE,
  BD_USER,
  BD_PASSWORD,
  BD_PORT
} from './config.js';

export const pool = createPool({
  host: BD_HOST,
  database: BD_DATABASE,
  user: BD_USER,
  password: BD_PASSWORD,
  port: BD_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Puedes ajustar esto según la carga esperada
  queueLimit: 0
});
