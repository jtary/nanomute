const grammer = {
    'lex': {
        'macros': {
            'int': '-?(?:[0-9]|[1-9][0-9]+)',
            'exp': '(?:[eE][-+]?[0-9]+)',
            'frac': '(?:\\.[0-9]+)'
        },

        'rules': [
            ['\\s+', '/* skip whitespace */'],
            ['{int}{frac}?{exp}?\\b', 'return \'NUMBER\''],
            ['\\(', 'return \'(\''],
            ['\\)', 'return \')\''],
            [',', 'return \',\''],
            ['true\\b', 'return \'TRUE\''],
            ['false\\b', 'return \'FALSE\''],
            ['and\\b', 'return \'AND\''],
            ['or\\b', 'return \'OR\''],
            ['[A-Za-z0-9._-]+', 'return \'STRING\'']
        ]
    },

    'start': 'Expression',

    'bnf': {
        'StringValue': [
            ['STRING', '$$ = String($1)']
        ],

        'NumberValue': [
            ['NUMBER', '$$ = Number($1)']
        ],

        'BooleanValue': [
            ['TRUE', '$$ = true'],
            ['FALSE', '$$ = false']
        ],

        'ParamValue': [
            'NumberValue',
            'StringValue',
            'BooleanValue'
        ],

        'ParamList': [
            'ParamValue',
            ['ParamList , ParamValue', '$$ = [$1, $3]']
        ],

        'Operation': [
            ['StringValue ( ParamList )', '$$ = yy.resolve($1, $3)']
        ],

        'Expression': [
            ['Operation', 'return $$'],
            ['Expression AND Operation', '$$ = $1 && $3'],
            ['Expression OR Operation', '$$ = $1 || $3']
        ],
    }
}

module.exports = grammer