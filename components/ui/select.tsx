"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export function SimpleSelect({
  name,
  label,
  placeholder,
  options,
  required,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <Select.Root name={name} required={required}>
        <Select.Trigger className="mt-1 flex min-h-11 w-full items-center justify-between rounded-xl border border-border bg-card px-3 text-start" aria-label={label}>
          <Select.Value placeholder={placeholder} />
          <ChevronDown className="size-4" aria-hidden />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className="flex min-h-11 cursor-pointer items-center justify-between rounded-lg px-3 outline-none data-[highlighted]:bg-surface">
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </label>
  );
}
