import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home         from './pages/Home'
import Menu         from './pages/Menu'
import Order        from './pages/Order'
import Checkout     from './pages/Checkout'
import Confirmation from './pages/Confirmation'

/* ── Page transition wrapper ───────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2, ease: 'easeIn'  } },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

/* ── Inner app — needs useLocation inside BrowserRouter ────────────────────── */
function AppInner() {
  const location = useLocation()
  const isConfirmation = location.pathname === '/confirmation'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/menu"        element={<AnimatedPage><Menu /></AnimatedPage>} />
          <Route path="/order"       element={<AnimatedPage><Order /></AnimatedPage>} />
          <Route path="/checkout"    element={<AnimatedPage><Checkout /></AnimatedPage>} />
          <Route path="/confirmation" element={<AnimatedPage><Confirmation /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>

      {!isConfirmation && <Footer />}
    </div>
  )
}

/* ── Root export ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
