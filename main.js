import './style.css';

import NumComponent from './src/components/NumComponent';
import FetchComponent from './src/components/Fetch';
import AddComponent from './src/components/Add';
import MultiplyComponent from './src/components/Multiply';
import ConsoleLogComponent from './src/components/ConsoleLog';
import AssocComponent from './src/components/Assoc';
import JSONComponent from './src/components/Json';
import ShowModalComponent from './src/components/ShowModal';
import TicketReplyClick from './src/components/Events/TicketReplyClick';
import ShowDialogComponent from './src/components/InterfaceMethods/ShowDialog';

import { generate } from './src/plugins/code';

(async () => {
  var container = document.querySelector('#rete');
  var components = [
    new NumComponent(),
    new AddComponent(),
    new MultiplyComponent(),
    new ConsoleLogComponent(),
    new FetchComponent(),
    new AssocComponent(),
    new JSONComponent(),
    new ShowModalComponent(),
    new TicketReplyClick(),
    new ShowDialogComponent(),
  ];

  var editor = new Rete.NodeEditor('demo@0.1.0', container);
  editor.use(ConnectionPlugin.default);
  editor.use(VueRenderPlugin.default);
  editor.use(ContextMenuPlugin.default);
  editor.use(AreaPlugin);

  var engine = new Rete.Engine('demo@0.1.0');

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  var n1 = await new TicketReplyClick().createNode();

  var n2 = await new ShowDialogComponent().createNode();

  n1.position = [80, 200];
  n2.position = [400, 200];

  editor.addNode(n1);
  editor.addNode(n2);

  editor.connect(n1.outputs.get('out'), n2.inputs.get('callback'));

  editor.on(
    'process nodecreated noderemoved connectioncreated connectionremoved',
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
      const sourceCode = await generate(engine, editor.toJSON());
      console.log(sourceCode);
    }
  );

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger('process');
})();
