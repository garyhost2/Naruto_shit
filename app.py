from flask import Flask, Response, render_template
from ultralytics import YOLO
import cv2
import torch

# ---------------- CONFIG -----------------
MODEL_PATH = "best_naruto_signs.pt"     # rename if different
CAM_ID     = 0             # 0=internal laptop cam, 1 .. N = USB cams
IMG_SIZE   = 640           # inference size (must match training size)
CONF_THRES = 0.25
# -----------------------------------------

app  = Flask(__name__)
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

        # --- YOLO inference -------------------------------------------------
        result = model.predict(
            source   = frame,
            imgsz    = IMG_SIZE,
            conf     = CONF_THRES,
            device   = device,
            verbose  = False
        )[0]

        # draw boxes
        if result.boxes is not None:
            for xyxy, cls in zip(result.boxes.xyxy, result.boxes.cls):
                x1,y1,x2,y2 = map(int, xyxy)
                label       = model.names[int(cls)]
                cv2.rectangle(frame, (x1,y1), (x2,y2), (0,255,0), 2)
                cv2.putText(frame, label, (x1, y1-10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

        # --- MJPEG encode ----------------------------------------------------
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    # For dev: auto-reload, single-thread
    app.run(host='0.0.0.0', port=5000, debug=True)
