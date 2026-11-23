"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { highlightPrices } from "@/components/ui/PriceText";

export function FaqList({
  items,
  id = "faq",
}: {
  items: { question: string; answer: string }[];
  id?: string;
}) {
  return (
    <Accordion.Root id={id} type="multiple" className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-4 text-start font-heading text-base font-semibold">
              {item.question}
              <ChevronDown className="size-5 shrink-0 transition-transform data-[state=open]:rotate-180" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content forceMount className="px-4 pb-4 text-muted data-[state=closed]:hidden">
            <p>{highlightPrices(item.answer)}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export { Accordion };
