require("dotenv").config({ path: "./config.env" });

const Document = require("./Document");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to DB!"))
    .catch(error => console.log(`Uh oh...${error}`));

const io = require("socket.io")(4000, {
  cors: { origin: "http://localhost:3000" },
  methods: ["GET", "POST"],
});

async function findOrCreateDoc(id) {
    if (!id) return;
    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: "" });
};

io.on("connection", socket => {
  socket.on("get-document", async (documentID) => {
    const document = await findOrCreateDoc(documentID);
    socket.join(documentID);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentID).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => await Document.findByIdAndUpdate(documentID, { data }) );
  });
});