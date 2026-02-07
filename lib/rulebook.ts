export const RULEBOOK_BASE_PATH = "/Rulebooks/";

export const getRulebookUrl = (categoryKey: string): string | null => {
    const mapping: Record<string, string> = {
        movies_and_dramatics: "MOVIES_and_DRAMATICS.pdf",
        creative_arts: "CREATIVE%20_ARTS.pdf",
        music: "MUSIC.pdf",
        dance: "DANCE.pdf",
        fashion: "FASHION.pdf",
        astrophilia: "ASTROPHILIA.pdf",
        literary: "LITERARY.pdf",
        gaming: "GAMING.pdf",
        quiz: "QUIZ.pdf",
    };

    const filename = mapping[categoryKey];
    if (!filename) return null;

    return `${RULEBOOK_BASE_PATH}/${filename}`;
};
