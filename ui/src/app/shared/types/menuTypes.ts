export interface Category {
  cname: String;
  products: Product[];
}
export interface Menu {
  name: string;
  categories: Category[];
  _id: string;
}

export interface Product {
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  quantity: [
    {
      price: number;
      quantity: string;
    }
  ];
  _id: string;
}
