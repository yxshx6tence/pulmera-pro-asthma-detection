import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, BarChart3, Volume2, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreathingTestProps {
  onTestComplete: (results: any) => void;
  testType?: string;
}

export default function BreathingTest({ testType = '' }: BreathingTestProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasResults, setHasResults] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('stopped');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const getTestTypeInfo = () => {
    switch (testType) {
      case 'asthma':
        return { title: 'Asthma / Wheezing Test', description: 'Breathe normally and let us detect any wheezing or irregular patterns' };
      case 'cough':
        return { title: 'Cough / Cold Analysis', description: 'Cough naturally or breathe to analyze cold symptoms' };
      case 'sleep':
        return { title: 'Sleep Apnea Test', description: 'Simulate your sleep breathing or snoring patterns' };
      default:
        return { title: 'Normal Breathing Test', description: 'Breathe normally for overall respiratory health check' };
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

      // Set up recording
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setRecordingStatus('stopped');
      };
      
      mediaRecorderRef.current.start();
      
      setIsRecording(true);
      setRecordingStatus('recording');
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      // Stop all tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const pauseRecording = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setRecordingStatus('stopped');
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const analyzeAudio = () => {
    if (audioBlob) {
      setTimeout(() => {
        let mockResults = {
          breathingRate: Math.floor(Math.random() * 8) + 16,
          coughDetected: false,
          irregularPatterns: false,
          overallScore: Math.floor(Math.random() * 20) + 75,
          recommendations: [
            'Continue monitoring your breathing patterns',
            'Consider consulting with a healthcare provider',
            'Practice breathing exercises regularly'
          ]
        };
        
        // Customize results based on test type
        if (testType === 'asthma') {
          mockResults.irregularPatterns = Math.random() > 0.6;
          mockResults.overallScore = Math.floor(Math.random() * 25) + 65;
        } else if (testType === 'cough') {
          mockResults.coughDetected = Math.random() > 0.4;
          mockResults.overallScore = Math.floor(Math.random() * 30) + 60;
        }
        
        // Instead of setHasResults(true), navigate to /result with state
        navigate('/result', { state: { results: mockResults } });
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasResults) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Complete</h3>
        <p className="text-gray-600 mb-6">Your breathing test results are ready for review.</p>
        <button
          onClick={() => setHasResults(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Results
        </button>
      </div>
    );
  }

  const testInfo = getTestTypeInfo();

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{testInfo.title}</h2>
        <p className="text-gray-600">{testInfo.description}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Mic className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Record Your Audio Sample</h3>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Status: <span className={`font-medium ${recordingStatus === 'recording' ? 'text-red-600' : 'text-blue-600'}`}>
              {recordingStatus}
            </span>
          </p>
          
          <div className="flex justify-center space-x-4 mb-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <Square className="w-4 h-4" />
                <span>Stop Recording</span>
              </button>
            )}
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {audioBlob ? (
                <button
                  onClick={isPlaying ? pauseRecording : playRecording}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <span className="text-sm font-mono text-gray-700">{formatTime(recordingTime)}</span>
            </div>
            <Volume2 className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Audio Waveform */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-100" 
              style={{ width: isRecording ? `${Math.min(100, audioLevel * 100)}%` : '0%' }}
            ></div>
          </div>
        </div>

        {isRecording && (
          <div className="text-center mb-6">
            <div className="text-red-600 font-semibold mb-2">Recording in progress...</div>
            <p className="text-sm text-gray-600">Speak normally or follow the test instructions</p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={analyzeAudio}
            disabled={!audioBlob}
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              audioBlob 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analyze Audio</span>
          </button>
          
          <button
            onClick={clearRecording}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Recording
          </button>
        </div>
      </div>
    </div>
  );
}