import Dexie, { type Table } from "dexie";

export type PaymentMethod = "كاش / نقدًا" | "فيزا / بطاقة بنكية" | "إنستاباي InstaPay" | "فودافون كاش";
export type StoredEntry = { id: number; title: string; category: string; person: string; amount: number; date: string; time: string; iconKey: string; paymentMethod: PaymentMethod; };
export type StoredIncome = { id: number; title: string; amount: number; date: string; };
export type StoredGoal = { id: number; title: string; current: number; target: number; deadline: string; };
export type StoredMember = { id: number; name: string; };
export type StoredCategory = { id: number; name: string; color: string; };
export type StoredAppSettings = { id: "settings"; firebaseConfig?: string; householdId?: string; syncEnabled?: boolean; };

class BaytiDatabase extends Dexie {
  entries!: Table<StoredEntry, number>; incomes!: Table<StoredIncome, number>; goals!: Table<StoredGoal, number>;
  members!: Table<StoredMember, number>; categories!: Table<StoredCategory, number>; settings!: Table<StoredAppSettings, string>;
  constructor() { super("bayti-budget"); this.version(2).stores({ entries: "id, date, category, person, paymentMethod", incomes: "id, date", goals: "id", members: "id, name", categories: "id, name", settings: "id" }); }
  async exportAll() { return { exportedAt: new Date().toISOString(), app: "بيتي | ميزانية البيت", entries: await this.entries.toArray(), incomes: await this.incomes.toArray(), goals: await this.goals.toArray(), members: await this.members.toArray(), categories: await this.categories.toArray() }; }
}
export const baytiDB = new BaytiDatabase();
