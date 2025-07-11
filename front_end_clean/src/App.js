import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { Navbar } from './Components/Navbar/Navbar';
import { All } from './Pages/All';
import { LatestCollections } from './Pages/LatestCollection';
import CollectionPage from './Pages/CollectionPage';
import CategoryPage from './Pages/CategoryPage';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import Cart from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { NotFound } from './Pages/NotFound';
import Footer from './Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout/Checkout';
import CheckoutSuccess from './Pages/Checkout/CheckoutSuccess';
import CheckoutCancel from './Pages/Checkout/CheckoutCancel';

import Formal from './Pages/product/men/western/MwFormal/Formal';
import Joggers from './Pages/product/men/western/MwJoggers/Joggers';
import Jeans from './Pages/product/men/western/MwJeans/Jeans';
import Trousers from './Pages/product/men/western/MwTrousers/Trousers';
import Tshirts from './Pages/product/men/western/MwTshirts/Tshirts';
import Shoes from './Pages/product/men/footwear/MfShoes/Shoes';
import Casuals from './Pages/product/men/footwear/MfCasuals/Casuals';
import Snickers from './Pages/product/men/footwear/MfSnickers/Snickers';


import Dresses from './Pages/product/women/ethnic/WDresses/Dresses';
import Kurtas from './Pages/product/women/ethnic/WKurtas/Kurtas';
import Salvars from './Pages/product/women/ethnic/WSalvars/Salvars';
import Suits from './Pages/product/women/ethnic/WSuits/Suits';
import Sandals from './Pages/product/women/footwear/WfSandals/Sandals';
import Fshoes from './Pages/product/women/footwear/WfFshoes/Fshoes';
import Fsneakers from './Pages/product/women/footwear/WfFsneakers/Fsneakers';
import Handbags from './Pages/product/women/footwear/WfHandbags/Handbags';
import Wjeans from './Pages/product/women/western/WWjeans/Wjeans';
import Wtshirts from './Pages/product/women/western/WWtshirts/Wtshirts';
import Wtops from './Pages/product/women/western/WWtops/Wtops';
import Wtrousers from './Pages/product/women/western/WWtrousers/Wtrousers';


import Bjeans from './Pages/product/kids/boy/KBjeans/Bjeans';
import Bshirts from './Pages/product/kids/boy/KBshirts/Bshirts';
import Btshirts from './Pages/product/kids/boy/KBtshirts/Btshirts';
import Gdresses from './Pages/product/kids/girl/KGdresses/Gdresses';
import Gjeans from './Pages/product/kids/girl/KGjeans/Gjeans';
import Gskirts from './Pages/product/kids/girl/KGskirts/Gskirts';
import Gtops from './Pages/product/kids/girl/KGtops/Gtops';
import Bbjackets from './Pages/product/kids/babyboy/KBbjackets/Bbjackets';
import Bbjeans from './Pages/product/kids/babyboy/KBbjeans/Bbjeans';
import Bbshirts from './Pages/product/kids/babyboy/KBbshirts/Bbshirts';
import Bgdresses from './Pages/product/kids/babygirl/KBgdresses/Bgdresses';
import Bgtops from './Pages/product/kids/babygirl/KBgtops/Bgtops';
import Bgfootwear from './Pages/product/kids/babygirl/KBgfootwear/Bgfootwear';



import Fmen from './Pages/product/beauty/fragnance/BFmen/Fmen';
import Fwomen from './Pages/product/beauty/fragnance/BFwomen/Fwomen';
import Meye from './Pages/product/beauty/makeup/BMeye/Meye';
import Mface from './Pages/product/beauty/makeup/BMface/Mface';
import Mlipnail from './Pages/product/beauty/makeup/BMlipnail/Mlipnail';

import Belt from './Pages/product/accessories/men/Abelts/Belt';
import Glassring from './Pages/product/accessories/men/Aglassring/Glassring';
import Wallet from './Pages/product/accessories/men/Awallets/Wallet';
import WGlasses from './Pages/product/accessories/women/AWGlasses/WGlasses';
import WHandbags from './Pages/product/accessories/women/AWhandbags/WHandbags';
import Wwatches from './Pages/product/accessories/women/AWwatches/Wwatches';



function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
} 


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>

              <Route path='/checkout' element={
              <ProtectedRoute>
              <Checkout />
              </ProtectedRoute>
              } />
              <Route path='/checkout/success' element={<CheckoutSuccess />} />
              <Route path='/checkout/cancel' element={<CheckoutCancel />} />


                <Route path='/' element={<All />} />
                <Route path='/latest-collections' element={<LatestCollections />} />
                <Route path='/shop/:category' element={<CollectionPage />} />
              
              {/* Main Category Route (single param) */}
              <Route path='/:category' element={<CategoryPage />} />
              
              {/* Subcategory Routes */}
              <Route path='/men/:subcategory' element={<ShopCategory category="men" />} />
              <Route path='/men/formal' element={<Formal />} />
              <Route path='/men/joggers' element={<Joggers />} />
              <Route path='/men/jeans' element={<Jeans />} />
              <Route path='/men/trousers' element={<Trousers />} />
              <Route path='/men/t-shirts' element={<Tshirts />} />
              <Route path='/men/shoes' element={<Shoes />} />
              <Route path='/men/casuals' element={<Casuals />} />
              <Route path='/men/sneakers' element={<Snickers />} />

              
              <Route path='/womens/:subcategory' element={<ShopCategory category="women" />} />
              <Route path='/women/dresses' element={<Dresses />} />
              <Route path='/women/kurtas' element={<Kurtas />} />
              <Route path='/women/salvars' element={<Salvars />} />
              <Route path='/women/suits' element={<Suits />} />
              <Route path='/women/flat-sandals' element={<Sandals />} />
              <Route path='/women/flat-shoes' element={<Fshoes />} />
              <Route path='/women/sneakers' element={<Fsneakers />} />
              <Route path='/women/handbags' element={<Handbags />} />
              <Route path='/women/jeans' element={<Wjeans />} />
              <Route path='/women/t-shirts' element={<Wtshirts />} />
              <Route path='/women/tops' element={<Wtops />} />
              <Route path='/women/trousers' element={<Wtrousers />} />

              <Route path='/kids/:subcategory' element={<ShopCategory category="kids" />} />
              <Route path='/kids/boys-3-14/jeans' element={<Bjeans />} />
              <Route path='/kids/boys-3-14/shirts' element={<Bshirts />} />
              <Route path='/kids/boys-3-14/t-shirts' element={<Btshirts />} />
              <Route path='/kids/girls-3-14/dresses' element={<Gdresses />} />
              <Route path='/kids/girls-3-14/jeans' element={<Gjeans />} />
              <Route path='/kids/girls-3-14/skirts' element={<Gskirts />} />
              <Route path='/kids/girls-3-14/tops' element={<Gtops />} />
              <Route path='/kids/baby-boy-0-3/jackets' element={<Bbjackets />} />
              <Route path='/kids/baby-boy-0-3/jeans' element={<Bbjeans />} />
              <Route path='/kids/baby-boy-0-3/shirts' element={<Bbshirts />} />
              <Route path='/kids/baby-girl-0-3/dresses' element={<Bgdresses />} />
              <Route path='/kids/baby-girl-0-3/tops' element={<Bgtops />} />
              <Route path='/kids/baby-girl-0-3/footwear' element={<Bgfootwear />} />

              <Route path='/beauty/:subcategory' element={<ShopCategory category="beauty" />} />
              <Route path='/beauty/men-fragrance' element={<Fmen />} />
              <Route path='/beauty/women-fragrance' element={<Fwomen />} />
              <Route path='/beauty/eye' element={<Meye />} />
              <Route path='/beauty/face' element={<Mface />} />
              <Route path='/beauty/lips-nails' element={<Mlipnail />} />
               
  
              <Route path='/accessories/:subcategory' element={<ShopCategory category="accessories" />} />
              <Route path='/accessories/belts' element={<Belt />} />
              <Route path='/accessories/rings' element={<Glassring />} />
              <Route path='/accessories/wallets' element={<Wallet />} />
              <Route path='/accessories/glasses' element={<WGlasses />} />
              <Route path='/accessories/handbags' element={<WHandbags />} />
              <Route path='/accessories/watches' element={<Wwatches />} />
              
               
                 
               <Route path='/product/:productId' element={<Product />}  />
              <Route path='/cart' element={
                
                  <Cart />
                
              } />
              <Route path='/login' element={<LoginSignup />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      </CartProvider>
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}

export default App;