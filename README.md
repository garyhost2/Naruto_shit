<h1 align="center">🔥 Naruto Vision — Three.js + Flask YOLOv8 Project 🔥</h1>

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/en/9/94/Naruto_cover.jpg" width="200" />
</p>

<h2>🚀 Project Overview</h2>

This is a real-time web application that combines:<br>
• 🎨 An anime-themed 3D interactive web UI using <b>Three.js</b><br>
• 🧠 A real-time YOLOv8 object detection model served by <b>Flask</b><br>
• 🎥 Live webcam inference overlay in the browser ("Activate Vision")<br>

---

<h2>📂 Project Structure</h2>

<pre>
threejs-and-animejs/
├── images/
├── templates/
├── static/
├── index.html
├── main.js
├── style.css
├── package.json
├── vite.config.js
├── flask_inference.py
├── README.md
└── .gitignore
</pre>

---

<h2>⚙️ Technologies Used</h2>

• Frontend: <b>Three.js</b>, <b>Vite</b> (development server), <b>AnimeJS</b><br>
• Backend: <b>Flask</b> (Python 3), <b>Ultralytics YOLOv8</b><br>
• Camera Streaming: <b>MJPEG over HTTP</b> with CORS support<br>
• Optional Deployment: <b>Docker, Kubernetes (future scaling)</b><br>

---

<h2>🛠️ Installation</h2>



<br> <h3>Frontend Setup</h3>

npm install
npm install three

<br> <h3>Backend Setup (Flask + YOLOv8)</h3>
venv and shit

pip install flask flask-cors ultralytics opencv-python torch

<br> <h2>🚀 Running the Project</h2> <h3>Step 1: Start Flask Inference Server</h3>

python flask_inference.py

(Flask will run on http://localhost:5000)<br>
<h3>Step 2: Start the Three.js Frontend</h3>

npm run dev

(Vite will run on http://localhost:5173)<br>
<h3>Step 3: Open your browser</h3>

Go to 👉 http://localhost:5173<br> Click on the <b>Activate Vision 🔥</b> button to open the webcam window in the center.<br>
<h2>🎯 Features</h2>

• Anime-styled UI with chakra-themed animations<br> • 3D interactive Torus and Light Objects<br> • Real-time webcam capture<br> • YOLOv8 object detection live in the browser<br> • Fully responsive and lightweight<br>
<h2>📸 Demo Screenshot</h2> <p align="center"> <img src="https://user-images.githubusercontent.com/your-screenshot.png" width="600" /> </p> <h2>📢 Notes</h2>

• If your webcam feed doesn't show, make sure camera permissions are allowed.<br> • For best performance, use a small YOLOv8 model like <b>YOLOv8n.pt</b> or <b>TensorRT optimized</b>.<br> • Future versions will add Naruto seals (火, 水, 風...) appearing dynamically based on detections!<br>