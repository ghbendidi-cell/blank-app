"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { packs } from "@/data/packs";
import PackCard from "./PackCard";
import ScrollReveal from "./animations/ScrollReveal";

type Envie = "culture" | "detente" | "nature" | "spirituel";

const ENVIE_BY_PACK: Record<string, Envie[]> = {
  "pack-egypte-caire-sharm": ["culture", "detente"],
  "pack-vietnam": ["nature", "culture"],
  "pack-istanbul": ["culture", "detente"],
  "pack-hajj-2027": ["spirituel"],
};

const BUDGET_MAX: Record<string, number> = { b1: 10000, b2: 20000, b3: 40000, b4: Infinity };
const DURATION_RANGE: Record<string, [number, number]> = {
  d1: [0, 7],
  d2: [8, 14],
  d3: [15, 999],
  d4: [0, 999],
};

interface Answers {
  budget?: string;
  duration?: string;
  envie?: string;
}

export default function TravelQuiz() {
  const locale = useLocale() as Locale;
  const t = useTranslations("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const results = useMemo(() => {
    if (!answers.budget || !answers.duration || !answers.envie) return [];

    const budgetMax = BUDGET_MAX[answers.budget];
    const [durMin, durMax] = DURATION_RANGE[answers.duration];
    const envie = answers.envie.replace("e1", "culture").replace("e2", "detente").replace("e3", "nature").replace("e4", "spirituel") as Envie;

    const scored = packs.map((pack) => {
      let score = 0;
      if (pack.priceFrom <= budgetMax) score += 2;
      if (pack.durationDays === 0 || (pack.durationDays >= durMin && pack.durationDays <= durMax)) score += 1;
      if (ENVIE_BY_PACK[pack.id]?.includes(envie)) score += 2;
      return { pack, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((s) => s.pack);
  }, [answers]);

  const questions = [
    { key: "budget" as const, labelKey: "budget", options: ["b1", "b2", "b3", "b4"] },
    { key: "duration" as const, labelKey: "duration", options: ["d1", "d2", "d3", "d4"] },
    { key: "envie" as const, labelKey: "envie", options: ["e1", "e2", "e3", "e4"] },
  ];

  const isDone = step >= questions.length;

  function selectAnswer(key: "budget" | "duration" | "envie", value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {!isDone ? (
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand">
            {t("step", { current: step + 1, total: questions.length })}
          </p>
          <h3 className="mb-5 text-xl font-bold text-slate-900">
            {t(`${questions[step].labelKey}.question` as never)}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {questions[step].options.map((optionKey) => (
              <button
                key={optionKey}
                type="button"
                onClick={() => selectAnswer(questions[step].key, optionKey)}
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-start text-sm font-medium text-slate-700 transition hover:border-brand hover:bg-brand-light hover:text-brand"
              >
                {t(`${questions[step].labelKey}.${optionKey}` as never)}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-5 text-sm font-medium text-slate-500 hover:underline"
            >
              ← {t("back")}
            </button>
          )}
        </div>
      ) : (
        <ScrollReveal>
          <h3 className="mb-1 text-xl font-bold text-slate-900">{t("resultTitle")}</h3>
          <p className="mb-6 text-sm text-slate-600">{t("resultSubtitle")}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {results.map((pack) => (
              <PackCard key={pack.id} pack={pack} locale={locale} />
            ))}
          </div>
          <button type="button" onClick={restart} className="mt-6 text-sm font-semibold text-brand hover:underline">
            ↻ {t("restart")}
          </button>
        </ScrollReveal>
      )}
    </div>
  );
}
