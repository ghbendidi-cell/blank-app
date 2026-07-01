import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { agents } from "@/data/agents";
import Breadcrumb from "@/components/Breadcrumb";
import AgentCard from "@/components/AgentCard";
import TrustBadges from "@/components/TrustBadges";
import AgencyLocationCard from "@/components/AgencyLocationCard";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title"), description: t("intro") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: t("title") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">{t("intro")}</p>

        <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">{t("certificationsTitle")}</h2>
        <TrustBadges />

        <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">{t("teamTitle")}</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <div className="mt-10 max-w-lg">
          <AgencyLocationCard />
        </div>
      </div>
    </div>
  );
}
