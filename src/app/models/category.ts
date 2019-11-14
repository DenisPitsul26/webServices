export class Category {
  category_id: number;
  name: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  page_description: string;
  page_title: string;
  category_name: string;
  short_name: string;
  long_name: string;
  num_children: number;
  children: Category[];
  requestParam: string;
}
