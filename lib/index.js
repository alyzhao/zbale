const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const pkg = require('../package.json');
const { exit } = require('process');
const chalk = require('chalk');

function bale(configFileName = 'bale.config.js') {
  const root = path.resolve(process.cwd());
  const configPath = path.resolve(root, configFileName);

  if (!fs.existsSync(configPath)) {
    console.error(chalk.red(`babel config file path is invalide!!!`));
    exit();
  }

  const {
    exclude,
    output: {
      path: outputPath,
      filename,
    },
  } = require(configPath);

  const zipFilename = filename.replace('[name]', pkg.name).replace('[version]', pkg.version);

  const zipOutput = fs.createWriteStream(outputPath + '/' + `${zipFilename}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });


  zipOutput.on('close', function () {
    console.log(chalk.cyan('success!! ' + archive.pointer() + ' total bytes!'))
  });

  zipOutput.on('end', function () {
    console.log('Data has been drained');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(zipOutput);

  const files = fs.readdirSync(root);
  files.forEach((fileItem) => {
    if (!exclude.includes(fileItem)) {
      const fullpath = path.join(root, fileItem);
      const stats = fs.statSync(fullpath);
      if (stats.isDirectory()) {
        archive.directory(`${fullpath}/`, fileItem);
      } else {
        archive.file(`${fullpath}`, { name: fileItem });
      }
    }
  })

  archive.finalize();
}

bale(path.resolve(__dirname, '..', 'bale.config.js'));

module.exports = {
  bale,
};
