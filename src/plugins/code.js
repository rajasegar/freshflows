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

export async function generate(engine, data) {
  let code = '';

  console.log(data);
  const rootNode = data.nodes['1'];
  switch (rootNode.name) {
    case 'ticket.replyClick':
      code = genCodeTicketReplyClick(rootNode, data);
      break;
    default:
      console.error('Not handled: ', rootNode);
  }
  /*
  Array.from(engine.components.values()).forEach((c) => {
    c = Object.assign(Object.create(Object.getPrototypeOf(c)), c);

    c.worker = (node, inputs, outputs) => {
      function add(name, expression) {
        if (!expression) {
          file += `${name};\n`;
          return;
        }

        const varName = `${getVarName(node)}${name}`;

        file += `const ${varName} = ${expression};\n`;
        outputs[name] = varName;
      }
      c.code(node, inputs, add);
    };
    c.worker.bind(c);

    engine.components.set(c.name, c);
  });
  */

  // await engine.process(data);

  return code;
}
