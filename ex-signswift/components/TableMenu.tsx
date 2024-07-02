"use client";
import React from "react";
import { FaSignature } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiDraftLine } from "react-icons/ri";

import { IoMdDocument } from "react-icons/io";
import {
  ALL_DOCS,
  DRAFT_DOCS,
  INBOX_DOCS,
  PENDING_DOCS,
  COMPLETED_DOCS,
} from "@/app/(dashboard)/user/[id]/signdoc/docstatus";

const TableMenu = ({
  status,
  setdocStatus,
}: {
  status: string;
  setdocStatus: (value: string) => void;
}) => {
  // console.log(status);
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="dashboard-tablist bg-muted  text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1"
      data-orientation="horizontal"
    >
      <button
        onClick={() => setdocStatus(INBOX_DOCS)}
        className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
          status === INBOX_DOCS ? " text-white bg-rose-500 rounded-md " : ""
        }`}
      >
        <FaSignature className="react-icon" />
        Inbox
      </button>
      <button
        onClick={() => setdocStatus(DRAFT_DOCS)}
        className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
          status === DRAFT_DOCS ? "text-white bg-rose-500 rounded-md " : ""
        }`}
      >
        <RiDraftLine className="react-icon" />
        Draft
      </button>
      <button
        onClick={() => setdocStatus(COMPLETED_DOCS)}
        className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
          status === COMPLETED_DOCS ? "text-white bg-rose-500 rounded-md " : ""
        }`}
      >
        <IoIosCheckmarkCircleOutline className="react-icon font-semibold" />
        Completed
      </button>
      <button
        onClick={() => setdocStatus(PENDING_DOCS)}
        className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
          status === PENDING_DOCS ? "text-white bg-rose-500 rounded-md " : ""
        }`}
      >
        <FaRegClock className="react-icon" />
        Pending
      </button>
      <button
        onClick={() => setdocStatus(ALL_DOCS)}
        className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
          status === ALL_DOCS ? "text-white bg-rose-500 rounded-md " : ""
        }`}
      >
        <IoMdDocument className="react-icon" />
        All
      </button>
    </div>
  );
};

export default TableMenu;
