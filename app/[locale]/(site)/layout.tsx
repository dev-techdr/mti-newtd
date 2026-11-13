import { setRequestLocale } from "next-intl/server";
import { Assist } from "@/components/layout/Assist";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/Motion";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { routing } from "@/i18n/routing";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const notice =
    locale === "ar"
      ? "الترجمة الكاملة لهذه الصفحة قيد الإعداد. المحتوى الطبي أدناه باللغة الإنجليزية."
      : locale === "fr"
        ? "La traduction complète est en cours. Le contenu médical reste en anglais."
        : locale === "ru"
          ? "Полный перевод готовится. Медицинский текст ниже на английском."
          : locale === "bn"
            ? "পূর্ণ অনুবাদ তৈরি হচ্ছে। চিকিৎসা-বিষয়ক লেখা এখন ইংরেজিতে।"
            : "";

  return (
    <MotionProvider>
      <SmoothScroll />
      <Header />
      {notice ? <p className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">{notice}</p> : null}
      <main id="content" className="pb-24 md:pb-0">{children}</main>
      <Footer />
      <Assist />
    </MotionProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
