export type CategoryDisplayMode = "table" | "cards" | "list";

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  introText: string;
  icon: string;
  featured: boolean;
  displayMode: CategoryDisplayMode;
  /** Optional custom column definitions for table-mode categories */
  tableColumns?: ColumnDef[];
  /** Optional color accent for card theming */
  accentColor?: string;
  /** Sort order on Products hub page */
  sortOrder: number;
}

export interface ColumnDef {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  /** Whether this column is only shown on desktop */
  hideOnMobile?: boolean;
}
