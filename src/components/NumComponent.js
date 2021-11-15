import NumControl from '../controls/NumControl';
import numSocket from '../sockets/num';

export default class NumComponent extends Rete.Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    var out1 = new Rete.Output('num', 'Number', numSocket);

    return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }

  code(node, inputs, add) {
    // 'node' param is similar to worker's "node"
    // "inputs" contains variables name
    add('console.log("hello!")'); // add code line
    add('num', node.data.num); // add variable with value "node.data.num"
  }
}
