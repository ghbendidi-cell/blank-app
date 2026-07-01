import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { agents } from "@/data/agents";
import Breadcrumb from "@/components/Breadcrumb";
import ContactRequestForm from "@/components/ContactRequestForm";
import AgencyLocationCard from "@/components/AgencyLocationCard";
import AgentCard from "@/components/AgentCard";
import FAQAccordion from "@/components/FAQAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const faqItems = [
    {
      question: "Sous quel délai un conseiller me recontacte-t-il ?",
      answer: "Nous répondons à toute demande sous 24h ouvrées, par téléphone, WhatsApp ou email selon votre préférence.",
    },
    {
      question: "Puis-je payer en agence uniquement ?",
      answer: "Oui, la réservation et le paiement se finalisent en agence à Maarif. Le site sert à préparer votre devis.",
    },
    {
      question: "Quels moyens de paiement acceptez-vous en agence ?",
      answer: "Espèces, carte bancaire et virement sont acceptés directement à l'agence.",
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: tCommon("seeAll"), href: "/" }, { label: t("title") }]} />

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ContactRequestForm />
          <AgencyLocationCard />
        </div>

        <h2 className="mb-4 mt-12 text-lg font-bold text-slate-900">{t("teamTitle")}</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <h2 className="mb-4 mt-12 text-lg font-bold text-slate-900">FAQ</h2>
        <FAQAccordion items={faqItems} />
      </div>
    </div>
  );
}
