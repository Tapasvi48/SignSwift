import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DropdownMenuDemo({
  selectedValue,
  setSelectedValue,
}: {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Signer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          onClick={() => {
            setSelectedValue("SIGNER");
          }}
          value="light"
        >
          Signer
        </SelectItem>
        <SelectItem onClick={() => setSelectedValue("VIEWER")} value="dark">
          Recieves Copy
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
