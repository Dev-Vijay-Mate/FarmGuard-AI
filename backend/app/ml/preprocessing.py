from io import BytesIO
import numpy as np
from PIL import Image, ImageOps

MODEL_SIZE = (224, 224)

def preprocess_image(content: bytes) -> tuple[np.ndarray, dict[str, float | int]]:
    """Validate, RGB-normalize, resize and scale an uploaded leaf image."""
    image = Image.open(BytesIO(content)); image.verify()
    image = Image.open(BytesIO(content)); image = ImageOps.exif_transpose(image).convert("RGB")
    width, height = image.size
    image = ImageOps.fit(image, MODEL_SIZE, method=Image.Resampling.LANCZOS)
    pixels = np.asarray(image, dtype=np.float32) / 255.0
    return pixels, {"width": width, "height": height, "model_width": 224, "model_height": 224}
