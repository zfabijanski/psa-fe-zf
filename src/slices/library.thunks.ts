import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "AppStore";
import {
  DocumentState,
  IDirectory,
  IDirectoryMetadata,
  IDocumentMetadata,
  ITree,
  ITreeDto,
  Status,
  getDocumentsSuccess,
  toggleDocumentStateFailure,
  toggleDocumentStateRequest,
  toggleDocumentStateSuccess,
} from "./library";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { ApiError, api } from "utils/api";
import { KeyValuePair } from "utils/types";
import { showModal } from "slices/modal";
import { newErrorModal } from "utils/confirmModalFactory";

const apiPrefix = "/api/library/documents";

const transformDocumentsTree = (treeDto: Readonly<ITreeDto[]>): ITree => {
  const documentsMetadata: KeyValuePair<IDocumentMetadata> = {};
  const directoriesMetadata: KeyValuePair<IDirectoryMetadata> = {};
  const getDocumentState = (statusInMeeting?: string) => {
    switch (statusInMeeting) {
      case "ADDED":
        return DocumentState.Attached;
      case "ADDED_PERMANENTLY":
        return DocumentState.AttachedPermanently;
      default:
        return DocumentState.NotAttached;
    }
  };

  const parseNode = (treeNodeDto: Readonly<ITreeDto[]>): IDirectory[] => {
    return treeNodeDto.reduce<IDirectory[]>((acc, element): IDirectory[] => {
      if (element.type === "folder") {
        directoriesMetadata[element.id] = {
          directoryId: element.id,
          name: element.name.toLowerCase(),
        };
      } else {
        documentsMetadata[element.id] = {
          documentId: element.id,
          guid: element.guid,
          name: element.name,
          state: getDocumentState(element.statusInMeeting),
          isStateChanging: false,
          moduleName: element.moduleName,
        };
      }

      if (!(element.list && element.list.length)) {
        return acc;
      }

      acc.push({
        directoryId: element.id,
        documentsIds: element.list
          .filter((item) => item.type === "pdf")
          .map((item) => item.id),
        directories: element.list.length ? parseNode(element.list) : [],
      });
      return acc;
    }, []);
  };

  return {
    documentsMetadata,
    directoriesMetadata,
    directories: parseNode(treeDto),
  };
};

export const getDocumentsIfNeeded = createAsyncThunk(
  "library/getDocumentsIfNeeded",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;

    if (state.library.status === Status.Loaded) {
      return;
    }

    dispatch(showFullscreenSpinner());
    api
      .get<ITreeDto[]>(`${apiPrefix}/tree`)
      .then((response) => transformDocumentsTree(response))
      .then((response) => {
        dispatch(getDocumentsSuccess(response));
        dispatch(hideFullscreenSpinner());
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      });
  }
);

export const toggleDocumentState = createAsyncThunk(
  "library/toggleDocumentState",
  async (documentId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const isDocumentAttached =
      state.library.documentsMetadata[documentId].state ===
      DocumentState.Attached;
    dispatch(toggleDocumentStateRequest(documentId));
    dispatch(showFullscreenSpinner());
    const requestPromise = isDocumentAttached
      ? api.delete(`${apiPrefix}/${documentId}`)
      : api.put(`${apiPrefix}/${documentId}`);
    requestPromise
      .then(() => dispatch(toggleDocumentStateSuccess(documentId)))
      .catch(() => dispatch(toggleDocumentStateFailure(documentId)))
      .finally(() => dispatch(hideFullscreenSpinner()));
  }
);
