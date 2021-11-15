import functionSocket from '../sockets/function';

export default class EventMethod extends Rete.Component {
  constructor(name) {
    super(name);
    this.data.path = 1;
  }

  builder(node) {
    const out = new Rete.Output('out', 'Function', functionSocket);
    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {}
}
