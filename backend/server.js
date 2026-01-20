const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080'  // หรือ '*' สำหรับ dev
}));
app.use(express.json());

// สร้าง logs dir ถ้ายังไม่มี
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Endpoint /api/demo
app.get('/api/demo', (req, res) => {
  const logMessage = `[${new Date().toISOString()}] Request from ${req.ip}\n`;
  fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

  res.json({
    git: {
      title: 'Advanced Git Workflow',
      detail: 'ใช้ branch protection, code review, squash merge'
    },
    docker: {
      title: 'Advanced Docker',
      detail: 'multi-stage build, healthcheck, orchestration'
    }
  });
});

// Error handling
app.use((req, res, next) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});