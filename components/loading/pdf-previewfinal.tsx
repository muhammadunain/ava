// components/check/pdf-previewfinal.tsx

'use client'

export function PDFPreview({ pdfUrl }: { pdfUrl: string }) {
  return (
    <iframe
      src={pdfUrl}
      title="PDF Preview"
      className="w-full h-[90vh] rounded-lg border"
    />
  )
}
