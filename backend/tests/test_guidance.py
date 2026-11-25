from app.ml.guidance import screening_guidance
def test_guidance_does_not_prescribe_treatment():
    advice = screening_guidance({})
    assert len(advice) == 3
    assert any("expert" in item for item in advice)
