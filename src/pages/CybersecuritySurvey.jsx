import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const ScaleQuestion = ({ id, question, labels }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 p-4 bg-black/30 rounded-lg border border-white/10 hover:border-orange-500/30 transition-colors"
    >
      <p className="font-medium mb-4 text-gray-300">{question}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-orange-300 w-24 font-medium">{labels[0]}</span>
        <div className="flex gap-2 flex-1 justify-center">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer group">
              <input
                type="radio"
                name={id}
                value={num}
                onChange={(e) => handleChange(id, e.target.value)}
                className="sr-only"
              />
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/20 bg-black/40 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all mb-1">
                <span className="text-gray-300 group-hover:text-orange-400 font-bold">{num}</span>
              </div>
            </label>
          ))}
        </div>
        <span className="text-sm text-orange-300 w-24 text-right font-medium">{labels[1]}</span>
      </div>
    </motion.div>
  );

  const DifficultyQuestion = ({ id, question }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 p-4 bg-black/30 rounded-lg border border-white/10 hover:border-orange-500/30 transition-colors"
    >
      <p className="font-medium mb-4 text-gray-300">{question}</p>
      <div className="flex gap-4">
        {['Easy', 'Moderate', 'Hard'].map(level => (
          <label key={level} className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name={id}
              value={level}
              onChange={(e) => handleChange(id, e.target.value)}
              className="sr-only"
            />
            <div className="w-4 h-4 rounded-full border-2 border-orange-500 mr-2 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <div className="w-2 h-2 rounded-full bg-orange-500 opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-gray-300 group-hover:text-orange-300 transition-colors">{level}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );

  const TextQuestion = ({ id, question, placeholder, rows = 4 }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 p-4 bg-black/30 rounded-lg border border-white/10 hover:border-orange-500/30 transition-colors"
    >
      <p className="font-medium mb-4 text-gray-300">{question}</p>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => handleChange(id, e.target.value)}
        className="w-full p-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 focus:outline-none transition-all duration-300 shadow-inner text-base leading-relaxed"
      />
    </motion.div>
  );

  const MultipleChoice = ({ id, question, options, allowMultiple = false }) => {
    const handleMultipleChange = (option) => {
      const currentValues = responses[id] || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      handleChange(id, newValues);
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 p-4 bg-black/30 rounded-lg border border-white/10 hover:border-orange-500/30 transition-colors"
      >
        <p className="font-medium mb-4 text-gray-300">
          {question}
          {allowMultiple && <span className="text-sm text-orange-400 ml-2">(Select all that apply)</span>}
        </p>
        <div className="space-y-3">
          {options.map(option => (
            <label key={option} className="flex items-center cursor-pointer group p-2 hover:bg-black/40 rounded-lg transition-colors">
              <input
                type={allowMultiple ? "checkbox" : "radio"}
                name={id}
                value={option}
                checked={allowMultiple ? (responses[id] || []).includes(option) : responses[id] === option}
                onChange={(e) => allowMultiple ? handleMultipleChange(option) : handleChange(id, e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 mr-3 rounded border-2 border-orange-500 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors ${allowMultiple ? '' : 'rounded-full'}`}>
                {allowMultiple ? (
                  <svg className="w-3 h-3 text-orange-500 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-orange-500 opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                )}
              </div>
              <span className="text-gray-300 group-hover:text-orange-300 transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </motion.div>
    );
  };

  const Section = ({ title, name, children, icon: Icon }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-gradient-to-br from-black/60 to-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl"
    >
      <button
        onClick={() => toggleSection(name)}
        className="w-full bg-gradient-to-r from-black/80 to-black/60 px-6 py-5 flex justify-between items-center hover:bg-black/70 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
            {Icon && <Icon className="w-6 h-6 text-orange-500" />}
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{title}</h2>
        </div>
        {expandedSections[name] ? 
          <ChevronUp className="w-6 h-6 text-orange-500" /> : 
          <ChevronDown className="w-6 h-6 text-orange-500" />
        }
      </button>
      <AnimatePresence>
        {expandedSections[name] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-b from-black/30 to-transparent">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const sectionIcons = {
    demographics: Shield,
    preCourse: Cpu,
    experience: Zap,
    career: Lock,
    postCourse: Shield,
    future: Cpu
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#000000] to-[#1d0b00] text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(242,96,11,0.05),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.03),transparent_60%)]"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/5 font-mono text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall ${15 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {[...Array(30)].map((_, j) => Math.floor(Math.random() * 2)).join('')}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative"
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#F2600B] to-transparent"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              Cybersecurity Course Survey
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Your feedback helps us create better learning experiences and opportunities for African cybersecurity professionals.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Lock className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-400">All responses are confidential and encrypted</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Survey Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/20 rounded-2xl border border-white/10 p-8"
        >
          <Section title="Section 1: Demographics & Background" name="demographics" icon={sectionIcons.demographics}>
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
            />

            <TextQuestion
              id="q5"
              question="5. What motivated you to pursue cybersecurity education? Share your story."
              placeholder="Tell us what inspired you to enter this field..."
            />
          </Section>

          <Section title="Section 2: Pre-Course Expectations & Knowledge" name="preCourse" icon={sectionIcons.preCourse}>
            <ScaleQuestion
              id="q6"
              question="6. Before starting this course, how would you rate your knowledge of cybersecurity?"
              labels={['No knowledge', 'Expert level']}
            />

            <TextQuestion
              id="q7"
              question="7. What were your biggest concerns or challenges before starting the course?"
              placeholder="e.g., cost, time commitment, technical background, internet connectivity..."
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
            />

            <ScaleQuestion
              id="q9"
              question="9. How confident were you in your ability to succeed in cybersecurity before the course?"
              labels={['Not confident', 'Very confident']}
            />

            <TextQuestion
              id="q10"
              question="10. What specific skills or knowledge did you hope to gain from this course?"
              placeholder="List the specific outcomes you were looking for..."
            />
          </Section>

          <Section title="Section 3: Course Experience" name="experience" icon={sectionIcons.experience}>
            <DifficultyQuestion
              id="q11"
              question="11. How would you rate the overall difficulty level of the course content?"
            />

            <DifficultyQuestion
              id="q12"
              question="12. How difficult were the practical labs and hands-on exercises?"
            />

            <DifficultyQuestion
              id="q13"
              question="13. How challenging were the theoretical/conceptual aspects of the course?"
            />

            <ScaleQuestion
              id="q14"
              question="14. How well did the course pace match your learning speed?"
              labels={['Too slow', 'Too fast']}
            />

            <ScaleQuestion
              id="q15"
              question="15. How relevant was the course content to real-world cybersecurity challenges in Africa?"
              labels={['Not relevant', 'Very relevant']}
            />

            <ScaleQuestion
              id="q16"
              question="16. How accessible were the instructors when you needed help?"
              labels={['Not accessible', 'Very accessible']}
            />

            <ScaleQuestion
              id="q17"
              question="17. How effective were the teaching methods used (videos, readings, labs, etc.)?"
              labels={['Not effective', 'Very effective']}
            />

            <TextQuestion
              id="q18"
              question="18. What aspect of the course did you find most valuable? Why?"
              placeholder="Share what really made a difference for you..."
            />

            <TextQuestion
              id="q19"
              question="19. What challenges did you face during the course (technical, time, resources, connectivity)?"
              placeholder="Help us understand the obstacles you encountered..."
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
            />

            <ScaleQuestion
              id="q21"
              question="21. How effective were video lectures/demonstrations for your learning?"
              labels={['Not effective', 'Very effective']}
            />

            <ScaleQuestion
              id="q22"
              question="22. How effective were hands-on labs and practical exercises for your learning?"
              labels={['Not effective', 'Very effective']}
            />

            <ScaleQuestion
              id="q23"
              question="23. How effective were reading materials (documentation, articles, textbooks) for your learning?"
              labels={['Not effective', 'Very effective']}
            />

            <ScaleQuestion
              id="q24"
              question="24. How much did you enjoy working on assignments independently (on your own)?"
              labels={['Did not enjoy', 'Enjoyed greatly']}
            />

            <ScaleQuestion
              id="q25"
              question="25. How much did you enjoy group projects and collaborative learning with other students?"
              labels={['Did not enjoy', 'Enjoyed greatly']}
            />

            <ScaleQuestion
              id="q26"
              question="26. How useful were multiple-choice quizzes for reinforcing your learning?"
              labels={['Not useful', 'Very useful']}
            />

            <ScaleQuestion
              id="q27"
              question="27. How useful were practical projects/assignments for reinforcing your learning?"
              labels={['Not useful', 'Very useful']}
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
            />

            <TextQuestion
              id="q29"
              question="29. If you could change one thing about the course structure or delivery, what would it be?"
              placeholder="Be specific about what could be improved..."
            />
          </Section>

          <Section title="Section 4: Career Goals & Aspirations" name="career" icon={sectionIcons.career}>
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
            />

            <TextQuestion
              id="q30a"
              question="If you selected 'Other' above, please specify your career goal:"
              placeholder="Describe your specific cybersecurity career goal..."
              rows={2}
            />

            <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-orange-300">
                <strong className="text-orange-400">Note:</strong> A Governance, Risk & Compliance (GRC) Specialist helps organizations manage cybersecurity policies, assess risks, and ensure compliance with regulations and standards (like GDPR, ISO 27001, HIPAA). They bridge the gap between technical security and business requirements.
              </p>
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
            />

            <TextQuestion
              id="q30c"
              question="30c. Tell us more about what drives your passion for cybersecurity:"
              placeholder="Share your personal story and motivations..."
              rows={3}
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
            />

            <ScaleQuestion
              id="q32"
              question="32. How important is international certification (CompTIA, CEH, CISSP, etc.) to your career goals?"
              labels={['Not important', 'Essential']}
            />

            <TextQuestion
              id="q33"
              question="33. What does career success in cybersecurity look like to you personally?"
              placeholder="Describe your vision of success..."
            />

            <ScaleQuestion
              id="q34"
              question="34. How confident do you feel about achieving your cybersecurity career goals after this course?"
              labels={['Not confident', 'Very confident']}
            />

            <TextQuestion
              id="q35"
              question="35. What specific support or resources would help you achieve your career goals?"
              placeholder="e.g., mentorship, job placement, networking, certifications..."
            />
          </Section>

          <Section title="Section 5: Post-Course Impact & Outcomes" name="postCourse" icon={sectionIcons.postCourse}>
            <ScaleQuestion
              id="q36"
              question="36. How much has your cybersecurity knowledge improved since starting the course?"
              labels={['No improvement', 'Significant improvement']}
            />

            <ScaleQuestion
              id="q37"
              question="37. How likely are you to recommend this course to other Africans interested in cybersecurity?"
              labels={['Not likely', 'Very likely']}
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
            />

            <TextQuestion
              id="q39"
              question="39. Share a specific way this course has impacted your life or career path."
              placeholder="Tell us your success story or how your perspective has changed..."
            />

            <ScaleQuestion
              id="q40"
              question="40. How well has this course prepared you for entry-level cybersecurity positions?"
              labels={['Not prepared', 'Fully prepared']}
            />

            <TextQuestion
              id="q41"
              question="41. What additional skills or topics do you wish had been covered in the course?"
              placeholder="List any gaps you've identified..."
            />
          </Section>

          <Section title="Section 6: Future & Community" name="future" icon={sectionIcons.future}>
            <ScaleQuestion
              id="q42"
              question="42. How important is it to have a community of African cybersecurity professionals for networking and support?"
              labels={['Not important', 'Very important']}
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
            />

            <ScaleQuestion
              id="q44"
              question="44. How interested are you in taking additional cybersecurity courses with us?"
              labels={['Not interested', 'Very interested']}
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
            />

            <TextQuestion
              id="q47"
              question="47. What challenges unique to Africa do you think cybersecurity education should address?"
              placeholder="e.g., infrastructure, costs, recognition, local vs international standards..."
            />

            <ScaleQuestion
              id="q48"
              question="48. How affordable was this course for your financial situation?"
              labels={['Not affordable', 'Very affordable']}
            />

            <TextQuestion
              id="q49"
              question="49. If you could give advice to someone in Africa considering cybersecurity as a career, what would you say?"
              placeholder="Share your wisdom with future students..."
            />

            <TextQuestion
              id="q50"
              question="50. Any final thoughts, suggestions, or feedback you'd like to share with us?"
              placeholder="This is your space to tell us anything else on your mind..."
              rows={5}
            />
          </Section>

          {/* Submit Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 bg-gradient-to-br from-black/60 to-black/40 rounded-2xl border border-white/10 p-8 shadow-xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Submit?</h3>
              <p className="text-gray-400">Your feedback helps shape the future of cybersecurity education in Africa</p>
            </div>
            
            <motion.button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${isSubmitting 
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-orange-500/40 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Submit Survey
                </span>
              )}
            </motion.button>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <p className="text-center text-green-400 font-medium">
                  ✓ Survey submitted successfully! Thank you for your valuable feedback.
                </p>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-center text-red-400 font-medium">
                  ✗ Submission failed. Please try again or contact support.
                </p>
              </motion.div>
            )}
            
            <p className="text-center text-sm text-gray-500 mt-6">
              All responses are encrypted and confidential
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fall {
          to { transform: translateY(100vh); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default CybersecuritySurvey;