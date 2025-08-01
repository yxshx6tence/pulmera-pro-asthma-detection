import React from 'react';
import { Wind, AlertCircle, Thermometer, Flower, User } from 'lucide-react';

export default function LearnPage() {
  const symptoms = [
    { icon: Wind, text: 'Wheezing: High-pitched whistling sound', color: 'text-blue-600' },
    { icon: AlertCircle, text: 'Shortness of breath', color: 'text-orange-600' },
    { icon: Wind, text: 'Irregular breathing patterns', color: 'text-purple-600' },
    { icon: AlertCircle, text: 'Persistent cough', color: 'text-red-600' },
  ];

  const triggers = [
    { icon: AlertCircle, text: 'Smoke and pollution', color: 'text-red-600' },
    { icon: Thermometer, text: 'Cold air and weather changes', color: 'text-blue-600' },
    { icon: Flower, text: 'Allergens (pollen, dust mites)', color: 'text-green-600' },
    { icon: User, text: 'Physical exercise', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Understanding Asthma Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Asthma</h2>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            Asthma is a condition where the airways swell and become narrow, making it difficult to breathe. It 
            affects millions of people worldwide and can range from mild to severe. Pulmera Pro helps you detect 
            early signs by analyzing your breathing patterns and sounds.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Common Symptoms */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Symptoms</h3>
              <div className="space-y-3">
                {symptoms.map((symptom, index) => {
                  const Icon = symptom.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${symptom.color}`} />
                      </div>
                      <span className="text-gray-700">{symptom.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common Triggers */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Triggers</h3>
              <div className="space-y-3">
                {triggers.map((trigger, index) => {
                  const Icon = trigger.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${trigger.color}`} />
                      </div>
                      <span className="text-gray-700">{trigger.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* How Pulmera Pro Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Pulmera Pro Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Record</h3>
              <p className="text-gray-600">
                Capture your breathing or cough sounds using your device's microphone
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Analyze</h3>
              <p className="text-gray-600">
                AI algorithms analyze the audio patterns and frequencies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Feedback</h3>
              <p className="text-gray-600">
                Receive detailed insights and personalized recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-400 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Breathing Exercises</h4>
              <p className="text-gray-600 mb-4">
                Learn proper breathing techniques that can help manage asthma symptoms and improve lung function.
              </p>
              
            </div>
            
            <div className="border border-gray-400 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Trigger Management</h4>
              <p className="text-gray-600 mb-4">
                Discover strategies to identify and avoid common asthma triggers in your environment.
              </p>
              
            </div>
            
            <div className="border border-gray-400 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Emergency Action Plan</h4>
              <p className="text-gray-600 mb-4">
                Create a personalized action plan for managing asthma attacks and emergency situations.
              </p>
              
            </div>
            
            <div className="border border-gray-400 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Medication Guide</h4>
              <p className="text-gray-600 mb-4">
                Understand different types of asthma medications and how to use them effectively.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}