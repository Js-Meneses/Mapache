import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  specs: string[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signals for cart state
  private readonly itemsSignal = signal<CartItem[]>([]);
  private readonly isOpenSignal = signal<boolean>(false);

  // Read-only public signals
  readonly items = this.itemsSignal.asReadonly();
  readonly isOpen = this.isOpenSignal.asReadonly();

  // Computed state
  readonly itemCount = computed(() => {
    return this.itemsSignal().reduce((count, item) => count + item.quantity, 0);
  });

  readonly subtotal = computed(() => {
    return this.itemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  openCart(): void {
    this.isOpenSignal.set(true);
  }

  closeCart(): void {
    this.isOpenSignal.set(false);
  }

  toggleCart(): void {
    this.isOpenSignal.update(open => !open);
  }

  addToCart(product: Product, size: string, colorName: string): void {
    const itemId = `${product.id}-${size}-${colorName}`;
    
    this.itemsSignal.update(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === itemId);
      
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        return currentItems.map((item, idx) => 
          idx === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: itemId,
          product,
          selectedColor: colorName,
          selectedSize: size,
          quantity: 1
        };
        return [...currentItems, newItem];
      }
    });
    
    // Automatically open the cart drawer for premium tactile feedback
    this.openCart();
  }

  removeFromCart(itemId: string): void {
    this.itemsSignal.update(currentItems => 
      currentItems.filter(item => item.id !== itemId)
    );
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    
    this.itemsSignal.update(currentItems => 
      currentItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}
