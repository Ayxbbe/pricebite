'use client';

import { useMemo, useState } from 'react';
import { demoOffers, categories, type Category, type StockStatus } from '@/lib/catalog';

const stockLabel: Record<StockStatus, string> = {
  in_stock: 'In stock · demo',
  out_of_stock: 'Out of stock · demo',
  unknown: 'Availability unknown · demo',
};

export default function Home() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [pin, setPin] = useState('400001');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [basket, setBasket] = useState<string[]>([]);
  const [authUrl, setAuthUrl] = useState('');
  const [authSeller, setAuthSeller] = useState('');
  const [authSubmitted, setAuthSubmitted] = useState(false);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = demoOffers.filter(o =>
      (category === 'all' || o.category === category) &&
      (!q || `${o.productName} ${o.brand} ${o.storeName}`.toLowerCase().includes(q)) &&
      o.pinCode === pin &&
      (!inStockOnly || o.stockStatus === 'in_stock')
    );
    return filtered.sort((a, b) => {
      // Confirmed in-stock offers first; then price. Unknown is never considered available.
      const stockRank = (s: StockStatus) => s === 'in_stock' ? 0 : s === 'unknown' ? 1 : 2;
      return stockRank(a.stockStatus) - stockRank(b.stockStatus) || a.pricePaise - b.pricePaise;
    });
  }, [category, query, pin, inStockOnly]);

  const basketOffers = basket.map(id => demoOffers.find(o => o.id === id)).filter(Boolean);
  const basketTotal = basketOffers.reduce((sum, o) => sum + (o?.pricePaise ?? 0), 0);
  const money = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brandMark">P</span><span>Price<span className="green">Locker</span><small>Compare before you buy</small></span></a>
        <div className="pinBox"><label htmlFor="pin">Deliver to PIN</label><input id="pin" value={pin} maxLength={6} inputMode="numeric" onChange={e => setPin(e.target.value.replace(/\D/g, ''))} /></div>
      </header>

      <section className="hero">
        <p className="eyebrow">MUMBAI FIRST · MULTI-CATEGORY COMPARISON</p>
        <h1>Find it. Compare it.<br /><span className="green">Save on it.</span></h1>
        <p className="subhead">Compare groceries, restaurant food, electronics and home appliances in one place — including Amazon, Flipkart and JioMart.</p>
        <div className="search"><span>⌕</span><input aria-label="Search products" placeholder="Search milk, pizza, smartphone, air fryer…" value={query} onChange={e => setQuery(e.target.value)} /></div>
        <p className="demoNotice">DEMO MODE — prices and stock below are fictional sample data, not live offers. Amazon, Flipkart and JioMart are listed as demo sources only; live feeds are not connected yet.</p>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">BROWSE</p><h2>Shop by category</h2></div></div>
        <div className="categories">
          <button className={category === 'all' ? 'category active' : 'category'} onClick={() => setCategory('all')}><span>✦</span>All categories</button>
          {categories.map(c => <button key={c.id} className={category === c.id ? 'category active' : 'category'} onClick={() => setCategory(c.id)}><span>{c.icon}</span>{c.label}</button>)}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">COMPARE OFFERS</p><h2>Prices for your area</h2><p className="muted">PIN code: {pin || 'Enter a PIN code'}</p></div>
          <label className="filter"><input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} /> Confirmed in-stock only</label>
        </div>
        <div className="offerGrid">
          {products.map(o => <article className="offer" key={o.id}>
            <div className="offerTop"><span className="categoryPill">{categories.find(c => c.id === o.category)?.label}</span><span className={`stock ${o.stockStatus}`}>{stockLabel[o.stockStatus]}</span></div>
            <div className="productIcon">{o.emoji}</div>
            <p className="store">{o.storeName}</p><h3>{o.productName}</h3><p className="muted">{o.brand} · {o.variant}</p>
            <div className="priceLine"><strong>{money(o.pricePaise)}</strong><span>+ delivery at checkout</span></div>
            <p className="freshness">Source: {o.sourceLabel}<br />Checked: {o.checkedAtLabel}</p>
            <div className="offerActions"><button className="secondary" onClick={() => setBasket(old => old.includes(o.id) ? old.filter(x => x !== o.id) : [...old, o.id])}>{basket.includes(o.id) ? 'Remove from basket' : 'Add to basket'}</button><a className="textLink" href={o.productUrl} target="_blank" rel="noreferrer">Store link ↗</a></div>
            {o.stockStatus === 'unknown' && <p className="warningText">We could not verify stock for this PIN code. Do not assume it is available.</p>}
            {o.stockStatus === 'out_of_stock' && <button className="notify" onClick={() => alert('Demo only: in production, this creates a consented back-in-stock subscription.')}>♧ Notify me when available</button>}
          </article>)}
          {products.length === 0 && <div className="empty">No demo offers match this search and PIN code. Try 400001 or clear the filters.</div>}
        </div>
      </section>

      <section className="section authenticity" id="auth-check">
        <div className="sectionHead"><div><p className="eyebrow">NEW · BUY SMARTER</p><h2>Product authenticity check</h2><p className="muted">Spot listing red flags before you buy. This starter provides a checklist, not a guarantee of authenticity.</p></div><span className="authBadge">✦ AUTH CHECK</span></div>
        <form className="authForm" onSubmit={e => { e.preventDefault(); setAuthSubmitted(true); }}>
          <label>Product listing URL<input type="url" required placeholder="https://www.amazon.in/..." value={authUrl} onChange={e => {setAuthUrl(e.target.value); setAuthSubmitted(false);}} /></label>
          <label>Seller name shown on listing<input type="text" required placeholder="Enter the seller name" value={authSeller} onChange={e => {setAuthSeller(e.target.value); setAuthSubmitted(false);}} /></label>
          <button className="authButton" type="submit">Check listing signals ↗</button>
        </form>
        {authSubmitted && <div className="authResult" role="status"><strong>Preliminary check only — not verified genuine.</strong><p>Listing domain: {(() => { try { return new URL(authUrl).hostname; } catch { return 'Could not read URL'; } })()}</p><p>Seller entered: {authSeller}</p><ul><li>Confirm the seller on the retailer's official app/site and check seller history.</li><li>Check invoice eligibility, return policy, warranty coverage, and manufacturer-authorized seller status.</li><li>For phones, check IMEI/serial using the manufacturer's official verification channel after purchase where available.</li><li>Be cautious of unusually low prices, copied images, spelling errors, or requests to pay outside the platform.</li></ul><p className="muted">PriceBite has not contacted the retailer or manufacturer. No authenticity verdict can be issued until authorized data integrations are added.</p></div>}
      </section>

      <aside className="basket">
        <div><p className="eyebrow">YOUR COMPARISON BASKET</p><h2>{basket.length} selected offer{basket.length === 1 ? '' : 's'}</h2><p className="muted">Demo subtotal; delivery and offer conditions are not included.</p></div>
        <strong className="basketTotal">{money(basketTotal)}</strong>
      </aside>

      <footer><strong>PriceLocker</strong><span>Prices and stock must be verified with each retailer before purchase.</span></footer>
    </main>
  );
}
