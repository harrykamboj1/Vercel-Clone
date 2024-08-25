const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function init() {
    console.log('==== Executing script.js ===');
    const outDirPath = path.join(__dirname, 'output');

    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    p.stdout.on('error', (data) => {
        console.log('Error', data.toString());
    });

    p.on('close', async () => {
        console.log('Build Complete');
        const distFolderPath = path.join(__dirname, 'output', 'dist');
        const distFolderContent = fs.readdirSync(distFolderPath, { recursive: true });

        for (const file of distFolderContent) {
            if (fs.lstatSync(file).isDirectory) {
                continue;
            } else {
                fs.readFileSync(file);
            }
        }
    })
}