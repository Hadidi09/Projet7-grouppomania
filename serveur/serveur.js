require("dotenv").config();
// Mes imports et déclarations de mes packages.
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8000;
const socket = require("socket.io");
const server = require("http").Server(app);

// importations de mes routes
const usersRoutes = require("./routes/users");
const profilRoutes = require("./routes/profils");
const commentRoutes = require("./routes/comments");

app.use(helmet());
app.use(cors());
// connection à la base de données
db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => console.log(`Serveur running on port ${PORT}`));
  })
  .catch((error) => console.log("Cannot access on database" + " " + error));
// configuration du socket pour connection avec le client
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    console.log(room);

    db.Comment.findAll({
      attributes: ["userName", "message", "id", "createdAt"],
    }).then((list) => {
      // console.log(list);
      socket.emit("messages", { message: JSON.stringify(list) });
    });

    io.to(room).emit("newconnect", `vous avez rejoint le chat  ${room}`);
  });
  socket.on("send_message", (data) => {
    db.Comment.create(
      {
        message: data.content.message,
        userName: data.content.userName,
        UserId: data.content.UserId,
      },
      {}
    );

    socket.broadcast.emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("User is disconnected");
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", profilRoutes);
app.use("/api/profil", commentRoutes);
app.use("/api/auth", usersRoutes);
