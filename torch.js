module.exports = {
  run: [
    // requires NVIDIA GPU        
     {
      when: "{{gpu !== 'nvidia'}}",
      method: "notify",
      params: {
        html: "This app requires an NVIDIA GPU."
      }, 
       next: null
     },
    // windows nvidia 50 series &&
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128",
          "{{args && args.triton ? 'uv pip install -U triton-windows --force-reinstall' : ''}}",
          "{{args && args.sageattention ? 'uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl --force-reinstall' : ''}}",
        ]
      },
      "next": null
    },

    // linux nvidia 50 series &&
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu128",
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}"
        ]
      },
      "next": null
    }
  ]
}
