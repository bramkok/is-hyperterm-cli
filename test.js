import execa from 'execa';
import test from 'ava';

test('shows help screen with `--help`', async (t) => {
  const ret = await execa('./lib/index.js', ['--help'], {
    cwd: __dirname,
  });
  t.regex(ret.stdout, /Usage/);
});

test('shows help screen with `-h`', async (t) => {
  const ret = await execa('./lib/index.js', ['-h'], {
    cwd: __dirname,
  });
  t.regex(ret.stdout, /Usage/);
});

test('isn\'t HyperTerm with `-v`', async (t) => {
  const ret = await t.throws(execa('./lib/index.js', ['-v'], {
    cwd: __dirname,
    env: { TERM_PROGRAM: 'aTerminal', TERM_PROGRAM_VERSION: '1.2.3' },
  }));
  t.is(ret.code, 1);
  t.is(ret.stdout, 'This isn\'t HyperTerm.\n');
});

test('is HyperTerm with `-v`', async (t) => {
  const ret = await t.notThrows(execa('./lib/index.js', ['-v'], {
    cwd: __dirname,
    env: { TERM_PROGRAM: 'HyperTerm', TERM_PROGRAM_VERSION: '0.6.0' },
  }));
  t.is(ret.stdout, 'This is HyperTerm.');
});

test('isn\'t HyperTerm with `--verbose`', async (t) => {
  const ret = await t.throws(execa('./lib/index.js', ['--verbose'], {
    cwd: __dirname,
    env: { TERM_PROGRAM: 'aTerminal', TERM_PROGRAM_VERSION: '1.2.3' },
  }));
  t.is(ret.code, 1);
  t.is(ret.stdout, 'This isn\'t HyperTerm.\n');
});

test('is HyperTerm with `--verbose`', async (t) => {
  const ret = await t.notThrows(execa('./lib/index.js', ['--verbose'], {
    cwd: __dirname,
    env: { TERM_PROGRAM: 'HyperTerm', TERM_PROGRAM_VERSION: '0.6.0' },
  }));
  t.is(ret.stdout, 'This is HyperTerm.');
});
