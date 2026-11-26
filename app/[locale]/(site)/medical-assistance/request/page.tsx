import { setRequestLocale } from "next-intl/server";
import { AssistanceRequestForm } from "@/components/assistance/AssistanceRequestForm";
import { EmergencyNotice } from "@/components/assistance/AssistanceCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { publishedServices } from "@/data/assistance";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/medical-assistance/request",
    title: "Request Medical Assistance | TechDr",
    description: "Ask TechDr to arrange a medical flight, escort, ground ambulance, teleconsultation, home care or family support.",
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const services = publishedServices().map((item) => ({ slug: item.slug, label: item.label }));
  const quiet = query.service === "repatriation-support";
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Medical assistance", path: "/medical-assistance" },
          { name: quiet ? "Support team" : "Request", path: "/medical-assistance/request" },
        ]}
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="max-w-3xl">
          <h1 className="text-balance">{quiet ? "Speak to our support team" : "Request medical assistance"}</h1>
          <p className="mt-3">
            {quiet
              ? "Share what you know, at your own pace. The support team will explain the documents and the next step. Nothing is booked until you agree."
              : "Tell us where the patient is, where they need to go, and what support they are on. TechDr coordinates the case with licensed operators and providers."}
          </p>
          <EmergencyNotice />
          <div className="mt-6">
            <AssistanceRequestForm services={services} />
          </div>
        </div>
      </div>
    </>
  );
}
