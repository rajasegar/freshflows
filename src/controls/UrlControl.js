import VueUrlControl from './VueUrlControl';

export default class UrlControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueUrlControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
