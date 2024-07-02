"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import { FC } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Mail, User, Calendar, Text } from "lucide-react";

import { useRouter } from "next/navigation";
import DropItem from "../DropItem/dropItem";
import ComboBox from "../DragDrop/comboBox";
import axios from "axios";
import H2 from "../Typography/H2";
import { IField } from "@/types/global.type";

//for which user->mail id save  getting from common box set value

interface FormProps {
  userId: string;
  docId: string;
  childrefs: RefObject<HTMLButtonElement>[];
  copiedItems: IField[];
  value: number;
  setValue: (value: number) => void;
  value2: string;
  setValue2: (value: string) => void;
}
const Form: FC<FormProps> = ({
  childrefs,
  copiedItems,
  value,
  setValue,
  value2,
  setValue2,
  userId,
  docId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleContinue = async () => {
    setLoading(true);
    try {
      const saveDocsSign = await axios.post("/api/document/saveDocsSign", {
        docId: parseInt(docId),
        droppedItem: copiedItems,
      });
      console.log(saveDocsSign);
      console.log(docId, userId);
      router.push(`/user/${userId}/document/${docId}/step4`);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("copied item in form", copiedItems);

  const fieldValues = [
    { id: 1, text: "Signature", icon: null },
    { id: 2, text: "Email", icon: <Mail size={24} /> },
    { id: 3, text: "Name", icon: <User size={24} /> },
    { id: 4, text: "Date", icon: <Calendar size={24} /> },
    { id: 5, text: "Text", icon: <Text size={24} /> },
  ];

  return (
    <div className=" bg-[#F7F7F7] w-full h-full flex justify-center items-start  ">
      <div className="w-full bg-[#F7F7F7]" style={{ height: "100%" }}>
        <Card
          className="p-2 w-full bg-[#F7F7F7]  border-2 border-rose-500 "
          // style={{ height: "95%" }}
        >
          <CardContent className="mt-5 mb-5">
            <h1 className="font-medium text-3xl">Add Fields</h1>
            <h4 className=" font-light text-sm  pt-3 text-[#64748B]">
              Add all relevant fields for each recipient.
            </h4>
          </CardContent>

          <CardContent className="w-full bg-[#F7F7F7]">
            <ComboBox
              docId={docId}
              value={value}
              setValue={setValue}
              value2={value2}
              setValue2={setValue2}
            />
          </CardContent>

          <CardContent
            className="w-full flex  gap-1  flex-col pt-5 pb-10"
            style={{}}
          >
            <fieldset className=" w-full grid grid-cols-2  gap-12 gap-x-25">
              {childrefs?.map((childref, index) => (
                <DropItem
                  key={index}
                  childref={childref}
                  itemId={index}
                  text={fieldValues[index].text}
                  icon={fieldValues[index].icon}
                />
              ))}
            </fieldset>
            <div className="mt-16">
              <div>
                <p className="text-muted-foreground text-sm">
                  Step <span>3 of 4</span>
                </p>
                <div className="relative h-1 rounded-full mb-2">
                  <div className="absolute left-0 top-0 h-full bg-rose-500 w-2/4"></div>
                </div>
              </div>
              <div className="mt-4 flex gap-x-4">
                <button
                  className="inline-flex items-center justify-center text-white text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-secondary-foreground h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-500/80 flex-1 "
                  type="button"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Go Back
                </button>
                {loading ? (
                  <Button
                    disabled
                    className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                  >
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <button
                    className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                    type="button"
                    onClick={(e) => {
                      handleContinue();
                    }}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
