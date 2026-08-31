/**
 * تخزين مؤقت للإعدادات (للتطوير المحلي)
 * في الإنتاج يُستبدل بـ Supabase أو قاعدة بيانات حقيقية
 *
 * الملف: data/settings.json
 */

import { promises as fs } from "fs";
import path from "path";
import type { UserSettings } from "@/types/settings";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SETTINGS_FILE);
    } catch {
      await fs.writeFile(SETTINGS_FILE, JSON.stringify({}, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error ensuring data file:", err);
  }
}

async function readAll(): Promise<Record<string, UserSettings>> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

async function writeAll(data: Record<string, UserSettings>) {
  await ensureDataFile();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSettings(userId: string): Promise<UserSettings | null> {
  const all = await readAll();
  return all[userId] || null;
}

export async function saveSettings(
  userId: string,
  data: Omit<UserSettings, "userId" | "updatedAt">
): Promise<UserSettings> {
  const all = await readAll();
  const settings: UserSettings = {
    userId,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  all[userId] = settings;
  await writeAll(all);
  return settings;
}

export async function getSettingsBySheetHint(
  sheetUrl: string
): Promise<UserSettings | null> {
  const all = await readAll();
  const found = Object.values(all).find((s) => s.sheetUrl === sheetUrl);
  return found || null;
}
