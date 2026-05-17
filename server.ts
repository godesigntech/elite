import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import cors from "cors";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.get("/api/competitions", (req, res) => {
    // Mock data for now
    res.json([
      { id: "1", title: "iPhone 15 Pro Max", entryPrice: 50 },
      { id: "2", title: "PS5 Spider-Man 2 Edition", entryPrice: 25 },
    ]);
  });

  app.post("/api/scores/submit", (req, res) => {
    const { competitionId, score, userId } = req.body;
    console.log(`Score submitted for ${competitionId} by ${userId}: ${score}`);
    
    // Broadcast to relevant competition room
    io.to(`competition:${competitionId}`).emit("score-update", {
      competitionId,
      userId,
      score,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: "Score submitted and broadcasted" });
  });

  app.get("/api/competitions/:id/leaderboard", (req, res) => {
    // Mock leaderboard
    res.json([
      { rank: 1, username: "SpeedyTapMaster", score: 99.82, attempts: 24 },
      { rank: 2, username: "PrecisionKing", score: 99.10, attempts: 45 },
    ]);
  });

  // Socket.io logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    
    socket.on("join-competition", (competitionId) => {
      socket.join(`competition:${competitionId}`);
      console.log(`User ${socket.id} joined competition: ${competitionId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
