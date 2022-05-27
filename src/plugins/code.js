import { print } from 'recast';

import getAstForInterfaceMethod from './getAstForInterfaceMethod';
import getAstForAppInit from './getAstForAppInit';
import getAstForEvents from './getAstForEvents';

import getShowDialogProperties from './getShowDialogProperties';
import getShowModalProperties from './getShowModalProperties';
import getShowConfirmProperties from './getShowConfirmProperties';
import getShowNotifyProps from './getShowNotifyProps';
import getNavigateTicketProps from './getNavigateTicketProps';
import getNavigateContactProps from './getNavigateContactProps';

function genCodeForOutputNodes(node, data) {
  let nodes = [];
  try {
    const { outputs } = node;
    for (const out in outputs) {
      const { connections } = outputs[out];
      let temp = connections.map((c) => {
        const { node } = c;
        const name = data.nodes[node].name;
        switch (name) {
          case 'Show Modal':
          case 'Show Dialog':
          case 'Show Confirm':
          case 'Show Notify':
          case 'Navigate to Contact Details Page':
          case 'Navigate to Ticket Details Page':
            return genCodeInterfaceMethods(name, node, data);

          default:
            console.error('(gencodeforoutputnodes) Not handled: ', node.name);
            return '';
        }
      });
      nodes.push(temp);
    }
  } catch (e) {
    console.log(e);
  }

  return nodes;
}
function genCodeEventMethod(node, data) {
  const astNode = getAstForEvents(node.name);

  const childNodes = genCodeForOutputNodes(node, data);
  const body = astNode.expression.arguments[1].body.body;
  childNodes.flat().forEach((n) => body.push(n));

  return astNode;
}

function getAppInitCode(node, data) {
  const astNode = getAstForAppInit();
  const nodes = genCodeForOutputNodes(node, data);
  const body = astNode.expression.arguments[0].body.body;
  nodes.flat().forEach((node) => body.push(node));
  return astNode;
}

function genCodeInterfaceMethods(method, node, data) {
  const astNode = getAstForInterfaceMethod(method);

  const childNodes = genCodeForOutputNodes(node, data);
  console.log(childNodes);
  const body = astNode.expression.callee.object.arguments[0].body.body;
  childNodes.flat().forEach((n) => body.push(n));

  const _arguments = astNode.expression.callee.object.callee.object.arguments;

  switch (method) {
    case 'Show Modal':
      _arguments.push(getShowModalProperties('Sample Modal', 'modal.html'));
      break;

    case 'Show Dialog':
      _arguments.push(getShowDialogProperties('Sample Dialog', 'dialog.html'));

      break;

    case 'Show Confirm':
      _arguments.push(
        getShowConfirmProperties(
          'Sample Confirm',
          'Are you sure you want to close this ticket?'
        )
      );
      break;

    case 'Show Notify':
      _arguments.push(getShowNotifyProps('success', 'Sample notification'));
      break;

    case 'Navigate to Contact Details Page':
      _arguments.push(getNavigateContactProps(1));
      break;

    case 'Navigate to Ticket Details Page':
      _arguments.push(getNavigateTicketProps(1));
      break;

    default:
      console.log('unknown interface method');
  }

  return astNode;
}

export async function generate(engine, data) {
  let ast = {
    program: {
      type: 'Program',
      body: [],
      sourceType: 'script',
      errors: [],
    },
    name: null,
    type: 'File',
    comments: null,
  };

  let body = ast.program.body;

  for (const key in data.nodes) {
    const node = data.nodes[key];
    switch (node.name) {
      case 'ticket.replyClick':
      case 'ticket.sendReply':
      case 'ticket.forwardClick':
      case 'ticket.conversationForward':
      case 'ticket.forward':
      case 'ticket.notesClick':
      case 'ticket.addNote':
      case 'ticket.closeTicketClick':
        body.push(genCodeEventMethod(node, data));
        break;

      case 'app.initialized()':
        body.push(getAppInitCode(node, data));
        break;

      default:
        console.log('Not handled: ', node.name);
    }
  }

  return print(ast).code;
}
