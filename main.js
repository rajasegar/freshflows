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

import AppInit from './src/components/AppInitialized';

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

    // App lifecycle
    new AppInit(),

    // Interface Methods
    new ShowModalComponent(),
    new ShowDialogComponent(),
    new CloseModalComponent(),
    new ShowConfirm(),
    new ShowNotifications(),
    new NavigateToContactDetailsPage(),
    new NavigateToTicketDetailsPage(),

    // Events methods
    new EventMethod('ticket.replyClick', 1),
    new EventMethod('ticket.sendReply', 1),
    new EventMethod('ticket.forwardClick', 1),
    new EventMethod('ticket.conversationForward', 1),
    new EventMethod('ticket.forward', 1),
    new EventMethod('ticket.notesClick', 1),
    new EventMethod('ticket.addNote', 1),
    new EventMethod('ticket.closeTicketClick', 1),
    new EventMethod('ticket.deleteTicketClick', 1),
    new EventMethod('ticket.previousTicketClick', 1),
    new EventMethod('ticket.nextTicketClick', 1),
    new EventMethod('ticket.startTimer', 1),
    new EventMethod('ticket.stopTimer', 1),
    new EventMethod('ticket.updateTimer', 1),
    new EventMethod('ticket.deleteTimer', 1),

    // Global Method
    new EventMethod('cti.triggerDialer', 3),

    // Events methods - New Ticket Page

    new EventMethod('ticket.priorityChanged', 4),
    new EventMethod('ticket.statusChanged', 4),
    new EventMethod('ticket.groupChanged', 4),
    new EventMethod('ticket.agentChanged', 4),
    new EventMethod('ticket.typeChanged', 4),
  ];

  var editor = new Rete.NodeEditor('demo@0.1.0', container);
  editor.use(ConnectionPlugin.default);
  editor.use(VueRenderPlugin.default);
  editor.use(ContextMenuPlugin.default, {
    allocate(component) {
      if (component.data.path == 1) {
        return ['Event Methods', 'Ticket Details Page'];
      }
      if (component.data.path == 2) {
        return ['Interface Methods'];
      }
      if (component.data.path == 3) {
        return ['Event Methods', 'Global Method'];
      }
      if (component.data.path == 4) {
        return ['Event Methods', 'New Ticket Page'];
      }
    },
  });
  editor.use(AreaPlugin);

  var engine = new Rete.Engine('demo@0.1.0');

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  var n1 = await new AppInit().createNode();
  n1.readOnly = true;

  var n2 = await new ShowDialogComponent().createNode();
  const n3 = await new NavigateToTicketDetailsPage().createNode();

  n1.position = [80, 100];
  n2.position = [400, 100];
  n3.position = [800, 100];

  editor.addNode(n1);
  editor.addNode(n2);
  editor.addNode(n3);

  editor.connect(n1.outputs.get('success'), n2.inputs.get('callback'));
  editor.connect(n2.outputs.get('then'), n3.inputs.get('callback'));

  editor.on(
    'process nodecreated noderemoved connectioncreated connectionremoved',
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
      const sourceCode = await generate(engine, editor.toJSON());
      const code$ = document.getElementById('txtCode');
      code$.value = sourceCode;
    }
  );

  editor.view.resize();
  //AreaPlugin.zoomAt(editor);
  editor.trigger('process');
})();
