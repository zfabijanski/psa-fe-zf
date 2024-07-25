import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const PageWithNumber = styled.div`
  position: relative;
  background-color: white;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const PageNumber = styled.div`
  line-height: 1;
  font-size: 18px;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
`;

const MaxWidthCanvas = styled.canvas`
  width: 100%;
`;

interface IPdfPageProps {
  page: number;
  document: PDFDocumentProxy;
  onRender: () => void;
  pageNumbersVisible?: boolean;
}

const PdfPage = ({
  page,
  document,
  onRender,
  pageNumbersVisible,
}: IPdfPageProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.getPage(page + 1).then((pdfPage) => renderPage(pdfPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, document]);

  const renderPage = (pdfPage: PDFPageProxy) => {
    const currentCanvas = canvas.current;
    if (currentCanvas) {
      const canvasContext = currentCanvas.getContext("2d");
      if (canvasContext) {
        const scale =
          window.document.body.offsetWidth /
          pdfPage.getViewport({ scale: 1 }).width;
        const viewport = pdfPage.getViewport({ scale });
        currentCanvas.height = viewport.height;
        currentCanvas.width = viewport.width;
        const renderContext = {
          canvasContext,
          viewport,
        };
        pdfPage.render(renderContext).promise.then(() => onRender());
      }
    }
  };

  return (
    <PageWithNumber>
      {pageNumbersVisible && <PageNumber>{page + 1}</PageNumber>}
      <MaxWidthCanvas ref={canvas} />
    </PageWithNumber>
  );
};

export default PdfPage;
