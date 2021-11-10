import jsonSocket from '../sockets/json';

export default class JSONComponent extends Rete.Component {
  constructor() {
    super('json');
  }

  builder(node) {
    const out1 = new Rete.Output('json', 'JSON', jsonSocket);
    return node.addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs['json'] = {
      name: 'Rajasegar',
      age: 20,
      admin: false,
      address: {
        street: 'Kaveri nagar',
        state: 'TamilNadu',
        district: 'Chennai'
      }
    };
  }
}
