export async function hashPassphrase(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const STORED_HASH =
  "f90c0f69179ced9c447b111dd5235f5279b28674463a0a607ef8dda5909a8747";

export async function verifyPassphrase(input: string): Promise<boolean> {
  try {
    const hash = await hashPassphrase(input.trim().toLowerCase());
    return hash === STORED_HASH;
  } catch {
    return false;
  }
}

export function isVaultUnlocked(): boolean {
  try {
    return localStorage.getItem("ncs_vault_unlocked") === "true";
  } catch {
    return false;
  }
}

export function unlockVault(): void {
  try {
    localStorage.setItem("ncs_vault_unlocked", "true");
  } catch {}
}

export function lockVault(): void {
  try {
    localStorage.removeItem("ncs_vault_unlocked");
  } catch {}
}
