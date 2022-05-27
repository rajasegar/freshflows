export default function () {
  const astNode = {
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
              type: 'Identifier',
              name: 'app',
            },
            property: {
              type: 'Identifier',
              name: 'initialized',
            },
          },
          arguments: [],
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
              name: 'client',
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
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'console',
                    },
                    property: {
                      type: 'Identifier',
                      name: 'log',
                    },
                  },
                  arguments: [],
                },
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
