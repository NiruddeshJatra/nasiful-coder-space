import { useState, useCallback } from 'react';

export type PaletteMode = 'files' | 'commands';

interface UseCommandPaletteReturn {
  isOpen: boolean;
  mode: PaletteMode;
  open: (mode: PaletteMode) => void;
  close: () => void;
}

export const useCommandPalette = (): UseCommandPaletteReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>('files');

  const open = useCallback((m: PaletteMode) => {
    setMode(m);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, mode, open, close };
};
