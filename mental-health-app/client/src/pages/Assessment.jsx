import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegSmile, FaRegMeh, FaRegFrown, FaRegDizzy, FaArrowLeft, FaClipboardCheck } from 'react-icons/fa';

const Assessment = ({ onComplete, backToHome }) => {
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

    // Options for answers with Icons
    const options = [
        { label: "Never", value: 0, icon: <FaRegSmile size={28} />, color: "#00B894", bg: "rgba(0, 184, 148, 0.1)" },
        { label: "Sometimes", value: 1, icon: <FaRegMeh size={28} />, color: "#FAB1A0", bg: "rgba(250, 177, 160, 0.1)" },
        { label: "Often", value: 2, icon: <FaRegFrown size={28} />, color: "#FF7675", bg: "rgba(255, 118, 117, 0.1)" },
        { label: "Always", value: 3, icon: <FaRegDizzy size={28} />, color: "#D63031", bg: "rgba(214, 48, 49, 0.1)" }
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
            const res = await axios.post('/api/assessment', {
                answers: finalAnswers,
                questionSetId: currentSetId
            });

            // Local history tracking
            try {
                const history = JSON.parse(localStorage.getItem('mindease_assessment_history') || '[]');
                const totalScore = finalAnswers.reduce((acc, curr) => acc + (curr.value || 0), 0);
                history.push({
                    date: new Date().toISOString(),
                    totalScore,
                    riskLevel: res.data.riskLevel || 'Moderate Risk'
                });
                localStorage.setItem('mindease_assessment_history', JSON.stringify(history.slice(-14)));
            } catch (e) { console.error(e); }

            alert("Assessment completed. Your responses have been recorded confidentially.");

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

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--primary-color)' }}>
            <div className="fade-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid rgba(108, 99, 255, 0.1)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>Preparing your assessment...</p>
            </div>
        </div>
    );

    if (error) return <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem', color: '#E53E3E' }}><h3>Error</h3><p>{error}</p></div>;

    if (!canTakeAssessment) {
        return (
            <div className="card fade-in" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', padding: '4rem 3rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#F0F3FF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    color: 'var(--primary-color)'
                }}>
                    <FaClipboardCheck size={40} />
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Assessment Status</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--sidebar-text)', lineHeight: '1.6' }}>{statusMessage}</p>

                <button
                    onClick={() => backToHome ? backToHome() : navigate('/')}
                    style={{
                        padding: '16px 32px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 16px rgba(108, 99, 255, 0.2)'
                    }}
                >
                    Return to Dashboard
                </button>


                <div style={{ marginTop: '3rem', borderTop: '1px solid #F0F3FF', paddingTop: '2rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#B0BEC5', marginBottom: '1rem' }}>DEBUG OPTIONS</p>
                    <button
                        onClick={startTestMode}
                        style={{ background: 'transparent', color: '#90A4AE', fontSize: '0.85rem', textDecoration: 'underline' }}
                    >
                        Force Retake (Development Mode)
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return <div className="card text-center p-5">No questions available.</div>;

    const currentQ = questions[step];
    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div className="card fade-in" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center', padding: '4rem 3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
                <FaClipboardCheck size={24} color="var(--primary-color)" />
                <h4 style={{ color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Self-Assessment</h4>
            </div>
            <h2 style={{ color: 'var(--heading-color)', marginBottom: '1rem', fontSize: '2.2rem', fontWeight: '800' }}>How are you feeling?</h2>
            <p style={{ marginBottom: '3rem', color: 'var(--sidebar-text)', fontSize: '1.1rem' }}>
                Be honest with yourself. This information is private and helps us support you.
            </p>

            {submitting ? (
                <div style={{ padding: '4rem', color: 'var(--primary-color)', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid rgba(108, 99, 255, 0.1)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Analyzing Responses...</h3>
                    <p style={{ color: 'var(--sidebar-text)' }}>Generating your wellness insights.</p>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '3.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1rem', color: 'var(--heading-color)', fontWeight: '700' }}>
                            <span>Progress</span>
                            <span>{step + 1} of {questions.length}</span>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div style={{ minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3.5rem', padding: '0 1rem' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--heading-color)', lineHeight: '1.4' }}>
                            {currentQ?.text || "Question loading..."}
                        </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleAnswer(opt.value)}
                                style={{
                                    padding: '30px 20px',
                                    borderRadius: '24px',
                                    background: '#FFFFFF',
                                    border: '2px solid #F0F3FF',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'var(--transition-smooth)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.borderColor = opt.color;
                                    e.currentTarget.style.boxShadow = `0 12px 24px ${opt.color}20`;
                                    e.currentTarget.style.background = opt.bg;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#F0F3FF';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.background = '#FFFFFF';
                                }}
                            >
                                <div style={{ color: opt.color }}>{opt.icon}</div>
                                <span style={{ fontWeight: '700', color: 'var(--heading-color)', fontSize: '1.1rem' }}>{opt.label}</span>
                            </div>
                        ))}
                    </div>

                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            style={{
                                marginTop: '3.5rem',
                                background: 'transparent',
                                color: 'var(--sidebar-text)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                margin: '3.5rem auto 0',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                        >
                            <FaArrowLeft size={14} /> Back to previous question
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Assessment;

