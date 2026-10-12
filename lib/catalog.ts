export type Category = 'groceries' | 'restaurant_food' | 'electronics' | 'home_appliances';
export type StockStatus = 'in_stock' | 'out_of_stock' | 'unknown';

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'groceries', label: 'Groceries', icon: '🥬' },
  { id: 'restaurant_food', label: 'Restaurant food', icon: '🍕' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'home_appliances', label: 'Home appliances', icon: '🏠' },
];

export type DemoOffer = {
  id: string; category: Category; productName: string; brand: string; variant: string;
  storeName: string; pricePaise: number; stockStatus: StockStatus; pinCode: string;
  sourceLabel: string; checkedAtLabel: string; emoji: string; productUrl: string;
};

// Fictional data used only to test the UI. Never represent these as live retailer prices.
export const demoOffers: DemoOffer[] = [
  { id:'g1',category:'groceries',productName:'Toned milk 1 L',brand:'Example Dairy',variant:'1 litre pouch',storeName:'Demo Grocery A',pricePaise:6800,stockStatus:'in_stock',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🥛',productUrl:'https://example.com/' },
  { id:'g2',category:'groceries',productName:'Toned milk 1 L',brand:'Example Dairy',variant:'1 litre pouch',storeName:'Demo Grocery B',pricePaise:7200,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🥛',productUrl:'https://example.com/' },
  { id:'g3',category:'groceries',productName:'Basmati rice 5 kg',brand:'Example Foods',variant:'5 kg bag',storeName:'Demo Grocery C',pricePaise:64900,stockStatus:'out_of_stock',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🍚',productUrl:'https://example.com/' },
  { id:'g4',category:'groceries',productName:'Basmati rice 5 kg',brand:'Example Foods',variant:'5 kg bag',storeName:'JioMart · DEMO',pricePaise:62900,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED — not a live JioMart feed',checkedAtLabel:'demo timestamp',emoji:'🛒',productUrl:'https://www.jiomart.com/' },
  { id:'f1',category:'restaurant_food',productName:'Veg pizza',brand:'Demo Pizzeria',variant:'regular',storeName:'Demo Food App A',pricePaise:24900,stockStatus:'in_stock',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🍕',productUrl:'https://example.com/' },
  { id:'f2',category:'restaurant_food',productName:'Veg pizza',brand:'Demo Pizzeria',variant:'regular',storeName:'Demo Food App B',pricePaise:26900,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🍕',productUrl:'https://example.com/' },
  { id:'e1',category:'electronics',productName:'Smartphone 128 GB',brand:'Example Mobile',variant:'128 GB · black',storeName:'Demo Electronics A',pricePaise:3499900,stockStatus:'in_stock',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'📱',productUrl:'https://example.com/' },
  { id:'e2',category:'electronics',productName:'Smartphone 128 GB',brand:'Example Mobile',variant:'128 GB · black',storeName:'Demo Electronics B',pricePaise:3399900,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'📱',productUrl:'https://example.com/' },
  { id:'e3',category:'electronics',productName:'Smartphone 128 GB',brand:'Example Mobile',variant:'128 GB · black',storeName:'Amazon India · DEMO',pricePaise:3449900,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED — not a live Amazon feed',checkedAtLabel:'demo timestamp',emoji:'📦',productUrl:'https://www.amazon.in/' },
  { id:'e4',category:'electronics',productName:'Smartphone 128 GB',brand:'Example Mobile',variant:'128 GB · black',storeName:'Flipkart · DEMO',pricePaise:3419900,stockStatus:'unknown',pinCode:'400001',sourceLabel:'DEMO SEED — not a live Flipkart feed',checkedAtLabel:'demo timestamp',emoji:'🛍️',productUrl:'https://www.flipkart.com/' },
  { id:'h1',category:'home_appliances',productName:'Air fryer 4 L',brand:'Example Home',variant:'4 litre',storeName:'Demo Appliance A',pricePaise:499900,stockStatus:'in_stock',pinCode:'400001',sourceLabel:'DEMO SEED',checkedAtLabel:'demo timestamp',emoji:'🍟',productUrl:'https://example.com/' },
];
