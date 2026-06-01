import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop -->
    @if (cart.isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-brand-navy/30 backdrop-blur-xs transition-opacity duration-300 ease-out"
        (click)="cart.closeCart()"
      ></div>

      <!-- Drawer Content -->
      <div 
        class="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out"
        [class.translate-x-0]="cart.isOpen()"
        [class.translate-x-full]="!cart.isOpen()"
      >
        <!-- Header -->
        <div class="px-6 py-5 border-b border-brand-navy/8 flex justify-between items-center bg-canvas-stone">
          <div class="flex items-center gap-2">
            <span class="font-display font-semibold text-lg text-brand-navy tracking-tight">Shopping Bag</span>
            <span class="font-mono text-xs bg-brand-navy/10 text-brand-navy px-2 py-0.5 rounded-full font-medium">
              {{ cart.itemCount() }}
            </span>
          </div>
          <button 
            type="button" 
            class="text-muted-linen hover:text-charcoal-ink transition-colors duration-200 p-1 cursor-pointer"
            (click)="cart.closeCart()"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Items List -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          @if (cart.items().length === 0) {
            <div class="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
              <div class="w-16 h-16 rounded-full bg-brand-navy/5 flex justify-center items-center text-brand-navy">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div class="space-y-1">
                <h3 class="font-display font-medium text-charcoal-ink">Your bag is empty</h3>
                <p class="font-display text-sm text-muted-linen max-w-[260px]">Explore our timeless polo collections to find your perfect fit.</p>
              </div>
              <button 
                type="button" 
                class="font-display text-sm font-semibold text-brand-navy hover:text-sunset-amber transition-colors duration-200 cursor-pointer"
                (click)="cart.closeCart()"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          } @else {
            @for (item of cart.items(); track item.id) {
              <div class="flex gap-4 pb-6 border-b border-brand-navy/5 last:border-b-0">
                <!-- Image -->
                <div class="w-20 h-24 bg-canvas-stone rounded overflow-hidden flex-shrink-0 border border-brand-navy/5 flex justify-center items-center">
                  <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover">
                </div>

                <!-- Info -->
                <div class="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div class="flex justify-between items-start gap-2">
                      <h4 class="font-display font-medium text-sm text-charcoal-ink truncate hover:text-brand-navy transition-colors duration-200">
                        {{ item.product.name }}
                      </h4>
                      <span class="font-mono text-sm text-charcoal-ink font-semibold flex-shrink-0">
                        {{ item.product.price | currency:'USD':'symbol':'1.2-2' }}
                      </span>
                    </div>
                    <p class="font-display text-xs text-muted-linen mt-0.5">{{ item.product.category }}</p>
                    
                    <div class="flex items-center gap-3 mt-2 font-mono text-xs">
                      <!-- Selected Swatch -->
                      <span class="flex items-center gap-1.5 text-charcoal-ink">
                        <span class="w-2 h-2 rounded-full border border-brand-navy/10" 
                          [style.background-color]="getColorHex(item.product, item.selectedColor)">
                        </span>
                        {{ item.selectedColor }}
                      </span>
                      <span class="text-brand-navy/20">|</span>
                      <!-- Selected Size -->
                      <span class="text-charcoal-ink font-medium">Size {{ item.selectedSize }}</span>
                    </div>
                  </div>

                  <!-- Controls -->
                  <div class="flex justify-between items-center mt-3">
                    <div class="flex items-center border border-brand-navy/10 rounded-sm overflow-hidden bg-canvas-stone">
                      <button 
                        type="button" 
                        class="px-2.5 py-1 text-muted-linen hover:text-charcoal-ink hover:bg-brand-navy/5 active:bg-brand-navy/10 transition-colors duration-150 cursor-pointer"
                        (click)="cart.updateQuantity(item.id, item.quantity - 1)"
                      >
                        &minus;
                      </button>
                      <span class="px-3 py-1 font-mono text-xs font-semibold text-charcoal-ink min-w-[24px] text-center">
                        {{ item.quantity }}
                      </span>
                      <button 
                        type="button" 
                        class="px-2.5 py-1 text-muted-linen hover:text-charcoal-ink hover:bg-brand-navy/5 active:bg-brand-navy/10 transition-colors duration-150 cursor-pointer"
                        (click)="cart.updateQuantity(item.id, item.quantity + 1)"
                      >
                        &plus;
                      </button>
                    </div>

                    <button 
                      type="button" 
                      class="text-xs font-display text-muted-linen hover:text-sunset-amber transition-colors duration-150 flex items-center gap-1 cursor-pointer"
                      (click)="cart.removeFromCart(item.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            }
          }
        </div>

        <!-- Footer -->
        @if (cart.items().length > 0) {
          <div class="px-6 py-6 border-t border-brand-navy/8 bg-canvas-stone space-y-4">
            <div class="flex justify-between items-center">
              <span class="font-display text-sm font-semibold text-charcoal-ink tracking-tight uppercase">Subtotal</span>
              <span class="font-mono text-lg font-bold text-brand-navy">
                {{ cart.subtotal() | currency:'USD':'symbol':'1.2-2' }}
              </span>
            </div>
            
            <p class="font-display text-xs text-muted-linen leading-normal">
              Shipping and taxes calculated at checkout. Realized in fine Italian cotton thread.
            </p>

            <div class="pt-2">
              <button 
                type="button" 
                class="w-full bg-brand-navy hover:bg-brand-navy/90 active:translate-y-[1px] text-white py-3.5 px-4 font-display font-medium text-sm tracking-wide transition-all duration-150 shadow-md hover:shadow-lg focus:outline-hidden cursor-pointer flex justify-center items-center gap-2"
                (click)="onCheckout()"
              >
                Secure Checkout
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            <div class="text-center">
              <button 
                type="button" 
                class="text-xs font-display font-medium text-muted-linen hover:text-brand-navy transition-colors duration-150 cursor-pointer"
                (click)="cart.closeCart()"
              >
                Or Continue Shopping
              </button>
            </div>
          </div>
        }
      </div>
    }
  `
})
export class CartDrawer {
  protected readonly cart = inject(CartService);

  getColorHex(product: any, colorName: string): string {
    const color = product.colors.find((c: any) => c.name === colorName);
    return color ? color.hex : '#CCCCCC';
  }

  onCheckout(): void {
    alert(`Checkout simulated! Thank you for purchasing from Mapache. Total: $${this.cart.subtotal().toFixed(2)} USD.`);
    this.cart.clearCart();
    this.cart.closeCart();
  }
}
