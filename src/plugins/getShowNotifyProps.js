export default function (type, message) {
  return {
    type: 'ObjectExpression',
    properties: [
      {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'type',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: type,
          raw: `'${type}'`,
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
      {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'message',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: message,
          raw: `'${message}'`,
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
    ],
  };
}
