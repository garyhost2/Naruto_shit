from flask import Flask, Response
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import torch

# --- CONFIG (edit if needed) ---
MODEL_PATH = "best_naruto_signs.pt"
CAM_ID = 0
IMG_SIZE = 640
CONF_THRES = 0.25
# -------------------------------

app = Flask(__name__)
CORS(app)

model = YOLO(MODEL_PATH)
device = 0 if torch.cuda.is_available() else "cpu"

def gen_frames():
    cap = cv2.VideoCapture(CAM_ID)
    if not cap.isOpened():
        raise RuntimeError(f"❌ Cannot open camera {CAM_ID}")

    while True:
        success, frame = cap.read()
        if not success:
            break

        # YOLO inference
        result = model.predict(
            source=frame,
            imgsz=IMG_SIZE,
            conf=CONF_THRES,
            device=device,
            verbose=False
        )[0]

        # Draw detected boxes
        if result.boxes:
            for xyxy, cls in zip(result.boxes.xyxy, result.boxes.cls):
                x1, y1, x2, y2 = map(int, xyxy)
                label = model.names[int(cls)]
                cv2.rectangle(frame, (x1,y1), (x2,y2), (0,255,0), 2)
                cv2.putText(frame, label, (x1,y1-10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

        # Encode frames as MJPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
