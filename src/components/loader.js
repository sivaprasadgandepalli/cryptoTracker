import { motion } from "framer-motion";

export default function CryptoLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Spinning Coin */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
      ></motion.div>

      {/* Loading Text */}
      <p className="mt-4 text-lg text-yellow-400 font-semibold animate-pulse">
        Loading Crypto Data...
      </p>
    </div>
  );
}
