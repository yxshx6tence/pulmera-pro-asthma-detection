import React from 'react';
import { ArrowRight, Settings, Shield, Heart, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(to_right,_#1d4eba,_#282a8a)] text-white py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <Settings className="absolute top-10 left-10 w-16 h-16 animate-pulse" />
          <Settings className="absolute top-20 right-20 w-12 h-12 animate-pulse delay-1000" />
          <Settings className="absolute bottom-20 left-1/4 w-20 h-20 animate-pulse delay-500" />
          <Settings className="absolute bottom-10 right-10 w-14 h-14 animate-pulse delay-1500" />
          <Stethoscope className="absolute top-1/2 left-1/3 w-24 h-24 opacity-5" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative flex justify-center items-center mb-6">
            <Stethoscope className="w-24 h-24 mx-auto text-blue-400 mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Pulmera Pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Advanced AI-powered breath analysis technology to help detect potential respiratory concerns
          </p>
          {/* Replaced the button with a Link component */}
          <Link
            to="/result"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-flex items-center gap-2"
          >
            Start Breath Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How Pulmera Pro Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How Pulmera Pro Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced technology analyzes your breathing patterns to provide insights about your respiratory health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Breath Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI analyzes your breathing patterns, rate, and rhythm to detect potential respiratory concerns
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get immediate feedback with color-coded results and personalized recommendations for your respiratory health
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive expert tips and guidance on maintaining healthy breathing and when to consult healthcare professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At Team Pulmonova, we believe everyone deserves access to advanced respiratory health screening.
            Our goal is to make early detection of asthma and other respiratory conditions accessible to all,
            empowering individuals to take control of their breathing health and seek appropriate medical care when needed.
          </p>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 px-4 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-yellow-800">
            <strong>Medical Disclaimer:</strong> Pulmera Pro is an educational tool and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for any health concerns.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;