import React from "react";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
interface CustomSignatureCanvasProps {
  signatureCanvasRef: React.RefObject<SignatureCanvas>;
}

const CustomSignatureCanvas = ({
  signatureCanvasRef,
}: CustomSignatureCanvasProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const clearSignature = () => {
    console.log("clear signature");
    signatureCanvasRef?.current?.clear();
  };

  return (
    <div className="bg-white  rounded-lg shadow-md relative w-full h-full">
      <SignatureCanvas
        ref={signatureCanvasRef}
        minWidth={2}
        penColor="black"
        canvasProps={{
          className: "signature-canvas",
          style: {
            border: "1px solid #D3D3D3",
            fontWeight: "bold",
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "0.5rem",
          },
        }}
      />
      <div className="absolute bottom-4 right-4 z-50  text-xs   ">
        <button
          className="text-gray-400"
          onClick={clearSignature}
          type="button"
        >
          Clear Signature
        </button>
      </div>
    </div>
  );
};

export default CustomSignatureCanvas;
