import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "43/A, Elettil Vattoli,Kizhakkoth,Koduvally 673572",
    color: "from-[#FF5B47] to-[#FF7A6B]",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "0495 2200101,0495 2200219 ,20,21,",
    color: "from-[#5B6B7C] to-[#4A5A6B]",
  },
  {
    icon: Mail,
    title: "Email",
    content: "elettilhospital@gmail.com",
    color: "from-[#FF5B47] to-[#FF7A6B]",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 24/7",
    color: "from-[#5B6B7C] to-[#4A5A6B]",
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ✅ UPDATED — WhatsApp integration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = "917593955550"; // country code included

    const whatsappMessage = `
New Enquiry 🏥

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Your message is ready to send.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
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
              Get In Touch
            </span>
            <Sparkles className="w-5 h-5 text-primary icon-pulse" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Contact <span className="text-gradient">Us</span>
          </h2>

          <p className="text-muted-foreground mt-4">
            Have questions or need to schedule an appointment? We're here to help
            you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground">
              Contact Information
            </h3>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border shadow-card cursor-pointer group"
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {info.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border space-y-6"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Send us a Message
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <Input
                name="phone"
                type="tel"
                placeholder="phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12"
              />

              <Textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="resize-none"
              />

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
