'use client';

export default function VideoCall() {
  return (
    <div>
      <h1>Join the Video Call</h1>
      <iframe
        allow="camera; microphone; fullscreen; display-capture"
        src="https://meet.jit.si/pranava-video-session"
        style={{ width: '100%', height: '500px', border: 'none' }}
      ></iframe>
    </div>
  );
}