import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { agents } from "@/data/agents";
import Breadcrumb from "@/components/Breadcrumb";
import AgentCard from "@/components/AgentCard";
import TrustBadges from "@/components/TrustBadges";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

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
        <ScrollReveal>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">{t("intro")}</p>
        </ScrollReveal>

        <h2 className="mb-4 mt-10 text-xl font-bold tracking-tight text-slate-900">{t("certificationsTitle")}</h2>
        <TrustBadges />

        <h2 className="mb-4 mt-10 text-xl font-bold tracking-tight text-slate-900">{t("teamTitle")}</h2>
        <StaggerGrid className="grid gap-5 sm:grid-cols-3">
          {agents.map((agent) => (
            <StaggerItem key={agent.id}>
              <AgentCard agent={agent} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-10 max-w-lg">
          <AgencyLocationCard />
        </div>
      </div>
    </div>
  );
}
