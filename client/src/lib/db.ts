import Dexie, { type Table } from "dexie";

export type StoredEntry = {
  id: number;
  title: string;
  category: string;
  person: string;
  amount: number;
  date: string;
  time: string;
  iconKey: string;
};

export type StoredIncome = { id: number; title: string; amount: number; date: string; };
export type StoredGoal = { id: number; title: string; current: number; target: number; deadline: string; };

class BaytiDatabase extends Dexie {
  entries!: Table<StoredEntry, number>;
  incomes!: Table<StoredIncome, number>;
  goals!: Table<StoredGoal, number>;

  constructor() {
    super("bayti-budget");
    this.version(1).stores({
      entries: "id, date, category, person",
      incomes: "id, date",
      goals: "id",
    });
  }

  async exportAll() {
    return {
      exportedAt: new Date().toISOString(),
      app: "بيتي | ميزانية البيت",
      entries: await this.entries.toArray(),
      incomes: await this.incomes.toArray(),
      goals: await this.goals.toArray(),
    };
  }
}

export const baytiDB = new BaytiDatabase();
