import type {Category} from './Category'
interface Product {
  name: string
  description: string
  profilePicture: string
  category: Category
  createdAt: string
  _id: string
}

export default Product
