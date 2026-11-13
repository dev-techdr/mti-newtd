import { OgImage, alt, contentType, size } from "@/lib/og";

export { alt, contentType, size };

export default function Image() {
  return OgImage({ title: "World-class treatment in India", footer: "medicaltourism.techdr.in" });
}
