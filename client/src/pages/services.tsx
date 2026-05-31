import { useQuery } from "@tanstack/react-query";
import { Loader2, Briefcase, ArrowRight, Mail, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Service } from "@shared/schema";
import * as Icons from "lucide-react";
import { SEO } from "@/components/seo";
import { PageHeader } from "@/components/page-header";
import { Magnetic } from "@/components/motion-primitives";
import { pageKeywords } from "@/lib/seo-keywords";

const cardAccents = [
  { gradient: "from-blue-500/20 to-blue-700/5", icon: "text-blue-400", border: "border-blue-500/20", glow: "shadow-blue-500/10", bar: "from-blue-400 to-blue-600", tag: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { gradient: "from-violet-500/20 to-violet-700/5", icon: "text-violet-400", border: "border-violet-500/20", glow: "shadow-violet-500/10", bar: "from-violet-400 to-violet-600", tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { gradient: "from-cyan-500/20 to-cyan-700/5", icon: "text-cyan-400", border: "border-cyan-500/20", glow: "shadow-cyan-500/10", bar: "from-cyan-400 to-cyan-600", tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  { gradient: "from-emerald-500/20 to-emerald-700/5", icon: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/10", bar: "from-emerald-400 to-emerald-600", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { gradient: "from-orange-500/20 to-orange-700/5", icon: "text-orange-400", border: "border-orange-500/20", glow: "shadow-orange-500/10", bar: "from-orange-400 to-orange-600", tag: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { gradient: "from-pink-500/20 to-pink-700/5", icon: "text-pink-400", border: "border-pink-500/20", glow: "shadow-pink-500/10", bar: "from-pink-400 to-pink-600", tag: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
];

const serviceHighlights = ["Fast Delivery", "Professional Quality", "Ongoing Support", "Responsive Design"];

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Briefcase;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 sm:pb-24">
      <SEO
        title="Services — Web Design, Development & More"
        description="Professional web design, web development, logo design, software testing, and network support services by Kartik Sharma. Quality work, fast delivery, and ongoing support."
        keywords={pageKeywords.services}
        url="https://kartiksharma.site/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Kartik Sharma — Professional Services",
          "provider": {
            "@type": "Person",
            "name": "Kartik Sharma",
            "url": "https://kartiksharma.site"
          },
          "serviceType": ["Web Development", "Web Design", "Logo Design", "Software Testing", "Network Support"],
          "areaServed": "India",
          "url": "https://kartiksharma.site/services"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <PageHeader
          eyebrow="what_i_offer"
          eyebrowIcon={Briefcase}
          title="Services &"
          highlight="Expertise"
          description="Professional services to bring your ideas to life with quality and care."
        />

        {/* highlights */}
        <div className="flex flex-wrap justify-center gap-3 -mt-8 mb-16">
          {serviceHighlights.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/60 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {h}
            </motion.div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : services && services.length > 0 ? (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {services.map((service, idx) => {
                const Icon = getIcon(service.icon);
                const accent = cardAccents[idx % cardAccents.length];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    data-testid={`service-${service.id}`}
                    className="group relative"
                  >
                    {/* glow on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />

                    <div className={`relative h-full rounded-2xl border ${accent.border} bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg group-hover:shadow-xl group-hover:${accent.glow} transition-all duration-300`}>
                      {/* top gradient accent bar */}
                      <div className={`h-1 bg-gradient-to-r ${accent.bar}`} />

                      <div className="p-6">
                        {/* icon badge */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} border ${accent.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-7 w-7 ${accent.icon}`} />
                        </div>

                        {/* service number */}
                        <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border mb-3 ${accent.tag}`}>
                          <Zap className="h-3 w-3" />
                          Service {String(idx + 1).padStart(2, "0")}
                        </div>

                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-5">{service.description}</p>

                        <div className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent.icon} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                          Learn more <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-cyan-600/20" />
              <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"
              />

              <div className="relative p-10 sm:p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I'm available for freelance projects, internships, and collaboration opportunities.
                  Let's discuss how I can help with your next project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Magnetic strength={0.4}>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="shine bg-white text-black hover:bg-white/90 border-0 font-semibold px-8 h-12 rounded-full w-full sm:w-auto transition-all duration-300"
                        data-testid="button-get-started"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.4}>
                    <Link href="/projects">
                      <Button size="lg" variant="outline" className="border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 h-12 rounded-full px-8 w-full sm:w-auto">
                        View My Work
                      </Button>
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No services added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
