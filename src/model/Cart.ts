import { Db, Collection, InsertOneResult, ObjectId } from 'mongodb';

export interface CartType {
  _id?: string; // Change _id to be optional
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

class CartModel {
  private collection: Collection<CartType>;

  constructor(db: Db) {
    this.collection = db.collection<CartType>('carts');
  }
  
  private ensureCollection(): void {
    if (!this.collection) {
      throw new Error('Cart collection is not available');
    }
  }

  public async createCartItem(item: CartType): Promise<InsertOneResult<CartType>> {
    this.ensureCollection();
    console.log(item)
    const cartItem: CartType = {
      ...item,
      _id: new ObjectId().toHexString(),
    };
    console.log(cartItem)
    const result = await this.collection.insertOne(cartItem);
    return result;
  }

  public async getCartItems(): Promise<CartType[]> {
    this.ensureCollection();
    const cartItems = await this.collection.find().toArray();
    return cartItems;
  }

  public async deleteCartItem(itemId: number): Promise<number> {
    this.ensureCollection();
    const result = await this.collection.deleteOne({ id: itemId });
    return result.deletedCount ?? 0;
  }

  public async deleteAllCartItems(): Promise<number> {
    this.ensureCollection();
    const result = await this.collection.deleteMany({});
    return result.deletedCount ?? 0;
  }
}

export default CartModel;
