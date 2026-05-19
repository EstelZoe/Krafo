import { useState } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import ToolkitNavbar from '../components/ToolkitNavbar';
import Footer from '../../../assets/components/Footer';

export default function AssessmentContact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our assessment toolkit or services? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
            {submitted && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mb-6 text-sm">
                Message sent! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Company</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Phone className="text-orange-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp</h4>
                  <a href="https://wa.me/233593196002" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                    (+233) 59-319-6002
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Mail className="text-orange-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:info@krafosystems.com" className="text-gray-400 hover:text-orange-500 transition">
                    info@krafosystems.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Calendar className="text-orange-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Schedule a Call</h4>
                  <a href="https://calendly.com/krafosystems" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                    Book on Calendly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="dark" termsLink="/assessment-toolkit/terms" privacyLink="/assessment-toolkit/privacy" />
    </div>
  );
}

