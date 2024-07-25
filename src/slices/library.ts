import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { KeyValuePair } from "utils/types";
import { includesLatinised } from "utils/includesLatinised/includesLatinised";

export interface ITreeDto {
  id: number;
  guid: string;
  name: string;
  type: "folder" | "pdf";
  statusInMeeting?: "ADDED" | "ADDED_PERMANENTLY";
  status?: "AUTO_SENT" | "IS_SENT";
  moduleName: "WITCHCRAFT_LIBRARY" | "PRU_LIBRARY";
  list: ITreeDto[];
}

export interface ITree {
  directories: IDirectory[];
  documentsMetadata: KeyValuePair<IDocumentMetadata>;
  directoriesMetadata: KeyValuePair<IDirectoryMetadata>;
}

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

export enum Status {
  Default = "Default",
  Loaded = "Loaded",
}

type State = {
  status: Status;
  directories: IDirectory[];
  documentsMetadata: KeyValuePair<IDocumentMetadata>;
  directoriesMetadata: KeyValuePair<IDirectoryMetadata>;
  previewedDocumentId: number;
  searchText: string;
  isFullscreenEnabled: boolean;
};

export const initialState: State = {
  status: Status.Default,
  directories: [],
  documentsMetadata: {},
  directoriesMetadata: {},
  searchText: "",
  isFullscreenEnabled: false,
  previewedDocumentId: 0,
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    resetDocuments: () => initialState,
    getDocumentsSuccess: (
      state,
      action: PayloadAction<{
        directories: IDirectory[];
        documentsMetadata: KeyValuePair<IDocumentMetadata>;
        directoriesMetadata: KeyValuePair<IDirectoryMetadata>;
      }>
    ) => {
      state.directories = action.payload.directories;
      state.documentsMetadata = action.payload.documentsMetadata;
      state.directoriesMetadata = action.payload.directoriesMetadata;
      state.status = Status.Loaded;
    },
    toggleDocumentStateRequest: (state, action: PayloadAction<number>) => {
      state.documentsMetadata[action.payload].isStateChanging = true;
    },
    toggleDocumentStateSuccess: (state, action: PayloadAction<number>) => {
      state.documentsMetadata = sliceUtilities.toggleIdenticalDocumentsState(
        state,
        action.payload
      );
      state.documentsMetadata[action.payload].isStateChanging = false;
    },
    toggleDocumentStateFailure: (state, action: PayloadAction<number>) => {
      state.documentsMetadata[action.payload].isStateChanging = false;
    },
    previewDocument: (state, action: PayloadAction<number>) => {
      state.previewedDocumentId = action.payload;
    },
    toggleDirectory: (state, action: PayloadAction<number>) => {
      state.directoriesMetadata = sliceUtilities.performDirectoryToggle(
        state,
        action.payload
      );
    },
    searchTextChange: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    toggleFullscreen: (state) => {
      state.isFullscreenEnabled = !state.isFullscreenEnabled;
    },
  },
});

const sliceUtilities = {
  toggleIdenticalDocumentsState: (
    state: State,
    documentId: number
  ): KeyValuePair<IDocumentMetadata> => {
    const templateDocument = state.documentsMetadata[documentId];

    return sliceUtilities.toggleDocumentsByGuid(
      state.documentsMetadata,
      templateDocument.guid,
      templateDocument.state === DocumentState.Attached
        ? DocumentState.NotAttached
        : DocumentState.Attached
    );
  },
  toggleDocumentsByGuid: (
    documentsMetadata: KeyValuePair<IDocumentMetadata>,
    guid: string,
    state: DocumentState
  ) =>
    Object.fromEntries(
      Object.entries(documentsMetadata).map(([key, value]) => {
        if (value.guid === guid) {
          return [
            key,
            {
              ...value,
              state,
            },
          ];
        } else {
          return [key, value];
        }
      })
    ),
  performDirectoryToggle: (
    state: State,
    directoryId: number
  ): State["directoriesMetadata"] => {
    const directoryMetadataToToggle = state.directoriesMetadata[directoryId];

    if (directoryMetadataToToggle.isOpen) {
      return sliceUtilities.closeDirectoryAndSubdirectories(
        directoryId,
        state.directoriesMetadata,
        state.directories
      );
    }

    return sliceUtilities.openDirectory(directoryId, state.directoriesMetadata);
  },
  closeDirectoryAndSubdirectories: (
    directoryId: number,
    directoriesMetadata: KeyValuePair<IDirectoryMetadata>,
    tree: IDirectory[]
  ) => {
    return sliceUtilities.getIdsToClose(directoryId, tree).reduce(
      (newDirectoriesMetadata, id) => {
        newDirectoriesMetadata[id] = {
          ...newDirectoriesMetadata[id],
          isOpen: false,
        };
        return newDirectoriesMetadata;
      },
      { ...directoriesMetadata }
    );
  },
  openDirectory: (
    directoryId: number,
    directoriesMetadata: KeyValuePair<IDirectoryMetadata>
  ) => {
    return {
      ...directoriesMetadata,
      [directoryId]: {
        ...directoriesMetadata[directoryId],
        isOpen: true,
      },
    };
  },
  getIdsToClose: (startDirectoryId: number, directories: IDirectory[]) => {
    const allDirectoryIds: number[] = [];
    allDirectoryIds.push(startDirectoryId);

    const findStartDirectory = (
      currentDirectory: IDirectory
    ): IDirectory | undefined => {
      if (currentDirectory.directoryId === startDirectoryId) {
        return currentDirectory;
      } else if (currentDirectory.directories) {
        let result;
        for (
          let i = 0;
          result === undefined && i < currentDirectory.directories.length;
          i++
        ) {
          result = findStartDirectory(currentDirectory.directories[i]);
        }
        return result;
      }
      return;
    };

    const gatherDirectoryIds = (currentDirectory: IDirectory) => {
      if (currentDirectory.directories) {
        currentDirectory.directories.forEach((directory) => {
          allDirectoryIds.push(directory.directoryId);
          gatherDirectoryIds(directory);
        });
      }
    };

    let startDirectory;

    for (const dir of directories) {
      startDirectory = findStartDirectory(dir);
      if (startDirectory) {
        break;
      }
    }

    if (startDirectory) {
      gatherDirectoryIds(startDirectory);
    }

    return allDirectoryIds;
  },
};

export const {
  resetDocuments,
  getDocumentsSuccess,
  toggleDocumentStateRequest,
  toggleDocumentStateSuccess,
  toggleDocumentStateFailure,
  previewDocument,
  toggleDirectory,
  searchTextChange,
  toggleFullscreen,
} = librarySlice.actions;

export const getIsSearching = createSelector(
  (state: State) => state.searchText,
  (searchText) => searchText.length > 1
);

export const getPreviewedDocumentUrl = createSelector(
  (state: State) => state.documentsMetadata,
  (state: State) => state.previewedDocumentId,
  (documentsMetadata, previewedDocumentId) => {
    if (!previewedDocumentId) {
      return "";
    }
    const documentMetadata = documentsMetadata[previewedDocumentId];
    return `/psao/api/documents/${
      documentMetadata.moduleName === "PRU_LIBRARY"
        ? documentMetadata.guid
        : documentMetadata.documentId
    }`;
  }
);

export const getFilteredDocumentsIds = createSelector(
  (state: State) => state.documentsMetadata,
  getIsSearching,
  (state: State) => state.searchText,
  (documentsMetadata, isSearching, searchText) => {
    if (isSearching) {
      return Object.values(documentsMetadata)
        .filter((document) => includesLatinised(searchText, document.name))
        .map((document) => document.documentId);
    } else {
      return [];
    }
  }
);

export * from "./library.thunks";
