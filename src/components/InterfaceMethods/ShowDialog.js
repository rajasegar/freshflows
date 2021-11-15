import functionSocket from '../../sockets/function';
import TextControl from '../../controls/TextControl';

export default class ShowDialog extends Rete.Component {
  constructor() {
    super('Show Dialog');
  }

  builder(node) {
    var inp1 = new Rete.Input('callback', 'Function', functionSocket);
    var outThen = new Rete.Output('then', 'Then', functionSocket);
    var outCatch = new Rete.Output('catch', 'Catch', functionSocket);

    // inp1.addControl(new NumControl(this.editor, 'num'));
    // inp2.addControl(new NumControl(this.editor, 'num2'));

    return node
      .addInput(inp1)
      .addControl(new TextControl(this.editor, 'title', true))
      .addControl(new TextControl(this.editor, 'template', true))
      .addOutput(outThen)
      .addOutput(outCatch);
  }

  worker(node, inputs, outputs) {
    /*
    var n1 = inputs['num'].length ? inputs['num'][0] : node.data.num1;
    var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
    var sum = n1 + n2;

    this.editor.nodes
      .find((n) => n.id == node.id)
      .controls.get('preview')
      .setValue(sum);
    outputs['num'] = sum;
    */
  }

  code(node, inputs, add) {
    add(`client.interface.trigger("showModal", {
  title: "Sample Modal",
  template: "modal.html"
}).then(function(data) {
// data - success message
}).catch(function(error) {
// error - error object
});`);
  }
}
