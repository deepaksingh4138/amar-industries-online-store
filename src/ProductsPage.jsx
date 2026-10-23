import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, SlidersHorizontal, ShoppingCart, MessageCircle, Menu, X, Package, ChevronDown, Check, Plus, Minus } from 'lucide-react';
import './products.css';

const categories = [
  'All products','Eyelets','Washers','Rivet Buttons','D-Eyelets & D Patti',
  'Lacing Hooks & Boot Hooks','Wire Loops (Kadi)','Aqua Pressure Caps','Other Metal Accessories'
];
const products = [
  {id:'eyelet-600',name:'Standard Eyelet',category:'Eyelets',sizes:'Multiple sizes',materials:'Brass · Aluminium · Steel',finishes:'Nickel · Golden · Black · Antique',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Core range'},
  {id:'eyelet-800',name:'Heavy-Duty Eyelet',category:'Eyelets',sizes:'Made to specification',materials:'Brass · Aluminium · Steel',finishes:'Nickel · Golden · Custom finishes',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Industrial'},
  {id:'washer-flat',name:'Flat Washer',category:'Washers',sizes:'Multiple profiles',materials:'Brass · Aluminium · Steel',finishes:'Matched to application',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Pair with eyelets'},
  {id:'rivet-7',name:'Rivet Button',category:'Rivet Buttons',sizes:'5 mm · 7 mm · 9 mm · 12 mm',materials:'Metal options by requirement',finishes:'Multiple finishes',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Garments & bags'},
  {id:'d-eyelet',name:'D-Eyelet & D Patti',category:'D-Eyelets & D Patti',sizes:'Application-specific',materials:'Metal options by requirement',finishes:'Multiple finishes',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Footwear'},
  {id:'boot-hook',name:'Lacing & Boot Hooks',category:'Lacing Hooks & Boot Hooks',sizes:'Multiple patterns',materials:'Metal options by requirement',finishes:'Multiple finishes',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Footwear'},
  {id:'wire-loop',name:'Wire Loop (Kadi)',category:'Wire Loops (Kadi)',sizes:'Made to requirement',materials:'Steel / other available options',finishes:'Confirm with sales',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Utility component'},
  {id:'aqua-cap',name:'Aqua Pressure Cap',category:'Aqua Pressure Caps',sizes:'Confirm specification',materials:'Confirm with sales',finishes:'Confirm with sales',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Special component'},
  {id:'accessory',name:'Custom Metal Accessory',category:'Other Metal Accessories',sizes:'Drawing / sample based',materials:'Discuss your specification',finishes:'Discuss your specification',moq:1000,retail:'Request current price',bulk:'Volume pricing available',tag:'Custom enquiry'},
];
function PartArt({index}) { return <div className={`product-part-art art-${index%5}`} aria-hidden="true"><div className="part-ring"><div className="part-hole"/></div><span className="art-orbit orbit-one"/><span className="art-orbit orbit-two"/><small>AM / COMPONENT STUDY</small></div>; }
export default function ProductsPage(){
 const [category,setCategory]=useState('All products'); const [query,setQuery]=useState(''); const [sort,setSort]=useState('featured'); const [filtersOpen,setFiltersOpen]=useState(false); const [quantities,setQuantities]=useState({});
 const filtered=useMemo(()=>{let arr=products.filter(p=>(category==='All products'||p.category===category)&&`${p.name} ${p.category} ${p.materials} ${p.finishes}`.toLowerCase().includes(query.toLowerCase())); if(sort==='name')arr.sort((a,b)=>a.name.localeCompare(b.name)); return arr;},[category,query,sort]);
 const whatsapp=(p)=>`https://wa.me/919871510844?text=${encodeURIComponent(`Hello Amar Industries, please share retail and wholesale pricing for ${p.name}. Quantity: ${quantities[p.id]||p.moq}. Please confirm available sizes, material, finish, MOQ and delivery.`)}`;
 return <div className="products-page">
  <div className="products-topline"><span>AMAR INDUSTRIES <i/> PRECISION · QUALITY · TRUST</span><a href="mailto:sales@amarindustries.co">Export & bulk enquiries <ArrowUpRight size={14}/></a></div>
  <header className="products-header"><a className="products-brand" href="/amar-industries-online-store/" aria-label="Back to home"><img src="/amar-industries-online-store/amar-industries-logo.jpeg" alt="Amar Industries"/></a><nav><a href="/amar-industries-online-store/">Home</a><a className="active" href="#products-page">Products</a><a href="mailto:sales@amarindustries.co">Wholesale</a><a href="https://wa.me/919871510844?text=Hello%20Amar%20Industries%2C%20I%20would%20like%20to%20enquire." target="_blank" rel="noreferrer">Contact</a></nav><a className="products-quote" href="https://wa.me/919871510844?text=Hello%20Amar%20Industries%2C%20please%20share%20your%20wholesale%20catalogue." target="_blank" rel="noreferrer"><MessageCircle size={15}/> Request bulk quote</a></header>
  <main><section className="products-hero"><div className="products-hero-grid"/><div className="products-hero-copy"><div className="products-eyebrow"><span/> THE AMAR COMPONENTS CATALOGUE</div><h1>Small components.<br/><em>Serious performance.</em></h1><p>Explore metal eyelets and accessories for footwear, garments, bags, packaging and industrial applications. Share your specifications for accurate pricing and availability.</p><div className="products-hero-stats"><div><b>Since 1975</b><span>Manufacturing heritage</span></div><div><b>Multi-material</b><span>Sizes & finishes by need</span></div><div><b>Retail + bulk</b><span>Enquiries welcome</span></div></div></div><div className="products-hero-art"><div className="hero-art-glow"/><PartArt index={0}/><div className="hero-art-label label-a"><small>01 / MATERIAL</small><b>Metal components</b></div><div className="hero-art-label label-b"><small>02 / SUPPLY</small><b>Bulk-ready enquiries</b></div><span className="hero-art-coordinate">AM / 1975 · INDIA</span></div></section>
  <section className="catalogue-wrap" id="catalogue"><div className="catalogue-heading"><div><div className="products-eyebrow light"><span/> PRODUCT RANGE</div><h2>Find your <em>component.</em></h2><p>Choose a category or search by product name, material or finish.</p></div><div className="catalogue-count"><b>{filtered.length.toString().padStart(2,'0')}</b><span>PRODUCT GROUPS</span></div></div>
   <div className="catalogue-tools"><label className="catalogue-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search eyelets, materials, finishes…" aria-label="Search products"/></label><button className="mobile-filter" onClick={()=>setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/> Categories</button><label className="catalogue-sort">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="name">Name A–Z</option></select><ChevronDown size={14}/></label></div>
   <div className={`catalogue-layout ${filtersOpen?'filters-open':''}`}><aside className="category-sidebar"><span className="sidebar-title">CATEGORIES</span>{categories.map((c,i)=><button key={c} className={category===c?'selected':''} onClick={()=>{setCategory(c);setFiltersOpen(false)}}><span>{c==='All products'?'00':String(i).padStart(2,'0')}</span>{c}{category===c&&<ArrowUpRight size={14}/>}</button>)}<div className="sidebar-help"><Package size={19}/><b>Need a custom part?</b><p>Send a drawing, sample or specification to discuss feasibility.</p><a href="https://wa.me/919871510844?text=Hello%20Amar%20Industries%2C%20I%20have%20a%20custom%20component%20enquiry." target="_blank" rel="noreferrer">Discuss requirements <ArrowUpRight size={14}/></a></div></aside>
    <div className="products-grid">{filtered.map((p,i)=><article className="product-card" key={p.id}><div className="product-card-visual"><span className="product-index">AM / {String(i+1).padStart(2,'0')}</span><span className="product-tag">{p.tag}</span>{p.id === 'eyelet-600' ? (
  <>
    <PartArt index={i} />
    <img
      className="real-product-image"
      src="/amar-industries-online-store/brass-eyelet.jpeg"
      alt="Brass eyelet by Amar Industries"
    />
  </>
) : (
  
<div className="product-card-visual">
  <span className="product-index">
    AM / {String(i + 1).padStart(2, '0')}
  </span>
  <span className="product-tag">{p.tag}</span>

  {p.id === 'eyelet-600' ? (
    <>
      <div
        className="real-product-glow"
        aria-hidden="true"
      />
      <img
        className="real-product-image"
        src="/amar-industries-online-store/brass-eyelet.jpeg"
        alt="Brass eyelet by Amar Industries"
      />
    </>
  ) : (
    <PartArt index={i} />
  )}

  <span className="product-visual-caption">
    {p.id === 'eyelet-600'
      ? 'AMAR INDUSTRIES · EYELETS'
      : 'ILLUSTRATIVE COMPONENT ART'}
  </span>
</div>

}
