export interface Category {
  cname: string;
  products: Product[];
  _id?: string;
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

export interface ProductCardActions {
  icon: string;
  onClickFunction: string;
}

export interface ProductCardActionIndex {
  productIndex: number;
  actionFunction: string;
}
