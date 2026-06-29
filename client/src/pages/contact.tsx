import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Linkedin, Send, CheckCircle, Github, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { PageHeader } from "@/components/page-header";
import { SEO } from "@/components/seo";
import { pageKeywords } from "@/lib/seo-keywords";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<InsertContactMessage>({ resolver: zodResolver(insertContactMessageSchema), defaultValues: { name: "", email: "", message: "" } });
  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const formData = new FormData();
      formData.append("access_key", "88f8eebe-c010-43d4-b338-943c5bfa4fe5");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("subject", "Portfolio enquiry from " + data.name);
      formData.append("from_name", "Portfolio Contact Form");
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed");
      return result;
    },
    onSuccess: () => { setIsSubmitted(true); form.reset(); toast({ title: "Message Sent!", description: "I will get back to you within 24 hours." }); },
    onError: (error) => { toast({ title: "Error", description: error.message || "Something went wrong.", variant: "destructive" }); },
  });
  const onSubmit = (data: InsertContactMessage) => contactMutation.mutate(data);
  const contactInfo = [
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/kartik-sharma06", link: "https://linkedin.com/in/kartik-sharma06", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { icon: Github, label: "GitHub", value: "github.com/kartiksharma4448", link: "https://github.com/kartiksharma4448", color: "text-foreground", bg: "bg-muted", border: "border-border/50" },
    { icon: MapPin, label: "Location", value: "Jaipur, Rajasthan, India", link: null, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <SEO title="Contact Kartik Sharma" description="Get in touch for freelance projects, internships, and collaborations." keywords={pageKeywords.contact} url="https://kartiksharma.site/contact" schema={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Kartik Sharma", url: "https://kartiksharma.site/contact" }} />
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <PageHeader eyebrow="lets_connect" eyebrowIcon={MessageSquare} title="Get In" highlight="Touch" description="Have a project in mind or want to collaborate?" />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8">
          <motion.div className="space-y-5" variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={staggerItem}><h2 className="text-xl font-bold mb-5 flex items-center gap-2"><div className="w-1 h-6 bg-gradient-to-b from-primary to-chart-2 rounded-full" />Contact Information</h2></motion.div>
            <div className="space-y-3">
              {contactInfo.map((info, index) => { const Icon = info.icon; return (
                <motion.div key={index} variants={staggerItem}>
                  <Card className={`hover-elevate transition-all duration-300 hover:-translate-y-1 border ${info.border} overflow-hidden group`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}><Icon className={`h-5 w-5 ${info.color}`} /></div>
                      <div className="flex-1 min-w-0"><h3 className="font-semibold text-sm mb-0.5">{info.label}</h3>
                        {info.link ? (<a href={info.link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all">{info.value}</a>) : (<p className="text-sm text-muted-foreground">{info.value}</p>)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>); })}
            </div>
            <motion.div variants={staggerItem}><Card className="border-border/50 overflow-hidden"><div className="h-1 bg-gradient-to-r from-primary to-chart-2" /><CardContent className="p-6"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3"><Send className="h-5 w-5 text-primary" /></div><h3 className="font-semibold mb-2">Open to Opportunities</h3><p className="text-sm text-muted-foreground leading-relaxed">Currently seeking internship opportunities and freelance projects. Feel free to reach out!</p></CardContent></Card></motion.div>
            <motion.div variants={staggerItem}><div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20"><span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" /><p className="text-sm text-muted-foreground">Usually responds within <span className="text-green-400 font-medium">24 hours</span></p></div></motion.div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card className="border-border/50 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-chart-2" />
              <CardHeader><CardTitle className="text-2xl flex items-center gap-2"><Mail className="h-6 w-6 text-primary" />Send a Message</CardTitle></CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5"><CheckCircle className="h-10 w-10 text-green-400" /></div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Thank you for reaching out. I will get back to you soon.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">Send Another Message</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Tell me about your project..." className="min-h-36 resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" className="w-full shadow-lg shadow-primary/20" disabled={contactMutation.isPending}>
                        {contactMutation.isPending ? (<><Send className="h-4 w-4 mr-2 animate-pulse" />Sending...</>) : (<><Send className="h-4 w-4 mr-2" />Send Message</>)}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

