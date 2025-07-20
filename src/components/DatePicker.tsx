"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
    if (selectedDate) {
      // Always preserve current time or use current time as default
      const newDate = new Date(selectedDate);

      if (date) {
        // If we have an existing date, preserve its time
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        newDate.setSeconds(date.getSeconds());
      } else {
        // If no existing date, use current time
        const now = new Date();
        newDate.setHours(now.getHours());
        newDate.setMinutes(now.getMinutes());
        newDate.setSeconds(now.getSeconds());
      }

      if (onChange) {
        onChange(newDate);
      } else {
        setInternalDate(newDate);
      }
    } else {
      if (onChange) {
        onChange(selectedDate);
      } else {
        setInternalDate(selectedDate);
      }
    }
    setOpen(false);
  };

  const handleTimeChange = (timeString: string) => {
    if (!date) return;

    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds || 0);

    if (onChange) {
      onChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const formatTimeValue = (date: Date | undefined) => {
    if (!date) {
      // Use current time as default
      const now = new Date();
      return now.toTimeString().slice(0, 8); // HH:MM:SS format
    }
    return date.toTimeString().slice(0, 8); // HH:MM:SS format
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1 text-white">
          Reset Date
        </Label>
        {/* Hidden input for form data */}
        <input
          type="hidden"
          name={name}
          value={date ? date.toISOString() : ""}
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
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1 text-white">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={formatTimeValue(date)}
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={disabled}
          className="appearance-none py-1.25 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
