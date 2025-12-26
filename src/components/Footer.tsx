import { Facebook, Instagram, Heart } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Doctors", href: "#doctors" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/elettilhospital/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/elettil_hospital_?igsh=NDcxYmgxZXFjYXJn", label: "Instagram" },

];

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#6d7781]  text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EH Hospital Logo" className="h-16 w-auto brightness-0 invert" />
              
            </div>
            <p className="text-primary-foreground/70 max-w-md">
              Providing exceptional healthcare services with compassion and 
              expertise. Your health is our priority, 24 hours a day, 7 days a week.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-primary-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>Elettil Vattoli,Kizhakkoth</li>
              <li>Koduvally,673572</li>
              <li className="pt-2">0495 2200101 ,0495 2200219</li>
              <li>elettilhospital@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>
  &copy; {new Date().getFullYear()} Designed and developed by{" "}
  <a
    href="https://share.google/kG9i46KNtSIhMD8xr"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#E84D3D]  hover:underline hover:text-[#e3e1e1] transition-colors"
  >
    Aione Spark TechHive LLP
  </a>{" "}

</p>
        </div>
      </div>
    </footer>
  );
};
