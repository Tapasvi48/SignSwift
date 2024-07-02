import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import CustomSignatureCanvas from "../Signature/signatureCanvas";
import SignatureCanvas from "react-signature-canvas";
import { ReloadIcon } from "@radix-ui/react-icons";
interface SignatureFormProps {
  signatureCanvasRef: React.RefObject<SignatureCanvas>;
  handleSign: () => void;
}
const SignatureForm = ({
  signatureCanvasRef,
  handleSign,
}: SignatureFormProps) => {
  const [imagesrc, setImagesrc] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadSignature = (e: any) => {
    console.log("sone");
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagesrc(imageUrl);
    signatureCanvasRef?.current?.fromDataURL(imageUrl);
    console.log(signatureCanvasRef?.current?.toDataURL());
  };

  return (
    <div className="bg-[#f7f7f7] border-border bg-widget sticky flex  flex-col rounded-xl border px-4 py-6 top-20  w-full ">
      <form
        className="px-4 py-2"
        // onSubmit={(e) => {
        //   e.preventDefault();
        // }}
      >
        <fieldset className="custom-scrollbar flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col">
            <h3 className="text-foreground text-2xl font-semibold">
              Sign Document
            </h3>

            <p className="text-muted-foreground mt-2 text-sm">
              Please review the document before signing.
            </p>

            <hr className="border-border mb-8 mt-4" />

            <div className="flex flex-1 flex-col gap-y-4 w-full">
              <div>
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  type="text"
                  id="full-name"
                  className="mt-2 w-4/5 px-2 mx-1"
                  // value and onChange props
                />
              </div>

              <div className=" h-56 w-full ">
                <Label htmlFor="Signature">Signature</Label>
                <Card className="mt-2  h-4/5">
                  <CardContent className="p-0 h-full">
                    <CustomSignatureCanvas
                      signatureCanvasRef={signatureCanvasRef}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row mt-10 items-center justify-center">
              <Button
                type="button"
                className="bg-black/5 hover:bg-black/10 w-full"
                variant="secondary"
                size="lg"
                // onClick prop
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="bg-[#A2E771] hover:bg-[#a2e771c2] w-full text-black"
                onClick={handleSign}
              >
                Sign
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
      {imagesrc ? (
        <div className="bg-indigo-300 ...">
          <img className="object-cover h-48 w-96 ..." src={imagesrc} />
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-start items-center w-full mt-10">
          <div>Upload Signature</div>
          <div className="flex justify-start items-center w-full p-5 ">
            <div className="flex items-center justify-center w-full ">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={uploadSignature}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatureForm;
