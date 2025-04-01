import fs from 'fs';

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
