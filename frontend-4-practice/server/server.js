import { TODAY, WEEKDAY_SLOTS, WEEKEND_SLOTS } from './database.js';

const DELAY_MS = 700;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendJson(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function sendError(res, status) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Internal server error' }));
}

export default function mockBookingServer() {
  return {
    name: 'mock-booking-server',
    configureServer(viteServer) {
      viteServer.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        if (url.pathname === '/api/booking/today') {
          wait(DELAY_MS).then(() => sendJson(res, TODAY));
          return;
        }

        if (url.pathname === '/api/slots') {
          const day = Number(url.searchParams.get('day'));
          const month = Number(url.searchParams.get('month'));
          const year = Number(url.searchParams.get('year'));

          const bad =
            !Number.isInteger(day) || day < 1 || day > 31 ||
            !Number.isInteger(month) || month < 0 || month > 11 ||
            !Number.isInteger(year);

          if (bad) {
            wait(DELAY_MS).then(() => sendError(res, 500));
            return;
          }

          wait(DELAY_MS).then(() => {
            const weekday = new Date(year, month, day).getDay();
            const slots = weekday === 0 || weekday === 6 ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
            sendJson(res, { date: { day, month, year }, slots });
          });
          return;
        }

        next();
      });
    }
  };
}
