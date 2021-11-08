export interface Menu {
  name: string;
  products: [Product];
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
