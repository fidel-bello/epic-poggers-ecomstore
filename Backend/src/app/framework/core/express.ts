import express from 'express';

const app = express();
const PORT = process.env.PORT || 3006;

export function main() {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}