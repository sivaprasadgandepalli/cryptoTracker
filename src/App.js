import './App.css';
import Home from './pages/home';
import Header from './components/header';
import SingleCoinPage from './pages/Coin';
import Pricing from './pages/pricing';
import { Route, Routes } from 'react-router-dom';
import Coins from './pages/Coins';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/404Page';
import Login from './pages/SignIn';
import Register from './pages/SignUp';
import { AuthProvider } from './context/authContext';
import Footer from './components/footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import MobileNavbar from './components/mobileNavbar';
function App() {
  return (
    <>
      <div className='w-full overflow-hidden min-h-screen pb-16 md:pb-0 bg-[url(https://e0.pxfuel.com/wallpapers/1015/361/desktop-wallpaper-blue-plain-simple-dark-blue.jpg)] bg-no-repeat bg-cover'>
        <Toaster />
        <AuthProvider>
          <Header />
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/SignIn' element={<Login />} />
              <Route path='/SignUp' element={<Register />} />
              <Route path='/Coins' element={<ProtectedRoute><Coins /></ProtectedRoute>} />
              <Route path='/pricing' element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
              <Route path='/Coin/:coinId' element={<ProtectedRoute><SingleCoinPage /></ProtectedRoute>} />
              
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
        <MobileNavbar/>
        <Footer />
      </div>
    </>
  );
}

export default App;