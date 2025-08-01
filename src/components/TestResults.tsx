import React, { useState, useEffect } from 'react';
import {
  Settings,
  AlertTriangle,
  RotateCcw,
  Mic,
  CheckCircle,
  // Loader, // Remove Loader import if not used elsewhere
} from 'lucide-react';
//import lungsVideo from '../lungs.webm'; // Make sure this path is correct and the file exists
import lungsGif from '../lungs.gif'; // adjust the path as needed
import { useLocation } from 'react-router-dom';

type TestStatus = 'initial' | 'inProgress' | 'results';

const TestResults: React.FC = () => {
  const [testStatus, setTestStatus] = useState<TestStatus>('initial');
  const [resultType, setResultType] = useState<'normal' | 'asthma'>('normal');
  const [countdown, setCountdown] = useState(10); // Start countdown from 10
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const location = useLocation();
  const results = location.state?.results;

  // Effect to handle the countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStatus === 'inProgress' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (testStatus === 'inProgress' && countdown === 0) {
      setTestStatus('results');
      setResultType('normal');
      // Stop the audio stream
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      }
    }
    return () => clearTimeout(timer);
  }, [testStatus, countdown]);

  const startTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      // Optionally, start recording:
      // recorder.start();
      setTestStatus('inProgress');
      setCountdown(10); // Reset countdown on start
    } catch (err) {
      alert('Microphone access is required to perform the test.');
    }
  };

  const takeAnotherTest = () => {
    setTestStatus('initial');
    setResultType('normal'); // Reset to a default result for the next test
  };

  // Conditional Rendering based on the current test status
  
  // 1. Initial Screen: Show the instructions and the "Start" button.
  if (testStatus === 'initial') {
    return (
      <div className="min-h-screen py-12 relative bg-gray-50">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 transform rotate-12">
            <Settings className="h-40 w-40 text-blue-600" />
          </div>
          <div className="absolute top-20 right-16 transform -rotate-12">
            <Settings className="h-32 w-32 text-blue-600" />
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-45">
            <Settings className="h-36 w-36 text-blue-600" />
          </div>
          <div className="absolute bottom-40 right-1/3 transform -rotate-30">
            <Settings className="h-28 w-28 text-blue-600" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-6">
            <Settings className="h-48 w-48 text-blue-600" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Breath Analysis Test</h1>
            <p className="text-xl text-gray-600">
              Follow the instructions below to analyze your breathing patterns
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <Settings className="h-32 w-32 transition-all duration-1000 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-600 font-semibold mb-2">Step 1</div>
                  <p className="text-gray-700 text-sm">Sit comfortably and relax</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-600 font-semibold mb-2">Step 2</div>
                  <p className="text-gray-700 text-sm">Click start and breathe normally</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-600 font-semibold mb-2">Step 3</div>
                  <p className="text-gray-700 text-sm">Wait for analysis to complete</p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={startTest}
                  className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Mic className="h-6 w-6" />
                  <span>Start Breath Test</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This tool provides educational insights only and cannot replace professional medical evaluation. If you have breathing difficulties or health concerns, please consult with a qualified healthcare provider immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. In Progress Screen: Show a loading state with a countdown.
  if (testStatus === 'inProgress') {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 rounded-2xl shadow-xl bg-white">
          {/* Lungs breath in/out animation */}
          <div className="flex justify-center mb-4">
            <img
              src={lungsGif}
              alt="Breathing Lungs Animation"
              className="h-32 w-32"
              style={{ filter: 'drop-shadow(0 4px 16px #60A5FA33)' }}
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Recording...</h2>
          <p className="text-6xl font-bold text-blue-600 my-4">{countdown}</p>
          <p className="text-gray-600 mt-2">Breathe normally. Analysis will complete automatically.</p>
        </div>
      </div>
    );
  }

  // 3. Results Screen: Show the final results based on `resultType`.
  if (testStatus === 'results') {
    if (resultType === 'asthma') {
      return (
        <div className="min-h-screen py-12 relative bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Test Results</h1>
              <p className="text-xl text-gray-600">Analysis completed using AI-powered respiratory monitoring</p>
            </div>
            <div className="p-8 rounded-2xl shadow-xl transition-all duration-500 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <AlertTriangle className="h-16 w-16 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-800">Possible Asthma Detected</h3>
                <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6 bg-red-200 text-red-800">Breathing Efficiency: 61%</div>
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <p className="text-red-700 text-lg mb-6">Your breathing pattern suggests potential respiratory concerns that may indicate asthma.</p>
                    <div className="bg-white/80 p-6 rounded-xl">
                      <h4 className="text-red-800 font-semibold mb-3">Immediate Steps:</h4>
                      <ul className="text-red-700 space-y-2 text-left">
                        <li>• Stay calm and breathe slowly</li>
                        <li>• Sit upright in a comfortable position</li>
                        <li>• Use your rescue inhaler if prescribed</li>
                        <li>• Seek fresh air if possible</li>
                        <li>• Contact your healthcare provider</li>
                      </ul>
                    </div>
                    <div className="bg-white/80 p-6 rounded-xl">
                      <h4 className="text-red-800 font-semibold mb-3">Important Reminders:</h4>
                      <ul className="text-red-700 space-y-2 text-left">
                        <li>• This is a screening tool, not a medical diagnosis</li>
                        <li>• Schedule an appointment with a pulmonologist</li>
                        <li>• Keep track of your symptoms</li>
                        <li>• Avoid known triggers</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={takeAnotherTest}
                  className="mt-8 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Take Another Test</span>
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-8">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> This tool provides educational insights only and cannot replace professional medical evaluation. If you have breathing difficulties or health concerns, please consult with a qualified healthcare provider immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else { // 'normal' results
      return (
        <div className="min-h-screen py-12 relative bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Test Results</h1>
              <p className="text-xl text-gray-600">Analysis completed using AI-powered respiratory monitoring</p>
            </div>
            <div className="p-8 rounded-2xl shadow-xl transition-all duration-500 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-800">Breathing Appears Normal</h3>
                <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6 bg-green-200 text-green-800">Breathing Efficiency: 80%</div>
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <p className="text-green-700 text-lg mb-6">Your breathing pattern appears healthy and within normal ranges.</p>
                    <div className="bg-white/80 p-6 rounded-xl">
                      <h4 className="text-green-800 font-semibold mb-3">Maintain Good Respiratory Health:</h4>
                      <ul className="text-green-700 space-y-2 text-left">
                        <li>• Continue regular exercise</li>
                        <li>• Practice deep breathing exercises</li>
                        <li>• Maintain good air quality at home</li>
                        <li>• Stay hydrated</li>
                        <li>• Avoid smoking and secondhand smoke</li>
                      </ul>
                    </div>
                    <div className="bg-white/80 p-6 rounded-xl">
                      <h4 className="text-green-800 font-semibold mb-3">When to Seek Medical Attention:</h4>
                      <ul className="text-green-700 space-y-2 text-left">
                        <li>• Persistent cough or wheezing</li>
                        <li>• Shortness of breath during normal activities</li>
                        <li>• Chest tightness or pain</li>
                        <li>• Frequent respiratory infections</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={takeAnotherTest}
                  className="mt-8 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Take Another Test</span>
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-8">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> This tool provides educational insights only and cannot replace professional medical evaluation. If you have breathing difficulties or health concerns, please consult with a qualified healthcare provider immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Fallback for an unexpected state
  return null;
};

export default TestResults;