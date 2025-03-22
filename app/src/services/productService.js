import api from './api'

export const productService = {
    async getAllProducts(){
        try{
        const response = await api.get('/products')
        return response.data
    }catch(error){
        console.error("Error fetching Products" , error)
        throw error
    }
    }, 
    async getProductById(id){
        try{
            const response = await api.get(`/products/${id}`)
            return response.data
            }catch(error){
                console.error(`Error fetching Product by ID ${id}` , error)
                throw error
                }
                },

    async addProduct(product){
        try{
            const response = await api.post('/products' , product)
            return response.data
        } catch(error){
            console.error("Error adding Product" , error)
            throw error
        }
    }, 
    async updateProduct(id , product){
        try{
            const response = await api.put(`/products/${id}` , product)
            return response.data
        }catch(error){
            console.error(`Error updating Product by ID ${id}` , error)
            throw error
        }
} , 
async deleteProduct(id){
    try{
        const response = await api.delete(`/products/${id}`)
        return response.data
    }catch(error){
        console.error(`Error deleting Product by ID ${id}` , error)
        throw error
    }
}
}