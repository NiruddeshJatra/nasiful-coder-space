import { files } from '../components/FileExplorer';

// Derived from FileExplorer.files — single source of truth for all section navigation
export const SECTION_ALIASES: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const f of files) {
    if (!f.section) continue;
    // "about.txt" → "about", "lab/" → "lab"
    map[f.name] = f.section;
    // bare name → section
    map[f.section] = f.section;
  }
  // Root aliases
  map['/'] = 'welcome';
  map['~'] = 'welcome';
  map['home'] = 'welcome';
  // Writing essay aliases (full path forms and short forms not auto-derived)
  map['writing/essays'] = 'writing';
  map['writing/essays/'] = 'writing';
  map['writing/tech-articles/'] = 'writing/tech-articles';
  map['writing/tech-articles/series-01'] = 'writing/tech-articles/series-01';
  // Bare last-segment aliases for every writing/* route, so the terminal can
  // reach articles and series by their short name ('cd series-01',
  // 'cd memory-hierarchy') instead of the full path. Derived, so new articles
  // become reachable the moment they are added to FileExplorer.files.
  for (const f of files) {
    if (!f.section.startsWith('writing/')) continue;
    const leaf = f.section.split('/').pop();
    if (leaf && !(leaf in map)) map[leaf] = f.section;
  }
  // Friendlier spellings people actually type.
  map['tech'] = 'writing/tech-articles';
  map['articles'] = 'writing/tech-articles';
  map['series1'] = 'writing/tech-articles/series-01';
  map['series 1'] = 'writing/tech-articles/series-01';
  // Note: bare 'the-machine-beneath-your-code' resolves to the intro *article*
  // (its leaf segment); the folder form 'the-machine-beneath-your-code/' resolves
  // to the series hub, matching how the sidebar names them.
  map['writing/the-machine-beneath-your-code'] = 'writing/the-machine-beneath-your-code';
  map['writing/whats-inside-a-bit'] = 'writing/whats-inside-a-bit';
  map['writing/how-does-anything-become-bits'] = 'writing/how-does-anything-become-bits';
  map['writing/cpu-blueprint'] = 'writing/cpu-blueprint';
  map['writing/heartbeat-fde'] = 'writing/heartbeat-fde';
  map['writing/memory-hierarchy'] = 'writing/memory-hierarchy';
  map['writing/essays/on-running-for-nothing'] = 'writing-essays-on-running-for-nothing';
  map['writing/essays/on-running-for-nothing.md'] = 'writing-essays-on-running-for-nothing';
  map['writing/essays/on-running-for-nothing-bn'] = 'writing-essays-on-running-for-nothing-bn';
  map['writing/essays/on-running-for-nothing-bn.md'] = 'writing-essays-on-running-for-nothing-bn';
  map['on-running-for-nothing'] = 'writing-essays-on-running-for-nothing';
  map['writing/essays/on-staying-small'] = 'writing-essays-on-staying-small';
  map['writing/essays/on-staying-small.md'] = 'writing-essays-on-staying-small';
  map['on-staying-small'] = 'writing-essays-on-staying-small';
  map['writing/essays/on-forgetting'] = 'writing-essays-on-forgetting';
  map['writing/essays/on-forgetting.md'] = 'writing-essays-on-forgetting';
  map['on-forgetting'] = 'writing-essays-on-forgetting';
  return map;
})();

export type SectionId = string;
