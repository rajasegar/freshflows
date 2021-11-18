import functionSocket from '../sockets/function';

export default class AppInitialized extends Rete.Component {
  constructor() {
    super('app.initialized()');
  }

  builder(node) {
    const out = new Rete.Output('out', 'Function', functionSocket);
    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {}
}
