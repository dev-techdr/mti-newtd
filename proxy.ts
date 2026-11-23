import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { getCity } from "./data/cities";
import { getProcedure, procedurePath } from "./data/procedures";
import { getSpecialty } from "./data/specialties";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);
const localePrefix = routing.locales.filter((locale) => locale !== routing.defaultLocale).join("|");
const cityProcedure = new RegExp(`^(?:/(${localePrefix}))?/destinations/([^/]+)/([^/]+)$`);
const cityDepartment = new RegExp(`^(?:/(${localePrefix}))?/destinations/([^/]+)/departments/([^/]+)$`);
const cityDepartmentsIndex = new RegExp(`^(?:/(${localePrefix}))?/destinations/([^/]+)/departments$`);

function withLocale(locale: string | undefined, path: string) {
  return locale ? `/${locale}${path}` : path;
}

function knownCity(slug: string) {
  return getCity(slug);
}

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const procedureMatch = path.match(cityProcedure);
  if (procedureMatch && procedureMatch[3] !== "departments") {
    const procedure = getProcedure(procedureMatch[3]);
    if (procedure && knownCity(procedureMatch[2])) {
      const url = request.nextUrl.clone();
      url.pathname = withLocale(procedureMatch[1], procedurePath(procedure));
      return NextResponse.redirect(url, 308);
    }
  }
  const departmentMatch = path.match(cityDepartment);
  if (departmentMatch) {
    const specialty = getSpecialty(departmentMatch[3]);
    if (specialty && knownCity(departmentMatch[2])) {
      const url = request.nextUrl.clone();
      url.pathname = withLocale(departmentMatch[1], `/treatments/${specialty.slug}`);
      return NextResponse.redirect(url, 308);
    }
  }
  const indexMatch = path.match(cityDepartmentsIndex);
  if (indexMatch) {
    const city = knownCity(indexMatch[2]);
    if (city) {
      const url = request.nextUrl.clone();
      url.pathname = withLocale(indexMatch[1], `/destinations/${city.path}`);
      return NextResponse.redirect(url, 308);
    }
  }
  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
