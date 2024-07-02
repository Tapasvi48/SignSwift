import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  length: number;
  onSelect: any;
  selectedOption: number;
}

export function SignNumberDropDown({
  length,
  onSelect,
  selectedOption,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedOption}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onSelect(0)}>
          <DropdownMenuLabel>0</DropdownMenuLabel>
        </DropdownMenuItem>
        {Array.from(Array(length))?.map((_, index) => (
          <DropdownMenuItem key={index} onSelect={() => onSelect(index + 1)}>
            <DropdownMenuLabel>{index + 1}</DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
