import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              <h3 className="text-white font-bold text-lg">CardioSense</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Advanced AI-powered cardiovascular disease risk assessment system using machine learning for early detection and prevention.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/predict" className="hover:text-blue-400 transition">Risk Assessment</Link></li>
              <li><Link to="/models" className="hover:text-blue-400 transition">ML Models</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About Project</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:text-blue-400 transition">FAQs</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-400 transition">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
              <li><a href="https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Kaggle Dataset</a></li>
              <li><a href="https://huggingface.co/mr-baraiya/cardio-disease-model" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">HuggingFace Model</a></li>
              <li><a href="https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/releases/tag/v1.0-model" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Model Release</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>baraiyavishalbhai32@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 7383359679</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              <p>© 2026 CardioSense. ML & DL Course Project.</p>
              <p className="mt-1">Vishal Baraiya | ML & Deep Learning Project</p>
            </div>
            <div className="flex gap-4">
              <a href="http://github.com/mr-baraiya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/baraiya-vishalbhai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
