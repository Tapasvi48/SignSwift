import React, { useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useState } from "react";

import { useRef } from "react";
import { ReactNode } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import CustomSignatureCanvas from "../Signature/signatureCanvas";
import { DialogTrigger } from "../ui/dialog";
import CustomSignaturePad from "../Signature/signaturePad";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
interface IField {
  id: number;
  secondaaryId: string;
  left: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: string;
  signature?: string;
}

interface PdfFillComponentProps {
  signatureCanvasRef: React.RefObject<SignatureCanvas>;
  signatureCanvasRef2: React.RefObject<SignatureCanvas>;
  copiedItems: IField[];
  url: string;
  userid?: string;
}
const PdfFillComponent = ({
  signatureCanvasRef,
  signatureCanvasRef2,
  copiedItems,
  url,
  userid,
}: PdfFillComponentProps) => {
  let id = -1;

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentItemId, setCurrentItemId] = useState<number>(-1);
  const [signedItems, setSignedItems] = useState<number[]>([]);
  console.log(copiedItems, "dev");
  const onSaveSignature = (signature: string, currentItemId: number) => {
    console.log("currentItemId", currentItemId);
    if (currentItemId === -1) {
      console.log("Something Wrong");
      return;
    }
    setSignedItems([...signedItems, currentItemId]);
    let newCopiedItems = copiedItems.filter((item) => {
      if (item.id === currentItemId) {
        item.signature = signature;
      }
      return item;
    });
    setCopiedItems(newCopiedItems);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //arr ->find if he ki nhi he ->sign use state

  const [copiedItems2, setCopiedItems] = useState<IField[]>(copiedItems);

  const handleSign = (itemId: number) => {
    //already signed
    if (signedItems.includes(itemId)) {
      //remove logic
      let newCopiedItems = copiedItems.filter((item) => {
        if (item.id === itemId) {
          item.signature = "";
        }
        return item;
      });

      setCopiedItems(newCopiedItems);
      setSignedItems(signedItems.filter((id) => id !== itemId));
      return;
    }
    //not signed but sign pad has sign and want to apply that sign
    else if (
      signatureCanvasRef2?.current !== null &&
      !signatureCanvasRef2?.current?.isEmpty()
    ) {
      console.log(signatureCanvasRef2?.current?.toDataURL());
      onSaveSignature(signatureCanvasRef2?.current?.toDataURL() || "", itemId);
      return;
    }
    setCurrentItemId(itemId);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",

        height: "100%",
        paddingLeft: "3.5rem",
        paddingRight: "3.5rem",
        paddingTop: "1rem",
      }}
    >
      <div>
        <div
          style={{
            height: "90%",
            marginTop: "0rem",
            overflowY: "scroll",
            width: "100%",
            overflowX: "clip",
          }}
          id="pdf-viewer"
          className="border-2 border-rose-500 rounded-md m-2"
        >
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <div
              style={{
                position: "relative",
              }}
              ref={parentRef}
            >
              {copiedItems?.map(
                (item, indx) =>
                  item.page === currentPage && (
                    <div
                      onClick={() => handleSign(item.id)}
                      key={indx}
                      style={{
                        width: parseInt(item.width),
                        height: parseInt(item.height),
                        left: parseInt(item.left),
                        top: parseInt(item.top),
                        position: "absolute",
                        borderRadius: "0.5rem",

                        fontWeight: "500",
                      }}
                      className="cursor-pointer text-gray-800 z-50 bg-white dark:bg-gray-800 dark:text-white border-2 border-gray-200  rounded-md shadow-md flex justify-center items-center"
                    >
                      {item.signature ? (
                        <div className="relative shadow-xl h-full w-full">
                          <div className="hover:backdrop-blur-md absolute inset-0 flex justify-center items-center z-50  border-gray-200  rounded-md shadow-md">
                            <div className="text-rose-500 text-xs opacity-0 transition-opacity duration-300 hover:opacity-100 w-full h-full flex justify-center items-center">
                              Remove
                            </div>
                          </div>
                          <img
                            src={item.signature}
                            className="h-full w-full object-contain dark:invert bg-white border-2 border-gray-200  rounded-md shadow-md"
                          />
                        </div>
                      ) : (
                        <>
                          <div
                            key={item.id}
                            style={{
                              position: "absolute",
                              width: parseInt(item.width),
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: parseInt(item.height),
                              textAlign: "center",
                            }}
                          >
                            <div className="flex gap-5">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.icon || "",
                                }}
                              ></div>
                              <div>{item?.text}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )
              )}

              <Page key={`page_${currentPage}`} pageNumber={currentPage} />
            </div>
          </Document>
        </div>
        <div className="mt-7 flex gap-40 items-center  justify-center">
          <button
            className={`px-6 py-2 mr-2 rounded-md ${
              currentPage === 1
                ? "bg-rose-700 text-white cursor-not-allowed"
                : "bg-rose-500 text-white cursor-pointer"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p className="text-lg  text-white mx-4">
            Page {currentPage} of {numPages}
          </p>
          <button
            className={`px-6 py-2 rounded-md ${
              currentPage === numPages
                ? "bg-rose-700 text-white cursor-not-allowed"
                : "bg-rose-500 text-white cursor-pointer"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === numPages}
          >
            Next
          </button>
        </div>
      </div>

      <div
        style={{
          width: "50vw",
        }}
      >
        <div>
          <CustomSignaturePad
            signatureCanvasRef={signatureCanvasRef}
            open={open}
            setOpen={setOpen}
            onSaveSignature={() =>
              onSaveSignature(
                signatureCanvasRef.current?.toDataURL() || "",
                currentItemId
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PdfFillComponent;
