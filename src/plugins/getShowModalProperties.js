export default function (title, template) {
  return {
    type: 'ObjectExpression',
    properties: [
      {
        type: 'Property',
        key: {
          type: 'Literal',
          value: 'title',
          raw: '"title"',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: title,
          raw: `'${title}'`,
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
      {
        type: 'Property',
        key: {
          type: 'Literal',
          value: 'template',
          raw: '"template"',
        },
        computed: false,
        value: {
          type: 'Literal',
          value: template,
          raw: `'${template}'`,
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
      {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'data',
        },
        computed: false,
        value: {
          type: 'ObjectExpression',
          properties: [
            {
              type: 'Property',
              key: {
                type: 'Identifier',
                name: 'name',
              },
              computed: false,
              value: {
                type: 'Literal',
                value: 'James',
                raw: '"James"',
              },
              kind: 'init',
              method: false,
              shorthand: false,
            },
            {
              type: 'Property',
              key: {
                type: 'Identifier',
                name: 'email',
              },
              computed: false,
              value: {
                type: 'Literal',
                value: 'James@freshdesk.com',
                raw: '"James@freshdesk.com"',
              },
              kind: 'init',
              method: false,
              shorthand: false,
            },
          ],
        },
        kind: 'init',
        method: false,
        shorthand: false,
      },
    ],
  };
}
