import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

const seedProducts = [
  // BURGERS
  {
    name: 'The Classic Medrano',
    description: 'Our signature flame-grilled beef patty with lettuce, tomato, pickles, onion, and Medrano special sauce.',
    price: 12.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    badge: 'Best Seller',
    available: true,
  },
  {
    name: 'Double Smash',
    description: 'Two smashed beef patties, American cheese, caramelized onions, pickles, and mustard on a brioche bun.',
    price: 15.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    badge: 'Popular',
    available: true,
  },
  {
    name: 'Inferno Burger',
    description: 'Spicy jalapeño beef patty, habanero cheese, sriracha mayo, crispy onions, and fresh chilli.',
    price: 14.49,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    badge: '🔥 Spicy',
    available: true,
  },
  {
    name: 'BBQ Smokehouse',
    description: 'Slow-cooked pulled beef, crispy bacon, cheddar, coleslaw, and smoky BBQ sauce.',
    price: 16.49,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
    badge: 'New',
    available: true,
  },
  {
    name: 'Mushroom Swiss',
    description: 'Beef patty topped with sautéed wild mushrooms, Swiss cheese, garlic aioli, and arugula.',
    price: 13.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80',
    badge: '',
    available: true,
  },
  {
    name: 'Crispy Chicken',
    description: 'Golden fried chicken breast, pickled slaw, buffalo sauce, and honey mustard.',
    price: 13.49,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    badge: 'Popular',
    available: true,
  },
  // SIDES
  {
    name: 'Loaded Fries',
    description: 'Crispy fries topped with melted cheddar, bacon bits, sour cream, and chives.',
    price: 6.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
    badge: 'Must Try',
    available: true,
  },
  {
    name: 'Onion Rings',
    description: 'Beer-battered crispy onion rings served with chipotle dipping sauce.',
    price: 5.49,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    badge: '',
    available: true,
  },
  {
    name: 'Mac & Cheese Bites',
    description: 'Crispy fried macaroni and cheese balls with a gooey centre. Served with ranch.',
    price: 6.49,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&q=80',
    badge: 'New',
    available: true,
  },
  // DRINKS
  {
    name: 'Classic Milkshake',
    description: 'Thick hand-spun shakes in vanilla, chocolate, or strawberry.',
    price: 5.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    badge: '',
    available: true,
  },
  {
    name: 'Fresh Lemonade',
    description: 'Hand-squeezed lemonade with a hint of mint. Regular or sparkling.',
    price: 3.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    badge: '',
    available: true,
  },
  {
    name: 'Craft Cola',
    description: 'Small-batch craft cola with natural cane sugar. Ice cold.',
    price: 2.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    badge: '',
    available: true,
  },
  // DESSERTS
  {
    name: 'Brownie Sundae',
    description: 'Warm chocolate brownie, vanilla ice cream, hot fudge, and whipped cream.',
    price: 7.49,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80',
    badge: 'Fan Fave',
    available: true,
  },
  {
    name: 'Churros',
    description: 'Golden churros dusted with cinnamon sugar, served with chocolate dipping sauce.',
    price: 5.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=600&q=80',
    badge: '',
    available: true,
  },
]

export async function GET() {
  try {
    await connectDB()
    await Product.deleteMany({})
    const products = await Product.insertMany(seedProducts)
    return NextResponse.json({ message: `✅ Seeded ${products.length} products successfully!`, products })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
