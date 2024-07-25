import { PDFDocumentProxy } from "pdfjs-dist";
import React from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import styled from "styled-components";
import LoadingSpinner from "../UI/LoadingSpinner";
import PruButton from "../UI/PruButton/PruButton";
import PdfPage from "./PdfPage";

// tslint:disable-next-line:no-var-requires
const PdfJs = require("pdfjs-dist");

PdfJs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const ZeroHeightContainer = styled.div`
  font-size: 0;
  line-height: 0;
`;

const H2 = styled.h2`
  margin-bottom: 25px;
`;

const DefaultContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

interface IPdfViewerProps {
  url: string;
  onDocumentRender?: () => void;
  pageNumbersVisible?: boolean;
  onError?: (message: string) => void;
}

interface IPdfViewerState {
  loading: boolean;
  document?: PDFDocumentProxy;
  error?: string;
  loadedUrl?: string;
}

class PdfViewer extends React.Component<
  IPdfViewerProps & { intl: IntlShape },
  IPdfViewerState
> {
  private renderedPagesCount = 0;
  private isViewerVisible = true;
  public state: IPdfViewerState = { loading: false };

  public componentDidMount() {
    if (this.props.url) {
      this.fetchDocument();
    }
  }

  public componentDidUpdate(prevProps: Readonly<IPdfViewerProps>) {
    const { url } = this.props;
    if (url) {
      const { loadedUrl } = this.state;
      if (loadedUrl === url || prevProps.url === url) {
        return;
      }
      this.fetchDocument();
    }
  }

  public componentWillUnmount() {
    this.isViewerVisible = false;
  }

  private onLoad = (url: string, document: PDFDocumentProxy) => {
    if (!this.isViewerVisible) {
      return;
    }

    this.setState((state, props) => {
      if (props.url === url && state.loadedUrl !== url) {
        return {
          ...state,
          document,
          loadedUrl: url,
          loading: false,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    });
  };

  private onError = (error: string) => {
    if (this.props.onError) {
      this.props.onError(error);
    }

    this.setState({
      loading: false,
      loadedUrl: undefined,
      error,
    });
  };

  private fetchDocument = () => {
    this.renderedPagesCount = 0;
    const { url } = this.props;

    this.setState({ loading: true, error: undefined });
    PdfJs.getDocument(url)
      .promise.then((loadedDocument: PDFDocumentProxy) =>
        this.onLoad(url, loadedDocument)
      )
      .catch(() => {
        this.onError(
          this.props.intl.formatMessage({ id: "library.pdf.cannnot.load.file" })
        );
      });
  };

  private handlePageRender = () => {
    this.renderedPagesCount++;

    if (
      this.props.onDocumentRender &&
      this.state.document &&
      this.state.document.numPages === this.renderedPagesCount
    ) {
      this.props.onDocumentRender();
    }
  };

  public render() {
    const { document, error, loading } = this.state;

    if (loading) {
      return (
        <DefaultContainer>
          <LoadingSpinner />
        </DefaultContainer>
      );
    }

    if (error) {
      return (
        <DefaultContainer>
          <H2>{error}</H2>
          <PruButton
            onClick={this.fetchDocument}
            icon="refresh"
            iconPosition="right"
          >
            <FormattedMessage id="library.error.tryAgain" />
          </PruButton>
        </DefaultContainer>
      );
    }
    return (
      <ZeroHeightContainer>
        {document &&
          [...new Array(document.numPages)].map((_, index) => (
            <PdfPage
              key={index}
              page={index}
              pageNumbersVisible={this.props.pageNumbersVisible}
              document={document}
              onRender={this.handlePageRender}
            />
          ))}
      </ZeroHeightContainer>
    );
  }
}

const PdfViewerWithIntl = (props: IPdfViewerProps) => {
  const intl = useIntl();
  return <PdfViewer {...props} intl={intl} />;
};

export default PdfViewerWithIntl;
