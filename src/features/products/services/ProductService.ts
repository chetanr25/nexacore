import axios from "axios";
import type { Product } from "../types/types";
import { apiClient } from "./apiClient";

export class ProductService {
    async getProducts() {
        //const response = await axios.get<Product[]>(this.apiUrl);
        const response = await apiClient.get<Product[]>("/products");
        return response.data;
    }
    async addProduct(product: Product) {
        // const response = await axios.post<Product>(this.apiUrl, product);
        const response = await apiClient.post<Product>("/products", product);
        return response.data;
    }
    async getByProductId(productId: number) {
        // const response = await axios.get<Product>(`${this.apiUrl}/${productId}`);
        const response = await apiClient.get<Product>(`/products/${productId}`);
        return response.data;
    }
    async updateProduct(product: Product) {
        // const response = await axios.put<Product>(`${this.apiUrl}/${product.id}`, product);
        const response = await apiClient.put<Product>(`/products/${product.id}`, product);
        return response.data;
    }
    async deleteProduct(productId: number) {
        // const response = await axios.delete(`${this.apiUrl}/${productId}`);
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    }
}



