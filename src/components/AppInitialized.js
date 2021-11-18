import functionSocket from '../sockets/function';

export default class AppInitialized extends Rete.Component {
  constructor() {
    super('app.initialized()');
  }

  builder(node) {
    const outSuccess = new Rete.Output('success', 'Success', functionSocket);
    const outErr = new Rete.Output('err', 'Error', functionSocket);
    return node.addOutput(outSuccess).addOutput(outErr);
  }

  worker(node, inputs, outputs) {}
}
