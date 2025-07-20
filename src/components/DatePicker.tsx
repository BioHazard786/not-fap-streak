"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
}

export default function DatePicker({
  name = "date",
  value,
  onChange,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  );

  // Use controlled value if provided, otherwise use internal state
  const date = value !== undefined ? value : internalDate;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (onChange) {
      onChange(selectedDate);
    } else {
      setInternalDate(selectedDate);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 text-white">
        Reset Date
      </Label>
      {/* Hidden input for form data */}
      <input
        type="hidden"
        name={name}
        value={date ? date.toISOString().split("T")[0] : ""}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            type="button"
            disabled={disabled}
            className="w-full justify-between font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 focus-visible:ring-white/20"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 " align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
