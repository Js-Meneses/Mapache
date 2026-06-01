import { Component, signal, computed, inject } from '@angular/core';
import { Header } from './components/header';
import { ProductCard } from './components/product-card';
import { CartDrawer } from './components/cart-drawer';
import { CartService, Product } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [Header, ProductCard, CartDrawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly cart = inject(CartService);

  // Active filter category signal
  readonly activeCategory = signal<string>('All');

  // Hardcoded premium product catalog matching the user's screenshots
  readonly products = signal<Product[]>([
    {
      id: 'mapache-polo-grey',
      name: 'Classic Mapache Polo - Heather Grey',
      category: 'Polo Shirts',
      price: 68.00,
      image: '/images/model_grey.png',
      description: 'Crafted from 100% fine cotton pique. Features our signature black Raccoon embroidered emblem on the chest. Designed with a structured flat-knit collar and double-needle hem for timeless, casual-luxe daily wear.',
      colors: [
        { name: 'Heather Grey', hex: '#A8A29E' },
        { name: 'Crisp White', hex: '#FAF9F6' },
        { name: 'Sartorial Navy', hex: '#1A3154' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: [
        '100% long-staple cotton pique weave',
        'Embroidered Mapache logo in detailed stitch',
        'Mother-of-pearl 2-button placket',
        'Pre-washed to resist shrinkage',
        'Designed in LATAM'
      ]
    },
    {
      id: 'mapache-tee-black',
      name: 'Basic Mapache Tee - Midnight Black',
      category: 'Basic T-Shirts',
      price: 45.00,
      image: '/images/model_black.png',
      description: 'Our core basic t-shirt in deep midnight black. Features a pristine white-threaded Raccoon emblem embroidered on the chest. Extremely soft, premium organic cotton jersey that drapes beautifully.',
      colors: [
        { name: 'Midnight Black', hex: '#1B1C1E' },
        { name: 'Crisp White', hex: '#FAF9F6' },
        { name: 'Sartorial Navy', hex: '#1A3154' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: [
        '180 GSM premium organic jersey cotton',
        'Contrasting white embroidered Raccoon insignia',
        'Reinforced shoulder-to-shoulder taping',
        'Standard fit for relaxed comfort',
        'Designed in LATAM'
      ]
    },
    {
      id: 'mapache-tee-white',
      name: 'Basic Mapache Tee - Crisp White',
      category: 'Basic T-Shirts',
      price: 45.00,
      image: '/images/model_white.png',
      description: 'The ultimate white crew neck tee. Rendered in a stunning warm alabaster white and stitched with our classic black embroidered Raccoon emblem. An understated luxury piece for coastal afternoons.',
      colors: [
        { name: 'Crisp White', hex: '#FAF9F6' },
        { name: 'Midnight Black', hex: '#1B1C1E' },
        { name: 'Sartorial Navy', hex: '#1A3154' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: [
        '180 GSM premium organic jersey cotton',
        'Classic black embroidered Raccoon insignia',
        'Soft ribbed neckline, lay-flat collar',
        'Pre-shrunk fine-knit fabric',
        'Designed in LATAM'
      ]
    },
    {
      id: 'mapache-polo-navy',
      name: 'Heritage Mapache Polo - Navy Edition',
      category: 'Polo Shirts',
      price: 72.00,
      image: '/images/model_grey.png', // Reusing grey polo image as template placeholder
      description: 'Our signature polo in deep Sartorial Navy. Perfect for a sporty yet elegant wardrobe. White-threaded Raccoon emblem creates a sharp, premium contrast. Inspired by traditional club wear.',
      colors: [
        { name: 'Sartorial Navy', hex: '#1A3154' },
        { name: 'Crisp White', hex: '#FAF9F6' },
        { name: 'Heather Grey', hex: '#A8A29E' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: [
        '100% Peruvian Pima cotton pique weave',
        'White contrasting embroidered Raccoon insignia',
        'Ribbed cuffs and dynamic side slit vent hems',
        'Tailored fitting for athletic posture',
        'Designed in LATAM'
      ]
    }
  ]);

  // Computed state for filtered products
  readonly filteredProducts = computed(() => {
    const category = this.activeCategory();
    if (category === 'All') {
      return this.products();
    }
    return this.products().filter(p => p.category === category);
  });

  // Handle adding to cart from the child cards
  onAddToCart(event: { product: Product; size: string; color: string }): void {
    this.cart.addToCart(event.product, event.size, event.color);
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }
}

