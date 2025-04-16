import * as fs from 'fs';
import { pipeline, Readable } from 'stream';

export const toArrayBuffer = (buffer: Buffer) => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

export function deleteFolderContents(path: string, recursive = false) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      if (fs.statSync(path + "/" + file).isDirectory()) {
        // recurse
        if (recursive) {
          deleteFolderContents(path + "/" + file, recursive);
        }
      } else {
        // delete file
        fs.unlinkSync(path + "/" + file);
      }
    });
  }
}

export function prepareWorkingDir(workingDir: string, clear = false) {
  if (clear && fs.existsSync(workingDir)) {
    deleteFolderContents(workingDir);
  } else if (!fs.existsSync(workingDir)) {
    fs.mkdirSync(workingDir, { recursive: true });
  }
}

export async function writeBufferWithProgress(buffer: any, filePath: string) {
  const totalSize = buffer.length;
  let bytesWritten = 0;

  // Create readable stream from buffer
  const readable = new Readable({
    read(size) {
      const chunk = buffer.slice(bytesWritten, bytesWritten + size);
      bytesWritten += chunk.length;
      
      // Log progress
      const progress = Math.round((bytesWritten / totalSize) * 100);
      process.stdout.write(`\rProgress: ${progress}%`);
      
      this.push(chunk.length > 0 ? chunk : null);
    }
  });
  
  // Create writable stream
  const writable = fs.createWriteStream(filePath);

  try {
    await pipeline(readable, writable);
    console.log('\nBuffer written successfully with progress tracking');
  } catch (err) {
    console.error('\nError writing buffer:', err);
    throw err;
  }
}


export async function writeArrayToFileStream(data: string[], filename: string) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf8'
    });

    writeStream.on('error', (error) => {
      reject(error);
    });

    writeStream.on('finish', () => {
      resolve(true);
    });

    for (let i = 0; i < data.length; i++) {
      if (!data) {
        continue;
      }
      writeStream.write(data[i]);
    }
    writeStream.end();
  });
}