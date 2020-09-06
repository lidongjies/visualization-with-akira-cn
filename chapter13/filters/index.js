import formConfig from './form.js';
import FormBuilder from '../../utils/formBuilder.js';
import {
  multiply,
  brightness,
  contrast,
  grayscale,
  hueRotate,
  invert,
  opacity,
  saturate,
  sepia,
} from '../../utils/color-matrix.js';

const filters = {
  brightness,
  contrast,
  grayscale,
  hueRotate,
  invert,
  opacity,
  saturate,
  sepia,
};

function calculateColorMartix(props) {
  const martixs = Object.entries(props)
    .filter(([key]) => Boolean(filters[key]))
    .map(([key, value]) => filters[key](value));
  return martixs.reduce((m1, m2) => multiply(m1, m2));
}

const formBuilder = new FormBuilder(formConfig);
const renderer = new GlRenderer(document.getElementById('paper'));

window.addEventListener('load', () => {
  formBuilder.build();
});
formBuilder.addEvent('change', ({ store, key, value }) => {
  if (key === 'hueRotate') {
    // eslint-disable-next-line no-param-reassign
    store[key] = (Math.PI / 180) * value;
  }
  const colorMartix = calculateColorMartix(store);
  renderer.uniforms.u_colorMartix = colorMartix;
});

async function render() {
  const program = await renderer.load('./index.frag', './index.vert');
  renderer.useProgram(program);

  const texture = await renderer.loadTexture('/assets/girl1.jpg');
  renderer.uniforms.u_texture = texture;
  const colorMartix = calculateColorMartix(formBuilder.store);
  renderer.uniforms.u_colorMartix = colorMartix;

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
