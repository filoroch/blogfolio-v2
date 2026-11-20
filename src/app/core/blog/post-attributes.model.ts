export const categories = [
  'technology',
  'architecture',
  'blog',
  'infrastructure',
] as const;

export type Category = (typeof categories)[number];

export function isCategory(value: unknown): value is Category {
  return categories.some((category) => category === value);
}

export interface PostAttributes {
  title: string;
  description: string;
  publishedAt: string;
  categories: Category[];
}
