import functionSocket from '../../sockets/function';
import NumControl from '../../controls/NumControl';

export default class NavigateToContactDetailsPage extends Rete.Component {
  constructor() {
    super('Navigate to Contact Details Page');
    this.data.path = 2;
  }

  builder(node) {
    var inp1 = new Rete.Input('callback', 'Function', functionSocket);
    var outThen = new Rete.Output('then', 'Then', functionSocket);
    var outCatch = new Rete.Output('catch', 'Catch', functionSocket);

    return node
      .addInput(inp1)
      .addControl(new NumControl(this.editor, 'id', true))
      .addOutput(outThen)
      .addOutput(outCatch);
  }

  worker(node, inputs, outputs) {}
}
