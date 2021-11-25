function genCodeForOutputNodes(node, data) {
  let code = '';
  try {
    const { outputs } = node;
    for (const out in outputs) {
      const { connections } = outputs[out];
      code += connections
        .map((c) => {
          const { node } = c;
          const name = data.nodes[node].name;
          switch (name) {
            case 'Show Modal':
            case 'Show Dialog':
            case 'Show Confirm':
            case 'Show Notifications':
            case 'Navigate to Contact Details Page':
            case 'Navigate to Ticket Details Page':
              return genCodeInterfaceMethods(name, node, data);

            default:
              console.error('(gencodeforoutputnodes) Not handled: ', node.name);
              return '';
          }
        })
        .join('\n');
    }
  } catch (e) {
    console.log(e);
  }

  return code;
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

function genCodeAppInit(node, data) {
  let str = '';
  const body = genCodeForOutputNodes(node, data);
  str = `app.initialized().then(
    function(client)
    {
${body}
    },
    function(error)
    {
      //If unsuccessful
      console.log();
    }
  );
`;
  return str;
}

function genCodeInterfaceMethods(method, node, data) {
  let str = '';
  const body = genCodeForOutputNodes(node, data);
  let opts = {};
  switch (method) {
    case 'Show Modal':
      opts = {
        title: 'Sample Modal',
        template: 'modal.html',
        data: { name: 'James', email: 'James@freshdesk.com' },
      };
      break;

    case 'Show Dialog':
      opts = {
        title: 'Sample Dialog',
        template: 'dialog.html',
      };
      break;

    case 'Show Confirm':
      opts = {
        title: 'Sample Confirm',
        message: 'Are you sure you want to close this ticket?',
      };
      break;

    case 'Show Notify':
      opts = {
        type: 'success',
        message: 'Sample notification',
      };
      break;

    case 'Navigate to Contact Details Page':
      opts = {
        id: 'contact',
        value: 1,
      };
      break;

    case 'Navigate to Ticket Details Page':
      opts = {
        id: 'ticket',
        value: 1,
      };
      break;

    default:
      console.log('unknown interface method');
  }

  str = `
client.interface.trigger("${method}", 
${JSON.stringify(opts, null, 2)}
).then(function(data) {
// data - success message
${body}
}).catch(function(error) {
// error - error object
});
`;

  return str;
}

export async function generate(engine, data) {
  let code = '';

  for (const key in data.nodes) {
    const node = data.nodes[key];
    console.log(node.name);
    switch (node.name) {
      case 'ticket.replyClick':
      case 'ticket.sendReply':
      case 'ticket.forwardClick':
      case 'ticket.conversationForward':
      case 'ticket.forward':
      case 'ticket.notesClick':
      case 'ticket.addNote':
      case 'ticket.closeTicketClick':
        code += genCodeEventMethod(node, data);
        break;

      case 'app.initialized()':
        code += genCodeAppInit(node, data);
        break;

      case 'Show Modal':
      case 'Show Dialog':
      case 'Show Confirm':
      case 'Show Notifications':
      case 'Navigate to Contact Details Page':
      case 'Navigate to Ticket Details Page':
        code += genCodeInterfaceMethods(node.name, node, data);
        break;

      default:
        console.error('Not handled: ', node.name);
    }
  }

  return code;
}
