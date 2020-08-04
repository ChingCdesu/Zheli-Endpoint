'use strict';

const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;

class FileService extends Service {
  async upload(type) {
    let retCode = 0;
    let message = "";
    let data = null;
    try {
      const { ctx } = this;
      // file not exists will response 400 error
      const stream = await ctx.getFileStream();

      const filename = stream.filename;
      const name = 'app/upload/' + type + '/' + path.basename(filename);

      // process file
      await new Promise((resolve, reject) => {
        const remoteFileStream = fs.createWriteStream(name);
        stream.pipe(remoteFileStream);
        remoteFileStream.on('finish', async () => {
          resolve({ filename, name: stream.fields.name });
        });
      });

    } catch (e) {
      retCode = e.code || 90;
      message = e.message;
    }
    return {'retCode': retCode, 'message': message, 'data': data};
  }
}

module.exports = FileService;
