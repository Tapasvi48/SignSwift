import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFHexString,
  PDFString,
  PDFOperator,
  PDFOperatorNames,
  asPDFName,
  rotateDegrees,
  translate,
  drawImage,
  pushGraphicsState,
  drawText,
  PDFContentStream,
  degrees,
  popGraphicsState,
  rgb,
} from "pdf-lib";
import signerModule from "node-signpdf";

import fs from "node:fs";

import PDFArrayCustom from "./PdfArrayCustom.js";
const signer = signerModule.default;

export default class SignPDF {
  constructor(pdfFile, certFile, signatures) {
    this.pdfDoc = fs.readFileSync(pdfFile);
    this.certificate = fs.readFileSync(certFile);
    this.signatures = signatures;
    console.log(this.certificate);
  }

  /**
   * @return Promise<Buffer>
   */
  async signPDF() {
    let newPDF = await this._addPlaceholder(this.signatures);
    console.log(signer, "signer is");
    newPDF = signer.sign(newPDF, this.certificate);

    return newPDF;
  }

  /**
   * @see https://github.com/Hopding/pdf-lib/issues/112#issuecomment-569085380
   * @returns {Promise<Buffer>}
   */
  async _addPlaceholder(signatures) {
    //image

    function signatureAppearanceStream(
      image,
      text,
      rotation,
      width,
      height,
      font,
      size
    ) {
      console.log("image sign");
      const dict = image.doc.context.obj({
        Type: "XObject",
        Subtype: "Form",
        FormType: 1,
        BBox: [0, 0, width, height],
        Resources: { XObject: { Image: image.ref }, Font: { F0: font.ref } },
      });
      var operators = [
        rotateDegrees(rotation),
        translate(0, rotation % 90 === 0 ? -width : 0),
        ...drawImage("Image", {
          x: 10,
          y: 10, //y = 0 is width for me
          width: 20,
          height: 20,
          rotate: degrees(0),
          xSkew: degrees(0),
          ySkew: degrees(0),
        }),
        PDFOperator.of(PDFOperatorNames.BeginMarkedContent, [asPDFName("Tx")]),
        pushGraphicsState(),
        ...drawText(font.encodeText(text), {
          color: rgb(0, 0, 0),
          font: "F0",
          size: 20,
          rotate: degrees(0),
          xSkew: degrees(0),
          ySkew: degrees(0),
          x: 0,
          y: width, //y = 0 is width for me
        }),
        popGraphicsState(),
        PDFOperator.of(PDFOperatorNames.EndMarkedContent),
      ];
      const stream = PDFContentStream.of(dict, operators, false);
      return image.doc.context.register(stream);
    }

    //load pdf

    //load pdf
    const loadedPdf = await PDFDocument.load(this.pdfDoc);
    const pages = loadedPdf.getPages();
    for (const signature of signatures) {
      // Embed the image

      const image = await loadedPdf.embedPng(signature?.signature);
      const font = await loadedPdf.embedFont("Helvetica");

      // Add placeholder
      const signatureAppearance = signatureAppearanceStream(
        image,
        "sign",
        0,
        signature.width,
        signature.height,
        font,
        20
      );

      const ByteRange = PDFArrayCustom.withContext(loadedPdf.context);
      const DEFAULT_BYTE_RANGE_PLACEHOLDER = "**********";
      const SIGNATURE_LENGTH = 3322;

      ByteRange.push(PDFNumber.of(0));
      ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
      ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
      ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));

      const signatureDict = loadedPdf.context.obj({
        Type: "Sig",
        Filter: "Adobe.PPKLite",
        SubFilter: "adbe.pkcs7.detached",
        ByteRange,
        Contents: PDFHexString.of("A".repeat(SIGNATURE_LENGTH)),
        Reason: PDFString.of("We need your signature for reasons..."),
        M: PDFString.fromDate(new Date()),
      });

      const signatureDictRef = loadedPdf.context.register(signatureDict);

      const widgetDict = loadedPdf.context.obj({
        Type: "Annot",
        Subtype: "Widget",
        FT: "Sig",
        Rect: [
          signature.width,
          signature.height,
          signature.left,
          signature.top,
        ],
        V: signatureDictRef,
        T: PDFString.of("Signature1"),
        F: 4,
        P: pages[pages.length - 1].ref, //lastPage
        AP: loadedPdf.context.obj({
          N: signatureAppearance,
        }),
      });

      const widgetDictRef = loadedPdf.context.register(widgetDict);

      // Add signature widget to the first page
      pages[0].node.set(
        PDFName.of("Annots"),
        loadedPdf.context.obj([widgetDictRef])
      );

      loadedPdf.catalog.set(
        PDFName.of("AcroForm"),
        loadedPdf.context.obj({
          SigFlags: 3,
          Fields: [widgetDictRef],
        })
      );
    }

    // Add signature widget to the first page

    // Allows signatures on newer PDFs
    // @see https://github.com/Hopding/pdf-lib/issues/541
    const pdfBytes = await loadedPdf.save({ useObjectStreams: false });
    return SignPDF.unit8ToBuffer(pdfBytes);
  }

  /**
   * @param {Uint8Array} unit8
   */
  static unit8ToBuffer(unit8) {
    let buf = Buffer.alloc(unit8.byteLength);
    const view = new Uint8Array(unit8);

    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }
}
