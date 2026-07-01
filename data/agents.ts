import type { Agent } from "@/lib/types";

const photo = (altFr: string, altAr: string): Agent["photo"] => ({
  url: null,
  altFr,
  altAr,
  isPlaceholder: true,
  aspectRatio: "1:1",
});

export const agents: Agent[] = [
  {
    id: "agent-1",
    fullName: "Nadia El Amrani",
    roleFr: "Fondatrice & Conseillère voyage",
    roleAr: "المؤسسة ومستشارة سفر",
    photo: photo("Photo de Nadia El Amrani", "صورة نادية العمراني"),
    phone: "+212522000001",
    whatsapp: "+212600000001",
    email: "nadia@milleniumtravel.ma",
    languages: ["fr", "ar", "en"],
  },
  {
    id: "agent-2",
    fullName: "Yassine Bouziane",
    roleFr: "Spécialiste Omra & Hajj",
    roleAr: "أخصائي العمرة والحج",
    photo: photo("Photo de Yassine Bouziane", "صورة ياسين بوزيان"),
    phone: "+212522000002",
    whatsapp: "+212600000002",
    email: "yassine@milleniumtravel.ma",
    languages: ["fr", "ar"],
  },
  {
    id: "agent-3",
    fullName: "Lina Cherkaoui",
    roleFr: "Conseillère groupes & événementiel",
    roleAr: "مستشارة المجموعات والفعاليات",
    photo: photo("Photo de Lina Cherkaoui", "صورة لينا الشرقاوي"),
    phone: "+212522000003",
    whatsapp: "+212600000003",
    email: "lina@milleniumtravel.ma",
    languages: ["fr", "ar", "en"],
  },
];
