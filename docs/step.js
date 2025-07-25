{const KEYWORD = {
  scope: 'keyword',
  beginKeywords: 'set initially now'
  
};

const BLOCKEND = { 
  scope: 'title',
  begin: '^\\[end\\]',
  end: '$'
};

const DECLARATION = {
  scope: 'keyword',
  begin: '^\\[[^A-Z"0-9]',
  end: '$'
};

const QUOTED_STRING = {
  scope: 'string',
  begin: '"',
  end: '"'
};

const SMARTY_PANTS_QUOTED_STRING = {
  scope: 'string',
  begin: '\\u201c',
  end: '\\u201d'
};

const PIPE_STRING = {
  scope: 'string',
  begin: '\\|[^ ]',
  end: '\\|'
};

const SYMBOL_STRING = {
  scope: 'string',
  begin: '[a-z][a-zA-Z0-9_]*',
};

const OPERATOR = {
  scope: 'operator',
  begin: '\\|[ \\?]',
};

const GLOBAL_VARIABLE = {
  scope: 'variable',
  begin: '[A-Z]\\w*'
};

const LOCAL_VARIABLE = {
  scope: 'variable',
  begin: '\\?\\w*'
};

const COMMENT = hljs.HASH_COMMENT_MODE;

const GENERAL_VALUE = [
  QUOTED_STRING,
  SMARTY_PANTS_QUOTED_STRING,
  PIPE_STRING,
  SYMBOL_STRING,
  OPERATOR,
  GLOBAL_VARIABLE,
  LOCAL_VARIABLE
]

const TUPLE = {
  begin: '\\[',
  beginScope: 'variable',
  end: '\\]',
  endScope: 'variable',
  scope: 'literal',
  contains: GENERAL_VALUE
};

GENERAL_VALUE.push(TUPLE);

const FEATURE_NAME = {
  match: '[a-zA-Z0-9]+:',
  scope: 'built_in'
}

const FEATURE_STRUCTURE = {
  begin: '{',
  beginScope: 'variable',
  scope: 'literal',
  end: '\\}',
  endScope: 'variable',
  contains: [FEATURE_NAME, GENERAL_VALUE]
}

GENERAL_VALUE.push(FEATURE_STRUCTURE)

const CALL = {
  begin: ' \\[ *',
  scope: 'variable',
  end: '\\]',
  endsWithParent: true,
  contains: [
    KEYWORD,
    TUPLE,
    QUOTED_STRING,
    SMARTY_PANTS_QUOTED_STRING,
    PIPE_STRING,
    SYMBOL_STRING,
    OPERATOR,
    GLOBAL_VARIABLE,
    LOCAL_VARIABLE
  ]
};

const TOPLEVELCALL = {
  begin: '^\\[',
  scope: 'variable',
  end: '$',
  contains: [
    KEYWORD,
    TUPLE,
    FEATURE_STRUCTURE,
    QUOTED_STRING,
    SMARTY_PANTS_QUOTED_STRING,
    PIPE_STRING,
    SYMBOL_STRING,
    OPERATOR,
    GLOBAL_VARIABLE,
    LOCAL_VARIABLE,
    CALL
  ]
};

const VARIABLE_INTERPOLATION = {
  match: "[\\?\\^][a-zA-Z0-9_/\\+]+",
  scope: "variable"
};

const SINGLE_LINE_BODY = {
  scope: 'string',
  begin: ':',
  beginScope: 'string',
  end: '$',
  contains: [ CALL, VARIABLE_INTERPOLATION ]
}

const METHOD_NAME = {
  scope: 'title.function',
  begin: '[A-Z][a-zA-Z0-9_]*',
}

const TASK_DECLARATION = {
  beginKeywords: 'fluent task predicate',
  beginScope: 'keyword',
  end: '$',
  contains: [ METHOD_NAME, LOCAL_VARIABLE ]
}

const MULTILINE_BODY = {
  scope: 'string',
  begin: '^[  ]',
  beginScope: 'punctuation',
  end: '$',
  endScope: 'title.function',
  contains: [ CALL, VARIABLE_INTERPOLATION ]
}

const METHOD_DECLARATION = {
  scope: 'title.function',
  begin: '[A-Z][a-zA-Z0-9_]*',
  contains: [
    SINGLE_LINE_BODY,
    MULTILINE_BODY
  ]
}

const PRIORITIZED_METHOD = {
  begin: '\\[[0-9\\.]+\\] ',
  beginScope: 'keyword',
  end: '$',
  contains: [
    METHOD_DECLARATION
  ]
}

hljs.registerLanguage('step', function() {
    return {
      keywords: {
          meta: 'predicate task randomly generator fallable',
          keyword: 'end set now initially',
          literal: ['false','true','null'],
      },
      scope: 'meta',
      contains: [
        KEYWORD,
        {
          scope: 'title.function',
          begin: '^[A-Z][a-zA-Z0-9_]*',
        },
        BLOCKEND,
        PRIORITIZED_METHOD,
        TASK_DECLARATION,
        DECLARATION,
        TOPLEVELCALL,
        FEATURE_STRUCTURE,  
        TUPLE,
        QUOTED_STRING,
        SMARTY_PANTS_QUOTED_STRING,
        PIPE_STRING,
        SYMBOL_STRING,
        OPERATOR,
        GLOBAL_VARIABLE,
        LOCAL_VARIABLE,
        COMMENT,
        SINGLE_LINE_BODY,
        MULTILINE_BODY
      ]
    }
  })
}