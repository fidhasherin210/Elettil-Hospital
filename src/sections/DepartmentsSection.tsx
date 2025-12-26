import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Heart, Brain, Bone, Baby, Stethoscope, Eye, Ear, Ambulance, Sparkles,
  UserCheck, Bandage, ClipboardCheck, Hospital,ScanFace,User2, HeartPulse
} from "lucide-react";

const departments = [
  { name: "Gynaecology", icon: User2, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "Gastroenterology", icon: Stethoscope, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "Paediatrics", icon: Baby, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "Neurology", icon: Brain, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "Dermatology", icon: ScanFace, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "Ophthalmology", icon: Eye, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "Orthopedics", icon: Bone, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "ENT", icon: Ear, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "Psychology", icon: Brain, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "Paediatric Surgery", icon: Bandage, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "General Surgery", icon: Bandage, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "General Medicine", icon: Stethoscope, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
  { name: "Emergency Medicine", icon: Ambulance, gradient: "from-[#FF5B47] to-[#FF7A6B]" },
  { name: "Pulmonology", icon:  HeartPulse, gradient: "from-[#5B6B7C] to-[#4A5A6B]" },
];

export const DepartmentsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Show only first 4 departments unless showAll is true
  const visibleDepartments = showAll ? departments : departments.slice(0, 4);

  return (
    <section id="departments" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-primary icon-pulse" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Our Specialties
            </span>
            <Sparkles className="w-5 h-5 text-primary icon-pulse" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Medical <span className="text-gradient">Departments</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            We offer comprehensive medical services across various specialties,
            ensuring you receive the best care for all your health needs.
          </p>
        </motion.div>

        {/* Department Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleDepartments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border overflow-hidden relative h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <dept.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                </div>
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {departments.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-full hover:bg-primary/10 transition"
            >
              {showAll ? "Show Less" : "View All Departments"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};









