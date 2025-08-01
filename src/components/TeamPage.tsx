import React from 'react';
import { Rocket } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Dharshini I',
      role: '🌟 Founder & Research Head',
      initial: 'D',
      color: 'bg-purple-500',
      description: 'Leading the research and development of AI-powered respiratory analysis algorithms with a passion for healthcare innovation.'
    },
    {
      name: 'Charunethra H',
      role: '💻 Co-founder & Technology Director',
      initial: 'C',
      color: 'bg-blue-500',
      description: 'Architecting the technical infrastructure and user experience, bringing cutting-edge technology to healthcare accessibility.'
    },
    {
      name: 'Lavanya J A',
      role: '🌟 Mentor & Guide',
      initial: 'J A',
      color: 'bg-blue-500',
      description: `Working as a PGT Computer Science teacher at R.M.K. Patashaala
Guiding and mentoring students in AI and Web Development projects with a focus on practical learning and innovation.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-2xl font-bold">{member.initial}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-lg text-blue-600 mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">
                {member.description.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Built with Passion by R.M.K. Patashaala Students</h2>
          </div>
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
            We believe that age is just a number when it comes to innovation. Our mission is to 
            make healthcare technology more accessible and help people monitor their 
            respiratory health with the power of AI.
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Student Innovation</h4>
            <p className="text-gray-600">
              Proving that breakthrough healthcare solutions can come from young minds with big dreams.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">🤖</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h4>
            <p className="text-gray-600">
              Leveraging cutting-edge artificial intelligence to analyze respiratory patterns and sounds.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-3">❤️</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Focus</h4>
            <p className="text-gray-600">
              Dedicated to making respiratory health monitoring accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}