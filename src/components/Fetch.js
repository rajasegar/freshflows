import UrlControl from '../controls/UrlControl';
import jsonSocket from '../sockets/json';

export default class FetchComponent extends Rete.Component {

    constructor(){
        super("fetch");
    }

    builder(node) {
        var out1 = new Rete.Output('json', "JSON", jsonSocket);

        return node.addControl(new UrlControl(this.editor, 'json')).addOutput(out1);
    }

  async worker(node, inputs, outputs) {
    if(node.data.json) {
      // _.debounce(async () => {

        const response = await fetch(`https://api.github.com/users/${node.data.json}`);
        const data = await response.json();
        outputs['json'] = data;
        
      // }, 2000)
      
    } else {
      outputs['json'] = {};
    }
  }
}
