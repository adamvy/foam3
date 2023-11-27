/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// JavacMaker

exports.description = 'create /build/javacfiles file containing list of modified or static .java files, call javac';

exports.args = [
  {
    name: 'javacParams',
    description: 'parameters to pass to javac',
    value: '--release 11'
  }
];


const fs_                                   = require('fs');
const { execSync, isExcluded, adaptOrCreateArgs, rmdir } = require('./buildlib');

exports.init = function() {
  adaptOrCreateArgs(X, exports.args);

  X.javaFiles = [];
}


exports.visitFile = function(pom, f, fn) {
  if ( f.name.endsWith('.java') ) {
    if ( ! isExcluded(pom, fn) ) {
      verbose('\t\tjava source:', fn);
      X.javaFiles.push(fn);
    }
  }
}


exports.end = function() {
  console.log(`[Javac] END ${X.javaFiles.length} Java files`);

  var timestampFile = X.builddir + "/javactimestamp";

  var lastCompilation = fs_.existsSync(timestampFile) ? fs_.statSync(timestampFile).mtime : 0

  var latestSourceFile = X.javaFiles.map((f) => fs_.statSync(f).mtime).reduce((a, b) => Math.max(a, b))

  if (lastCompilation >= latestSourceFile) {
    console.log("[Javac] No changes detected so not compiling")
    return
  }

  fs_.writeFileSync(X.builddir + '/javacfiles', X.javaFiles.join('\n') + '\n');

  // Delete old class files if present
  rmdir(X.d)
  // ensure target directory exists
  fs_.mkdirSync(X.d, {recursive: true});

  var cmd = `javac -parameters ${X.javacParams} -d ${X.d} -classpath "${X.d}:${X.libdir}/*" @${X.builddir}/javacfiles`;

  console.log('[Javac] Compiling', X.javaFiles.length ,'java files:', cmd);
  try {
    execSync(cmd, {stdio: 'inherit'});
  } catch(x) {
    process.exit(1);
  }

  fs_.writeFileSync(timestampFile, '' + Date.now())
}
