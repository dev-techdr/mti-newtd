"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export function CostTabs({
  included,
  excluded,
}: {
  included: string[];
  excluded: string[];
}) {
  return (
    <Tabs.Root defaultValue="included">
      <Tabs.List className="flex gap-2">
        <Tabs.Trigger className="min-h-11 rounded-full px-4 data-[state=active]:bg-secondary data-[state=active]:text-background" value="included">
          Included
        </Tabs.Trigger>
        <Tabs.Trigger className="min-h-11 rounded-full px-4 data-[state=active]:bg-secondary data-[state=active]:text-background" value="excluded">
          Not included
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="included" forceMount className={cn("data-[state=inactive]:hidden")}>
        <ul className="mt-4 list-disc space-y-2 ps-5">{included.map((item) => <li key={item}>{item}</li>)}</ul>
      </Tabs.Content>
      <Tabs.Content value="excluded" forceMount className="data-[state=inactive]:hidden">
        <ul className="mt-4 list-disc space-y-2 ps-5">{excluded.map((item) => <li key={item}>{item}</li>)}</ul>
      </Tabs.Content>
    </Tabs.Root>
  );
}
