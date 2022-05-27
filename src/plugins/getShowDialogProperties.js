export default function getShowDialogProperties(title, template) {
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
    ],
  };
}
