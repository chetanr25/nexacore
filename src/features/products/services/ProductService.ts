import apiClient from "./ApiClient";
import type { Product } from "../types/types";

export class ProductService {
    public async getProducts() {
        const response = await apiClient.get<Product[]>("/products");
        return response.data;
    }

    public async getProduct(id: number) {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    }

    public async postProduct(product: Product) {
        const response = await apiClient.post<Product>("/products", product);
        return response.data;
    }

    public async updateProduct(product: Product) {
        const response = await apiClient.put<Product>(`/products/${product.id}`, product);
        return response.data;
    }

    public async deleteProduct(id: number) {
        const response = await apiClient.delete<Product>(`/products/${id}`);
        return response.data;
    }
}

export const productService = new ProductService();