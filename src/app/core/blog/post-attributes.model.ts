// 1. Adicione "as const" para fixar os valores literais das strings
export const categories = [
  'tecnology',
  'architecture',
  'blog',
  'infrastructure'
] as const;

export type Category = typeof categories[number];

export interface PostAttributes {
    title: string;
    slug: string;
    description: string;
    publishedAt: string;
    categories: Category[];
}
