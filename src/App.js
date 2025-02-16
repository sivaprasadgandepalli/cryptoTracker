import './App.css';
import Home from './pages/home';
import Header from './components/header';
import SingleCoinPage from './pages/SingleCoinPage';
import Pricing from './pages/pricing';
import { Route, Routes } from 'react-router-dom';
import Coins from './pages/Coins';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/404Page';
import Login from './pages/signInPage';
import Register from './pages/SignUpPage';
import { AuthProvider } from './context/authContext';
import Footer from './components/footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <div className='w-full overflow-hidden min-h-screen bg-[url(https://e0.pxfuel.com/wallpapers/1015/361/desktop-wallpaper-blue-plain-simple-dark-blue.jpg)] bg-no-repeat bg-cover'>
        <Toaster />
        <AuthProvider>
          <Header />
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signInPage' element={<Login />} />
              <Route path='/SignUpPage' element={<Register />} />
              <Route path='/Coins' element={<ProtectedRoute><Coins /></ProtectedRoute>} />
              <Route path='/pricing' element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
              <Route path='/SingleCoinPage/:coinId' element={<ProtectedRoute><SingleCoinPage /></ProtectedRoute>} />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;