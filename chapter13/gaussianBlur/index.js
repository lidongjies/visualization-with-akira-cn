const config = {
  texture: '/assets/girl1.jpg',
  filters: ['gaussianBlur'],
  kernel: 'gaussianBlur',
};

const kernels = {
  gaussianBlur: [0.045, 0.122, 0.045, 0.122, 0.332, 0.122, 0.045, 0.122, 0.045],
};

function calculateKernelWeight(kernel) {
  const weight = kernel.reduce((prev, next) => prev + next);
  return weight <= 0 ? 1 : weight;
}

const canvas = document.getElementById('paper');
const renderer = new GlRenderer(canvas);

async function render() {
  const program = await renderer.load('./index.frag', './index.vert');
  renderer.useProgram(program);

  const texture = await renderer.loadTexture(config.texture);
  renderer.uniforms.u_texture = texture;
  // eslint-disable-next-line no-underscore-dangle
  const { width, height } = texture._img;
  renderer.uniforms.u_textureSize = [width, height];

  renderer.uniforms.u_kernel = kernels[config.kernel];
  renderer.uniforms.u_kernelWeight = calculateKernelWeight(kernels[config.kernel]);

  renderer.setMeshData([
    {
      positions: [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      attributes: {
        a_uv: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      cells: [
        [0, 1, 2],
        [2, 0, 3],
      ],
    },
  ]);
  renderer.render();
}

render();
