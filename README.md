# Todd's Tiny Tools — Date Prefixer

A tiny CLI tool to parse dates from filenames and prefix in a sortable format.

## Installation

Not yet published to npm. Clone this directory and run the following to test:

```bash
npm install
npm link
```

## How it works

This tool walks the directory and it's subfolders from where the tool is run. Each filename is parsed and dates are prefixed. Files who already start with 4 digits (simplistic assumption of year-first formatting) are skipped.

### Date formats parsed

- `MMM DD YYYY`, i.e. Jan 13 2020
- `MMMM DD YYYY`, i.e. Sept 3 2019
- `YYYY-MM-DD`, i.e. 2020-02-14

### Prefixed format

Date strings are reformatted to `YYYY-MM-DD` format for simple chronological sorting.