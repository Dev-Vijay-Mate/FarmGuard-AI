import numpy as np
from .guidance import screening_guidance

LOW_CONFIDENCE_THRESHOLD = 0.70

def screen_tomato_leaf(pixels: np.ndarray) -> dict:
    """Safe baseline adapter. Replace with a calibrated trained checkpoint in Day 7."""
    red, green, blue = pixels.mean(axis=(0, 1))
    green_strength = float(green - (red + blue) / 2)
    brown_strength = float((red - blue) * (1 - green))
    if green_strength > 0.10:
        label, confidence = "Tomato leaf: no obvious pattern", min(0.64, 0.45 + green_strength)
    elif brown_strength > 0.08:
        label, confidence = "Tomato leaf: discoloration pattern", min(0.62, 0.45 + brown_strength)
    else:
        label, confidence = "Inconclusive", 0.50
    result = {"label": label, "confidence": round(confidence, 2), "needs_expert_review": True, "model": "tomato-screening-baseline-v0", "disclaimer": "This preliminary screening result is not a diagnosis. A trained and field-validated disease model is required before disease-specific claims."}
    result["guidance"] = screening_guidance(result)
    return result
