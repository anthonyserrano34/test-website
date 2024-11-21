"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Menu, Linkedin, CheckCircle } from 'lucide-react'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
const galanoGrotesque = localFont({ src: '../fonts/0_GalanoGrotesqueDEMO-Bold.otf' })

const ceos = [
  {
    name: "Michaël EL BAKI",
    title: "Founder & Chief Technology Officer",
    bio: "Initially head of the Dublin R&D center of a French software publisher (Sophis, investment banking,  €300m exit), then founder of one of the first studios (BitRabbit, Ireland) to develop cross-platform games and tools for smartphones (2004), before founding the industry's first \"Games as a Service\" backend (Clan of the Cloud, France) in 2011, renamed XtraLife in 2016. 30 years experience in building and managing local and remote teams, IT systems architecture, APIs design and software design and development.",
    experience: ["Entrepreneurship", "Project management", "SaaS", "Gaming", "Risk management software"],
    image: "/company/michael_el_baki.jpg",
    linkedin: "https://www.linkedin.com/in/michaelelbaki/",
  },
  {
    name: "Christophe LAMBERT",
    title: "Chief Executive Officer",
    bio: "Through several leadership roles, I was able to develop strong skills in strategic thought processes as well as building and running different size organizations. My knowledge scope in the IT industry is strong as I worked for technology leaders like HPE and was able to positively influence the success of startups like NetApp, SimpliVity and Cohesity. Besides that I was part of the root of the Internet in France and created a few startups back then.",
    experience: ["Leadership", "Strategic advisor", "Cloud computing", "IT market", "Team building"],
    image: "/company/christophe_lambert.jpg",
    linkedin: "https://www.linkedin.com/in/christophelambert/",
  }
]

export default function CompanyPage() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#164C4C] to-[#1a3b3b] pb-24 ${inter.className}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#164C4C]/90 backdrop-blur-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/company" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Company</Link>
              <Link href="/news" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">News</Link>
              <Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#57e4c5]/10"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#164C4C]/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link href="/company" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Company</Link>
              <Link href="/news" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">News</Link>
              <Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-4 max-w-4xl mx-auto relative pb-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          className="text-center mb-12 relative"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#57e4c5]/20 rounded-full px-4 py-1 mb-4"
            variants={fadeInUpVariants}
          >
            <span className="text-[#57e4c5] text-sm font-medium">Our Team</span>
          </motion.div>
          <motion.h1
            className={`text-4xl md:text-5xl font-bold text-white mb-4 relative z-10`}
            variants={fadeInUpVariants}
          >
            Our Executive Team
          </motion.h1>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto relative z-10"
            variants={fadeInUpVariants}
          >
            The visionaries behind <span className={`${galanoGrotesque.className} tracking-tighter`}>Altwy</span>, driving innovation in datacenter management.
          </motion.p>
          {/* Light Halo Effect */}
          <div className="absolute inset-0 bg-[#57e4c5] opacity-20 filter blur-3xl rounded-full"></div>
        </motion.div>

        {/* CEO Profiles */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-12 relative"
        >
          {ceos.map((ceo) => (
            <motion.div
              key={ceo.name}
              variants={fadeInUpVariants}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-[#57e4c5]/20 shadow-lg hover:shadow-[#57e4c5]/10 relative overflow-hidden group"
            >
              <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
                <div className="md:col-span-1">
                  <motion.div
                    className="relative rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={ceo.image}
                      alt={ceo.name}
                      width={300}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className={`text-xl font-bold`}>{ceo.name}</h3>
                      <p className="text-sm text-white/80">{ceo.title}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="md:col-span-2 space-y-4 flex flex-col h-full">
                  <motion.div 
                    className="bg-white/10 rounded-lg p-6 flex-grow"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className={`text-lg font-semibold text-[#57e4c5] mb-2`}>Biography</h4>
                    <p className="text-white/80 select-text">{ceo.bio}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-lg p-6"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className={`text-lg font-semibold text-[#57e4c5] mb-2`}>Experience</h4>
                    <ul className="text-white/80 select-text grid grid-cols-2 gap-2">
                      {ceo.experience.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-[#57e4c5]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <div className="flex justify-center mt-4">
                    <motion.a
                      href={ceo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white/10 border border-[#57e4c5] text-white rounded-md hover:bg-white/20 transition-colors duration-300"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </motion.a>
                  </div>
                </div>
              </div>
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#57e4c5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}