export interface Product {
  id: number;
  name: string;
  price: number;
}

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 145, name: "Product 1", price: 25 },
    { id: 957, name: "Product 2", price: 30 },
    { id: 323, name: "Product 3", price: 35 },
    { id: 491, name: "Product 4", price: 40 },
    { id: 678, name: "Product 5", price: 45 },
    { id: 776, name: "Product 6", price: 50 },
    { id: 876, name: "Product 7", price: 55 },
    { id: 543, name: "Product 8", price: 60 },
    { id: 912, name: "Product 9", price: 65 },
    { id: 284, name: "Product 10", price: 70 },
    { id: 517, name: "Product 11", price: 75 },
    { id: 829, name: "Product 12", price: 80 },
    { id: 321, name: "Product 13", price: 25 },
    { id: 401, name: "Product 14", price: 30 },
    { id: 789, name: "Product 15", price: 35 },
    { id: 234, name: "Product 16", price: 40 },
    { id: 567, name: "Product 17", price: 45 },
    { id: 890, name: "Product 18", price: 50 },
    { id: 123, name: "Product 19", price: 55 },
    { id: 456, name: "Product 20", price: 60 },
  ];
}
