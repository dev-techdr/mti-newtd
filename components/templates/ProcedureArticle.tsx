import { GuideArticle } from "@/components/templates/GuideArticle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getCost } from "@/data/costs";
import { procedurePath, type Procedure } from "@/data/procedures";
import { getSpecialty } from "@/data/specialties";
import { treatmentModel } from "@/lib/page-model";
import { guideGraph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

export function ProcedureArticle({ locale, procedure }: { locale: string; procedure: Procedure }) {
  const model = treatmentModel(procedure);
  const cost = getCost(procedure.costId);
  const specialty = getSpecialty(procedure.specialty);
  const path = procedurePath(procedure);
  const schema = guideGraph({
    url: absoluteUrl(locale, path),
    name: model.h1,
    updated: model.updated,
    kind: model.kind === "cost" || model.kind === "country" ? "procedure" : model.kind,
    description: procedure.description,
    faqs: model.faqs,
    procedureType: procedure.procedureType,
    howPerformed: model.kind === "procedure" ? procedure.howPerformed : undefined,
    followup: model.kind === "procedure" ? procedure.followup : undefined,
    price: model.showPrice ? { min: cost.india[0], max: cost.india[1] } : undefined,
  });

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Treatments", path: "/treatments" },
          { name: specialty?.name ?? procedure.specialty, path: `/treatments/${procedure.specialty}` },
          { name: procedure.card, path },
        ]}
      />
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 pt-6">
        <ServiceIcon specialty={procedure.specialty} procedure={procedure.slug} size={64} />
        {specialty ? <p className="text-sm font-semibold text-primary-ink">{specialty.name}</p> : null}
      </div>
      <GuideArticle locale={locale} model={model} />
    </>
  );
}
