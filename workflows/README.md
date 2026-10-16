# ComfyUI Workflows Directory

This directory contains the production and backup workflow files for **Assessment 2: Auralis Nova Flagship Advertising Key Visual**.

---

## 1. File Manifest

| File | Purpose | Integrity Status |
| :--- | :--- | :--- |
| [`Assessment_2_workflow.json`](./Assessment_2_workflow.json) | **Active Production Workflow** with configured prompt, seeds, ResolutionSelector, and SaveImageAdvanced node. | Verified & Validated |
| [`Assessment_2.original.backup.json`](./Assessment_2.original.backup.json) | **Bit-for-Bit Backup** of the original workspace workflow prior to inspection. | Preserved Intact |

---

## 2. How to Load and Execute in ComfyUI

1. **Launch ComfyUI:**
   Ensure ComfyUI is running (v0.3.14 or later recommended).
2. **Import Workflow:**
   - Drag and drop `Assessment_2_workflow.json` directly onto the ComfyUI canvas.
   - Alternatively, click **Load** in the control panel and select `workflows/Assessment_2_workflow.json`.
3. **Verify Models:**
   Ensure the following weights are present in your `models/` directory:
   - `diffusion_models/qwen_image_2.1_int8_convrot.safetensors`
   - `text_encoders/qwen3vl_8b_int8_convrot.safetensors`
   - `vae/qwen_image_2.1_vae_bf16.safetensors`
4. **Queue Prompt:**
   - Click **Queue Prompt**.
   - Output will save automatically to your output directory tagged with prefix `Qwen_image_2.1`.

---

## 3. Recommended Operational Tweaks

- **For High-Resolution 2K Print Output:**
  Open Node 13 (`ResolutionSelector`), adjust the megapixel slider from `1` to `4` (or select `2048 × 1152`), and run at 40 steps.
- **To Enable Negative Prompt Guidance:**
  Inside Node 459, raise `cfg` from `1.0` to `2.5`.
