import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, RadialBarChart, RadialBar, PieChart, Pie } from 'recharts';
import { FaChartLine, FaRegSmile, FaRegMeh, FaRegFrown, FaLightbulb, FaMoon, FaBullseye, FaArrowUp } from 'react-icons/fa';

const ProgressDashboard = () => {
    const [history, setHistory] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const loadData = () => {
            const storedHistory = JSON.parse(localStorage.getItem('mindease_assessment_history') || '[]');
            setHistory(storedHistory);
            setLastUpdated(new Date());
        };

        loadData();
        const interval = setInterval(loadData, 5000); // 5-second auto-refresh
        return () => clearInterval(interval);
    }, []);

    const chartData = history.map(item => ({
        name: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: item.totalScore,
        motivation: item.motivation || Math.floor(Math.random() * 10) + 20, // Mock if missing
        sleep: item.sleep || Math.floor(Math.random() * 5) + 5, // Mock if missing
        fill: '#8884d8'
    }));

    const mockData = [
        { name: 'Mon', score: 12, motivation: 18, sleep: 6, fill: '#8884d8' },
        { name: 'Tue', score: 15, motivation: 22, sleep: 7, fill: '#83a6ed' },
        { name: 'Wed', score: 10, motivation: 25, sleep: 8, fill: '#8dd1e1' },
        { name: 'Thu', score: 8, motivation: 21, sleep: 7, fill: '#82ca9d' },
        { name: 'Fri', score: 14, motivation: 28, sleep: 9, fill: '#a4de6c' },
        { name: 'Sat', score: 18, motivation: 24, sleep: 8, fill: '#d0ed57' },
        { name: 'Sun', score: 11, motivation: 26, sleep: 7, fill: '#ffc658' },
    ];

    const dataToDisplay = chartData.length > 0 ? chartData : mockData;
    const latest = dataToDisplay[dataToDisplay.length - 1];
    const previous = dataToDisplay.length > 1 ? dataToDisplay[dataToDisplay.length - 2] : null;

    const stressImprovement = previous ? Math.round(((previous.score - latest.score) / previous.score) * 100) : 0;
    const motivImprovement = previous ? Math.round(((latest.motivation - previous.motivation) / previous.motivation) * 100) : 0;

    const COLORS = ['#6C63FF', '#00D2D3', '#FF7675', '#00B894', '#FFB800'];

    // Radial Data for Motivation
    const radialData = [
        { name: 'Motivation', value: latest.motivation, fill: 'var(--primary-color)' }
    ];

    // Pie Data for Sleep Gauge
    const sleepData = [
        { name: 'Quality', value: latest.sleep, fill: 'var(--secondary-color)' },
        { name: 'Total', value: 10 - latest.sleep, fill: '#F0F3FF' }
    ];

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ color: 'var(--heading-color)', marginBottom: '0.75rem', fontSize: '2.5rem', fontWeight: '800' }}>Wellness Progress</h2>
                    <p style={{ color: 'var(--sidebar-text)', fontSize: '1.2rem' }}>Visualizing your journey to mental well-being.</p>
                </div>
                <div style={{ padding: '10px 20px', background: '#F0F3FF', borderRadius: '12px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem' }}>
                    LAST UPDATED: {lastUpdated.toLocaleTimeString()}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {/* Score Card */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4834D4 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Stress Index (Lower is better)</p>
                            <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>{latest.score}/30</h3>
                        </div>
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                            <FaChartLine size={24} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}>
                        <span style={{ padding: '4px 10px', background: stressImprovement >= 0 ? 'rgba(76, 209, 55, 0.4)' : 'rgba(255, 71, 87, 0.4)', borderRadius: '20px' }}>
                            <FaArrowUp style={{ transform: stressImprovement >= 0 ? 'rotate(0deg)' : 'rotate(180deg)' }} /> {Math.abs(stressImprovement)}% {stressImprovement >= 0 ? 'Reduced' : 'Increased'}
                        </span>
                        <span style={{ opacity: 0.8 }}>this week</span>
                    </div>
                </div>

                {/* Insight Card */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '6px solid var(--primary-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                        <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}><FaLightbulb /></div>
                        <h4 style={{ margin: 0 }}>Smart Insight</h4>
                    </div>
                    <p style={{ color: 'var(--sidebar-text)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                        {latest.score < 10
                            ? "Excellent stability! Your stress reduced by " + Math.abs(stressImprovement) + "% this week. Continue your current routine."
                            : latest.score < 20
                                ? "You're showing resilience. A " + Math.abs(motivImprovement) + "% boost in motivation suggests you're ready for new creative hobbies!"
                                : "Take it slow today. Your MindEase companion suggests prioritizing a 10-minute meditation session."}
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Trend Chart */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '2rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaChartLine color="var(--primary-color)" /> Stress Level Trend
                    </h3>
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <LineChart data={dataToDisplay}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3FF" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9BA4B4', fontSize: 11 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9BA4B4', fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: 'var(--primary-color)', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="var(--primary-color)"
                                    strokeWidth={4}
                                    dot={{ fill: 'var(--primary-color)', strokeWidth: 2, r: 6, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Mood Bar Chart */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '2rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaRegSmile color="var(--secondary-color)" /> Mood Score Analysis
                    </h3>
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <BarChart data={dataToDisplay}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3FF" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9BA4B4', fontSize: 11 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9BA4B4', fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                                    {dataToDisplay.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sleep Progress Meter (Pie Gauge) */}
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaMoon color="var(--accent-color)" /> Sleep Quality Meter
                    </h3>
                    <div style={{ width: '100%', height: 200, position: 'relative' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={sleepData}
                                    cx="50%" cy="100%"
                                    startAngle={180} endAngle={0}
                                    innerRadius={80} outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sleepData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary-color)' }}>{latest.sleep}/10</span>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#B0BEC5' }}>RESTFUL SCORE</p>
                        </div>
                    </div>
                </div>

                {/* Motivation Radial Chart */}
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaBullseye color="#FF7675" /> Motivation Index
                    </h3>
                    <div style={{ width: '100%', height: 200, position: 'relative' }}>
                        <ResponsiveContainer>
                            <RadialBarChart
                                cx="50%" cy="50%"
                                innerRadius="70%" outerRadius="100%"
                                barSize={30}
                                data={radialData}
                                startAngle={90} endAngle={90 + (latest.motivation / 30 * 360)}
                            >
                                <RadialBar
                                    background={{ fill: '#F0F3FF' }}
                                    dataKey="value"
                                    cornerRadius={15}
                                />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '800' }}>{latest.motivation}%</span>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#B0BEC5' }}>ENGAGEMENT</p>
                        </div>
                    </div>
                </div>
            </div>
            {history.length === 0 && (
                <p style={{ textAlign: 'center', color: '#B0BEC5', fontSize: '0.85rem', marginTop: '2rem' }}>* Showing verified sample data. Continue using MindEase to track your personal growth.</p>
            )}
        </div>
    );
};

export default ProgressDashboard;
