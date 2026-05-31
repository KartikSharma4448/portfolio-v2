import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { SEO } from "@/components/seo";
import { pageKeywords } from "@/lib/seo-keywords";
import type { SocialLink } from "@shared/schema";
import type { IconType } from "react-icons";
import {
  SiGithub, SiLinkedin, SiX, SiInstagram,
  SiYoutube, SiDiscord, SiFacebook, SiWhatsapp, SiTelegram,
  SiReddit, SiMedium, SiDevdotto, SiStackoverflow, SiCodepen,
  SiHackerrank, SiLeetcode, SiSnapchat, SiPinterest,
  SiDribbble, SiBehance, SiKaggle, SiCodechef, SiGeeksforgeeks,
} from "react-icons/si";

interface PlatformMeta {
  Icon: IconType;
  color: string;
  bg: string;
}

const PLATFORM_MAP: Record<string, PlatformMeta> = {
  github:          { Icon: SiGithub,         color: "#ffffff",  bg: "bg-[#24292e]/20 border-[#24292e]/30" },
  linkedin:        { Icon: SiLinkedin,        color: "#0A66C2",  bg: "bg-[#0A66C2]/10 border-[#0A66C2]/20" },
  twitter:         { Icon: SiX,               color: "#1DA1F2",  bg: "bg-[#1DA1F2]/10 border-[#1DA1F2]/20" },
  x:               { Icon: SiX,              color: "#ffffff",  bg: "bg-white/5 border-white/15" },
  instagram:       { Icon: SiInstagram,       color: "#E4405F",  bg: "bg-[#E4405F]/10 border-[#E4405F]/20" },
  youtube:         { Icon: SiYoutube,         color: "#FF0000",  bg: "bg-[#FF0000]/10 border-[#FF0000]/20" },
  discord:         { Icon: SiDiscord,         color: "#5865F2",  bg: "bg-[#5865F2]/10 border-[#5865F2]/20" },
  facebook:        { Icon: SiFacebook,        color: "#1877F2",  bg: "bg-[#1877F2]/10 border-[#1877F2]/20" },
  whatsapp:        { Icon: SiWhatsapp,        color: "#25D366",  bg: "bg-[#25D366]/10 border-[#25D366]/20" },
  telegram:        { Icon: SiTelegram,        color: "#26A5E4",  bg: "bg-[#26A5E4]/10 border-[#26A5E4]/20" },
  reddit:          { Icon: SiReddit,          color: "#FF4500",  bg: "bg-[#FF4500]/10 border-[#FF4500]/20" },
  medium:          { Icon: SiMedium,          color: "#ffffff",  bg: "bg-white/5 border-white/15" },
  "dev.to":        { Icon: SiDevdotto,        color: "#ffffff",  bg: "bg-white/5 border-white/15" },
  devto:           { Icon: SiDevdotto,        color: "#ffffff",  bg: "bg-white/5 border-white/15" },
  stackoverflow:   { Icon: SiStackoverflow,   color: "#F58025",  bg: "bg-[#F58025]/10 border-[#F58025]/20" },
  codepen:         { Icon: SiCodepen,         color: "#ffffff",  bg: "bg-white/5 border-white/15" },
  hackerrank:      { Icon: SiHackerrank,      color: "#00EA64",  bg: "bg-[#00EA64]/10 border-[#00EA64]/20" },
  leetcode:        { Icon: SiLeetcode,        color: "#FFA116",  bg: "bg-[#FFA116]/10 border-[#FFA116]/20" },
  snapchat:        { Icon: SiSnapchat,        color: "#FFFC00",  bg: "bg-[#FFFC00]/10 border-[#FFFC00]/20" },
  pinterest:       { Icon: SiPinterest,       color: "#E60023",  bg: "bg-[#E60023]/10 border-[#E60023]/20" },
  dribbble:        { Icon: SiDribbble,        color: "#EA4C89",  bg: "bg-[#EA4C89]/10 border-[#EA4C89]/20" },
  behance:         { Icon: SiBehance,         color: "#1769FF",  bg: "bg-[#1769FF]/10 border-[#1769FF]/20" },
  kaggle:          { Icon: SiKaggle,          color: "#20BEFF",  bg: "bg-[#20BEFF]/10 border-[#20BEFF]/20" },
  codechef:        { Icon: SiCodechef,        color: "#5B4638",  bg: "bg-[#5B4638]/20 border-[#5B4638]/30" },
  geeksforgeeks:   { Icon: SiGeeksforgeeks,   color: "#2F8D46",  bg: "bg-[#2F8D46]/10 border-[#2F8D46]/20" },
};

function getPlatformMeta(platform: string): PlatformMeta | null {
  const key = platform.toLowerCase().replace(/\s+/g, "");
  return PLATFORM_MAP[key] || null;
}

export default function SocialLinks() {
  const { data: socialLinks, isLoading } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const sortedLinks = socialLinks?.sort(
    (a, b) => parseInt(a.order) - parseInt(b.order)
  );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-primary/5 via-background to-violet-600/5">
      <SEO
        title="Connect — Social Links"
        description="Connect with Kartik Sharma across LinkedIn, GitHub, Instagram and more. Full Stack Developer and founder of CodeUpPath from Jaipur, India."
        keywords={pageKeywords.social}
        url="https://kartiksharma.site/social-links"
      />
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">

        {/* Profile Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              {/* spinning ring */}
              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 opacity-80 blur-[2px] animate-spin-slow" />
              <img
                src="/profile.png"
                alt="Kartik Sharma"
                className="relative w-24 h-24 rounded-full object-cover shadow-xl border-2 border-background"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/favicon.png"; }}
              />
            </div>
          </motion.div>
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Kartik Sharma</h1>
          <p className="text-base text-muted-foreground mb-1">
            BCA Student · Full Stack Developer
          </p>
          <p className="text-sm text-muted-foreground">
            Jaipur, Rajasthan, India
          </p>
        </motion.div>

        {/* Social Links */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedLinks && sortedLinks.length > 0 ? (
          <motion.div
            className="space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {sortedLinks.map((link) => {
              const meta = getPlatformMeta(link.platform);
              const BrandIcon = meta?.Icon;

              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  variants={staggerItem}
                  whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.15 } }}
                >
                  <Card className="group cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                    {/* thin gradient top line */}
                    <div
                      className="h-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background: meta
                          ? `linear-gradient(to right, ${meta.color}88, ${meta.color}22)`
                          : "var(--primary)",
                      }}
                    />
                    <CardContent className="p-5 flex items-center gap-4">
                      {/* Brand icon container */}
                      <motion.div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${meta ? meta.bg : "bg-primary/10 border-primary/20"}`}
                        whileHover={{ rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {BrandIcon ? (
                          <BrandIcon
                            className="w-6 h-6"
                            style={{ color: meta!.color }}
                          />
                        ) : (
                          <Share2 className="w-6 h-6 text-primary" />
                        )}
                      </motion.div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base leading-tight">{link.platform}</h3>
                        {link.handle && (
                          <p className="text-sm text-muted-foreground truncate mt-0.5">{link.handle}</p>
                        )}
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.a>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No social links added yet.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Based in Jaipur, Rajasthan, India
          </p>
        </div>
      </div>
    </div>
  );
}
