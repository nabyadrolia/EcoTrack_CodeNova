import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Store, Leaf, Star, Search, ShoppingCart, Plus, MapPin, Lightbulb, Package, Minus, X, Truck } from "lucide-react";
import { toast } from "sonner";

const productsData = [
  { id: 1, name: "Organic Tomato Seeds", price: 149, seller: "Green Thumb Farms", location: "New Delhi", rating: 4.8, image: "🍅", category: "Seeds", plasticFree: true },
  { id: 2, name: "Bamboo Toothbrush Set", price: 299, seller: "EcoLife Store", location: "Mumbai", rating: 4.9, image: "🪥", category: "Personal Care", plasticFree: true },
  { id: 3, name: "Tulsi Plant", price: 199, seller: "Urban Nursery", location: "Bangalore", rating: 4.7, image: "🌿", category: "Plants", plasticFree: true },
  { id: 4, name: "Cotton Tote Bags (3 pack)", price: 349, seller: "Sustainable Living Co", location: "Chennai", rating: 4.6, image: "👜", category: "Bags", plasticFree: true },
  { id: 5, name: "Neem Wood Comb", price: 129, seller: "Natural Crafts", location: "Jaipur", rating: 4.8, image: "🪮", category: "Personal Care", plasticFree: true },
  { id: 6, name: "Organic Fertilizer 5kg", price: 449, seller: "Green Thumb Farms", location: "New Delhi", rating: 4.5, image: "🧪", category: "Gardening", plasticFree: true },
  { id: 7, name: "Aloe Vera Plant", price: 179, seller: "Urban Nursery", location: "Bangalore", rating: 4.9, image: "🌵", category: "Plants", plasticFree: true },
  { id: 8, name: "Coconut Shell Bowls (2)", price: 399, seller: "EcoLife Store", location: "Mumbai", rating: 4.7, image: "🥥", category: "Kitchen", plasticFree: true },
];

const categories = ["All", "Seeds", "Plants", "Personal Care", "Bags", "Kitchen", "Gardening"];

interface CartItem {
  productId: number;
  quantity: number;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateQuantity = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const addToCart = (productId: number) => {
    const quantity = quantities[productId] || 1;
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity }]);
    }
    
    // Reset quantity for this product
    setQuantities(prev => ({ ...prev, [productId]: 1 }));
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = productsData.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress.trim()) {
      toast.error("Please enter delivery address");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    toast.success("Order placed successfully! 🎉");
    setCart([]);
    setDeliveryAddress("");
    setShowCart(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-eco">
              <Store className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Eco Marketplace</h1>
              <p className="text-muted-foreground">Sustainable products from local eco vendors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="relative" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart className="w-4 h-4 mr-2" /> Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-eco-coral text-xs flex items-center justify-center text-foreground">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <Button variant="eco" onClick={() => setShowAddProduct(!showAddProduct)}>
              <Plus className="w-4 h-4 mr-2" /> Sell Product
            </Button>
          </div>
        </div>

        {/* Cart Drawer */}
        {showCart && (
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Your Cart
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const product = productsData.find(p => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-2xl">
                            {product.image}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">₹{product.price} each</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="font-bold text-eco-green w-20 text-right">
                            ₹{(product.price * item.quantity).toLocaleString()}
                          </p>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-medium text-foreground">Total</span>
                      <span className="text-2xl font-bold text-eco-green">₹{getCartTotal().toLocaleString()}</span>
                    </div>

                    {/* Delivery Address */}
                    <div className="mb-4">
                      <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1">
                        <Truck className="w-4 h-4" /> Delivery Address
                      </label>
                      <Textarea
                        placeholder="Enter your complete delivery address..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button variant="eco" className="w-full" onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "eco" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Form */}
        {showAddProduct && (
          <Card variant="glass">
            <CardHeader><CardTitle>List Your Eco Product</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Product Name" />
                <Input type="number" placeholder="Price (₹)" />
                <Input placeholder="Category" />
                <Input placeholder="Your Business Name" />
                <Input placeholder="Location" />
                <Input placeholder="Contact Number" />
                <Textarea placeholder="Product Description" className="md:col-span-2" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="plasticFree" className="rounded" />
                <label htmlFor="plasticFree" className="text-sm text-muted-foreground">This product is plastic-free</label>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="eco">Submit Product</Button>
                <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} variant="glass" className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="w-full h-32 rounded-xl bg-secondary/50 flex items-center justify-center text-6xl mb-4">
                  {product.image}
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  {product.plasticFree && (
                    <span className="px-2 py-0.5 rounded-full bg-eco-green/20 text-eco-green text-xs flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Plastic-free
                    </span>
                  )}
                </div>

                <p className="text-2xl font-bold text-eco-green mb-2">₹{product.price}</p>
                
                <div className="space-y-1 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Store className="w-3 h-3" /> {product.seller}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {product.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-eco-yellow" /> {product.rating}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {quantities[product.id] || 1}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="eco" 
                  className="w-full" 
                  size="sm"
                  onClick={() => addToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Tips for Eco Shopping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <Package className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Buy Local</h4>
                <p className="text-sm text-muted-foreground">
                  Support local vendors to reduce carbon footprint from shipping.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Leaf className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Check Labels</h4>
                <p className="text-sm text-muted-foreground">
                  Look for plastic-free and eco-certified products.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Store className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Support Small</h4>
                <p className="text-sm text-muted-foreground">
                  Small businesses often have more sustainable practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Marketplace;