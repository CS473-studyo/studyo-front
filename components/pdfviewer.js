import React from 'react';

import {
  Document, Page,
} from 'react-pdf/dist/esm/entry.webpack';

const PdfViewer = ({
  url, width, pageNumber
}) => (
  <Document file={url}>
    <Page
      pageNumber={pageNumber}
      width={width}
    />
  </Document>
);

export default PdfViewer;