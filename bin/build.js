const { exec, rm, echo } = require('shelljs')
const { resolve } = require('path')

const dist = resolve(__dirname, '../dist')

echo('building...')
rm('-rf', `${dist}/*.js`)
rm('-rf', `${dist}/*.json`)
exec('babel src --out-dir dist --source-maps')
echo('build done')
