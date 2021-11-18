import { camel } from 'case';

function install(editor, params) {}

function getVarName(node) {
  return camel(`${node.name}${node.id}`);
}

function genCodeTicketReplyClick(node, data) {
  let str = '';
  const {
    outputs: {
      out: { connections },
    },
  } = node;
  const body = connections
    .map((c) => {
      const { node } = c;
      console.log(data.nodes[node].name);
      return `client.interface.trigger("showModal", {
  title: "Sample Modal",
  template: "modal.html"
}).then(function(data) {
// data - success message
}).catch(function(error) {
// error - error object
});`;
    })
    .join('\n');
  str = `client.events.on("ticket.replyClick", (event) => {
	${body}
    });
`;
  return str;
}

function genCodeForOutputNodes(node, data) {
  const {
    outputs: {
      out: { connections },
    },
  } = node;
  const body = connections
    .map((c) => {
      const { node } = c;
      console.log(data.nodes[node].name);
      return `client.interface.trigger("showModal", {
  title: "Sample Modal",
  template: "modal.html"
}).then(function(data) {
// data - success message
}).catch(function(error) {
// error - error object
});`;
    })
    .join('\n');

  return body;
}

function genCodeEventMethod(node, data) {
  let str = '';
  const body = genCodeForOutputNodes(node, data);
  str = `client.events.on("${node.name}", (event) => {
	${body}
    });
`;
  return str;
}

export async function generate(engine, data) {
  let code = '';

  console.log(data);
  const rootNode = data.nodes['1'];
  switch (rootNode.name) {
    case 'ticket.replyClick':
    case 'ticket.sendReply':
    case 'ticket.forwardClick':
    case 'ticket.conversationForward':
    case 'ticket.forward':
    case 'ticket.notesClick':
    case 'ticket.addNote':
    case 'ticket.closeTicketClick':
      // code = genCodeTicketReplyClick(rootNode, data);
      code = genCodeEventMethod(rootNode, data);
      break;
    default:
      console.error('Not handled: ', rootNode);
  }

  return code;
}
