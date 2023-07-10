import CartModel, { CartType } from '../model/Cart';

class Cart {
  private cartModel: CartModel;

  constructor(cartModel: CartModel) {
    this.cartModel = cartModel;
  }

  public async addCartItem(item: CartType){
    try {
        const result = await this.cartModel.createCartItem(item);
        console.log('Cart item created:', result);
    } catch (error) {
        return `Failed to create cart item: ${error}`;
    }
  }

  public async listCartItems() {
    try {
      const cartItems = await this.cartModel.getCartItems();
      return(cartItems);
    } catch (error) {
      return `Failed to list cart items: ${error}`;
    }
  }

  public async deleteCartItem(itemId: number){
    try {
      const deletedCount = await this.cartModel.deleteCartItem(itemId);
      return`Deleted ${deletedCount} cart items`;
    } catch (error) {
      return `Failed to delete cart items: ${error}`;
    }
  }
}

export default Cart;
