// src/config/npc.ts
export const NpcName = {
    10002: "10002",
    10003: "10003",
    10005: "10005",
    10004: "10004",
    10006: "satoshi",
    10007: "popcat",
    10008: "pepe",
    10009: "elon musk",
    10010: "pippin",
    10011: "eliza",
    10012: "trump",
    10013: "morpheus",
    10014: "ava",
    10015: "luna",
    10016: "yves",
    10017: "ivy",
    10018: "liam",
    10019: "nina",
    10020: "nova",
    10021: "ryan",
    10022: "sam altman",
  } as const;
  
  export type NpcId = keyof typeof NpcName;
  export type NpcNameType = typeof NpcName[NpcId];
  
  export function getNpcName(id: number | string): string {
    return NpcName[id as keyof typeof NpcName] ?? `Unknown NPC (${id})`;
  }