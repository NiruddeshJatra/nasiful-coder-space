import { files } from '../components/FileExplorer';

// Derived from FileExplorer.files — single source of truth for all section navigation
export const SECTION_ALIASES: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const f of files) {
    // "about.txt" → "about", "lab/" → "lab"
    map[f.name] = f.section;
    // bare name → section
    map[f.section] = f.section;
  }
  // Root aliases
  map['/'] = 'welcome';
  map['~'] = 'welcome';
  map['home'] = 'welcome';
  return map;
})();

export type SectionId = string;
