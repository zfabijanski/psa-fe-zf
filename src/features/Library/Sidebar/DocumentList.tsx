import { useLayoutEffect } from "react";
import styled from "styled-components";
import Sidebar from "../../../components/UI/Sidebar";
import { IDirectory } from "../types";
import DirectoryContainer from "./Directory";
import DocumentContainer from "./Document";
import Search from "./Search";

interface IProps {
  directories: IDirectory[];
  filteredDocumentsIds: number[];
  searchText: string;
  searchTextChange: (value: string) => void;
  isSearching: boolean;
  isFullscreenEnabled: boolean;
  getDocuments: () => void;
}

const SearchWrapper = styled.div`
  margin-bottom: 42px;
`;

const DocumentList = (props: IProps) => {
  useLayoutEffect(() => {
    props.getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!props.isFullscreenEnabled && (
        <Sidebar
          fixedSection={
            <SearchWrapper>
              <Search
                value={props.searchText}
                onChange={props.searchTextChange}
              />
            </SearchWrapper>
          }
          scrollableSection={
            <>
              {!props.isSearching &&
                props.directories.map((directory) => (
                  <DirectoryContainer
                    key={directory.directoryId}
                    directory={directory}
                    level={0}
                  />
                ))}
              {props.isSearching &&
                props.filteredDocumentsIds.map((filteredDocumentId) => (
                  <DocumentContainer
                    key={filteredDocumentId}
                    documentId={filteredDocumentId}
                  />
                ))}
            </>
          }
        />
      )}
    </>
  );
};

export default DocumentList;
