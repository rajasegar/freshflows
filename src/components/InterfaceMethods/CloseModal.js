import functionSocket from '../../sockets/function';
import TextControl from '../../controls/TextControl';

export default class CloseModal extends Rete.Component {
  constructor() {
    super('Close Modal');
    this.data.path = 2;
  }

  builder(node) {
    var inp1 = new Rete.Input('callback', 'Function', functionSocket);
    var outThen = new Rete.Output('then', 'Then', functionSocket);
    var outCatch = new Rete.Output('catch', 'Catch', functionSocket);

    return node
      .addInput(inp1)
      .addControl(new TextControl(this.editor, 'title', true))
      .addControl(new TextControl(this.editor, 'template', true))
      .addOutput(outThen)
      .addOutput(outCatch);
  }

  worker(node, inputs, outputs) {}
}
