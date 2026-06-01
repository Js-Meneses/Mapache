import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group flex flex-col bg-white border border-brand-navy/6 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <!-- Product Image and Hover fabric zoom -->
      <div class="relative aspect-4/5 w-full bg-canvas-stone overflow-hidden border-b border-brand-navy/6">
        <!-- Accent tag for Premium / Sunset Amber -->
        @if (product().category === 'Polo Shirts') {
          <span class="absolute top-4 left-4 z-10 font-mono text-[9px] font-bold uppercase bg-brand-navy text-white px-2 py-0.5 tracking-wider">
            Signature Piqué
          </span>
        } @else {
          <span class="absolute top-4 left-4 z-10 font-mono text-[9px] font-bold uppercase bg-sunset-amber text-white px-2 py-0.5 tracking-wider">
            Essential Crew
          </span>
        }
        
        <img 
          [src]="product().image" 
          [alt]="product().name" 
          class="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        >

        <!-- Dynamic Quick Add Panel on Hover -->
        <div class="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs border-t border-brand-navy/8 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <div class="space-y-3">
            <!-- Quick Size Select -->
            <div class="space-y-1">
              <span class="font-mono text-[10px] text-muted-linen uppercase tracking-wider block">Quick Size:</span>
              <div class="flex flex-wrap gap-1.5">
                @for (size of product().sizes; track size) {
                  <button 
                    type="button"
                    class="h-7 min-w-7 px-1.5 rounded-sm font-mono text-[11px] font-semibold border flex justify-center items-center cursor-pointer transition-all duration-150"
                    [class]="selectedSize() === size 
                      ? 'border-brand-navy bg-brand-navy text-white' 
                      : 'border-brand-navy/10 hover:border-brand-navy/35 text-charcoal-ink'"
                    (click)="selectedSize.set(size); $event.stopPropagation()"
                  >
                    {{ size }}
                  </button>
                }
              </div>
            </div>

            <!-- Add Button -->
            <button 
              type="button"
              class="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-display text-[11px] font-bold uppercase tracking-wider py-2 transition-colors duration-200 cursor-pointer"
              (click)="onAdd(); $event.stopPropagation()"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      <!-- Card Text Information -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-1.5">
          <div class="flex justify-between items-start gap-2">
            <span class="font-mono text-[9px] tracking-widest text-muted-linen uppercase">
              {{ product().category }}
            </span>
            <span class="font-mono text-xs font-semibold text-brand-navy">
              {{ product().price | currency:'USD':'symbol':'1.2-2' }}
            </span>
          </div>
          
          <h3 class="font-display font-medium text-base text-charcoal-ink tracking-tight group-hover:text-brand-navy transition-colors duration-200">
            {{ product().name }}
          </h3>
          
          <p class="font-display text-xs text-muted-linen line-clamp-2 leading-relaxed">
            {{ product().description }}
          </p>
        </div>

        <div class="space-y-3">
          <!-- Size & Color Selection (visible on mobile / fallback) -->
          <div class="flex justify-between items-center">
            <!-- Colors Swatches -->
            <div class="flex items-center gap-1.5">
              @for (color of product().colors; track color.name) {
                <button 
                  type="button"
                  class="w-5 h-5 rounded-full border flex justify-center items-center cursor-pointer transition-all duration-150 relative"
                  [style.background-color]="color.hex"
                  [class]="selectedColor() === color.name 
                    ? 'border-brand-navy scale-110 shadow-xs' 
                    : 'border-brand-navy/10 hover:scale-105'"
                  [title]="color.name"
                  (click)="selectedColor.set(color.name); $event.stopPropagation()"
                >
                  @if (selectedColor() === color.name) {
                    <!-- Inner active dot for high contrast -->
                    <span 
                      class="w-1.5 h-1.5 rounded-full"
                      [class]="color.name === 'Crisp White' ? 'bg-brand-navy' : 'bg-white'"
                    ></span>
                  }
                </button>
              }
            </div>

            <!-- Size summary -->
            <span class="font-mono text-[10px] text-muted-linen">
              Sizing: {{ product().sizes[0] }} - {{ product().sizes[product().sizes.length - 1] }}
            </span>
          </div>

          <!-- Mobile Only Quick Add Button -->
          <div class="block sm:hidden space-y-2 pt-1 border-t border-brand-navy/5">
            <div class="flex justify-between items-center gap-2">
              <span class="font-mono text-[9px] text-muted-linen uppercase">Size:</span>
              <div class="flex gap-1">
                @for (size of product().sizes; track size) {
                  <button 
                    type="button"
                    class="h-6 w-6 rounded-sm font-mono text-[10px] border flex justify-center items-center cursor-pointer"
                    [class]="selectedSize() === size 
                      ? 'border-brand-navy bg-brand-navy text-white' 
                      : 'border-brand-navy/10 text-charcoal-ink'"
                    (click)="selectedSize.set(size); $event.stopPropagation()"
                  >
                    {{ size }}
                  </button>
                }
              </div>
            </div>
            
            <button 
              type="button"
              class="w-full bg-brand-navy text-white font-display text-xs font-semibold py-2 tracking-wide uppercase cursor-pointer"
              (click)="onAdd()"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCard {
  readonly product = input.required<Product>();
  
  readonly addToCart = output<{ product: Product, size: string, color: string }>();

  // Local signals initialized properly
  readonly selectedColor = signal<string>('');
  readonly selectedSize = signal<string>('M');

  ngOnInit(): void {
    // Default to the first color in the product
    if (this.product().colors.length > 0) {
      this.selectedColor.set(this.product().colors[0].name);
    }
    // Default to 'M' or first size
    if (this.product().sizes.length > 0) {
      const sizes = this.product().sizes;
      if (sizes.includes('M')) {
        this.selectedSize.set('M');
      } else {
        this.selectedSize.set(sizes[0]);
      }
    }
  }

  onAdd(): void {
    this.addToCart.emit({
      product: this.product(),
      size: this.selectedSize(),
      color: this.selectedColor()
    });
  }
}
