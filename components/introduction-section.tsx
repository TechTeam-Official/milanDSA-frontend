'use client'

import { motion } from 'framer-motion'

export function IntroductionSection() {
  return (
    <section className="relative bg-neutral-50 text-neutral-900 py-24 md:py-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-neutral-800 to-blue-600 mb-4">
                About MILAN
             </h2>
             <div className="inline-block relative">
                <span className="text-xl md:text-2xl font-semibold text-purple-600 tracking-wider">
                  #Live The Change
                </span>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-neutral-600 font-light leading-relaxed"
          >
            <p>
              MILAN is a National-level inter-college cultural festival organized by the Directorate of Student Affairs at SRM Institute of Science and Technology. It serves as a vibrant platform for students to &ldquo;Celebrate Life&rdquo;, showcase diverse talents, and foster unity, promote creativity, teamwork, and cultural exchange among students from across India.
            </p>
            <p>
              Originating from the Sanskrit word meaning &ldquo;unification&rdquo; or &ldquo;coming together,&rdquo; MILAN brings together young minds in a grand celebration of art, culture, and talent across multiple domains. Established in 2008, the festival has grown into a massive gathering that continues to inspire collaboration, expression, and community spirit year after year.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.4 }}
          >
             <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-8" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
