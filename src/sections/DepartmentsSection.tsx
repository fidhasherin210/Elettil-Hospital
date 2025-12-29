import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/supabaseClient";
import { Sparkles } from "lucide-react";

/* gradient auto cycle */
const gradients = [
  "from-[#FF5B47] to-[#FF7A6B]",
  "from-[#5B6B7C] to-[#4A5A6B]",
];

export const DepartmentsSection = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("id, name")
        .order("id");

      if (!error && data) {
        const formatted = data.map((dept, index) => ({
          ...dept,
          gradient: gradients[index % gradients.length],
        }));
        setDepartments(formatted);
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  const visibleDepartments = showAll
    ? departments
    : departments.slice(0, 4);

  return (
    <section id="departments" className="section-padding" ref={ref}>
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold uppercase text-xs md:text-sm">
              Our Specialties
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold">
            Medical <span className="text-gradient">Departments</span>
          </h2>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {visibleDepartments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group cursor-pointer"
              >
                {/* Card */}
                <div className="relative min-h-[90px] md:h-[120px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">

                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Text */}
                  <h3 className="relative z-10 font-semibold text-center text-sm md:text-lg leading-snug px-1 group-hover:text-white transition-colors duration-300">
                    {dept.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Button */}
        {departments.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 text-xs md:text-sm font-semibold border rounded-full"
            >
              {showAll ? "Show Less" : "View All Departments"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
