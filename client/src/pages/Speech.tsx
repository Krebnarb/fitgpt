import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcription, setTranscription] = useState('');
  const [ollamaResponse, setOllamaResponse] = useState('');
  const [recorder, setRecorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );
  
  const startRecording = () => {
    recorder
      .start()
      .then(() => {
        setRecording(true);
      })
      .catch((e) => console.error('Recording failed', e));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const audioURL = URL.createObjectURL(blob);
        setAudioURL(audioURL);
        setRecording(false);

        const formData = new FormData();
        formData.append('audio', blob, 'audio.mp3');

        // Send the audio to the backend for transcription and Ollama response
        axios
          .post('http://localhost:3001/api/v1/speech/transcribe', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            setTranscription(response.data.transcription);
            setOllamaResponse(response.data.ollamaResponse);
          })
          .catch((error) => console.error('Error:', error));
      })
      .catch((e) => console.error('Error in stop recording', e));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Speech to Text and Ollama Response</h1>
      <div className="mb-4">
        {recording ? (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Recording
          </button>
        )}
      </div>
      {audioURL && (
        <div className="mb-4">
          <audio controls>
            <source src={audioURL} type="audio/mp3" />
          </audio>
        </div>
      )}
      <div className="mt-4">
        <h2 className="font-bold">Transcription:</h2>
        <p>{transcription}</p>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Ollama Response:</h2>
        <p>{ollamaResponse}</p>
      </div>
    </div>
  );
};

export default App;
