// file: /Users/brekk/madness/gambit/madlib_modules/MadDocCli/src/Main.mad
import {} from "./../../../__internals__.mjs"
export let _10f79_DictRBBlack = ({ __constructor: "DictRBBlack", __args: [  ] });
export let _10f79_DictRBRed = ({ __constructor: "DictRBRed", __args: [  ] });
export let _10f79_DictRBEmpty = ({ __constructor: "DictRBEmpty", __args: [  ] });
export let _10f79_DictRBNode = (a => b => c => d => e => ({ __constructor: "DictRBNode", __args: [ a, b, c, d, e ] }));
export let _10f79_LT = ({ __constructor: "LT", __args: [  ] });
export let _10f79_EQ = ({ __constructor: "EQ", __args: [  ] });
export let _10f79_GT = ({ __constructor: "GT", __args: [  ] });
export let _3d769_Loop = (a => ({ __constructor: "Loop", __args: [ a ] }));
export let _3d769_Done = (a => ({ __constructor: "Done", __args: [ a ] }));
export let _2e42b_Just = (a => ({ __constructor: "Just", __args: [ a ] }));
export let _2e42b_Nothing = ({ __constructor: "Nothing", __args: [  ] });
let _1e6e4___TimerId__ = ({ __constructor: "__TimerId__", __args: [  ] });
export let _1e6e4_Wish = (a => ({ __constructor: "Wish", __args: [ a ] }));
export let _77488_AddressAlreadyInUse = ({ __constructor: "AddressAlreadyInUse", __args: [  ] });
export let _77488_ArgumentListToLong = ({ __constructor: "ArgumentListToLong", __args: [  ] });
export let _77488_PermissionDenied = ({ __constructor: "PermissionDenied", __args: [  ] });
export let _77488_UnknownError = ({ __constructor: "UnknownError", __args: [  ] });
export let _42e19_Left = (a => ({ __constructor: "Left", __args: [ a ] }));
export let _42e19_Right = (a => ({ __constructor: "Right", __args: [ a ] }));
export let _a32d2_Loc = (a => b => c => ({ __constructor: "Loc", __args: [ a, b, c ] }));
export let _a32d2_Parser = (a => ({ __constructor: "Parser", __args: [ a ] }));
export let _a32d2_Error = (a => ({ __constructor: "Error", __args: [ a ] }));
export let _a32d2_Config = (a => ({ __constructor: "Config", __args: [ a ] }));
export let _1fda7_EmptyDoc = ({ __constructor: "EmptyDoc", __args: [  ] });
export let _1fda7_CharDoc = (a => ({ __constructor: "CharDoc", __args: [ a ] }));
export let _1fda7_TextDoc = (a => b => ({ __constructor: "TextDoc", __args: [ a, b ] }));
export let _1fda7_LineDoc = (a => ({ __constructor: "LineDoc", __args: [ a ] }));
export let _1fda7_CatDoc = (a => b => ({ __constructor: "CatDoc", __args: [ a, b ] }));
export let _1fda7_NestDoc = (a => b => ({ __constructor: "NestDoc", __args: [ a, b ] }));
export let _1fda7_UnionDoc = (a => b => ({ __constructor: "UnionDoc", __args: [ a, b ] }));
export let _1fda7_ColumnDoc = (a => ({ __constructor: "ColumnDoc", __args: [ a ] }));
export let _1fda7_NestingDoc = (a => ({ __constructor: "NestingDoc", __args: [ a ] }));
export let _1fda7_SEmpty = ({ __constructor: "SEmpty", __args: [  ] });
export let _1fda7_SChar = (a => b => ({ __constructor: "SChar", __args: [ a, b ] }));
export let _1fda7_SText = (a => b => c => ({ __constructor: "SText", __args: [ a, b, c ] }));
export let _1fda7_SLine = (a => b => ({ __constructor: "SLine", __args: [ a, b ] }));
let _936d2_HandlerId = ({ __constructor: "HandlerId", __args: [  ] });
let _936d2_NormalMode = ({ __constructor: "NormalMode", __args: [  ] });
let _936d2_RawMode = ({ __constructor: "RawMode", __args: [  ] });
let _91e6c_Constructor = (a => b => ({ __constructor: "Constructor", __args: [ a, b ] }));
let _91e6c_Unit = ({ __constructor: "Unit", __args: [  ] });
let _91e6c_Record = (a => ({ __constructor: "Record", __args: [ a ] }));
let _91e6c_Integer = (a => ({ __constructor: "Integer", __args: [ a ] }));
let _91e6c_Float = (a => ({ __constructor: "Float", __args: [ a ] }));
let _91e6c_Boolean = (a => ({ __constructor: "Boolean", __args: [ a ] }));
let _91e6c_Char = (a => ({ __constructor: "Char", __args: [ a ] }));
let _91e6c_Str = (a => ({ __constructor: "Str", __args: [ a ] }));
let _91e6c_DictionaryConstructor = (a => ({ __constructor: "DictionaryConstructor", __args: [ a ] }));
let _91e6c_ListConstructor = (a => ({ __constructor: "ListConstructor", __args: [ a ] }));
let _91e6c_TupleConstructor = (a => ({ __constructor: "TupleConstructor", __args: [ a ] }));
let _91e6c_Byte = (a => ({ __constructor: "Byte", __args: [ a ] }));
let _91e6c_ByteArray = (a => ({ __constructor: "ByteArray", __args: [ a ] }));
let _c8121_Handle = (a => ({ __constructor: "Handle", __args: [ a ] }));
export let _c8121_getCurrentWorkingDirectory__4 = (_ =>  { return process.cwd() } );

const buildEnvImpl = (dictFromList) => {
  let list = {}
  let start = list
  Object.keys(process.env).forEach((key) => {
    list = list.n = { v: [key, process.env[key]], n: null }
  }, {})
  return dictFromList(start.n)
}
;
let _c8121_envFFI__25 = a => buildEnvImpl(a);
let _c8121__exec__35 = (command => args => options => _1e6e4_Wish((bad => good =>  {
  let stdoutChunks = []
  let stderrChunks = []

  const env = {};
  const envItems = __listToJSArray__(options.env);
  envItems.forEach(([key, value]) => { env[key] = value; })

  const proc = prelude_spawn(
    command,
    __listToJSArray__(args),
    {
      cwd: options.cwd,
      env: { ...process.env, ...env },
    }
  )

  proc.stdout.on("data", (chunk) => {
    stdoutChunks.push(Buffer.from(chunk, 'binary'));
  })

  proc.stderr.on("data", (chunk) => {
    stderrChunks.push(Buffer.from(chunk, 'binary'));
  })

  proc.on('close', (code) => {
    const stdoutBuffer = Buffer.concat(stdoutChunks)
    const stderrBuffer = Buffer.concat(stderrChunks)

    const result = {
      exitCode: code,
      stdout: stdoutBuffer.toString(),
      stderr: stderrBuffer.toString(),
    }

    if (code === 0) {
      good(result)
    } else {
      bad(result)
    }
  });

  return () => {
    proc.stdin.pause();
    proc.stderr.pause();
    proc.kill();
  }
} )));

const makeArgs = () => {
  let list = {}
  let start = list
  Object.keys(process.argv.slice(0)).forEach((key) => {
    list = list.n = { v: process.argv[key], n: null }
  }, {})
  return {
    n: start.n.n.n,
    v: start.n.n.v
  }
}
;
export let _c8121_Argv__2 = 
  makeArgs()
;
;
;
;
;

import prelude_file_fs from "fs"
;
export let _c58c5_write__3 = (path => content => _1e6e4_Wish((bad => good =>  {
    const abortController = new AbortController()
    prelude_file_fs.writeFile(path, content, { signal: abortController.signal }, (err) => {
      if (err) {
        if (err.name !== "AbortError") {
          bad({ __constructor: "UnknownError", __args: [] })
        }
      }
      else {
        good(path)
      }
    })

    return () => {
      abortController.abort()
    }
  } )));
let _b6c60_MADLIB_MODULES_FOLDER__55 = `madlib_modules`;
let _b6c60_MADDOC_PACKAGE_FOLDER__54 = `MadDoc`;
let _b6c60_JS_BUNDLE_PATH__56 = `.docs/bundle.js`;
let _b6c60_HTML_TARGET_PATH__60 = `.docs/index.html`;
let _b6c60_CSS_TARGET_PATH__58 = `.docs/styles/main.css`;

import prelude_terminal_readline from "readline"
;
 let readLineInterface = null ;
;
;
;
;

import prelude_readline from "readline"
;
export let _9bab1_putLine__15 = (a =>  { console.log(a) } );
export let _3d769_always__77 = (a => _ => a);
export let _3d769_always__74 = (a => _ => a);
export let _31104_reduceLeft__31 = (f => acc => dict => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$dict = dict;

    while($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $dict = $$dict;

        $_continue_ = false;
        ((__x__) => {
  if (__x__.__constructor === "DictRBEmpty") {
    ($_result_ = $acc);
  }
  else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
    let k = __x__.__args[1];
    let v = __x__.__args[2];
    let left = __x__.__args[3];
    let right = __x__.__args[4];
    ($$f = $f, $$acc = $f(k)(v)(_31104_reduceLeft__31($f)($acc)(left)), $$dict = right, $_continue_ = true);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($dict)
    }
    return $_result_;
});
export let _2e42b_fromMaybe__7 = (or => __W__1 => ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let a = __x__.__args[0];
    return a;
  }
  else if (__x__.__constructor === "Nothing") {
    return or;
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(__W__1));
export let _1e6e4_map__85 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run(badCB)((x => goodCB(f(x))));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_map__81 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run(badCB)((x => goodCB(f(x))));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_map__78 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run(badCB)((x => goodCB(f(x))));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_mapRej__75 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run((x => badCB(f(x))))(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_mapRej__73 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run((x => badCB(f(x))))(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_mapRej__72 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run((x => badCB(f(x))))(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_good__65 = (a => _1e6e4_Wish((_ => goodCB => {
    goodCB(a);
    return (_ => ({ __constructor: "Unit", __args: [] }));
})));
export let _1e6e4_pure__64 = (_ => _1e6e4_good__65);
export let _1e6e4_of__63 = (_ => _1e6e4_pure__64());
export let _1e6e4_good__39 = (a => _1e6e4_Wish((_ => goodCB => {
    goodCB(a);
    return (_ => ({ __constructor: "Unit", __args: [] }));
})));
export let _1e6e4_pure__38 = (_ => _1e6e4_good__39);
export let _1e6e4_of__37 = (_ => _1e6e4_pure__38());
export let _1e6e4_fulfill__43 = (badCB => goodCB => m => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return run(badCB)(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m));
export let _1e6e4_chain__87 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return (() => {
      let cancel
cancel = _2e42b_Nothing;
    let r1
r1 = run(badCB)((x => {
    let r2
r2 = ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let _run = __x__.__args[0];
    return _run(badCB)(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(f(x));
    cancel = _2e42b_Just(r2);
    return ({ __constructor: "Unit", __args: [] });
}));
    (__eq__(cancel, _2e42b_Nothing) ? (() => {
      cancel = _2e42b_Just(r1);
    return ({ __constructor: "Unit", __args: [] });

})() : ({ __constructor: "Unit", __args: [] }));
    return (_ => {
    ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let c = __x__.__args[0];
    return c();
  }
  else if (__x__.__constructor === "Nothing") {
    return ({ __constructor: "Unit", __args: [] });
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(cancel);
    return ({ __constructor: "Unit", __args: [] });
});

})();
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_chain__83 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return (() => {
      let cancel
cancel = _2e42b_Nothing;
    let r1
r1 = run(badCB)((x => {
    let r2
r2 = ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let _run = __x__.__args[0];
    return _run(badCB)(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(f(x));
    cancel = _2e42b_Just(r2);
    return ({ __constructor: "Unit", __args: [] });
}));
    (__eq__(cancel, _2e42b_Nothing) ? (() => {
      cancel = _2e42b_Just(r1);
    return ({ __constructor: "Unit", __args: [] });

})() : ({ __constructor: "Unit", __args: [] }));
    return (_ => {
    ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let c = __x__.__args[0];
    return c();
  }
  else if (__x__.__constructor === "Nothing") {
    return ({ __constructor: "Unit", __args: [] });
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(cancel);
    return ({ __constructor: "Unit", __args: [] });
});

})();
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _4be73_andDo__86 = (b => a => _1e6e4_chain__83((_ => b))(a));
export let _1e6e4_chain__76 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return (() => {
      let cancel
cancel = _2e42b_Nothing;
    let r1
r1 = run(badCB)((x => {
    let r2
r2 = ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let _run = __x__.__args[0];
    return _run(badCB)(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(f(x));
    cancel = _2e42b_Just(r2);
    return ({ __constructor: "Unit", __args: [] });
}));
    (__eq__(cancel, _2e42b_Nothing) ? (() => {
      cancel = _2e42b_Just(r1);
    return ({ __constructor: "Unit", __args: [] });

})() : ({ __constructor: "Unit", __args: [] }));
    return (_ => {
    ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let c = __x__.__args[0];
    return c();
  }
  else if (__x__.__constructor === "Nothing") {
    return ({ __constructor: "Unit", __args: [] });
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(cancel);
    return ({ __constructor: "Unit", __args: [] });
});

})();
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_chain__66 = (f => m => _1e6e4_Wish((badCB => goodCB => ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let run = __x__.__args[0];
    return (() => {
      let cancel
cancel = _2e42b_Nothing;
    let r1
r1 = run(badCB)((x => {
    let r2
r2 = ((__x__) => {
  if (__x__.__constructor === "Wish" && true) {
    let _run = __x__.__args[0];
    return _run(badCB)(goodCB);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(f(x));
    cancel = _2e42b_Just(r2);
    return ({ __constructor: "Unit", __args: [] });
}));
    (__eq__(cancel, _2e42b_Nothing) ? (() => {
      cancel = _2e42b_Just(r1);
    return ({ __constructor: "Unit", __args: [] });

})() : ({ __constructor: "Unit", __args: [] }));
    return (_ => {
    ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let c = __x__.__args[0];
    return c();
  }
  else if (__x__.__constructor === "Nothing") {
    return ({ __constructor: "Unit", __args: [] });
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(cancel);
    return ({ __constructor: "Unit", __args: [] });
});

})();
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(m))));
export let _1e6e4_bad__40 = (e => _1e6e4_Wish((badCB => _ => {
    badCB(e);
    return (_ => ({ __constructor: "Unit", __args: [] }));
})));
export let _1dd2b_nth__6 = (i => list => {
    let $_result_;
    let $_continue_ = true;
    let $$i = i;
    let $$list = list;

    while($_continue_) {
      let $i = $$i;
      let $list = $$list;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ === null) {
    ($_result_ = _2e42b_Nothing);
  }
  else if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    (__eq__($i, 0) ? ($_result_ = _2e42b_Just(a)) : ($$i = ($i - 1), $$list = xs, $_continue_ = true));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list)
    }
    return $_result_;
});
export let _b6c60_pathToDocument__36 = (__P__2 => (__W__3 => ((__x__) => {
  if (__x__.__constructor === "Just" && true) {
    let path = __x__.__args[0];
    return _1e6e4_of__37()(path);
  }
  else if (__x__.__constructor === "Nothing") {
    return _1e6e4_bad__40(`You must give a path to the .mad files to document!`);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(__W__3))(_1dd2b_nth__6(1)((__R__ => __R__.args)(__P__2))));
export let _c8121_getExecutablePath__5 = (_ => _2e42b_fromMaybe__7(``)(_1dd2b_nth__6(0)(_c8121_Argv__2)));
export let _1dd2b_length__52 = (list => {
    let helper__0
helper__0 = (list_ => count => {
    let $_result_;
    let $_continue_ = true;
    let $$list_ = list_;
    let $$count = count;

    while($_continue_) {
      let $list_ = $$list_;
      let $count = $$count;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ === null) {
    ($_result_ = $count);
  }
  else if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    ($$list_ = xs, $$count = ($count + 1), $_continue_ = true);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list_)
    }
    return $_result_;
});
    return helper__0(list)(0);
});
export let _1dd2b_slice__51 = (start => end => list => {
    let len
len = _1dd2b_length__52(list);
    let helper__0
helper__0 = (start_ => end_ => list_ => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$start_ = start_;
    let $$end_ = end_;
    let $$list_ = list_;

    while($_continue_) {
      let $start_ = $$start_;
      let $end_ = $$end_;
      let $list_ = $$list_;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ === null) {
    ($_end_.n = (null), $_result_ = $_start_.n);
  }
  else if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    (__eq__($start_, 0) && $end_ >= 0 ? ($_end_ = $_end_.n = { v: a }, $$start_ = 0, $$end_ = ($end_ - 1), $$list_ = xs, $_continue_ = true) : ($start_ > 0 ? ($$start_ = ($start_ - 1), $$end_ = ($end_ - 1), $$list_ = xs, $_continue_ = true) : ($_end_.n = (null), $_result_ = $_start_.n)));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list_)
    }
    return $_result_;
});
    let realStart
realStart = (start < 0 ? (start + len) : start);
    let realEnd
realEnd = (__eq__(end, 0) ? (len - 1) : (end < 0 ? ((end + len) - 1) : end));
    return helper__0(realStart)(realEnd)(list);
});
export let _1dd2b_last__53 = (list => {
    let $_result_;
    let $_continue_ = true;
    let $$list = list;

    while($_continue_) {
      let $list = $$list;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ !== null && true && __x__.n === null) {
    let { v: item } = __x__;
    ($_result_ = _2e42b_Just(item));
  }
  else if (__x__ === null) {
    ($_result_ = _2e42b_Nothing);
  }
  else if (__x__ !== null && true && __x__.n !== null && true && true) {
    let { n: { v: a, n: xs } } = __x__;
    ($$list = ({ v: a, n: xs }), $_continue_ = true);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list)
    }
    return $_result_;
});
;
;
;
;
;
;
;
export let _1dd2b_intersperse__9 = (a => xs => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$a = a;
    let $$xs = xs;

    while($_continue_) {
      let $a = $$a;
      let $xs = $$xs;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ === null) {
    ($_end_.n = (null), $_result_ = $_start_.n);
  }
  else if (__x__ !== null && true && __x__.n === null) {
    let { v: one } = __x__;
    ($_end_.n = ({ v: one, n: null }), $_result_ = $_start_.n);
  }
  else if (__x__ !== null && true && __x__.n !== null && true && __x__.n.n === null) {
    let { v: one, n: { v: two } } = __x__;
    ($_end_.n = ({ v: one, n: { v: $a, n: { v: two, n: null } } }), $_result_ = $_start_.n);
  }
  else if (__x__ !== null && true && true) {
    let { v: one, n: rest } = __x__;
    ($_end_.n = { v: one, n: { v: $a }}, $_end_ = $_end_.n.n, $$a = $a, $$xs = rest, $_continue_ = true);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($xs)
    }
    return $_result_;
});
export let _1dd2b_dropLast__50 = (n => list => _1dd2b_slice__51(0)(-n)(list));
export let _10f79_show__42 = (s =>  `"${s.split('').map(escapeChar).join('')}"` );
export let _9bab1_log__41 = (__P__2 => _9bab1_putLine__15(_10f79_show__42(__P__2)));
export let _9bab1_trace__88 = (v => a => {
    _9bab1_putLine__15(v + ` ` + _10f79_show__42(a));
    return a;
});
export let _10f79_reduceLeft__71 = (f => acc => list => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;

    while($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    ($$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true);
  }
  else if (__x__ === null) {
    ($_result_ = $acc);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list)
    }
    return $_result_;
});
export let _10f79_reduceLeft__24 = (f => acc => list => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;

    while($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    ($$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true);
  }
  else if (__x__ === null) {
    ($_result_ = $acc);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list)
    }
    return $_result_;
});
export let _10f79_reduceLeft__14 = (f => acc => list => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;

    while($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;

        $_continue_ = false;
        ((__x__) => {
  if (__x__ !== null && true && true) {
    let { v: a, n: xs } = __x__;
    ($$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true);
  }
  else if (__x__ === null) {
    ($_result_ = $acc);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($list)
    }
    return $_result_;
});
;
export let _1dd2b_reduce__13 = _10f79_reduceLeft__14;
export let _10f79_dictReduceRight__34 = (f => acc => dict => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$dict = dict;

    while($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $dict = $$dict;

        $_continue_ = false;
        ((__x__) => {
  if (__x__.__constructor === "DictRBEmpty") {
    ($_result_ = $acc);
  }
  else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
    let k = __x__.__args[1];
    let v = __x__.__args[2];
    let left = __x__.__args[3];
    let right = __x__.__args[4];
    ($$f = $f, $$acc = $f(k)(v)(_10f79_dictReduceRight__34($f)($acc)(right)), $$dict = left, $_continue_ = true);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})($dict)
    }
    return $_result_;
});
export let _10f79_dictToList__33 = (dict => _10f79_dictReduceRight__34((k => v => list => ({ v: ([k, v]), n: list })))((null))(dict));
export let _31104_toList__32 = _10f79_dictToList__33;

const escapeChar = (c) => {
  if (c === '\\') {
    return `\\\\`
  } else if (c === '"') {
    return `\\"`
  } else if (c === '\n') {
    return `\\n`
  } else if (c === '\t') {
    return `\\t`
  } else if (c === '\r') {
    return `\\r`
  } else {
    return c
  }
}
;
let _10f79_concatString__12 = (a => b =>  a + b );
export let _10f79_compare__22 = (a => b => ( a > b  ? _10f79_GT : ( a === b  ? _10f79_EQ : _10f79_LT)));
export let _10f79_balanceDict__30 = (color => k => v => left => right => ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let rK = __x__.__args[1];
    let rV = __x__.__args[2];
    let rLeft = __x__.__args[3];
    let rRight = __x__.__args[4];
    return ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let lK = __x__.__args[1];
    let lV = __x__.__args[2];
    let lLeft = __x__.__args[3];
    let lRight = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
  }
  else if (true) {
    return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(left);
  }
  else if (true) {
    return ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && __x__.__args[3].__constructor === "DictRBNode" && __x__.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
    let lK = __x__.__args[1];
    let lV = __x__.__args[2];
    let llK = __x__.__args[3].__args[1];
    let llV = __x__.__args[3].__args[2];
    let llLeft = __x__.__args[3].__args[3];
    let llRight = __x__.__args[3].__args[4];
    let lRight = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
  }
  else if (true) {
    return _10f79_DictRBNode(color)(k)(v)(left)(right);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(left);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(right));
let _10f79_insertHelp__29 = (key => value => dict => ((__x__) => {
  if (__x__.__constructor === "DictRBEmpty") {
    return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
  }
  else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
    let nColor = __x__.__args[0];
    let nKey = __x__.__args[1];
    let nValue = __x__.__args[2];
    let nLeft = __x__.__args[3];
    let nRight = __x__.__args[4];
    return ((__x__) => {
  if (__x__.__constructor === "LT") {
    return _10f79_balanceDict__30(nColor)(nKey)(nValue)(_10f79_insertHelp__29(key)(value)(nLeft))(nRight);
  }
  else if (__x__.__constructor === "EQ") {
    return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
  }
  else if (__x__.__constructor === "GT") {
    return _10f79_balanceDict__30(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__29(key)(value)(nRight));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(_10f79_compare__22(key)(nKey));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(dict));
export let _10f79_dictInsert__28 = (key => value => dict => ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let k = __x__.__args[1];
    let v = __x__.__args[2];
    let left = __x__.__args[3];
    let right = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
  }
  else if (true) {
    let or = __x__;
    return or;
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(_10f79_insertHelp__29(key)(value)(dict)));
export let _10f79_dictFromList__70 = (items => _10f79_reduceLeft__71((dict => item => ((__x__) => {
  if (__x__.length === 2 && true && true) {
    let [k,v] = __x__;
    return _10f79_dictInsert__28(k)(v)(dict);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(item)))(_10f79_DictRBEmpty)(items));
export let _c8121_DEFAULT_COMMAND_OPTIONS__69 = ({ cwd: `./`, env: _10f79_dictFromList__70((null)) });
export let _b6c60_buildBundle__80 = (ioUtils => __P__14 => _1e6e4_map__81((__R__ => __R__.stdout))(_1e6e4_mapRej__72((__R__ => __R__.stderr))((__$PH7__ => ioUtils.exec(`madlib`)(__$PH7__)(_c8121_DEFAULT_COMMAND_OPTIONS__69))((c => ({ v: `compile`, n: { v: `-i`, n: { v: c.madlib.input, n: { v: `--target`, n: { v: `browser`, n: { v: `--bundle`, n: { v: `-o`, n: { v: c.madlib.output, n: null } } } } } } } }))(__P__14)))));
export let _b6c60_buildSass__82 = (ioUtils => __P__15 => _1e6e4_map__81((__R__ => __R__.stdout))(_1e6e4_mapRej__72((__R__ => __R__.stderr))((c => ioUtils.exec(c.sassExecutablePath)(({ v: c.styles.input, n: { v: c.styles.output, n: null } }))(_c8121_DEFAULT_COMMAND_OPTIONS__69))(__P__15))));
export let _b6c60_copyHtml__84 = (ioUtils => __P__16 => _1e6e4_map__81((__R__ => __R__.stdout))(_1e6e4_mapRej__72((__R__ => __R__.stderr))((c => ioUtils.exec(`cp`)(({ v: c.html.input, n: { v: c.html.output, n: null } }))(_c8121_DEFAULT_COMMAND_OPTIONS__69))(__P__16))));
export let _b6c60_buildDocumentation__79 = (ioUtils => config => (__P__17 => _1e6e4_map__85((outputPath => `Documentation built and available in the folder '` + outputPath + `'`))(_1e6e4_chain__83((_ => _1e6e4_of__37()(ioUtils.getCurrentWorkingDirectory() + `/.docs`)))(_1e6e4_chain__83((_ => _b6c60_copyHtml__84(ioUtils)(config)))(_1e6e4_chain__83((_ => _b6c60_buildSass__82(ioUtils)(config)))(_b6c60_buildBundle__80(ioUtils)(__P__17))))))(config));
export let _b6c60_generateJson__68 = (ioUtils => config => (__P__12 => _1e6e4_map__78(_3d769_always__77(`Documentation built and saved in '` + config.documentationDotJson.output + `'`))(_1e6e4_chain__76((__P__13 => _1e6e4_mapRej__75(_3d769_always__74(`documentation.json file could not be saved to ` + config.documentationDotJson.output))(ioUtils.writeFile(config.documentationDotJson.output)((__R__ => __R__.stdout)(__P__13)))))(_1e6e4_mapRej__73((err => `An error occured while generating the docs, here is the error from madlib:\n` + err))(_1e6e4_mapRej__72((__R__ => __R__.stderr))((__$PH6__ => ioUtils.exec(`madlib`)(__$PH6__)(_c8121_DEFAULT_COMMAND_OPTIONS__69))((c => ({ v: `doc`, n: { v: `-i`, n: { v: c.documentationDotJson.input, n: null } } }))(__P__12)))))))(config));
export let _31104_insert__27 = _10f79_dictInsert__28;
export let _31104_merge__26 = (a => b => _31104_reduceLeft__31(_31104_insert__27)(a)(b));
export let _10f79_balanceDict__23 = (color => k => v => left => right => ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let rK = __x__.__args[1];
    let rV = __x__.__args[2];
    let rLeft = __x__.__args[3];
    let rRight = __x__.__args[4];
    return ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let lK = __x__.__args[1];
    let lV = __x__.__args[2];
    let lLeft = __x__.__args[3];
    let lRight = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
  }
  else if (true) {
    return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(left);
  }
  else if (true) {
    return ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && __x__.__args[3].__constructor === "DictRBNode" && __x__.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
    let lK = __x__.__args[1];
    let lV = __x__.__args[2];
    let llK = __x__.__args[3].__args[1];
    let llV = __x__.__args[3].__args[2];
    let llLeft = __x__.__args[3].__args[3];
    let llRight = __x__.__args[3].__args[4];
    let lRight = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
  }
  else if (true) {
    return _10f79_DictRBNode(color)(k)(v)(left)(right);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(left);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(right));
let _10f79_insertHelp__21 = (key => value => dict => ((__x__) => {
  if (__x__.__constructor === "DictRBEmpty") {
    return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
  }
  else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
    let nColor = __x__.__args[0];
    let nKey = __x__.__args[1];
    let nValue = __x__.__args[2];
    let nLeft = __x__.__args[3];
    let nRight = __x__.__args[4];
    return ((__x__) => {
  if (__x__.__constructor === "LT") {
    return _10f79_balanceDict__23(nColor)(nKey)(nValue)(_10f79_insertHelp__21(key)(value)(nLeft))(nRight);
  }
  else if (__x__.__constructor === "EQ") {
    return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
  }
  else if (__x__.__constructor === "GT") {
    return _10f79_balanceDict__23(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__21(key)(value)(nRight));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(_10f79_compare__22(key)(nKey));
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(dict));
export let _10f79_dictInsert__20 = (key => value => dict => ((__x__) => {
  if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
    let k = __x__.__args[1];
    let v = __x__.__args[2];
    let left = __x__.__args[3];
    let right = __x__.__args[4];
    return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
  }
  else if (true) {
    let or = __x__;
    return or;
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(_10f79_insertHelp__21(key)(value)(dict)));
export let _10f79_dictFromList__19 = (items => _10f79_reduceLeft__24((dict => item => ((__x__) => {
  if (__x__.length === 2 && true && true) {
    let [k,v] = __x__;
    return _10f79_dictInsert__20(k)(v)(dict);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(item)))(_10f79_DictRBEmpty)(items));
export let _31104_fromList__18 = _10f79_dictFromList__19;
export let _c8121_Env__17 = _c8121_envFFI__25(_31104_fromList__18);
 import { spawn as prelude_spawn } from "child_process" ;
export let _c8121_exec__16 = (command => args => options => _c8121__exec__35(command)(args)(({ cwd: options.cwd, env: _31104_toList__32(_31104_merge__26(_c8121_Env__17)(options.env)) })));
export let _10f79_assoc__11 = (_ => _10f79_concatString__12);
export let _10f79_mappend__10 = (_ => _10f79_assoc__11());
export let _051c8_split__49 = (separator => str =>  {
  const items = str.split(separator)

  if (items.length === 0) {
    return null
  }

  let current = {}
  let output = current
  items.forEach((item) => {
    current = current.n = {}
    current.v = item
  })
  current.n = null

  return output.n
} );
export let _051c8_join__8 = (a => xs => (__P__1 => _1dd2b_reduce__13(_10f79_mappend__10())(``)(_1dd2b_intersperse__9(a)(__P__1)))(xs));
export let _4cddf_defaultIOUtils__1 = ({ args: _c8121_Argv__2, writeFile: _c58c5_write__3, getCurrentWorkingDirectory: _c8121_getCurrentWorkingDirectory__4, getExecutablePath: _c8121_getExecutablePath__5, exec: (cmd => args => opts => {
    _9bab1_putLine__15(`Running: ` + cmd + ` ` + _051c8_join__8(` `)(args) + `...`);
    return _c8121_exec__16(cmd)(args)(opts);
}) });
let _92daf_run__67 = (config => (__P__1 => _4be73_andDo__86(_b6c60_buildDocumentation__79(_4cddf_defaultIOUtils__1)(config))(_b6c60_generateJson__68(_4cddf_defaultIOUtils__1)(__P__1)))(config));
let _b6c60_parentPath__48 = (levelsUp => path => (__P__1 => _051c8_join__8(`/`)(_1dd2b_dropLast__50(levelsUp)(_051c8_split__49(`/`)(__P__1))))(path));
export let _b6c60_madDocRootPath__47 = (ioUtils => {
    let exePath
exePath = ioUtils.getExecutablePath();
    return (__P__4 => (__W__5 => ((__x__) => {
  if (__x__.__constructor === "Just" && __x__.__args[0] === "madlib_modules") {
    return _b6c60_parentPath__48(3)(exePath) + `/` + _b6c60_MADDOC_PACKAGE_FOLDER__54;
  }
  else if (true) {
    return _b6c60_parentPath__48(3)(exePath) + `/` + _b6c60_MADLIB_MODULES_FOLDER__55 + `/` + _b6c60_MADDOC_PACKAGE_FOLDER__54;
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(__W__5))(_1dd2b_last__53(_051c8_split__49(`/`)(_b6c60_parentPath__48(3)(__P__4)))))(exePath);
});
export let _b6c60_madDocSrcPath__46 = (ioUtils => (__P__7 => (__$PH1__ => _10f79_mappend__10()(__$PH1__)(`/src`))(_b6c60_madDocRootPath__47(__P__7)))(ioUtils));
export let _b6c60_documentationTargetPath__62 = (ioUtils => (__P__8 => (__$PH2__ => _10f79_mappend__10()(__$PH2__)(`/documentation.json`))(_b6c60_madDocSrcPath__46(__P__8)))(ioUtils));
export let _b6c60_htmlSourcePath__59 = (ioUtils => (__P__11 => (__$PH5__ => _10f79_mappend__10()(__$PH5__)(`/index.html`))(_b6c60_madDocSrcPath__46(__P__11)))(ioUtils));
export let _b6c60_madDocMainPath__45 = (ioUtils => (__P__9 => (__$PH3__ => _10f79_mappend__10()(__$PH3__)(`/Main.mad`))(_b6c60_madDocSrcPath__46(__P__9)))(ioUtils));
export let _b6c60_sassPath__57 = (ioUtils => (__P__10 => (__$PH4__ => _10f79_mappend__10()(__$PH4__)(`/styles/main.scss`))(_b6c60_madDocSrcPath__46(__P__10)))(ioUtils));
export let _b6c60_sassExecutablePath__61 = (ioUtils => (__P__6 => (rootPath => _b6c60_parentPath__48(2)(rootPath) + `/node_modules/.bin/sass`)(_b6c60_madDocRootPath__47(__P__6)))(ioUtils));
export let _b6c60_generateConfiguration__44 = (ioUtils => (() => {
      return _1e6e4_chain__66((input => {
    let generated
generated = ({ madlib: ({ input: _b6c60_madDocMainPath__45(ioUtils), output: _b6c60_JS_BUNDLE_PATH__56 }), styles: ({ input: _b6c60_sassPath__57(ioUtils), output: _b6c60_CSS_TARGET_PATH__58 }), html: ({ input: _b6c60_htmlSourcePath__59(ioUtils), output: _b6c60_HTML_TARGET_PATH__60 }), sassExecutablePath: _b6c60_sassExecutablePath__61(ioUtils), documentationDotJson: ({ input: input, output: _b6c60_documentationTargetPath__62(ioUtils) }) });
    return _1e6e4_of__63()(generated);
}))(_b6c60_pathToDocument__36(ioUtils));

})());
let _92daf_main = (_ => {
    _1e6e4_fulfill__43(_9bab1_log__41)((path => _9bab1_log__41(`Running documentation generation for the madlib modules in '` + path + `'`)))(_b6c60_pathToDocument__36(_4cddf_defaultIOUtils__1));
    _1e6e4_fulfill__43((e => {
    _9bab1_trace__88(`err`)(e);
    return ({ __constructor: "Unit", __args: [] });
}))((x => {
    _9bab1_trace__88(`good`)(x);
    return ({ __constructor: "Unit", __args: [] });
}))(_1e6e4_chain__87(_92daf_run__67)(_b6c60_generateConfiguration__44(_4cddf_defaultIOUtils__1)));
    return ({ __constructor: "Unit", __args: [] });
});
export default { _c8121_getCurrentWorkingDirectory__4, _c8121_Argv__2, _c58c5_write__3, _9bab1_putLine__15, _3d769_always__77, _3d769_always__74, _31104_reduceLeft__31, _2e42b_fromMaybe__7, _1e6e4_map__85, _1e6e4_map__81, _1e6e4_map__78, _1e6e4_mapRej__75, _1e6e4_mapRej__73, _1e6e4_mapRej__72, _1e6e4_good__65, _1e6e4_pure__64, _1e6e4_of__63, _1e6e4_good__39, _1e6e4_pure__38, _1e6e4_of__37, _1e6e4_fulfill__43, _1e6e4_chain__87, _1e6e4_chain__83, _4be73_andDo__86, _1e6e4_chain__76, _1e6e4_chain__66, _1e6e4_bad__40, _1dd2b_nth__6, _b6c60_pathToDocument__36, _c8121_getExecutablePath__5, _1dd2b_length__52, _1dd2b_slice__51, _1dd2b_last__53, _1dd2b_intersperse__9, _1dd2b_dropLast__50, _10f79_show__42, _9bab1_log__41, _9bab1_trace__88, _10f79_reduceLeft__71, _10f79_reduceLeft__24, _10f79_reduceLeft__14, _1dd2b_reduce__13, _10f79_dictReduceRight__34, _10f79_dictToList__33, _31104_toList__32, _10f79_compare__22, _10f79_balanceDict__30, _10f79_dictInsert__28, _10f79_dictFromList__70, _c8121_DEFAULT_COMMAND_OPTIONS__69, _b6c60_buildBundle__80, _b6c60_buildSass__82, _b6c60_copyHtml__84, _b6c60_buildDocumentation__79, _b6c60_generateJson__68, _31104_insert__27, _31104_merge__26, _10f79_balanceDict__23, _10f79_dictInsert__20, _10f79_dictFromList__19, _31104_fromList__18, _c8121_Env__17, _c8121_exec__16, _10f79_assoc__11, _10f79_mappend__10, _051c8_split__49, _051c8_join__8, _4cddf_defaultIOUtils__1, _b6c60_madDocRootPath__47, _b6c60_madDocSrcPath__46, _b6c60_documentationTargetPath__62, _b6c60_htmlSourcePath__59, _b6c60_madDocMainPath__45, _b6c60_sassPath__57, _b6c60_sassExecutablePath__61, _b6c60_generateConfiguration__44, _10f79_DictRBBlack, _10f79_DictRBRed, _10f79_DictRBEmpty, _10f79_DictRBNode, _10f79_LT, _10f79_EQ, _10f79_GT, _3d769_Loop, _3d769_Done, _2e42b_Just, _2e42b_Nothing, _1e6e4_Wish, _77488_AddressAlreadyInUse, _77488_ArgumentListToLong, _77488_PermissionDenied, _77488_UnknownError, _42e19_Left, _42e19_Right, _a32d2_Loc, _a32d2_Parser, _a32d2_Error, _a32d2_Config, _1fda7_EmptyDoc, _1fda7_CharDoc, _1fda7_TextDoc, _1fda7_LineDoc, _1fda7_CatDoc, _1fda7_NestDoc, _1fda7_UnionDoc, _1fda7_ColumnDoc, _1fda7_NestingDoc, _1fda7_SEmpty, _1fda7_SChar, _1fda7_SText, _1fda7_SLine };
const __makeArgs = () => {
  let list = {}
  let start = list
  Object.keys(process.argv.slice(0)).forEach((key) => {
    list = list.n = { v: process.argv[key], n: null }
  }, {})
  return {
    n: start.n.n.n,
    v: start.n.n.v
  }
}
_92daf_main(__makeArgs())
