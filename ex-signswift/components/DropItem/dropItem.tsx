"use client";
import React, { MutableRefObject, ReactNode } from "react";
import { RefObject } from "react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useDrag } from "react-dnd";
interface DropItemProps {
  childref: RefObject<HTMLButtonElement>;
  itemId: number;
  text: string;

  icon: ReactNode;
}

const DropItem: FC<DropItemProps> = ({ childref, itemId, icon, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "test",
    item: { id: itemId },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));
  drag(childref);
  return (
    <Button
      ref={childref}
      type="button"
      size={"sm"}
      style={{
        height: "5rem",
        border: "1px solid #EAEAEA",
      }}
      className="flex items-center justify-center bg-white text-black p-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition-colors"
    >
      <div>{icon}</div>
      <span className="ml-2">{text}</span>
    </Button>
  );
};

export default DropItem;
