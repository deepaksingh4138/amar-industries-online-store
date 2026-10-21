import React, { useMemo, useState, useEffect } from 'react';
import {
  Search, ShoppingCart, Menu, X, ChevronDown, ArrowRight, ShieldCheck,
  Truck, Factory, BadgeCheck, Minus, Plus, Trash2, MessageCircle,
  PackageCheck, SlidersHorizontal, CheckCircle2, Building2, CreditCard,
  Phone, Mail, Globe2
} from 'lucide-react';

const products = [
  { id: 1, name: 'Brass Eyelets', code: 'AI-EYE-001', category: 'Eyelets', material: 'Brass', finish: 'Nickel / Golden / Antique', size: 'Multiple sizes', moq: 1000, unit: 'pcs', price: 0.42, bulk: 0.34, badge: 'Best seller', art: 'eyelet' },
  { id: 2, name: 'Aluminium Eyelets', code: 'AI-EYE-002', category: 'Eyelets', material: 'Aluminium', finish: 'Natural / Nickel / Black', size: 'Multiple sizes', moq: 1000, unit: 'pcs', price: 0.24, bulk: 0.19, badge: 'Lightweight', art: 'eyelet silver' },
  { id: 3, name: 'MS / Iron Eyelets', code: 'AI-EYE-003', category: 'Eyelets', material: 'Mild steel', finish: 'Nickel / Black / Antique', size: 'Multiple sizes', moq: 2000, unit: 'pcs', price: 0.18, bulk: 0.14, badge: '', art: 'eyelet dark' },
  { id: 4, name: 'Rivet Buttons', code: 'AI-RIV-001', category: 'Rivets & Buttons', material: 'Brass / Steel', finish: 'Nickel / Golden / Antique', size: '5, 7, 9, 12 mm', moq: 1000, unit: 'pcs', price: 0.36, bulk: 0.29, badge: '', art: 'rivet' },
  { id: 5, name: 'Eyelet Washers', code: 'AI-WAS-001', category: 'Washers', material: 'Brass / Aluminium / Steel', finish: 'As per requirement', size: 'Multiple sizes', moq: 1000, unit: 'pcs', price: 0.12, bulk: 0.09, badge: '', art: 'washer' },
  { id: 6, name: 'D-Eyelets & D-Patti', code: 'AI-D-001', category: 'Footwear Accessories', material: 'Steel / Brass', finish: 'Nickel / Black / Custom', size: 'As per sample', moq: 500, unit: 'pcs', price: 0.85, bulk: 0.68, badge: 'Custom orders', art: 'deyelet' },
  { id: 7, name: 'Lacing & Boot Hooks', code: 'AI-HOOK-001', category: 'Footwear Accessories', material: 'Steel / Brass', finish: 'Nickel / Black / Antique', size: 'Multiple designs', moq: 500, unit: 'pcs', price: 0.95, bulk: 0.76, badge: '', art: 'hook' },
  { id: 8, name: 'Wire Loops (Kadi)', code: 'AI-LOOP-001', category: 'Footwear Accessories', material: 'Steel / Brass', finish: 'Custom finish', size: 'Made to specification', moq: 1000, unit: 'pcs', price: 0.31, bulk: 0.25, badge: '', art: 'loop' },
];

const categories = ['All Products', 'Eyelets', 'Rivets & Buttons', 'Washers', 'Footwear Accessories'];
const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);

function ProductArt({ type }) {
  return <div className={`product-art art-${type}`} aria-label="Illustrative product placeholder">
    <div className="metal-object"><span /></div>
    <small>PRODUCT PHOTO</small>
  </div>;
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Products');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('amar-cart') || '[]'); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerType, setCustomerType] = useState('business');
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', address: '', gst: '', notes: '' });

  useEffect(() => { localStorage.setItem('amar-cart', JSON.stringify(cart)); }, [cart]);

  const filtered = useMemo(() => {
    let list = products.filter(p => (category === 'All Products' || p.category === category) &&
      `${p.name} ${p.category} ${p.material} ${p.code}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'price-low') list = [...list].sort((a,b) => a.price-b.price);
    if (sort === 'price-high') list = [...list].sort((a,b) => b.price-a.price);
    return list;
  }, [query, category, sort]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + product.moq } : item);
      return [...prev, { ...product, qty: product.moq }];
    });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(''), 2500);
  };

  const changeQty = (id, qty) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(item.moq, Number(qty) || item.moq) } : item));
  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * (item.qty >= 5000 ? item.bulk : item.price), 0);
  const total = subtotal;

  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submitDemoOrder = (e) => {
    e.preventDefault();
    const order = {
      orderId: `AI-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      customerType, customer: form,
      items: cart.map(({ id, name, code, qty, moq, price, bulk }) => ({ id, name, code, qty, moq, unitPrice: qty >= 5000 ? bulk : price })),
      subtotal: total,
      status: 'Enquiry / payment setup required'
    };
    const oldOrders = JSON.parse(localStorage.getItem('amar-demo-orders') || '[]');
    localStorage.setItem('amar-demo-orders', JSON.stringify([...oldOrders, order]));
    setOrderPlaced(true);
    setCart([]);
  };

  const closeCheckout = () => { setCheckoutOpen(false); setOrderPlaced(false); };

  return <div className="site-shell">
    <div className="top-strip">
      <div className="container top-inner">
        <span><Factory size={14}/> Manufacturer of Eyelets & Footwear Accessories Since 1975</span>
        <span className="top-right"><Globe2 size={14}/> India & Export Enquiries <span className="top-dot">•</span> <a href="mailto:sales@amarindustries.co">sales@amarindustries.co</a></span>
      </div>
    </div>

    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Amar Industries home">
          <div className="brand-mark"><span>A</span><i /></div>
          <div className="brand-copy"><strong>AMAR <b>INDUSTRIES</b></strong><small>PRECISION • QUALITY • TRUST</small></div>
        </a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#products" onClick={() => setMobileMenu(false)}>Products <ChevronDown size={14}/></a>
          <a href="#about" onClick={() => setMobileMenu(false)}>About Us</a>
          <a href="#wholesale" onClick={() => setMobileMenu(false)}>Wholesale</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" onClick={() => document.getElementById('product-search')?.focus()} aria-label="Search products"><Search size={20}/></button>
          <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingCart size={19}/><span>Cart</span><b>{cart.length}</b></button>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> BUILT FOR INDUSTRY. MADE TO LAST.</div>
            <h1>Precision metal<br/><em>components.</em><br/>Reliable supply.</h1>
            <p>Eyelets, washers, rivet buttons and footwear accessories manufactured for brands, factories, wholesalers and makers.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#products">Explore Products <ArrowRight size={17}/></a>
              <a className="button button-outline" href="#wholesale">Wholesale Enquiry</a>
            </div>
            <div className="hero-proof">
              <div><strong>Since 1975</strong><span>Manufacturing heritage</span></div>
              <div><strong>100+ options</strong><span>Custom product range</span></div>
              <div><strong>B2B + Retail</strong><span>Flexible order quantities</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-label label-top"><span className="status-dot"/> PRECISION COMPONENTS</div>
            <div className="hero-metal hero-ring"><div/></div>
            <div className="hero-metal hero-ring-two"><div/></div>
            <div className="hero-metal hero-washer"><div/></div>
            <div className="visual-caption"><span>01 / MATERIAL & FINISH</span><strong>Engineered for a precise fit.</strong><small>Brass • Aluminium • Steel</small></div>
            <div className="hero-coordinate">28° 40' N / INDUSTRIAL EXCELLENCE</div>
          </div>
        </div>
        <div className="hero-bottom-line"/>
      </section>

      <section className="trust-row">
        <div className="container trust-grid">
          <div><ShieldCheck/><span><strong>Quality-led production</strong><small>Consistent specifications</small></span></div>
          <div><PackageCheck/><span><strong>Bulk & small packs</strong><small>MOQ shown per product</small></span></div>
          <div><Truck/><span><strong>Dispatch coordination</strong><small>Shipping confirmed at checkout</small></span></div>
          <div><BadgeCheck/><span><strong>Made for industry</strong><small>Custom sizes & finishes</small></span></div>
        </div>
      </section>

      <section className="products-section section" id="products">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow dark"><span className="eyebrow-line"/> PRODUCT COLLECTION</div><h2>Components for every<br/><em>connection.</em></h2></div>
            <p>Browse our starter catalogue. Select a product to add the minimum order quantity to your cart. Prices shown are sample placeholders and must be confirmed before launch.</p>
          </div>
          <div className="catalog-tools">
            <div className="category-pills">
              {categories.map(c => <button key={c} className={category === c ? 'category-pill active' : 'category-pill'} onClick={() => setCategory(c)}>{c}</button>)}
            </div>
            <div className="catalog-controls">
              <label className="search-field"><Search size={17}/><input id="product-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products or material"/></label>
              <label className="sort-field"><SlidersHorizontal size={16}/><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
            </div>
          </div>
          <div className="product-grid">
            {filtered.map((p, index) => <article className="product-card" key={p.id}>
              <div className="product-image-wrap">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <ProductArt type={p.art}/>
                <span className="product-index">0{index+1}</span>
              </div>
              <div className="product-info">
                <div className="product-category">{p.category} <span>•</span> {p.material}</div>
                <h3>{p.name}</h3>
                <p className="product-meta">{p.size} <span>·</span> {p.finish}</p>
                <div className="product-bottom">
                  <div className="price-block"><strong>{money(p.price)}<small> / piece*</small></strong><span>MOQ: {p.moq.toLocaleString('en-IN')} pcs</span></div>
                  <button className="add-button" onClick={() => addToCart(p)} aria-label={`Add ${p.name} to cart`}><Plus size={18}/></button>
                </div>
                <div className="bulk-note">5,000+ pcs: indicative {money(p.bulk)}/pc*</div>
              </div>
            </article>)}
          </div>
          {filtered.length === 0 && <div className="empty-state">No products match your search. Try another term.</div>}
          <p className="price-disclaimer">*Demo prices only. Replace with approved prices, applicable GST, packaging, freight and payment terms before accepting real orders.</p>
        </div>
      </section>

      <section className="wholesale-section" id="wholesale">
        <div className="container wholesale-inner">
          <div className="wholesale-symbol"><Building2 size={34}/><span>TRADE<br/>DESK</span></div>
          <div className="wholesale-copy"><div className="eyebrow"><span className="eyebrow-line"/> FOR DEALERS & MANUFACTURERS</div><h2>Buying in bulk?<br/><em>Let's talk quantities.</em></h2><p>Need custom sizes, a special finish or recurring supply? Tell us your specification and target quantity for a trade quotation.</p></div>
          <div className="wholesale-benefits"><div><CheckCircle2/> Quantity-based pricing</div><div><CheckCircle2/> Custom size & finish enquiries</div><div><CheckCircle2/> Repeat-order coordination</div><a className="button button-gold" href="#contact">Request a trade quote <ArrowRight size={17}/></a></div>
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="container about-grid">
          <div className="about-art"><div className="blueprint-grid"/><div className="blueprint-ring"><div/></div><div className="about-stamp">AMAR<br/><strong>1975</strong><br/>INDUSTRIES</div><span className="art-note">MATERIAL / DETAIL / PERFORMANCE</span></div>
          <div className="about-copy"><div className="eyebrow dark"><span className="eyebrow-line"/> OUR MANUFACTURING STORY</div><h2>Decades of making<br/><em>the small parts matter.</em></h2><p>Amar Industries manufactures metal eyelets and related accessories for footwear, garments, bags, packaging, tarpaulins and industrial applications.</p><p>From standard components to custom requirements, we work with buyers to align material, dimensions, finish and packing with the intended application.</p><div className="about-stats"><div><strong>1975</strong><small>Heritage</small></div><div><strong>2</strong><small>Factory locations</small></div><div><strong>100+</strong><small>Product options</small></div></div></div>
        </div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="container contact-grid">
          <div><div className="eyebrow dark"><span className="eyebrow-line"/> LET'S GET STARTED</div><h2>Tell us what<br/><em>you're making.</em></h2><p>For product specifications, samples, dealer pricing or export enquiries, contact our team.</p><div className="contact-details"><a href="https://wa.me/919871510844" target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp: +91 98715 10844</a><a href="mailto:sales@amarindustries.co"><Mail/> sales@amarindustries.co</a><span><Factory/> Delhi & Ghaziabad, India</span></div></div>
          <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const text = `Amar Industries enquiry%0AName: ${encodeURIComponent(data.get('name'))}%0ACompany: ${encodeURIComponent(data.get('company'))}%0AProduct: ${encodeURIComponent(data.get('product'))}%0AQuantity: ${encodeURIComponent(data.get('quantity'))}%0AContact: ${encodeURIComponent(data.get('contact'))}%0ANotes: ${encodeURIComponent(data.get('notes'))}`; window.open(`https://wa.me/919871510844?text=${text}`, '_blank'); }}>
            <div className="form-heading"><strong>Product enquiry</strong><span>Usually best for custom and bulk requirements</span></div>
            <div className="form-row"><label>Your name<input name="name" required placeholder="Full name"/></label><label>Company<input name="company" placeholder="Company name"/></label></div>
            <div className="form-row"><label>Product of interest<select name="product"><option>Eyelets</option><option>Rivet buttons</option><option>Washers</option><option>D-eyelets / D-patti</option><option>Lacing hooks / boot hooks</option><option>Other / custom</option></select></label><label>Approx. quantity<input name="quantity" placeholder="e.g. 10,000 pcs"/></label></div>
            <label>Phone or email<input name="contact" required placeholder="How should we contact you?"/></label>
            <label>Specifications / message<textarea name="notes" rows="3" placeholder="Size, material, finish, application..."/></label>
            <button className="button button-navy form-submit" type="submit">Send enquiry on WhatsApp <ArrowRight size={17}/></button>
            <small className="form-note">This demo form opens WhatsApp with your enquiry. It does not store submissions on a server.</small>
          </form>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container footer-main"><a className="brand brand-footer" href="#home"><div className="brand-mark"><span>A</span><i/></div><div className="brand-copy"><strong>AMAR <b>INDUSTRIES</b></strong><small>PRECISION • QUALITY • TRUST</small></div></a><p>Eyelet manufacturer since 1975.<br/>Serving footwear, garments and industrial applications.</p><div className="footer-links"><a href="#products">Products</a><a href="#wholesale">Wholesale</a><a href="#contact">Contact</a></div></div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Amar Industries. All rights reserved.</span><span>Built for reliable industrial supply.</span></div>
    </footer>

    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}

    {cartOpen && <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}>
      <aside className="cart-drawer">
        <div className="drawer-head"><div><small>YOUR SELECTION</small><h2>Shopping cart <span>({cart.length})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X/></button></div>
        {cart.length === 0 ? <div className="cart-empty"><ShoppingCart size={40}/><h3>Your cart is empty</h3><p>Explore the catalogue and add products to begin.</p><button className="button button-navy" onClick={() => setCartOpen(false)}>Browse products</button></div> :
          <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><ProductArt type={item.art}/><div className="cart-item-main"><strong>{item.name}</strong><small>MOQ {item.moq.toLocaleString('en-IN')} pcs · {item.code}</small><div className="qty-control"><button onClick={() => changeQty(item.id, item.qty - item.moq)} aria-label="Decrease quantity"><Minus size={14}/></button><input aria-label={`Quantity for ${item.name}`} type="number" min={item.moq} step={item.moq} value={item.qty} onChange={e => changeQty(item.id, e.target.value)}/><button onClick={() => changeQty(item.id, item.qty + item.moq)} aria-label="Increase quantity"><Plus size={14}/></button></div><small className="qty-hint">Minimum order: {item.moq.toLocaleString('en-IN')} pcs</small></div><div className="cart-item-end"><strong>{money(item.qty * (item.qty >= 5000 ? item.bulk : item.price))}</strong><button className="remove-button" onClick={() => removeItem(item.id)}><Trash2 size={15}/></button></div></div>)}</div><div className="cart-summary"><div><span>Subtotal (indicative)</span><strong>{money(subtotal)}</strong></div><small>GST, shipping and final trade pricing are confirmed separately.</small><button className="button button-gold checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout <ArrowRight size={17}/></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping</button></div></>}
      </aside>
    </div>}

    {checkoutOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) closeCheckout(); }}>
      <div className="checkout-modal">
        <div className="drawer-head"><div><small>CHECKOUT</small><h2>{orderPlaced ? 'Enquiry created' : 'Order details'}</h2></div><button className="icon-button" onClick={closeCheckout}><X/></button></div>
        {orderPlaced ? <div className="success-panel"><CheckCircle2 size={46}/><h3>Demo order saved locally</h3><p>Your selection was saved in this browser for demonstration. No payment was collected and no order was sent to Amar Industries.</p><button className="button button-navy" onClick={closeCheckout}>Back to store</button></div> :
          <form className="checkout-form" onSubmit={submitDemoOrder}>
            <div className="notice-box"><CreditCard size={19}/><p><strong>Demo checkout only.</strong> Online payment is not connected yet. We must configure a payment gateway and secure order backend before taking real orders.</p></div>
            <div className="customer-switch"><button type="button" className={customerType === 'retail' ? 'selected' : ''} onClick={() => setCustomerType('retail')}>Retail customer</button><button type="button" className={customerType === 'business' ? 'selected' : ''} onClick={() => setCustomerType('business')}>Business / wholesale</button></div>
            <div className="form-row"><label>Full name *<input name="name" required value={form.name} onChange={updateForm}/></label><label>{customerType === 'business' ? 'Company name *' : 'Company name'}<input name="company" required={customerType === 'business'} value={form.company} onChange={updateForm}/></label></div>
            <div className="form-row"><label>Email *<input name="email" type="email" required value={form.email} onChange={updateForm}/></label><label>Phone *<input name="phone" required value={form.phone} onChange={updateForm}/></label></div>
            <label>Delivery address *<textarea name="address" required rows="2" value={form.address} onChange={updateForm}/></label>
            {customerType === 'business' && <label>GSTIN (optional)<input name="gst" value={form.gst} onChange={updateForm} placeholder="Enter GSTIN if applicable"/></label>}
            <label>Order notes<textarea name="notes" rows="2" value={form.notes} onChange={updateForm} placeholder="Required finish, packaging, delivery instructions..."/></label>
            <div className="checkout-total"><span>Indicative subtotal</span><strong>{money(total)}</strong></div>
            <button className="button button-navy form-submit" type="submit">Save demo order <ArrowRight size={17}/></button>
          </form>}
      </div>
    </div>}
  </div>;
}

export default App;
