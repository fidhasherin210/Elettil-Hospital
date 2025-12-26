import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "@/assets/logo-EH.png"; 

// Import local images
import img1 from "@/assets/hospital/hospital-01.jpg";
import img2 from "@/assets/hospital/hospital-02.jpg";
import img3 from "@/assets/hospital/hospital-03.jpg";
import img4 from "@/assets/hospital/hospital-04.jpg";

// Slides with custom text for each image
const heroSlides = [
{
  img: img1,
  title: "Compassionate Care for Child",
  desc: "Gentle and specialised medical care for infants, children, and adolescents.",
},
{
  img: img2,
  title: "Complete Skin & Hair Care",
  desc: "Advanced and personalised treatment for all skin, hair, and nail conditions.",
},
{
  img: img3,
  title: "Advanced Eye & Vision Care",
  desc: "Complete eye checkups and expert treatment for all vision-related issues.",
},
{
  img: img4,
  title: "Expert General Surgical Care",
  desc: "Safe and modern surgical treatments focused on precision and faster recovery.",
},


];

export const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Slide image change effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Scroll
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Logo - visible only on this page */}
{/* <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
  <img
    src={logo}
    alt="Logo"
    className="w-28 pb-26 h-auto drop-shadow-lg"
  />
</div> */}

      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt="Hospital facility"
              className="w-full h-full object-cover"
            />

            {/* overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Dynamic Title + Description */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-[#c9ced3] leading-tight">
                {heroSlides[currentImage].title}
              </h1>

                <p className="text-base md:hidden text-[#c9ced3] max-w-xl">
  {heroSlides[currentImage].desc}
</p>
 
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="hero"
                onClick={() => scrollToSection("#contact")}
                className="bg-[#E84D3D] text-white hover:bg-[#E84D3D]/90 hover:shadow-[0_8px_32px_rgba(232,77,61,0.3)] transition-all duration-300 group px-4 py-2.5 text-sm font-medium rounded-lg"
              >
                <span className="relative">
                  Make Appointment
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </Button>

              <Button
                variant="hero-outline"
                onClick={() => scrollToSection("#departments")}
                className="bg-transparent backdrop-blur-sm border border-white text-white hover:bg-white/10 hover:border-[#E84D3D] hover:text-[#E84D3D] transition-all duration-300 group px-4 py-2.5 text-sm font-medium rounded-lg"
              >
                <span className="relative z-10">
                  View Departments
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#E84D3D] transition-all duration-300 group-hover:w-full" />
                </span>
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};


// CSS (Gradient Text + Simple Animation)
const styles = `
  .text-gradient-white {
    background: linear-gradient(to right, #ffffff, #e0f7fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
