import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

export default function Home() {
  const [text, setUserText] = useState("");

  const [audioId, setAudioId] = useState(null);

  const sayText = () => {
    if (text && text.trim().length > 0) {
      axios
        .post("http://localhost:3000/api/say", {
          text,
        })
        .then(({ data }) => {
          setAudioId(data.audioId);
        });
    } else {
    }
  };

  const afterDownloadingFile = () => {
    axios
      .delete("http://localhost:3000/api/say", {
        data: {
          text,
        },
      })
      .then(() => {
        setUserText("");
        setAudioId(null);
      });
  };

  return (
    <div style={{ width: "75%", margin: "auto" }}>
      {audioId && (
        <Alert key="warning" variant="warning">
          The file is ready for download.{" "}
          <Alert.Link
            href={`./audios/${audioId}.mp3`}
            download="voice-app.mp3"
            onClick={afterDownloadingFile}
            className="ml-2"
          >
            Download
          </Alert.Link>
        </Alert>
      )}

      <form>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          name="text"
          type="text"
          value={text}
          style={{ maxHeight: "100px" }}
          placeholder="Enter your text:"
          onKeyDown={(e) =>
            e.key === "Enter" && e.ctrlKey && sayText()
          }
          onChange={(e) => setUserText(e.target.value)}
        />

        <Button variant="primary" className="mt-3" onClick={sayText}>
          Pronounce
        </Button>
      </form>
    </div>
  );
}
