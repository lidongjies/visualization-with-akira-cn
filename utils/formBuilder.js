/* eslint-disable no-restricted-syntax */
import Event from './event.js';

class FormBuilder extends Event {
  constructor(config) {
    super();
    this.store = {};
    this.config = this.makeConfig(config);
    this.controKit = new ControlKit();
  }

  generateChangeFun(key) {
    const that = this;
    const handler = {
      apply(targetFun, context, argumentList) {
        targetFun.apply(context, argumentList);
      },
    };
    function onChange(val) {
      that.store[key] = val;
    }
    return new Proxy(onChange, handler);
  }

  makeConfig(config) {
    const that = this;
    const handler = {
      get(target, key) {
        if (key.endsWith('Range')) {
          const filed = key.replace('Range', '');
          return target[filed].range;
        }

        if (key.endsWith('Options')) {
          const field = key.replace('Options', '');
          const { options } = target[field];
          if (!options.onChange) {
            options.onChange = that.generateChangeFun(field);
          }
          return options;
        }

        if (key.endsWith('FormItem')) {
          const field = key.replace('FormItem', '');
          return target[field];
        }

        const initialValue = target[key].initial;
        if (!that.store[key]) {
          that.store[key] = initialValue;
        }
        return initialValue;
      },
      set(_, key, value) {
        that.store[key] = value;
        that.trigger('change', { store: that.store, key, value });
      },
    };

    const formConfig = new Proxy(config, handler);
    Object.keys(formConfig).forEach((key) => formConfig[key]);
    return formConfig;
  }

  build() {
    const panel = this.controKit.addPanel().addGroup().addSubGroup();
    const { config } = this;

    for (const key of Object.keys(config)) {
      const formItem = this.config[`${key}FormItem`];

      if (formItem.group) {
        panel.addGroup();
        panel.addSubGroup();
      }
      if (formItem.subGroup) {
        panel.addSubGroup();
      }

      switch (formItem.type) {
        case 'numberInput':
          panel.addNumberInput(config, key, config[`${key}Options`]);
          break;
        case 'slider':
          panel.addSlider(config, key, `${key}Range`, config[`${key}Options`]);
          break;
        default:
          break;
      }
    }
  }
}

export default FormBuilder;
