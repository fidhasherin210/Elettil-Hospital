import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { supabase } from "@/supabaseClient";

/* Local images */
import jabiraImg from "@/assets/docters/dr.Jabira Habeeb.png";
import SalumolImg from "@/assets/docters/dr.Salumol S.png";
import BobithamolImage from "@/assets/docters/dr.Bobithamol.png";
import AlikunhiImg from "@/assets/docters/dr.Alikunhi.png";

const localImages: Record<string, any> = {
  "Dr. Jabira Habeeb": jabiraImg,
  "Dr. Salumol S": SalumolImg,
  "Dr. Bobithamol K B": BobithamolImage,
  "Dr. Alikunhi": AlikunhiImg,
};

export const DoctorsSection = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(4);
  const [loading, setLoading] = useState(true);

  /* Fetch Doctors */
  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    const finalData =
      !error && data?.length
        ? data.map((d) => ({ ...d, name: d.name?.trim() || "Doctor" }))
        : getLocalDoctorsData();

    setDoctors(finalData);
    setFilteredDoctors(finalData);
    extractDepartments(finalData);
    setLoading(false);
  };

  /* Extract departments */
  const extractDepartments = (data: any[]) => {
    const set = new Set<string>(["All"]);
    data.forEach((d) => d.specialization && set.add(d.specialization));
    setDepartments(Array.from(set));
  };

  /* Filter */
  const filterByDepartment = (dept: string) => {
    setActiveDepartment(dept);
    setFilteredDoctors(
      dept === "All"
        ? doctors
        : doctors.filter((d) => d.specialization === dept)
    );
    setShowAll(false);
  };

  /* Fallback local doctors */
  const getLocalDoctorsData = () => [
    { id: 1, name: "Dr. Jabira Habeeb", specialization: "Gynaecology", education: "MBBS, DNB (OBG)" },
    { id: 2, name: "Dr. Salumol S", specialization: "Gynaecology", education: "MBBS, DGO, DNB (OBG)" },
    { id: 3, name: "Dr. Bobithamol K B", specialization: "Gastroenterology", education: "MBBS, MD, DM" },
    { id: 4, name: "Dr. Alikunhi", specialization: "Paediatrics", education: "MBBS, DCH, MD" },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* Responsive count */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setInitialCount(4);
      else if (window.innerWidth >= 768) setInitialCount(3);
      else setInitialCount(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Image resolver */
  const getDoctorImage = (doctor: any) => {
    if (doctor.image) return doctor.image;
    if (localImages[doctor.name]) return localImages[doctor.name];
    return `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(
      doctor.name
    )}`;
  };

  const doctorsToShow = showAll
    ? filteredDoctors
    : filteredDoctors.slice(0, initialCount);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto" />
        <p className="mt-3 text-sm">Loading doctors...</p>
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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold uppercase">
              Meet our doctors
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">
            World-Class <span className="text-gradient">Medical Experts</span>
          </h2>

          {/* Filter Bar */}
          {departments.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => filterByDepartment(dept)}
                  className={`px-4 py-1.5 rounded-full text-sm transition ${
                    activeDepartment === dept
                      ? "bg-primary text-white"
                      : "bg-white border hover:text-primary"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {doctorsToShow.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden"
            >
              {/* ✅ RESPONSIVE IMAGE HEIGHT */}
              <img
                src={getDoctorImage(doctor)}
                alt={doctor.name}
                className="w-full h-28 sm:h-32 md:h-40 object-cover object-top"
              />

              <div className="p-3 text-center">
                <h3 className="font-semibold text-sm md:text-base">
                  {doctor.name}
                </h3>
                <p className="text-primary text-xs md:text-sm">
                  {doctor.specialization}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {doctor.education}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {filteredDoctors.length > initialCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 border rounded-full text-primary hover:bg-primary hover:text-white transition"
            >
              {showAll ? "Show Less" : "View All Doctors"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;
