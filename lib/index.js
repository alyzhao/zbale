const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { exit } = require('process');
const chalk = require('chalk');

function bale(configFileName = 'bale.config.js') {
  const root = path.resolve(process.cwd());
  const pkg = require(path.resolve(root, 'package.json'));
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
  const outputFile = outputPath + '/' + `${zipFilename}.zip`;
  const zipOutput = fs.createWriteStream(outputFile);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  zipOutput.on('close', function () {
    console.log(chalk.yellow('success!! ' + archive.pointer() / 1024 + ' total bks!'))
    console.log(chalk.yellow('output: ' + outputFile))
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

module.exports = {
  bale,
};
