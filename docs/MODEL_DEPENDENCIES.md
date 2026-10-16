# Model Dependencies & Environment Configuration

This document specifies the exact model weights, custom node extensions, hardware requirements, and installation paths required to run the **Auralis Nova** ComfyUI workflow.

---

## 1. Required Model Checkpoints & Safetensors

All weights are part of the official **Qwen-Image-2.1** family hosted on Hugging Face and ModelScope:

| Model Category | Filename | Size | Storage Target Directory | Download Source |
| :--- | :--- | :--- | :--- | :--- |
| **Diffusion UNet** | `qwen_image_2.1_int8_convrot.safetensors` | 6.76 GB | `ComfyUI/models/diffusion_models/` | [HuggingFace Download](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/diffusion_models/qwen_image_2.1_int8_convrot.safetensors) |
| **Text Encoder (Vision-Language)** | `qwen3vl_8b_int8_convrot.safetensors` | 8.71 GB | `ComfyUI/models/text_encoders/` | [HuggingFace Download](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/text_encoders/qwen3vl_8b_int8_convrot.safetensors) |
| **Prompt Enhancer (PE)** | `qwen3.5_9b_qwen_image_2.1_pe_t2i.int8_convrot.safetensors` | 8.82 GB | `ComfyUI/models/text_encoders/` | [HuggingFace Download](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/text_encoders/qwen3.5_9b_qwen_image_2.1_pe_t2i.int8_convrot.safetensors) |
| **VAE** | `qwen_image_2.1_vae_bf16.safetensors` | 644.2 MB | `ComfyUI/models/vae/` | [HuggingFace Download](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/vae/qwen_image_2.1_vae_bf16.safetensors) |

### Total Storage Footprint:
~24.9 GB of local disk space is required for the full model suite.

---

## 2. Directory Structure on Host System

Ensure your ComfyUI models directory mirrors the hierarchy below:

```text
ComfyUI/
└── models/
    ├── diffusion_models/
    │   └── qwen_image_2.1_int8_convrot.safetensors
    ├── text_encoders/
    │   ├── qwen3vl_8b_int8_convrot.safetensors
    │   └── qwen3.5_9b_qwen_image_2.1_pe_t2i.int8_convrot.safetensors
    └── vae/
        └── qwen_image_2.1_vae_bf16.safetensors
```

---

## 3. ComfyUI Version & Custom Node Requirements

### ComfyUI Core Requirement:
- **ComfyUI Version:** `>= 0.3.14` (required for native Subgraph definition and loading support).
- **Frontend Version:** Latest ComfyUI Frontend (`@comfyorg/frontend`).

### Required Custom Node Extensions:
1. **ComfyUI Subgraph Engine:** Native feature in recent ComfyUI releases. If using an older build, update via `git pull` or ComfyUI Manager.
2. **ResolutionSelector:** Node 13 provides standard aspect-ratio and megapixel calculations. Available via ComfyUI Manager.
3. **SaveImageAdvanced:** Node 461 provides bit-depth selection, sRGB color tagging, and metadata preservation. Available via ComfyUI Manager (`ComfyUI-Image-Saver` / `ComfyUI_AdvancedSaveImage`).

---

## 4. Hardware Sizing & Recommended Specifications

| Hardware Component | Minimum Specification | Recommended Specification |
| :--- | :--- | :--- |
| **GPU VRAM** | 12 GB (RTX 3060 12GB / RTX 4070) with CPU offloading enabled | 16 GB – 24 GB (RTX 4080, RTX 4090, RTX 3090, A5000) |
| **System RAM** | 16 GB DDR4 | 32 GB – 64 GB DDR5 |
| **Storage** | High-speed NVMe PCIe 4.0 SSD (for fast weights streaming into VRAM) | PCIe 4.0 NVMe SSD |
| **CUDA / Torch** | PyTorch 2.3+ with CUDA 12.1 or CUDA 12.4 | PyTorch 2.4+ with cu124 |
