import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Building2, Users, Sparkles } from "lucide-react";
import ElettilHospital from "@/assets/hospital/elettil-hospital.jpeg";

const counters = [
{ icon: Award, value: 200, suffix: "k+", label: "Total Patients", color: "from-[#FF5B47] to-[#FF7A6B]" } ,
 { icon: Building2, value: 10, suffix: "+", label: "Departments", color:  "from-[#5B6B7C] to-[#4A5A6B]" },
  { icon: Users, value: 30, suffix: "+", label: "Expert Doctors", color:"from-[#FF5B47] to-[#FF7A6B]" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img
      src={ElettilHospital}
      alt="EH Hospital Building"
      className="w-full h-full object-cover"
    />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-2xl p-6 shadow-glow"
            >
              <motion.div 
                className="text-4xl font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                7+
              </motion.div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-primary icon-pulse" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  About Us
                </span>
                                <Sparkles className="w-5 h-5 text-primary icon-pulse" />

              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                About Our <span className="text-gradient">Hospital</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At EH Hospital, we are committed to providing exceptional healthcare 
                services with compassion and expertise. Our state-of-the-art facilities 
                combined with our team of highly skilled medical professionals ensure 
                that you receive the best possible care.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded over a decade ago, we have grown to become one of the region's 
                most trusted healthcare providers. Our mission is to deliver 
                patient-centered care that addresses not just the physical, but also 
                the emotional and psychological well-being of our patients.
              </p>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-2 pt-6">
              {counters.map((counter, index) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-card rounded-2xl p-2 text-center shadow-card border border-border group cursor-pointer"
                >
                  <motion.div 
                    className={`w-16 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${counter.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <counter.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-xl md:text-3xl font-bold text-primary">
                    <Counter value={counter.value} suffix={counter.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {counter.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


