import functionSocket from '../sockets/function';

export default class EventMethod extends Rete.Component {
  constructor(name, path) {
    super(name);
    this.data.path = path;
  }

  builder(node) {
    const out = new Rete.Output('out', 'Function', functionSocket);
    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {}
}
