import numSocket from '../sockets/num';
import NumControl from '../controls/NumControl';

export default class AddComponent extends Rete.Component {
  constructor() {
    super('Add');
  }

  builder(node) {
    var inp1 = new Rete.Input('num', 'Number', numSocket);
    var inp2 = new Rete.Input('num2', 'Number2', numSocket);
    var out = new Rete.Output('num', 'Number', numSocket);

    inp1.addControl(new NumControl(this.editor, 'num'));
    inp2.addControl(new NumControl(this.editor, 'num2'));

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new NumControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs['num'].length ? inputs['num'][0] : node.data.num1;
    var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
    var sum = n1 + n2;

    this.editor.nodes
      .find((n) => n.id == node.id)
      .controls.get('preview')
      .setValue(sum);
    outputs['num'] = sum;
  }

  code(node, inputs, add) {
    // 'node' param is similar to worker's "node"
    // "inputs" contains variables name
    add('const addNum = number1num + number2num;'); // add code line
    add('console.log(addNum)'); // add variable with value "node.data.num"
  }
}
