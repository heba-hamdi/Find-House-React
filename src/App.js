import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
// import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Header from './components/Header'
import AnimatedRoutes from './components/AnimatedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import CreateListings from './pages/CreateListings'
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Category from './pages/Category';
import MidFooter from './components/footer/MidFooter';
import BottomFooter from './components/footer/BottomFooter';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/notFound/NotFound';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';


function App() {
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/offers" element={<Offers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />}/>

          <Route path="/create-listings" element={<PrivateRoute/>}>
            <Route path="/create-listings" element={<CreateListings />} />
          </Route>

          <Route path="/edit-listing" element={<PrivateRoute/>}>
            <Route path="/edit-listing/:listingId" element={<EditListing/>} />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>

        <AnimatedRoutes />
      

      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
