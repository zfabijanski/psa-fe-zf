import { connect } from "react-redux";
import {
  getDocumentsIfNeeded,
  searchTextChange,
  getFilteredDocumentsIds,
  getIsSearching,
} from "slices/library";
import { RootState } from "AppStore";
import DocumentList from "./DocumentList";

const mapStateToProps = ({ library }: RootState) => ({
  directories: library.directories,
  searchText: library.searchText,
  filteredDocumentsIds: getFilteredDocumentsIds(library),
  isSearching: getIsSearching(library),
  isFullscreenEnabled: library.isFullscreenEnabled,
});

const mapDispatchToProps = {
  getDocuments: getDocumentsIfNeeded,
  searchTextChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
