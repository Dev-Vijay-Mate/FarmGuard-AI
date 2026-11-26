import numpy as np
from app.ml.inference import screen_tomato_leaf
def test_baseline_always_routes_to_expert_review():
    result = screen_tomato_leaf(np.zeros((224,224,3), dtype=np.float32))
    assert result["needs_expert_review"] is True
    assert result["confidence"] < 0.70
    assert "not a diagnosis" in result["disclaimer"]
