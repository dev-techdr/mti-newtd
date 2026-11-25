import { cloneElement, createElement, isValidElement, type JSX, type ReactNode } from "react";

const som = "so\u02BBm";
const amount = String.raw`(?:\$|₦|৳|؋|﷼|KSh|TSh|Br|ر\.ع\.|ع\.د|${som})\s?\d{1,3}(?:,\d{3})*`;
const usd = String.raw`USD\s+\d{1,3}(?:,\d{3})*\+?`;
const PRICE = new RegExp(
  `(${usd}(?:\\s*[–—−-]\\s*(?:USD\\s+)?\\d{1,3}(?:,\\d{3})*\\+?)?|${amount}(?:\\s*[–—−-]\\s*${amount})?)`,
  "g",
);

function nextKey(ids: { n: number }, prefix: string) {
  ids.n += 1;
  return `${prefix}${ids.n}`;
}

function asDollars(part: string) {
  return part.replace(/USD\s+(\d)/g, "$$$1").replace(/–(\d)/g, "–$$$1");
}

function markPrices(text: string, ids: { n: number }): ReactNode {
  const parts = text.split(PRICE);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={nextKey(ids, "m")} className="box-decoration-clone rounded-sm bg-primary/20 px-[0.22em] font-semibold text-primary-ink">
        {asDollars(part)}
      </mark>
    ) : (
      part
    ),
  );
}

function isPriceMark(node: ReactNode) {
  return isValidElement<{ className?: string }>(node) && node.type === "mark";
}

/** cloneElement drops the static-child flag, so a highlighted node in a sibling list needs its own key. */
function keyed(node: ReactNode, ids: { n: number }): ReactNode {
  if (Array.isArray(node)) return node.map((child) => keyed(child, ids));
  if (!isValidElement(node) || node.key != null) return node;
  return cloneElement(node, { key: nextKey(ids, "n") });
}

function walk(node: ReactNode, ids: { n: number }): ReactNode {
  if (typeof node === "string") return markPrices(node, ids);
  if (Array.isArray(node)) {
    let changed = false;
    const next = node.map((child) => {
      const value = walk(child, ids);
      if (value === child) return child;
      changed = true;
      return keyed(value, ids);
    });
    return changed ? next : node;
  }
  if (!isValidElement<{ children?: ReactNode }>(node) || isPriceMark(node) || node.props.children == null) return node;
  const children = walk(node.props.children, ids);
  return children === node.props.children ? node : cloneElement(node, undefined, children);
}

/** Wrap currency amounts that appear inside visible text, such as `$500–$1,800` or `USD 4,500–7,000`. */
export function highlightPrices(node: ReactNode): ReactNode {
  return walk(node, { n: 0 });
}

export function PriceText({ children }: { children: ReactNode }) {
  return highlightPrices(children);
}

function tagged(tag: keyof JSX.IntrinsicElements) {
  return function PriceTag({ children, ...props }: { children?: ReactNode }) {
    return createElement(tag, props, highlightPrices(children));
  };
}

export const priceMdx = {
  p: tagged("p"),
  li: tagged("li"),
  td: tagged("td"),
  th: tagged("th"),
};
