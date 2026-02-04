export interface FileEntry {
  name: string;
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;
}

export interface Track extends FileEntry {
  handle: FileSystemFileHandle;
}

export interface Album extends FileEntry {
  handle: FileSystemDirectoryHandle;
}

export interface Artist extends FileEntry {
  handle: FileSystemDirectoryHandle;
}

export type Theme = 'light' | 'dark' | 'amoled';
