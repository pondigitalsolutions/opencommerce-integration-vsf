export type Category = {
    id: number;
    name: string;
    slug: string;
    items: Category[];
};

export type CategoryFilter = Record<string, unknown>;

