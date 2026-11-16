import axios from "axios";

class ProductService {
    private apiUrl = 'https://fakestoreapi.com/products';

    async getProducts() {
        const response = await axios.get(this.apiUrl);
        return response.data;
    }

}

export default new ProductService();