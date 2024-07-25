export enum DocumentState {
  AttachedPermanently,
  Attached,
  NotAttached,
}

export interface IDocumentMetadata {
  documentId: number;
  guid: string;
  name: string;
  state: DocumentState;
  isStateChanging: boolean;
  moduleName: "WITCHCRAFT_LIBRARY" | "PRU_LIBRARY";
}

export interface IDirectory {
  directoryId: number;
  directories?: IDirectory[];
  documentsIds?: number[];
}

export interface IDirectoryMetadata {
  directoryId: number;
  name: string;
  isOpen?: boolean;
}

export enum Direction {
  Up = "up",
  Down = "down",
}
