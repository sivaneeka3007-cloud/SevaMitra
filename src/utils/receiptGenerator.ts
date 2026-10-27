/**
 * Receipt & Audit Hash Utility
 * Generates human-readable receipt codes and tamper-evident signatures
 * for shift events in an append-only log.
 */

/**
 * Generate a short, distinct receipt code like "FS-7K92M"
 */
export function generateReceiptCode(prefix = 'FS'): string {
  const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude ambiguous 0, O, 1, I
  let code = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return `${prefix}-${code}`;
}

/**
 * Fast deterministic hash for tamper-evident event chains.
 * Pure function combining payload string and optional previous hash.
 */
export function generateAuditHash(payload: string, previousHash = 'GENESIS-0000'): string {
  const input = `${previousHash}:${payload}`;
  let hash1 = 0xdeadbeef;
  let hash2 = 0x41c64e6d;

  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    hash1 = Math.imul(hash1 ^ ch, 2654435761);
    hash2 = Math.imul(hash2 ^ ch, 1597334677);
  }

  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

  const hex1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  return `0x${hex1}${hex2}`;
}
