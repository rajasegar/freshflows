export default function (method) {
  let astNode = {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
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
                    name: 'interface',
                  },
                },
                property: {
                  type: 'Identifier',
                  name: 'trigger',
                },
              },
              arguments: [
                {
                  type: 'Literal',
                  value: method,
                  raw: `'${method}'`,
                },
              ],
            },
            property: {
              type: 'Identifier',
              name: 'then',
            },
          },
          arguments: [
            {
              type: 'FunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'data',
                },
              ],
              body: {
                type: 'BlockStatement',
                body: [],
                comments: [
                  {
                    type: 'Line',
                    value: ' data - success message',
                    leading: false,
                    trailing: false,
                  },
                ],
              },
              generator: false,
              expression: false,
              async: false,
            },
          ],
        },
        property: {
          type: 'Identifier',
          name: 'catch',
        },
      },
      arguments: [
        {
          type: 'FunctionExpression',
          id: null,
          params: [
            {
              type: 'Identifier',
              name: 'error',
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [],
            comments: [
              {
                type: 'Line',
                value: ' error - error object',
                leading: false,
                trailing: false,
              },
            ],
          },
          generator: false,
          expression: false,
          async: false,
        },
      ],
    },
  };

  return astNode;
}
