import jsonSocket from '../sockets/json';
import anyTypeSocket from '../sockets/any';

export default class AssocComponent extends Rete.Component {
  constructor() {
    super("assoc");
  }

  builder(node) {
    const inp1 = new Rete.Input('json', 'JSON', jsonSocket);
    const out1 = new Rete.Output('str', "Any", anyTypeSocket);

    return node
      .addControl(new UrlControl(this.editor, 'path'))
      .addInput(inp1)
      .addOutput(out1);
    
  }

  worker(node, inputs, outputs) {
    const _obj = inputs['json'][0];
    outputs['str'] = _.get(_obj, node.data.path);
  }
}
