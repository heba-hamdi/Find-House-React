import React from 'react'
import SignIn from '../pages/SignIn';

import {Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location=useLocation();
    return (
       <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/sign-in" element={<SignIn />} />           
        </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
