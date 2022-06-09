import say from "say";
import fs from "fs";
let audioId;

const getFilePath = (id) => {
  return `public/audios/${id}.mp3`;
};

export default function handler(req, res) {
  switch (req.method) {
    case "POST": {
      if (req.body.text && req.body.text.trim().length > 0) {
        if (!audioId) {
          audioId =
            new Date().toISOString().replaceAll(/[-:TZ]/g, ".") +
            Math.random().toString().substring(2, 7);
          fs.mkdir("public/audios", { recursive: true }, () => {
            say.export(
              req.body.text,
              null,
              null,
              getFilePath(audioId)
            );
          });
        } else {
          if (fs.existsSync(getFilePath(audioId))) {
            fs.unlinkSync(getFilePath(audioId), () => { });
          }
          fs.mkdir("public/audios", { recursive: true }, () => {
            say.export(
              req.body.text,
              null,
              null,
              getFilePath(audioId)
            );
          });
        }
        return res
          .status(200)
          .send({ audioId, ...say.speak(req.body.text) });
      }
    }

    case "DELETE": {
      if (fs.existsSync(getFilePath(audioId))) {
        fs.unlinkSync(getFilePath(audioId), () => { });
      }
      audioId = null;
      return res.end();
    }
    default: {
      return res.end();
    }
  }
}
