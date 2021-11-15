import functionSocket from '../../sockets/function';

export default class TicketReplyClick extends Rete.Component {
  constructor() {
    super('ticket.replyClick');
  }

  builder(node) {
    const out = new Rete.Output('out', 'Function', functionSocket);

    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    // const str = inputs['str'].length ? inputs['str'][0] : node.data.str;
    // console.log(str);
  }

  code(node, inputs, add) {
    add(`client.events.on("ticket.replyClick", (event) => {
	${''}
    });
    `);
  }
}
