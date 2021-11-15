import './style.css';

import NumComponent from './src/components/NumComponent';
import FetchComponent from './src/components/Fetch';
import AddComponent from './src/components/Add';
import MultiplyComponent from './src/components/Multiply';
import ConsoleLogComponent from './src/components/ConsoleLog';
import AssocComponent from './src/components/Assoc';
import JSONComponent from './src/components/Json';

// Interface methods
import ShowModalComponent from './src/components/InterfaceMethods/ShowModal';
import ShowDialogComponent from './src/components/InterfaceMethods/ShowDialog';
import CloseModalComponent from './src/components/InterfaceMethods/CloseModal';
import NavigateToTicketDetailsPage from './src/components/InterfaceMethods/NavigateToTicketDetailsPage';
import NavigateToContactDetailsPage from './src/components/InterfaceMethods/NavigateToContactDetailsPage';
import ShowNotifications from './src/components/InterfaceMethods/ShowNotifications';
import ShowConfirm from './src/components/InterfaceMethods/ShowConfirm';

// Event Methods
import EventMethod from './src/components/EventMethod';

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

    // Interface Methods
    new ShowModalComponent(),
    new ShowDialogComponent(),
    new CloseModalComponent(),
    new ShowConfirm(),
    new ShowNotifications(),
    new NavigateToContactDetailsPage(),
    new NavigateToTicketDetailsPage(),

    // Events methods
    new EventMethod('ticket.replyClick'),
    new EventMethod('ticket.sendReply'),
    new EventMethod('ticket.forwardClick'),
    new EventMethod('ticket.conversationForward'),
    new EventMethod('ticket.forward'),
    new EventMethod('ticket.notesClick'),
    new EventMethod('ticket.addNote'),
    new EventMethod('ticket.closeTicketClick'),
    new EventMethod('ticket.deleteTicketClick'),
    new EventMethod('ticket.previousTicketClick'),
    new EventMethod('ticket.nextTicketClick'),
    new EventMethod('ticket.startTimer'),
    new EventMethod('ticket.stopTimer'),
    new EventMethod('ticket.updateTimer'),
    new EventMethod('ticket.deleteTimer'),
  ];

  var editor = new Rete.NodeEditor('demo@0.1.0', container);
  editor.use(ConnectionPlugin.default);
  editor.use(VueRenderPlugin.default);
  editor.use(ContextMenuPlugin.default, {
    allocate(component) {
      if (component.data.path == 1) {
        return ['Event Methods'];
      }
      if (component.data.path == 2) {
        return ['Interface Methods'];
      }
    },
  });
  editor.use(AreaPlugin);

  var engine = new Rete.Engine('demo@0.1.0');

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  var n1 = await new EventMethod('ticket.replyClick').createNode();

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
