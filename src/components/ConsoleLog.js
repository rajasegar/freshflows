import anyTypeSocket from '../sockets/any';

export default class ConsoleLogComponent extends Rete.Component {
  constructor() {
    super("console.log");
  }

  builder(node) {
    const inp1 = new Rete.Input('str', "Any", anyTypeSocket);

    return node
      .addInput(inp1);
    
  }

  worker(node, inputs, outputs) {

    const str = inputs['str'].length ? inputs['str'][0] : node.data.str;
    console.log(str);
    
  }
}
