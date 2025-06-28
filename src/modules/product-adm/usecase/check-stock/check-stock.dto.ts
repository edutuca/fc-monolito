export interface CheckStockInputDto {
  productId: string;
}

export interface CheckStockOutputDto {
  productId: string;
  stock: number;
  name: string;
  description: string;
  purchasePrice: number;
}
