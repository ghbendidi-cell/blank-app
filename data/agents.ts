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
    id: "agent-youssef-bendidi",
    fullName: "Youssef Bendidi",
    roleFr: "Gérant",
    roleAr: "المسير",
    photo: photo("Photo de Youssef Bendidi", "صورة يوسف بنديدي"),
    phone: "+212522237365",
    whatsapp: "+212669324855",
    email: "info@milleniumtravel.ma",
    languages: ["fr", "ar"],
  },
];
