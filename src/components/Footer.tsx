import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8" />
              <span className="text-2xl font-bold">CareerCompass</span>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              Empowering students to make informed career decisions. Your trusted partner in shaping your future.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Mail className="w-4 h-4" />
                <span>support@careercompass.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Phone className="w-4 h-4" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Career Paths
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm text-background/60">
          <p>© {currentYear} CareerCompass. All rights reserved by SLRTCE Students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
