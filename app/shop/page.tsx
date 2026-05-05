import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yoga Shop | Books, T-Shirts, Sound Healing Bowls & Yoga Equipment | Srinatha Yoga",
  description: "Shop authentic yoga products - books, organic cotton t-shirts, singing bowls, meditation cushions, and yoga equipment. Support your practice with quality gear.",
  keywords: ["yoga shop", "yoga books", "yoga t-shirt", "singing bowl", "sound healing", "meditation cushion", "yoga mat", "yoga equipment"],
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ShoppingCart, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useState } from "react"

const categories = ["All", "Books", "Apparel", "Sound Healing", "Mattress & Cushions", "Accessories"]

const products = [
  {
    id: 1,
    name: "The Yoga Sutras of Patanjali",
    category: "Books",
    price: 349,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 215,
    description: "Ancient wisdom on yoga philosophy and meditation",
  },
  {
    id: 2,
    name: "Ashtanga Yoga: The Practice Manual",
    category: "Books",
    price: 599,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 156,
    description: "Complete guide to Ashtanga primary and secondary series",
  },
  {
    id: 3,
    name: "Hatha Yoga Pradipika",
    category: "Books",
    price: 449,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 98,
    description: "Classic text on Hatha Yoga and pranic exercises",
  },
  {
    id: 4,
    name: "Meditation for Beginners",
    category: "Books",
    price: 299,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 312,
    description: "Step-by-step guide to starting your meditation practice",
  },
  {
    id: 5,
    name: "The Art of Yoga Meditation",
    category: "Books",
    price: 399,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 87,
    description: "Bridging asana practice with deep meditation",
  },
  {
    id: 6,
    name: "Light on Yoga - B.K.S. Iyengar",
    category: "Books",
    price: 899,
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 245,
    description: "The bible of yoga with 600+ asanas explained",
  },
  {
    id: 7,
    name: "Organic Cotton Yoga T-Shirt - Sage",
    category: "Apparel",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 56,
    description: "100% organic cotton, eco-friendly dye",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Yoga T-Shirt - Earth Tone",
    category: "Apparel",
    price: 799,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 43,
    description: "Comfortable fit for yoga practice",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Tibetan Singing Bowl - Premium",
    category: "Sound Healing",
    price: 2499,
    image: "https://images.unsplash.com/photo-1545558018-1fac2745fb86?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 78,
    description: "Hand-crafted bronze bowl for meditation & healing",
  },
  {
    id: 10,
    name: "Crystal Singing Bowl Set",
    category: "Sound Healing",
    price: 4999,
    image: "https://images.unsplash.com/photo-1593164842264-85460449a6a3?w=400&h=400&fit=crop",
    rating: 5.0,
    reviews: 32,
    description: "7-piece crystal bowl set for chakra healing",
  },
  {
    id: 11,
    name: "Singing Bowl Mallet Set",
    category: "Sound Healing",
    price: 399,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 45,
    description: "Wool and wooden mallets for singing bowl",
  },
  {
    id: 12,
    name: "Tibetan Bell (Ghanta)",
    category: "Sound Healing",
    price: 899,
    image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 38,
    description: "Ritual bell for Buddhist practices",
  },
  {
    id: 13,
    name: "Meditation Cushion (Zafu)",
    category: "Mattress & Cushions",
    price: 1299,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 156,
    description: "Buckwheat hull filling for proper posture",
  },
  {
    id: 14,
    name: "Yoga Mat - Natural Rubber",
    category: "Mattress & Cushions",
    price: 1899,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 98,
    description: "Eco-friendly, non-slip surface",
  },
  {
    id: 15,
    name: "Yoga Bolster Pillow",
    category: "Mattress & Cushions",
    price: 899,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 67,
    description: "Cylindrical pillow for supported poses",
  },
  {
    id: 16,
    name: "Malas (Prayer Beads)",
    category: "Accessories",
    price: 399,
    image: "https://images.unsplash.com/photo-1591122947157-26bad3a117d2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 67,
    description: "108 beads, tulsi wood",
  },
  {
    id: 10,
    name: "Yoga Strap - Cotton",
    category: "Accessories",
    price: 299,
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 45,
    description: "6ft adjustable strap for flexibility",
  },
  {
    id: 11,
    name: "Incense Holder Set",
    category: "Accessories",
    price: 449,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 38,
    description: "Brass holder with natural incense",
  },
  {
    id: 12,
    name: "Chakra Wall Hanging",
    category: "Accessories",
    price: 899,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 52,
    description: "Handwoven tapestry for meditation space",
  },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Srinatha Yoga Shala" width={48} height={48} className="h-12 w-auto" />
              <span className="font-serif text-xl font-semibold text-[#264020]">Srinatha Yoga Shala</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="font-medium text-[#264020]/60 hover:text-[#264020]">Home</Link>
              <Link href="/teachers" className="font-medium text-[#264020]/60 hover:text-[#264020]">Teachers</Link>
              <Link href="/courses" className="font-medium text-[#264020]/60 hover:text-[#264020]">Courses</Link>
              <Link href="/shop" className="font-medium text-[#264020]">Shop</Link>
              <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white px-6">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-[#264020]/60 hover:text-[#264020] mb-6 transition-colors">
              <ChevronLeft size={20} />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="font-serif text-4xl lg:text-5xl text-[#264020] mb-4">Yoga Shop</h1>
              <p className="text-[#264020]/70 max-w-2xl mx-auto">
                Enhance your practice with authentic yoga products. Books, apparel, sound healing tools, and quality equipment to support your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#264020] text-white"
                      : "bg-[#FAF8F5] text-[#264020] hover:bg-[#264020]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded overflow-hidden shadow-sm border border-[#E5E5E5] hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-[#FAF8F5]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#264020] text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif text-[#264020] font-medium mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[#264020]/60 text-xs mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-[#264020] text-[#264020]" : "text-[#E5E5E5]"}`} />
                      ))}
                      <span className="text-xs text-[#264020]/60 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#264020] font-bold text-lg">₹{product.price}</span>
                      <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white text-sm py-1.5 px-3">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#264020]/60">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-serif text-[#264020] font-medium mb-2">Free Shipping</h3>
                <p className="text-[#264020]/60 text-sm">On orders above ₹999</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="font-serif text-[#264020] font-medium mb-2">Easy Returns</h3>
                <p className="text-[#264020]/60 text-sm">30-day return policy</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💚</span>
                </div>
                <h3 className="font-serif text-[#264020] font-medium mb-2">Eco-Friendly</h3>
                <p className="text-[#264020]/60 text-sm">Sustainable products</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}