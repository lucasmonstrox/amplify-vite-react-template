"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Selecione uma data",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Criar uma nova data no fuso horário local para evitar problemas de UTC
      const localDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      onDateChange?.(localDate);
    } else {
      onDateChange?.(undefined);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 min-w-[320px] max-w-[400px]"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
