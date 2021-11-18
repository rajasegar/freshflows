function genCodeForOutputNodes(node, data) {
  let code = '';
  try {
    const {
      outputs: {
        out: { connections },
      },
    } = node;

    code = connections
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
    case 'showModal':
      opts = {
        title: 'Sample Modal',
        template: 'modal.html',
        data: { name: 'James', email: 'James@freshdesk.com' },
      };
      break;

    case 'showDialog':
      opts = {
        title: 'Sample Dialog',
        template: 'dialog.html',
      };
      break;

    case 'showConfirm':
      opts = {
        title: 'Sample Confirm',
        message: 'Are you sure you want to close this ticket?',
      };
      break;

    case 'showNotify':
      opts = {
        type: 'success',
        message: 'Sample notification',
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

  console.log(data);
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
        code += genCodeInterfaceMethods(node.name, node, data);
        break;

      default:
        console.error('Not handled: ', node.name);
    }
  }

  return code;
}
