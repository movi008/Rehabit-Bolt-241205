export interface Taxonomy {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  count?: number;
}

export interface Category extends Taxonomy {
  type: 'category' | 'space';
}

export interface Tag extends Taxonomy {
  type: 'tag';
}

export interface ProjectTaxonomy {
  categories: Category[];
  spaces: Category[];
  tags: Tag[];
}