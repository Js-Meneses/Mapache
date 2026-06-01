import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-40 bg-canvas-stone/85 backdrop-blur-md border-b border-brand-navy/6 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <!-- Logo -->
        <a 
          href="#" 
          class="flex items-center gap-3 group transition-transform duration-200"
          (click)="$event.preventDefault(); selectCategory.emit('All')"
        >
          <div class="w-10 h-10 rounded-full overflow-hidden border border-brand-navy/10 flex-shrink-0 bg-brand-navy/5 p-0.5 group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpg" alt="Mapache Logo" class="w-full h-full object-contain rounded-full">
          </div>
          <div class="flex flex-col">
            <span class="font-display font-bold text-lg leading-none tracking-tight text-brand-navy uppercase">Mapache</span>
            <span class="font-mono text-[9px] tracking-widest text-muted-linen uppercase mt-0.5">Heritage Piqué</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 font-display text-sm font-medium tracking-wide">
          <button 
            type="button" 
            class="text-charcoal-ink hover:text-brand-navy border-b-2 border-transparent hover:border-brand-navy py-1 transition-all duration-200 cursor-pointer"
            (click)="selectCategory.emit('All')"
          >
            All Collections
          </button>
          <button 
            type="button" 
            class="text-charcoal-ink hover:text-brand-navy border-b-2 border-transparent hover:border-brand-navy py-1 transition-all duration-200 cursor-pointer"
            (click)="selectCategory.emit('Polo Shirts')"
          >
            Polo Shirts
          </button>
          <button 
            type="button" 
            class="text-charcoal-ink hover:text-brand-navy border-b-2 border-transparent hover:border-brand-navy py-1 transition-all duration-200 cursor-pointer"
            (click)="selectCategory.emit('Basic T-Shirts')"
          >
            Basic T-Shirts
          </button>
        </nav>

        <!-- Action Items -->
        <div class="flex items-center gap-4">
          <!-- Small caps heritage badge (aesthetic) -->
          <div class="hidden sm:flex flex-col text-right font-mono text-[10px] text-muted-linen leading-normal border-r border-brand-navy/10 pr-4">
            <span class="font-semibold text-brand-navy">ORIGINAL FITTING</span>
            <span>EST. 2026</span>
          </div>

          <!-- Shopping Bag Trigger -->
          <button 
            type="button" 
            class="relative p-2.5 rounded-full hover:bg-brand-navy/5 active:scale-95 transition-all duration-200 text-brand-navy cursor-pointer"
            (click)="cart.toggleCart()"
            aria-label="Toggle shopping cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            
            @if (cart.itemCount() > 0) {
              <span class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-sunset-amber text-white font-mono text-[10px] font-bold flex justify-center items-center shadow-xs animate-pulse">
                {{ cart.itemCount() }}
              </span>
            }
          </button>
        </div>
      </div>
    </header>
  `
})
export class Header {
  protected readonly cart = inject(CartService);

  readonly selectCategory = output<string>();
}
