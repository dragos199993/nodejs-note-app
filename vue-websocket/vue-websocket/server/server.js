const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New user connected");
  // socket.emit('newMessage', {
  //     from: 'Mike',
  //     text: "Hello there",
  //     createAt: 10
  // });
  // socket.emit("newMessage", generateMessage('admin', 'welcome to the chat application'));
  // socket.broadcast.emit("newMessage", generateMessage('admin', 'new user entered'));
  // socket.on("createMessage", (message, fn) => {
  //   fn('got it!');
  //   console.log({ message });
  //   io.emit("newMessage", generateMessage('Dragos', "Hello from there"));
  //   // socket.broadcast.emit('newMessage', {
  //   //     from: message.from,
  //   //     text: message.text,
  //   //     createAt: new Date().getTime()
  //   // });
  // });
  socket.on('createMessage', (data) => {
    io.emit('messages', data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
