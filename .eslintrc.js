module.exports =  {
    'env': {
        'browser':true, 
        'es6':true
    }, 
    'extends':'eslint:recommended', 
    'globals': {
        'Atomics':'readonly', 
        'SharedArrayBuffer':'readonly'
    }, 
    'parserOptions': {
        'ecmaVersion':2018, 
        'sourceType':'module'
    }, 
    'rules': {
        'indent':[
            'error', 
            4
        ], 
        'linebreak-style':[
            'error', 
            'windows'
        ], 
        'quotes':[
            'error', 
            'single'
        ], 
        'semi':[
            'error', 
            'always'
        ], 
        'padded-blocks':
        ['error', 
        'never'
        ], 

		'camelcase':2, 
        'keyword-spacing':2, 
        'space-infix-ops':2, 
        'comma-spacing':2, 
        'space-before-blocks':2, 
        'spaced-comment':2, 
        'key-spacing':2, 
        'no-multi-spaces':2, 
        'space-in-parens':2, 
        'space-before-function-paren':2, 
        'func-call-spacing':2, 
        'no-multiple-empty-lines':2, 
        'no-floating-decimal':2, 
        'object-property-newline':2, 
        'brace-style':2, 
        'eqeqeq':2
	    }
    }; 
