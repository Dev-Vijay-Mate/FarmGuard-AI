from io import BytesIO
from PIL import Image
from app.ml.preprocessing import preprocess_image

def test_preprocess_normalizes_to_model_shape():
    buffer = BytesIO(); Image.new("RGB", (640, 480), (40, 160, 50)).save(buffer, "JPEG")
    pixels, metadata = preprocess_image(buffer.getvalue())
    assert pixels.shape == (224, 224, 3)
    assert 0 <= pixels.min() <= pixels.max() <= 1
    assert metadata["width"] == 640
