import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import CustomSignatureCanvas from "./signatureCanvas";
import SignatureCanvas from "react-signature-canvas";
interface CustomSignaturePadProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSaveSignature: (signature: string) => void;
  signatureCanvasRef: React.RefObject<SignatureCanvas>;
}

const CustomSignaturePad = ({
  open,
  setOpen,
  onSaveSignature,
  signatureCanvasRef,
}: CustomSignaturePadProps) => {
  const saveSignature = () => {
    const signatureImage = signatureCanvasRef?.current?.toDataURL();
    onSaveSignature(signatureImage || "");
    signatureCanvasRef?.current?.clear();
  };
  const onUpload = () => {
    signatureCanvasRef?.current?.fromDataURL("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Sign In as User 1</DialogTitle>
          <DialogDescription className="h-5 pt-3">Signature</DialogDescription>
        </DialogHeader>
        <div className="border-1 border-red-200 h-52">
          <CustomSignatureCanvas signatureCanvasRef={signatureCanvasRef} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-1/2">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-1/2  bg-[#A2E771] hover:bg-[#A2E771]  text-gray-600"
              onClick={saveSignature}
            >
              Sign
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomSignaturePad;
