import React from "react";
import { DOCUMENTS } from "./documents";
import PdfIcon from "~/shared/assets/svg/pdf.svg?react";

const DocumentsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}>Документы</h2>
      <p style={{ marginBottom: 16 }}>
        Ниже список документов в формате PDF. Нажмите, чтобы скачать.
      </p>

      <ul style={{ display: "grid", gap: 15, paddingLeft: 18 }}>
        {DOCUMENTS.map((doc) => {
          const href = `/fok-documents/${encodeURIComponent(doc.fileName)}`;
          return (
            <a href={href} download key={doc.fileName}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: '#fafafa',
                  padding: 10,
                  borderRadius: 10,
                  border: '1px solid #606060',
                  fontSize: '24px',
                }}>
                <PdfIcon width={40} height={40} />
                {doc.title}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentsPage;


