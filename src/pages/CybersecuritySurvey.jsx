import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';

// Add CSS animation for binary rain
const binaryRainStyle = `
  @keyframes fall {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
`;

// Inject the style
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = binaryRainStyle;
  document.head.appendChild(styleSheet);
}

// Move all component functions OUTSIDE to prevent re-creation on every render
const ScaleQuestion = ({ id, question, labels, onChange }) => (
  <div className="mb-8">
    <p className="font-semibold mb-4 text-gray-200 text-lg">{question}</p>
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-400 w-28 font-medium">{labels[0]}</span>
      <div className="flex gap-4 flex-1 justify-center">
        {[1, 2, 3, 4, 5].map(num => (
          <label key={num} className="flex flex-col items-center cursor-pointer group">
            <input
              type="radio"
              name={id}
              value={num}
              onChange={(e) => onChange(id, e.target.value)}
              className="mb-2 accent-orange-500 scale-125"
            />
            <span className="text-sm text-gray-300 font-semibold group-hover:text-orange-400 transition-colors">{num}</span>
          </label>
        ))}
      </div>
      <span className="text-sm text-gray-400 w-28 text-right font-medium">{labels[1]}</span>
    </div>
  </div>
);

const DifficultyQuestion = ({ id, question, onChange }) => (
  <div className="mb-8">
    <p className="font-semibold mb-4 text-gray-200 text-lg">{question}</p>
    <div className="flex gap-6">
      {['Easy', 'Moderate', 'Hard'].map(level => (
        <label key={level} className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name={id}
            value={level}
            onChange={(e) => onChange(id, e.target.value)}
            className="mr-3 accent-orange-500 scale-125"
          />
          <span className="text-gray-300 font-medium group-hover:text-orange-400 transition-colors">{level}</span>
        </label>
      ))}
    </div>
  </div>
);

const TextQuestion = ({ id, question, placeholder, rows = 4, onChange }) => (
  <div className="mb-8">
    <p className="font-semibold mb-4 text-gray-200 text-lg">{question}</p>
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full p-4 bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-gray-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg resize-none"
    />
  </div>
);

const MultipleChoice = ({ id, question, options, allowMultiple = false, onChange, responses }) => {
  const handleMultipleChange = useCallback((option) => {
    const currentValues = responses[id] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(v => v !== option)
      : [...currentValues, option];
    onChange(id, newValues);
  }, [id, responses, onChange]);

  return (
    <div className="mb-8">
      <p className="font-semibold mb-4 text-gray-200 text-lg">
        {question}
        {allowMultiple && <span className="text-sm text-orange-400 ml-2 font-medium">(Select all that apply)</span>}
      </p>
      <div className="space-y-3">
        {options.map(option => (
          <label key={option} className="flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-transparent p-3 rounded-lg transition-all duration-300 group">
            <input
              type={allowMultiple ? "checkbox" : "radio"}
              name={id}
              value={option}
              checked={allowMultiple ? (responses[id] || []).includes(option) : responses[id] === option}
              onChange={(e) => allowMultiple ? handleMultipleChange(option) : onChange(id, e.target.value)}
              className="mr-4 accent-orange-500 scale-125"
            />
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Section = ({ title, name, children, expanded, onToggle }) => (
  <div className="mb-8 border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-800/50 backdrop-blur-sm shadow-2xl">
    <button
      onClick={() => onToggle(name)}
      className="w-full bg-gradient-to-r from-orange-600/20 via-orange-500/15 to-orange-600/20 border-b border-orange-500/20 px-8 py-6 flex justify-between items-center hover:from-orange-600/30 hover:via-orange-500/25 hover:to-orange-600/30 transition-all duration-300 text-white group"
    >
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {expanded ? (
          <ChevronUp className="text-orange-400 group-hover:text-orange-300 transition-colors" />
        ) : (
          <ChevronDown className="text-orange-400 group-hover:text-orange-300 transition-colors" />
        )}
      </div>
    </button>
    {expanded && (
      <div className="p-8 bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-gray-800/60 backdrop-blur-sm">
        {children}
      </div>
    )}
  </div>
);

const CybersecuritySurvey = () => {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    demographics: true,
    preCourse: false,
    experience: false,
    career: false,
    postCourse: false,
    future: false
  });

  // Google Apps Script Web App URL for storing responses
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLtsFG3hCJHjhCBky7VsqKhub8p3V0n-FyUA55c7WJWljMAOVWRnBhtddKEMGm2Giobw/exec';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...responses
        })
      });

      setSubmitStatus('success');
      alert('Survey submitted successfully! Thank you for your feedback.');
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      alert('There was an error submitting your survey. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleChange = useCallback((questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white">
      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base layer */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle cyber grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(242, 96, 11, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(242, 96, 11, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/10 via-transparent to-gray-900/10"></div>
        
        {/* Subtle binary rain with lower opacity */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/3 font-mono text-lg tracking-widest"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall ${20 + Math.random() * 30}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            {[...Array(40)].map((_, j) => Math.floor(Math.random() * 2)).join('')}
          </div>
        ))}
        
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-white/10 bg-black via-black-900/60 to-transparent backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#F2600B] to-transparent rounded-full"></div>
            <div className="absolute -top-4 left-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute -top-4 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              Cybersecurity Course Survey
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Your insights help us build a stronger cybersecurity community in Africa. 
              Share your experience to shape the future of digital defense education.
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/15 to-orange-500/10 border border-orange-500/30 rounded-xl backdrop-blur-sm shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Lock className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-orange-300 font-semibold">All responses are encrypted & confidential</span>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">Survey Progress</span>
                <span className="text-white font-bold">
                  {Object.keys(responses).length} / 50 questions
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                  style={{ width: `${(Object.keys(responses).length / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Content */}
      <div className="relative max-w-4xl mx-auto p-6">
        <Section title="Section 1: Demographics & Background" name="demographics" expanded={expandedSections.demographics} onToggle={toggleSection}>
          <MultipleChoice
            id="q1"
            question="1. What is your current location?"
            options={[
              'Within Africa (please specify country in comments)',
              'Outside Africa - North America',
              'Outside Africa - Europe',
              'Outside Africa - Asia',
              'Outside Africa - Other'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <MultipleChoice
            id="q2"
            question="2. What is your age group?"
            options={[
              '18-22 (Recent high school graduate)',
              '23-29 (Early career)',
              '30-39 (Mid-career)',
              '40-49 (Senior professional)',
              '50+ (Experienced professional)'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <MultipleChoice
            id="q3"
            question="3. What is your highest level of education?"
            options={[
              'High School Diploma/Secondary Education',
              'Some University/College',
              'Bachelor\'s Degree',
              'Master\'s Degree',
              'Doctorate/PhD',
              'Other professional certifications'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <MultipleChoice
            id="q4"
            question="4. What was your employment status before enrolling in this course?"
            options={[
              'Student (full-time)',
              'Unemployed/Job seeking',
              'Employed (non-tech field)',
              'Employed (tech field, non-cybersecurity)',
              'Employed (cybersecurity field)',
              'Self-employed/Entrepreneur'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q5"
            question="5. What motivated you to pursue cybersecurity education? Share your story."
            placeholder="Tell us what inspired you to enter this field..."
            onChange={handleChange}
          />
        </Section>

        <Section title="Section 2: Pre-Course Expectations & Knowledge" name="preCourse" expanded={expandedSections.preCourse} onToggle={toggleSection}>
          <ScaleQuestion
            id="q6"
            question="6. Before starting this course, how would you rate your knowledge of cybersecurity?"
            labels={['No knowledge', 'Expert level']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q7"
            question="7. What were your biggest concerns or challenges before starting the course?"
            placeholder="e.g., cost, time commitment, technical background, internet connectivity..."
            onChange={handleChange}
          />

          <MultipleChoice
            id="q8"
            question="8. How did you first hear about our cybersecurity course? (Select all that apply)"
            options={[
              'Social media (Facebook, Twitter, LinkedIn, Instagram)',
              'Friend/Family recommendation',
              'Online search',
              'University/School',
              'Professional network',
              'Advertisement',
              'Other'
            ]}
            allowMultiple={true}
            onChange={handleChange}
            responses={responses}
          />

          <ScaleQuestion
            id="q9"
            question="9. How confident were you in your ability to succeed in cybersecurity before the course?"
            labels={['Not confident', 'Very confident']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q10"
            question="10. What specific skills or knowledge did you hope to gain from this course?"
            placeholder="List the specific outcomes you were looking for..."
            onChange={handleChange}
          />
        </Section>

        <Section title="Section 3: Course Experience" name="experience" expanded={expandedSections.experience} onToggle={toggleSection}>
          <DifficultyQuestion
            id="q11"
            question="11. How would you rate the overall difficulty level of the course content?"
            onChange={handleChange}
          />

          <DifficultyQuestion
            id="q12"
            question="12. How difficult were the practical labs and hands-on exercises?"
            onChange={handleChange}
          />

          <DifficultyQuestion
            id="q13"
            question="13. How challenging were the theoretical/conceptual aspects of the course?"
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q14"
            question="14. How well did the course pace match your learning speed?"
            labels={['Too slow', 'Too fast']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q15"
            question="15. How relevant was the course content to real-world cybersecurity challenges in Africa?"
            labels={['Not relevant', 'Very relevant']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q16"
            question="16. How accessible were the instructors when you needed help?"
            labels={['Not accessible', 'Very accessible']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q17"
            question="17. How effective were the teaching methods used (videos, readings, labs, etc.)?"
            labels={['Not effective', 'Very effective']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q18"
            question="18. What aspect of the course did you find most valuable? Why?"
            placeholder="Share what really made a difference for you..."
            onChange={handleChange}
          />

          <TextQuestion
            id="q19"
            question="19. What challenges did you face during the course (technical, time, resources, connectivity)?"
            placeholder="Help us understand the obstacles you encountered..."
            onChange={handleChange}
          />

          <MultipleChoice
            id="q20"
            question="20. What type of learner do you consider yourself to be? (Select what resonates most)"
            options={[
              'Visual learner (diagrams, videos, demonstrations)',
              'Auditory learner (lectures, discussions, podcasts)',
              'Kinesthetic/Hands-on learner (labs, practice, doing)',
              'Reading/Writing learner (documentation, articles, notes)',
              'Mixed/Combination of styles'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <ScaleQuestion
            id="q21"
            question="21. How effective were video lectures/demonstrations for your learning?"
            labels={['Not effective', 'Very effective']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q22"
            question="22. How effective were hands-on labs and practical exercises for your learning?"
            labels={['Not effective', 'Very effective']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q23"
            question="23. How effective were reading materials (documentation, articles, textbooks) for your learning?"
            labels={['Not effective', 'Very effective']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q24"
            question="24. How much did you enjoy working on assignments independently (on your own)?"
            labels={['Did not enjoy', 'Enjoyed greatly']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q25"
            question="25. How much did you enjoy group projects and collaborative learning with other students?"
            labels={['Did not enjoy', 'Enjoyed greatly']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q26"
            question="26. How useful were multiple-choice quizzes for reinforcing your learning?"
            labels={['Not useful', 'Very useful']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q27"
            question="27. How useful were practical projects/assignments for reinforcing your learning?"
            labels={['Not useful', 'Very useful']}
            onChange={handleChange}
          />

          <MultipleChoice
            id="q28"
            question="28. What learning format did you prefer most in this course?"
            options={[
              'Self-paced individual learning',
              'Live instructor-led sessions',
              'Group discussions and peer learning',
              'One-on-one mentoring/tutoring',
              'Mix of all formats'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q29"
            question="29. If you could change one thing about the course structure or delivery, what would it be?"
            placeholder="Be specific about what could be improved..."
            onChange={handleChange}
          />
        </Section>

        <Section title="Section 4: Career Goals & Aspirations" name="career" expanded={expandedSections.career} onToggle={toggleSection}>
          <MultipleChoice
            id="q30"
            question="30. What is your primary career goal in cybersecurity?"
            options={[
              'Security Analyst/SOC Analyst',
              'Penetration Tester/Ethical Hacker',
              'Security Engineer/Architect',
              'Cybersecurity Consultant',
              'Governance, Risk & Compliance (GRC) Specialist',
              'Incident Response Specialist',
              'Security Researcher',
              'Threat Intelligence Analyst',
              'Security Operations Manager',
              'Cloud Security Specialist',
              'Application Security Engineer',
              'Network Security Engineer',
              'Security Auditor',
              'Forensics Analyst',
              'Start my own cybersecurity business',
              'Other (please specify below)'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q30a"
            question="If you selected 'Other' above, please specify your career goal:"
            placeholder="Describe your specific cybersecurity career goal..."
            rows={2}
            onChange={handleChange}
          />

          <div className="mb-8 p-6 bg-gradient-to-r from-orange-900/20 via-orange-800/15 to-orange-900/20 border border-orange-500/30 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
              <p className="text-sm text-orange-200 leading-relaxed">
                <strong className="text-orange-300 font-semibold">Note:</strong> A Governance, Risk & Compliance (GRC) Specialist helps organizations manage cybersecurity policies, assess risks, and ensure compliance with regulations and standards (like GDPR, ISO 27001, HIPAA). They bridge the gap between technical security and business requirements.
              </p>
            </div>
          </div>

          <MultipleChoice
            id="q30b"
            question="30b. What motivates you to pursue a career in cybersecurity? (Select all that apply)"
            options={[
              'Financial opportunities/Good salary potential',
              'Job security and career stability',
              'Personal growth and continuous learning',
              'Gaining valuable technical experience',
              'Passion for technology and problem-solving',
              'Making a positive impact/Protecting people and organizations',
              'High demand for cybersecurity professionals',
              'Flexibility (remote work opportunities)',
              'Contributing to national/African digital security',
              'Challenge and intellectual stimulation',
              'Career advancement opportunities',
              'Entrepreneurship/Starting my own business',
              'Other'
            ]}
            allowMultiple={true}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q30c"
            question="30c. Tell us more about what drives your passion for cybersecurity:"
            placeholder="Share your personal story and motivations..."
            rows={3}
            onChange={handleChange}
          />

          <MultipleChoice
            id="q31"
            question="31. Where do you hope to work in the next 2-3 years?"
            options={[
              'In my home country in Africa',
              'In another African country',
              'Outside Africa (international company)',
              'Remote work for international company while in Africa',
              'Self-employed/Freelance',
              'Undecided'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <ScaleQuestion
            id="q32"
            question="32. How important is international certification (CompTIA, CEH, CISSP, etc.) to your career goals?"
            labels={['Not important', 'Essential']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q33"
            question="33. What does career success in cybersecurity look like to you personally?"
            placeholder="Describe your vision of success..."
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q34"
            question="34. How confident do you feel about achieving your cybersecurity career goals after this course?"
            labels={['Not confident', 'Very confident']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q35"
            question="35. What specific support or resources would help you achieve your career goals?"
            placeholder="e.g., mentorship, job placement, networking, certifications..."
            onChange={handleChange}
          />
        </Section>

        <Section title="Section 5: Post-Course Impact & Outcomes" name="postCourse" expanded={expandedSections.postCourse} onToggle={toggleSection}>
          <ScaleQuestion
            id="q36"
            question="36. How much has your cybersecurity knowledge improved since starting the course?"
            labels={['No improvement', 'Significant improvement']}
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q37"
            question="37. How likely are you to recommend this course to other Africans interested in cybersecurity?"
            labels={['Not likely', 'Very likely']}
            onChange={handleChange}
          />

          <MultipleChoice
            id="q38"
            question="38. Have you experienced any career changes or opportunities as a result of this course?"
            options={[
              'Yes, I got a new job in cybersecurity',
              'Yes, I got a promotion',
              'Yes, I started freelancing/consulting',
              'I have interviews/opportunities lined up',
              'Not yet, but I feel more prepared',
              'No change yet'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q39"
            question="39. Share a specific way this course has impacted your life or career path."
            placeholder="Tell us your success story or how your perspective has changed..."
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q40"
            question="40. How well has this course prepared you for entry-level cybersecurity positions?"
            labels={['Not prepared', 'Fully prepared']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q41"
            question="41. What additional skills or topics do you wish had been covered in the course?"
            placeholder="List any gaps you've identified..."
            onChange={handleChange}
          />
        </Section>

        <Section title="Section 6: Future & Community" name="future" expanded={expandedSections.future} onToggle={toggleSection}>
          <ScaleQuestion
            id="q42"
            question="42. How important is it to have a community of African cybersecurity professionals for networking and support?"
            labels={['Not important', 'Very important']}
            onChange={handleChange}
          />

          <MultipleChoice
            id="q43"
            question="43. What additional services would be most valuable to you? (Select all that apply)"
            options={[
              'Job placement assistance',
              'Mentorship program',
              'Advanced specialized courses',
              'Certification exam preparation',
              'Entrepreneurship/business training',
              'Internship opportunities',
              'Career counseling',
              'Technical interview preparation'
            ]}
            allowMultiple={true}
            onChange={handleChange}
            responses={responses}
          />

          <ScaleQuestion
            id="q44"
            question="44. How interested are you in taking additional cybersecurity courses with us?"
            labels={['Not interested', 'Very interested']}
            onChange={handleChange}
          />

          <MultipleChoice
            id="q45"
            question="45. What delivery format would you prefer for future cybersecurity courses?"
            options={[
              'Fully online (self-paced)',
              'Fully online (scheduled with live instructor)',
              'Hybrid (combination of online and in-person)',
              'Fully in-person (classroom/bootcamp)',
              'Flexible - mix based on topic'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <MultipleChoice
            id="q46"
            question="46. What learning format would you prefer for future courses?"
            options={[
              'Fully online self-paced',
              'Online with live sessions',
              'Hybrid (online + in-person)',
              'In-person intensive bootcamp',
              'Weekend/evening classes',
              'Flexible combination'
            ]}
            onChange={handleChange}
            responses={responses}
          />

          <TextQuestion
            id="q47"
            question="47. What challenges unique to Africa do you think cybersecurity education should address?"
            placeholder="e.g., infrastructure, costs, recognition, local vs international standards..."
            onChange={handleChange}
          />

          <ScaleQuestion
            id="q48"
            question="48. How affordable was this course for your financial situation?"
            labels={['Not affordable', 'Very affordable']}
            onChange={handleChange}
          />

          <TextQuestion
            id="q49"
            question="49. If you could give advice to someone in Africa considering cybersecurity as a career, what would you say?"
            placeholder="Share your wisdom with future students..."
            onChange={handleChange}
          />

          <TextQuestion
            id="q50"
            question="50. Any final thoughts, suggestions, or feedback you'd like to share with us?"
            placeholder="This is your space to tell us anything else on your mind..."
            rows={5}
            onChange={handleChange}
          />
        </Section>

        {/* Submit Section */}
        <div className="bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-gray-800/60 border border-white/10 rounded-2xl shadow-2xl p-10 mt-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 rounded-full mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-semibold">Ready to Submit</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Complete Your Survey</h3>
            <p className="text-gray-400">Your insights will help shape the future of cybersecurity education in Africa</p>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitting 
                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30' 
                : 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25 border border-orange-500/30'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Submitting Survey...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Lock className="w-5 h-5" />
                Submit Secure Survey
              </div>
            )}
          </button>
          
          {submitStatus === 'success' && (
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 rounded-xl">
              <p className="text-green-300 font-semibold flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Survey submitted successfully! Thank you for your valuable feedback.
              </p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-xl">
              <p className="text-red-300 font-semibold flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                Submission failed. Please try again or contact support.
              </p>
            </div>
          )}
          
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              
              <span>Building Africa's cybersecurity future together</span>
            
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CybersecuritySurvey;