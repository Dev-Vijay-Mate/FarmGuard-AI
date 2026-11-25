# Day 6 AI prototype: tomato leaf health screening

## Scope

The first supported AI workflow is **tomato leaf screening**. It is deliberately limited to a small, explainable output set:

- Healthy / no obvious leaf pattern
- Early blight-like pattern
- Late blight-like pattern
- Leaf mold-like pattern
- Inconclusive — expert review recommended

This is preliminary decision support, not a diagnosis or treatment prescription. Livestock assessments are out of scope until a separately validated model and dataset are selected.

## Dataset and model plan

We selected PlantVillage as the initial training benchmark. The source contains roughly 54,306 leaf images across 38 crop-disease categories; tomato is extensively represented. Its controlled-image collection means that an evaluation on farmer-captured field images is required before any production claim.

The implementation uses a swappable inference adapter. The Day 6 default is a deterministic image-quality and colour-pattern baseline, which lets the product safely demonstrate the complete inference contract while a trained model artifact is being prepared. A later checkpoint can replace the adapter without changing the API.

## Evaluation plan

1. Split training/validation/test images by plant, not by augmented image.
2. Report per-class precision, recall, F1, confusion matrix, and calibration.
3. Test on field photos separate from PlantVillage.
4. Set an abstention threshold; low confidence always returns `inconclusive`.

Sources: [PlantVillage paper](https://arxiv.org/abs/1604.03169), [PlantVillage catalog](https://www.tensorflow.org/datasets/catalog/plant_village), and [ViT preprocessing documentation](https://huggingface.co/docs/transformers/en/model_doc/vit).
