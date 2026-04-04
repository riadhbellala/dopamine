import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import Story from '../components/sections/Story'
import SignatureDrinks from '../components/sections/SignatureDrinks'
import DailyStrike from '../components/sections/DailyStrike'
import Experience from '../components/sections/Experience'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Story />
      <SignatureDrinks />
      <DailyStrike />
      <div id="about">
        <Experience />
      </div>
    </motion.div>
  )
}
