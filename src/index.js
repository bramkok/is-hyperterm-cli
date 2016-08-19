#!/usr/bin/env node

const meow = require('meow');
const hyperterm = require('is-hyperterm');

const ht = Number(hyperterm());
const cli = meow(`
	Usage
	  $ is-hyperterm <options>

	Options
    -v, --verbose    Print status message to stdout
    -h, --help       Display Help information

	Examples
	  $ is-hyperterm --verbose
    This is HyperTerm.`,

{ alias: { v: 'verbose', h: 'help' } }).flags.v;

const msg = `This is${['n\'t', ''][ht]} HyperTerm.\n`;

if (cli) process.stdout.write(msg);

process.exit(!ht);
