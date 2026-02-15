import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

/**
 * Adds a watermark to a PDF buffer.
 * @param pdfBuffer The original PDF buffer (Buffer or Uint8Array).
 * @param text The watermark text.
 * @param url The website URL to include.
 */
export async function addWatermarkToPdf(pdfBuffer: Buffer | Uint8Array, text: string, url: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    for (const page of pages) {
        const { width, height } = page.getSize();

        // Transparent watermark in the center
        // Improved positioning and increased opacity for better visibility
        page.drawText(text, {
            x: width / 2 - 150, // Center horizontally-ish
            y: height / 2,
            size: 60,
            font: font,
            color: rgb(0.4, 0.4, 0.4), // Slightly darker gray
            opacity: 0.25, // Slightly increased opacity
            rotate: degrees(45),
        });

        // Small footer watermark
        page.drawText(`${text} | ${url}`, {
            x: 40,
            y: 30, // Slightly higher from bottom
            size: 9,
            font: font,
            color: rgb(0.2, 0.2, 0.2), // Darker for footer
            opacity: 0.4,
        });
    }

    // Add metadata (Moved outside the loop)
    pdfDoc.setAuthor(text);
    pdfDoc.setSubject(`Official Publication of ${text}`);
    pdfDoc.setProducer(url);
    pdfDoc.setCreator(url);

    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
}
