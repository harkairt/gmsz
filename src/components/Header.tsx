import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Bevezető' },
  { path: '/alapfogalmak', label: 'Alapfogalmak' },
  { path: '/tervezes', label: 'Tervezés' },
  { path: '/kockazat', label: 'Kockázat' },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background-dark/80 border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg font-bold gradient-text"
            >
              GM
            </motion.div>
          </NavLink>

          <div className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative z-10"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 border border-primary-purple/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
