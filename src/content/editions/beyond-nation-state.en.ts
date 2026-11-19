import type { ArticleBlock, ArticleEdition, ArticleSection } from "@/content/articles";
import essayText from "@/content/editions/beyond-nation-state.en.txt?raw";

const SECTION_HEADING = /^(Executive Summary|Abstract|Central Thesis|Part [IVXL]+ —)/;

const lines = essayText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const [title, subtitle, ...body] = lines;

function paragraphBlock(text: string): ArticleBlock {
  return { type: "paragraph", text };
}

function buildSections(paragraphs: string[]): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;

  paragraphs.forEach((line, index) => {
    if (SECTION_HEADING.test(line)) {
      current = { id: `section-${index}`, heading: line, level: 2, blocks: [] };
      sections.push(current);
      return;
    }
    if (!current) {
      current = { id: "introduction", heading: "Introduction", level: 2, blocks: [] };
      sections.push(current);
    }
    current.blocks.push(paragraphBlock(line));
  });

  return sections;
}

const abstractIndex = body.findIndex((line) => line === "Abstract");
const abstract = abstractIndex >= 0 ? (body[abstractIndex + 1] ?? "") : "";

export const beyondNationStateEnglish: ArticleEdition = {
  language: "en",
  title: title ?? "",
  subtitle: subtitle ?? "",
  abstract,
  sections: buildSections(body),
};
