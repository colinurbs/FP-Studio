module.exports = {
  run: [
    // windows nvidia 50 series
    {
      "when": "{{gpu === 'nvidia' && platform === 'win32' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install --torch==2.7.0 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "uv pip install -U triton-windows",
          "uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl --force-reinstall"
        ]
      },
      "next": null
    },
    
    // linux nvidia 50 series
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install --torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128--force-reinstall",
          "uv pip install git+https://github.com/thu-ml/SageAttention.git"
        ]
      },
      "next": null
    },
    
    // nvidia windows
    {
      "when": "{{gpu === 'nvidia' && platform === 'win32'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.6.0 torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu126 --force-reinstall",
          "uv pip install -U xformers --index-url https://download.pytorch.org/whl/cu126 --force-reinstall",
          "uv pip install -U triton-windows==3.2.0.post18 --force-reinstall",
          "uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp310-cp310-win_amd64.whl --force-reinstall",
          "uv pip install https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp310-cp310-win_amd64.whl"
        ]
      },
      "next": null
    },
    
    // nvidia linux 
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.6.0 torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu126 --force-reinstall",
          "uv pip install -U xformers --index-url https://download.pytorch.org/whl/cu126",
          "uv pip install git+https://github.com/thu-ml/SageAttention.git",
          "uv pip install https://github.com/Dao-AILab/flash-attention/releases/download/v2.7.4.post1/flash_attn-2.7.4.post1+cu12torch2.6cxx11abiTRUE-cp310-cp310-linux_x86_64.whl"
        ]
      },
      "next": null
    },    
  ]
}
