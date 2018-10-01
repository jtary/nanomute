const grammer = {
    'comment': 'Nanomute gammer.',
    'author': 'Joseph Tary',

    'lex': {
        'macros': {
            'digit': '[0-9]',
            'esc': '\\\\',
            'int': '-?(?:[0-9]|[1-9][0-9]+)',
            'exp': '(?:[eE][-+]?[0-9]+)',
            'frac': '(?:\\.[0-9]+)'
        },
        'rules': [
            ['\\s+', '/* skip whitespace */'],
            ['{int}{frac}?{exp}?\\b', 'return \'NUMBER\';'],
            ['\\(', 'return \'(\''],
            ['\\)', 'return \')\''],
            [',', 'return \',\''],
            ['true\\b', 'return \'TRUE\''],
            ['false\\b', 'return \'FALSE\''],
            ['[A-Za-z0-9._-]+', 'return \'STRING\'']
        ]
    },

    'tokens': 'STRING NUMBER ( ) , TRUE FALSE',
    'start': 'Expression',

    'bnf': {
        'StringValue': [['STRING', '$$ = String($1)']],

        'NumberValue': [[ 'NUMBER', '$$ = Number($1)' ]],

        'BooleanValue': [
            ['TRUE', '$$ = true'],
            ['FALSE', '$$ = false']
        ],

        'Operation': [
            ['StringValue ( ParamList )', 'return yy.OP[$1].apply(null, [yy.scope].concat($3))']
        ],

        'Expression': [
            'Operation',
            'Expression and Operation',
            'Expression or Operation'
        ],

        'ParamValue': [
            'NumberValue',
            'StringValue',
            'BooleanValue'
        ],

        'ParamList': [
            'ParamValue',
            ['ParamList , ParamValue', '$$ = [$1, $3]']
        ]
    }
}

module.exports = grammer