import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { supabase } from "@/supabaseClient";

// Local images imports
import jabiraImg from "@/assets/docters/dr.Jabira Habeeb.png";
import SalumolImg from "@/assets/docters/dr.Salumol S.png";
import BobithamolImage from "@/assets/docters/dr.Bobithamol.png";
import AlikunhiImg from "@/assets/docters/dr.Alikunhi.png";

// Local images map
const localImages: Record<string, any> = {
  "Dr. Jabira Habeeb": jabiraImg,
  "Dr. Salumol S": SalumolImg,
  "Dr. Bobithamol K B": BobithamolImage,
  "Dr. Alikunhi": AlikunhiImg,
};

export const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(4);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from Supabase
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        setDoctors(getLocalDoctorsData());
        return;
      }

      if (!data || data.length === 0) {
        setDoctors(getLocalDoctorsData());
      } else {
        // Ensure each doctor has a name
        const formatted = data.map((d) => ({
          ...d,
          name: d.name?.trim() || "Unknown Doctor",
        }));
        setDoctors(formatted);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setDoctors(getLocalDoctorsData());
    } finally {
      setLoading(false);
    }
  };

  // Fallback local data
  const getLocalDoctorsData = () => [
    { id: 1, name: "Dr. Jabira Habeeb", specialization: "Gynaecology", education: "MBBS, DNB (OBG)" },
    { id: 2, name: "Dr. Salumol S", specialization: "Gynaecology", education: "MBBS, DGO, DNB (OBG)" },
    { id: 3, name: "Dr. Bobithamol K B", specialization: "Gastroenterology", education: "MBBS, MD, DM" },
    { id: 4, name: "Dr. Alikunhi", specialization: "Paediatrics", education: "MBBS, DCH, MD" },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Responsive initial count
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) setInitialCount(4);
      else if (window.innerWidth >= 768) setInitialCount(3);
      else setInitialCount(2);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Get image for doctor (Supabase or local fallback)
  const getDoctorImage = (doctor) => {
    const name = doctor.name?.trim() || "Doctor";
    if (doctor.image && doctor.image.trim() !== "") return doctor.image;
    if (localImages[name]) return localImages[name];
    return `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(name)}`;
  };

  const doctorsToShow = showAll ? doctors : doctors.slice(0, initialCount);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading doctors...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-16 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Meet our doctors
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">
            World-Class <span className="text-gradient">Medical Experts</span>
          </h2>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctorsToShow.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-3xl shadow-lg overflow-hidden"
            >
              <img
                src={getDoctorImage(doctor)}
                alt={doctor.name || "Doctor"}
                className="w-full h-40 object-cover object-top rounded-2xl"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(
                    doctor.name || "Doctor"
                  )}`;
                }}
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{doctor.name || "Unknown Doctor"}</h3>
                <p className="text-primary text-sm">{doctor.specialization || "General"}</p>
                <p className="text-muted-foreground text-xs mt-1">{doctor.education || "Education info not available"}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less Button */}
        {doctors.length > initialCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 border border-primary text-primary rounded-full"
            >
              {showAll ? "Show Less" : `View All Doctors (${doctors.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;
