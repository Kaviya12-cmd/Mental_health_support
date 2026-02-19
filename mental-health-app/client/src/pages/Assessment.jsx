import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Assessment = ({ onComplete }) => {
    // State management
    const [questions, setQuestions] = useState([]);
    const [currentSetId, setCurrentSetId] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Check Status State
    const [canTakeAssessment, setCanTakeAssessment] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const navigate = useNavigate();

    // Options for answers
    const options = [
        { label: "Never", value: 0 },
        { label: "Sometimes", value: 1 },
        { label: "Often", value: 2 },
        { label: "Always", value: 3 }
    ];

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const isTestMode = params.get('test') === 'true';
        checkStatusAndFetch(isTestMode);
    }, []);

    const checkStatusAndFetch = async (isTestMode) => {
        try {
            const query = isTestMode ? '?test=true' : '';

            // 1. Check if user is eligible
            const statusRes = await axios.get(`/api/assessment/status${query}`);

            if (statusRes.data.completed && !statusRes.data.allowRetake) {
                // Not allowed (likely done today)
                setStatusMessage(statusRes.data.message || "You have already completed the assessment recently.");
                setCanTakeAssessment(false);
                setLoading(false);
                return;
            }

            // 2. Fetch Questions
            const qRes = await axios.get(`/api/assessment/questions${query}`);

            if (qRes.data.questions) {
                setQuestions(qRes.data.questions);
                setCurrentSetId(qRes.data.setId);
                setAnswers(new Array(qRes.data.questions.length).fill(null));
                setCanTakeAssessment(true);
            } else {
                throw new Error("Invalid question format received");
            }
            setLoading(false);

        } catch (err) {
            console.error("Error initializing assessment:", err);
            // If 403 (Daily Limit)
            if (err.response && err.response.status === 403) {
                setStatusMessage(err.response.data.message);
                setCanTakeAssessment(false);
            } else {
                setError("Failed to load assessment. Please try again later.");
            }
            setLoading(false);
        }
    };

    const handleAnswer = (value) => {
        const currentQuestion = questions[step];
        const newAnswerObj = {
            questionId: currentQuestion.id,
            value: value
        };

        const newAnswers = [...answers];
        newAnswers[step] = newAnswerObj;
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Completed
            submitAssessment(newAnswers);
        }
    };

    const submitAssessment = async (finalAnswers) => {
        setSubmitting(true);
        try {
            await axios.post('/api/assessment', {
                answers: finalAnswers,
                questionSetId: currentSetId
            });
            alert("Assessment completed. Your responses have been recorded confidentially and will help customize your support.");

            if (onComplete) {
                onComplete();
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to save your assessment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const startTestMode = () => {
        window.location.href = '/assessment?test=true';
    };

    if (loading) return <div className="text-center p-5">Loading assessment...</div>;
    if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

    if (!canTakeAssessment) {
        return (
            <div className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                <h2>Assessment Status</h2>
                <p>{statusMessage}</p>
                <button
                    onClick={() => navigate('/')}
                    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Back to Dashboard
                </button>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <p style={{ fontSize: '0.8rem', color: '#999' }}>Developer Options</p>
                    <button
                        onClick={startTestMode}
                        style={{ padding: '5px 10px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '3px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                        Force Retake (Test Mode)
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return <div className="text-center p-5">No questions available.</div>;

    const currentQ = questions[step];

    return (
        <div className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
            <h2>Mental Health Assessment</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                Please answer honestly. Your result is private and helps the AI assistant support you better.
            </p>

            {submitting ? (
                <p>Analyzing responses...</p>
            ) : (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#888' }}>Question {step + 1} of {questions.length}</span>
                        <div style={{ width: '100%', height: '4px', background: '#eee', marginTop: '5px', borderRadius: '2px' }}>
                            <div style={{ width: `${((step + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.3s', borderRadius: '2px' }}></div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {currentQ.text}
                    </h3>

                    <div style={{ display: 'grid', gap: '10px' }}>
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleAnswer(opt.value)}
                                style={{
                                    padding: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    background: 'white',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '1rem'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#f9f9f9'}
                                onMouseOut={(e) => e.target.style.background = 'white'}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            style={{
                                marginTop: '20px',
                                background: 'transparent',
                                color: '#666',
                                border: 'none',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            Back to previous question
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Assessment;
