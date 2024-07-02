import SignPDF from "./PdfSign.js";
import fs from "node:fs";
import path from "node:path";

export async function signDoc(signatures) {
  const pdfBuffer = new SignPDF(
    path.resolve(
      "/Users/tapasviarora/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf"
    ),
    path.resolve(
      "/Users/tapasviarora/EXSignSwift/ex-signswift/components/PdfSign/certificate.p12"
    ),
    signatures
  );

  const signedDocs = await pdfBuffer.signPDF();

  const pdfName = `./exported_file.pdf`;
  fs.writeFileSync(pdfName, signedDocs);
  return true;
}
