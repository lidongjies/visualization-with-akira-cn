export default {
  brightness: {
    type: 'numberInput',
    initial: 1,
    options: {
      label: '亮度',
      step: 0.1,
    },
  },
  contrast: {
    type: 'numberInput',
    initial: 1,
    options: {
      label: '对比度',
      step: 0.1,
    },
  },
  grayscale: {
    type: 'numberInput',
    initial: 0,
    options: {
      label: '灰度',
      step: 0.1,
    },
  },
  hueRotate: {
    type: 'slider',
    initial: 0,
    range: [0, 360],
    options: {
      label: '色相',
      step: 1,
      dp: 1,
    },
  },
  invert: {
    type: 'numberInput',
    initial: 0,
    options: {
      label: '反转',
      step: 0.1,
    },
  },
  opacity: {
    type: 'slider',
    initial: 1,
    range: [1, 0],
    options: {
      label: '透明度',
      step: 0.1,
      dp: 1,
    },
  },
  saturate: {
    type: 'numberInput',
    initial: 1,
    options: {
      label: '饱和度',
      step: 0.1,
    },
  },
  sepia: {
    type: 'numberInput',
    initial: 0,
    options: {
      label: '深褐色',
      step: 0.1,
    },
  },
};
