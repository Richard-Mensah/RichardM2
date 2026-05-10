export type DevelopmentDataRow = {
  year: string;
  month: string;
  inPerson: number;
  virtual: number;
  aiData: number;
  leadership: number;
  community: number;
  climate: number;
};

export const DEVELOPMENT_DATA: DevelopmentDataRow[] = [
  { year: "2025", month: "Jan", inPerson: 2, virtual: 4, aiData: 4, leadership: 5, community: 3, climate: 2 },
  { year: "2025", month: "Feb", inPerson: 3, virtual: 5, aiData: 5, leadership: 4, community: 5, climate: 3 },
  { year: "2025", month: "Mar", inPerson: 4, virtual: 6, aiData: 6, leadership: 6, community: 4, climate: 4 },
  { year: "2025", month: "Apr", inPerson: 5, virtual: 7, aiData: 6, leadership: 7, community: 5, climate: 4 },
  { year: "2026", month: "Jan", inPerson: 3, virtual: 5, aiData: 7, leadership: 5, community: 4, climate: 3 },
  { year: "2026", month: "Feb", inPerson: 4, virtual: 6, aiData: 8, leadership: 6, community: 5, climate: 4 },
  { year: "2026", month: "Mar", inPerson: 6, virtual: 7, aiData: 9, leadership: 7, community: 6, climate: 5 },
  { year: "2026", month: "Apr", inPerson: 5, virtual: 8, aiData: 9, leadership: 8, community: 6, climate: 6 },
  { year: "2026", month: "May", inPerson: 7, virtual: 6, aiData: 10, leadership: 8, community: 7, climate: 6 },
  { year: "2026", month: "Jun", inPerson: 8, virtual: 9, aiData: 11, leadership: 9, community: 8, climate: 7 },
  { year: "2026", month: "Jul", inPerson: 6, virtual: 10, aiData: 10, leadership: 10, community: 7, climate: 8 },
  { year: "2026", month: "Aug", inPerson: 7, virtual: 8, aiData: 9, leadership: 9, community: 6, climate: 9 },
  { year: "2026", month: "Sep", inPerson: 9, virtual: 11, aiData: 10, leadership: 11, community: 9, climate: 8 },
  { year: "2026", month: "Oct", inPerson: 8, virtual: 10, aiData: 9, leadership: 10, community: 8, climate: 7 },
  { year: "2026", month: "Nov", inPerson: 10, virtual: 12, aiData: 11, leadership: 12, community: 10, climate: 9 },
  { year: "2026", month: "Dec", inPerson: 7, virtual: 10, aiData: 10, leadership: 9, community: 8, climate: 8 },
];
