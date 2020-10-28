#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

const directoryPath = process.cwd();

let filesUpdated = 0;

let recursiveRenamer = (dir, fileList = []) => {
    fs.readdir(dir, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(file => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                recursiveRenamer(path.join(dir, file));
            } else {
                // If file starts with a 4 digit sequence, ignore it
                if (file.match(/^\d{4}/)) return;

                // Check for YYYY-MM-DD or MMM DD YYYY
                let found = file.match(/(\d{4}-\d{2}-\d{2}|[a-zA-Z]{3,4}\s\d{1,2}\s\d{4})/g);

                // If no date is present, bail
                if (found === null) return;

                let newDateFormatted = dayjs(found).format('YYYY-MM-DD');
                let newFileName = `${newDateFormatted} - ${file}`;

                fs.rename(path.join(dir, file), path.join(dir, newFileName), error => {
                    if (error) {
                        console.error(error);
                    } else {
                        filesUpdated++;
                        console.log(`File Renamed! (${filesUpdated}): ${newFileName}`);
                    }
                });
            }

        });
    });
};

recursiveRenamer(directoryPath);