import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const INTERVAL_SAVE_TIME = 10000;
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
];

const TextEditor = () => {
    const { id: documentID } = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    useEffect(() => {
        const webSocket = io("http://localhost:4000");
        setSocket(webSocket);
        return () => webSocket.disconnect();
    }, []);

    useEffect(() => {
        if (!socket || !quill) return;
        socket.once("load-document", document => {
            quill.setContents(document);
            quill.enable();
        });
        socket.emit("get-document", documentID)
    }, [socket, quill, documentID])

    useEffect(() => {
        if(!socket || !quill) return;
        const handler = delta => {
            quill.updateContents(delta);
        };
        socket.on("receive-changes", handler);
        return () => socket.off("receive-changes", handler)
    }, [socket, quill]);

    useEffect(() => {
        if(!socket || !quill) return;
        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return;
            socket.emit("send-changes", delta);
        };
        quill.on("text-change", handler);
        return () => quill.off("text-change", handler)
    }, [socket, quill]);

    useEffect(() => {
        if(!socket || !quill) return;
        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents());
        }, INTERVAL_SAVE_TIME);
        return () => clearInterval(interval);
    }, [socket, quill]);

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
        q.disable();
        q.setText("Loading...")
        setQuill(q);
    }, []);
  return (
      <div id="container" ref={wrapperRef}></div>
  );
};

export default TextEditor;
