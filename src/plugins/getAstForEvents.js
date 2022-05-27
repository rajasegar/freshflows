export default function (name) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'client',
          },
          property: {
            type: 'Identifier',
            name: 'events',
          },
        },
        property: {
          type: 'Identifier',
          name: 'on',
        },
      },
      arguments: [
        {
          type: 'Literal',
          value: name,
          raw: `'${name}'`,
        },
        {
          type: 'ArrowFunctionExpression',
          id: null,
          params: [
            {
              type: 'Identifier',
              name: 'ev',
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [],
          },
          generator: false,
          expression: false,
          async: false,
        },
      ],
    },
  };
}
