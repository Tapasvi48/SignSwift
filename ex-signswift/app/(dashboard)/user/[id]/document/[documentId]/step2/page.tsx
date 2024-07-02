"use client";

import PdfViewer from "@/components/PdfViewer/viewer";
import Step2 from "@/components/formstep2";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useApi } from "@/api-service/useApi";
import { getDocumentById } from "@/api-service/documentApi";
import Loader from "@/components/Loader";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import { getRecepientById } from "@/api-service/recepientApi";
interface IData {
  Document: {
    ShareLink: string;
    createdAt: Date;
    id: number;
    title: string;
    status: string;
    updatedAt: Date;
  };
}

const page = ({ params }: { params: { id: string; documentId: string } }) => {
  const { loading, error, data, request } = useApi(getDocumentById) as {
    loading: boolean;
    error: string;
    data: IData | null;
    request: (...args: any[]) => Promise<any>;
  };
  const {
    loading: loading2,
    error: error2,
    data: data2,
    request: request2,
  } = useApi(getRecepientById) as {
    loading: boolean;
    error: string;
    data: any;
    request: (...args: any[]) => Promise<any>;
  };
  const router = useRouter();

  useEffect(() => {
    request({ docId: params.documentId });
    request2({ docId: params.documentId });
  }, [params]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col px-16">
      <div className="w-full flex flex-col gap-7 pt-10">
        <H2>{data?.Document?.title || "Pdf_file_name"}</H2>
        <H4>Recepient info</H4>
      </div>
      <div
        className="w-full flex flex-row gap-24 mt-5"
        // style={{ overflowY: "hidden", height: "86vh" }}
      >
        <div
          style={{
            overflowX: "hidden",
            overflowY: "hidden",
          }}
          id="pdf-viewer"
          className="rounded-md h-full w-full max-w-[40rem]"
        >
          <PdfViewer url={data?.Document?.ShareLink || ""} />
        </div>
        <div className="w-[50rem]  justify-center pt-0  ">
          <div className="w-full   h-[50rem]">
            <Step2
              receptientProp={data2}
              docId={params.documentId}
              userId={params.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
