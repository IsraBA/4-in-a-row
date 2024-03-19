import { io } from 'socket.io-client';

let prodaction = true;

const URL = prodaction ? 'https://four-in-a-row-server-1.onrender.com' : 'http://localhost:3001';

export const socket = io(URL);