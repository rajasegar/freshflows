export default function (id) {
  return {
    type: 'ObjectExpression',
    properties: [
      {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'id',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: 'contact',
          raw: '"contact"',
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
      {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'value',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: id,
          raw: `'${id}'`,
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
    ],
  };
}
