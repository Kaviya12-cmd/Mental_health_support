const questionSets = [
    // SET 1
    {
        setId: 1,
        questions: [
            // Stress
            { id: '1_s1', category: 'Stress', text: 'How often do you feel overwhelmed by your daily tasks?' },
            { id: '1_s2', category: 'Stress', text: 'How often do you feel unable to control the important things in your life?' },
            // Anxiety
            { id: '1_a1', category: 'Anxiety', text: 'How often do you feel nervous, anxious, or on edge?' },
            { id: '1_a2', category: 'Anxiety', text: 'How often do you have trouble relaxing?' },
            // Depression
            { id: '1_d1', category: 'Depression', text: 'How often have you been bothered by feeling down, depressed, or hopeless?' },
            { id: '1_d2', category: 'Depression', text: 'How often have you had little interest or pleasure in doing things?' },
            // Sleep
            { id: '1_sl1', category: 'Sleep', text: 'How often do you have trouble falling asleep?' },
            { id: '1_sl2', category: 'Sleep', text: 'How often do you wake up in the middle of the night and cannot get back to sleep?' },
            // Motivation
            { id: '1_m1', category: 'Motivation', text: 'How often do you find it hard to start tasks?' },
            { id: '1_m2', category: 'Motivation', text: 'How often do you feel enthusiastic about your future? (Reverse scored)' }
        ]
    },
    // SET 2
    {
        setId: 2,
        questions: [
            { id: '2_s1', category: 'Stress', text: 'How often do you find yourself becoming easily annoyed or irritable?' },
            { id: '2_s2', category: 'Stress', text: 'How often do you feel nervous and "stressed"?' },
            { id: '2_a1', category: 'Anxiety', text: 'How often do you become so restless that it is hard to sit still?' },
            { id: '2_a2', category: 'Anxiety', text: 'How often do you find yourself worrying about different things?' },
            { id: '2_d1', category: 'Depression', text: 'How often do you feel bad about yourself - or that you are a failure?' },
            { id: '2_d2', category: 'Depression', text: 'How often do you have trouble concentrating on things?' },
            { id: '2_sl1', category: 'Sleep', text: 'How often do you wake up too early in the morning?' },
            { id: '2_sl2', category: 'Sleep', text: 'How often do you feel tired or exhausted during the day?' },
            { id: '2_m1', category: 'Motivation', text: 'How often do you leave tasks unfinished?' },
            { id: '2_m2', category: 'Motivation', text: 'How often do you feel a lack of drive or ambition?' }
        ]
    },
    // SET 3
    {
        setId: 3,
        questions: [
            { id: '3_s1', category: 'Stress', text: 'How often do you find that you could not cope with all the things that you had to do?' },
            { id: '3_s2', category: 'Stress', text: 'How often do you hold tension in your body (jaw clenching, key pounding)?' },
            { id: '3_a1', category: 'Anxiety', text: 'How often do you feel afraid that something awful might happen?' },
            { id: '3_a2', category: 'Anxiety', text: 'How often do you have a racing heart or palpitations?' },
            { id: '3_d1', category: 'Depression', text: 'How often do you move or speak so slowly that other people could have noticed?' },
            { id: '3_d2', category: 'Depression', text: 'How often do you feel empty or numb?' },
            { id: '3_sl1', category: 'Sleep', text: 'How often do you have nightmares or disturbing dreams?' },
            { id: '3_sl2', category: 'Sleep', text: 'How often do you need medication or alcohol to help you sleep?' },
            { id: '3_m1', category: 'Motivation', text: 'How often do you procrastinate on important things?' },
            { id: '3_m2', category: 'Motivation', text: 'How often do you feel that your efforts are pointless?' }
        ]
    },
    // SET 4
    {
        setId: 4,
        questions: [
            { id: '4_s1', category: 'Stress', text: 'How often have you been angered because of things that were outside of your control?' },
            { id: '4_s2', category: 'Stress', text: 'How often do you feel that difficulties were piling up so high that you could not overcome them?' },
            { id: '4_a1', category: 'Anxiety', text: 'How often do you avoid situations because they make you anxious?' },
            { id: '4_a2', category: 'Anxiety', text: 'How often do you feel like you are losing control?' },
            { id: '4_d1', category: 'Depression', text: 'How often do you feel isolated or withdraw from others?' },
            { id: '4_d2', category: 'Depression', text: 'How often do you cry without a clear reason?' },
            { id: '4_sl1', category: 'Sleep', text: 'How often do you sleep too much (oversleeping)?' },
            { id: '4_sl2', category: 'Sleep', text: 'How often is your sleep quality poor?' },
            { id: '4_m1', category: 'Motivation', text: 'How often do you need others to push you to do things?' },
            { id: '4_m2', category: 'Motivation', text: 'How often do you set goals but fail to follow through?' }
        ]
    },
    // SET 5
    {
        setId: 5,
        questions: [
            { id: '5_s1', category: 'Stress', text: 'How often do you feel rush or hurried even when you have time?' },
            { id: '5_s2', category: 'Stress', text: 'How often do you feel exhausted just thinking about your to-do list?' },
            { id: '5_a1', category: 'Anxiety', text: 'How often do you feel lightheaded or dizzy from nervousness?' },
            { id: '5_a2', category: 'Anxiety', text: 'How often do you have trouble breathing when you are not exerting yourself?' },
            { id: '5_d1', category: 'Depression', text: 'How often do you feel like nothing matters or life is meaningless?' },
            { id: '5_d2', category: 'Depression', text: 'How often do you blame yourself for things that go wrong?' },
            { id: '5_sl1', category: 'Sleep', text: 'How often do you snore or have trouble breathing while sleeping?' },
            { id: '5_sl2', category: 'Sleep', text: 'How often do you feel unrefreshed after sleeping?' },
            { id: '5_m1', category: 'Motivation', text: 'How often do you feel bored with everything?' },
            { id: '5_m2', category: 'Motivation', text: 'How often do you feel mentally drained before starting a task?' }
        ]
    },
    // SET 6
    {
        setId: 6,
        questions: [
            { id: '6_s1', category: 'Stress', text: 'How often do you feel like you are under constant pressure?' },
            { id: '6_s2', category: 'Stress', text: 'How often do you feel disorganized and chaotic?' },
            { id: '6_a1', category: 'Anxiety', text: 'How often do you get scared easily?' },
            { id: '6_a2', category: 'Anxiety', text: 'How often do you feel tremors or shaking in your hands?' },
            { id: '6_d1', category: 'Depression', text: 'How often do you feel unloved or unwanted?' },
            { id: '6_d2', category: 'Depression', text: 'How often do you lose interest in your appearance or personal hygiene?' },
            { id: '6_sl1', category: 'Sleep', text: 'How often do you have difficulty staying awake while driving, eating, or engaging in social activity?' },
            { id: '6_sl2', category: 'Sleep', text: 'How often do you rely on caffeine to stay awake during the day?' },
            { id: '6_m1', category: 'Motivation', text: 'How often do you wait until the last minute to do things?' },
            { id: '6_m2', category: 'Motivation', text: 'How often do you abandon hobbies or projects shortly after starting?' }
        ]
    },
    // SET 7
    {
        setId: 7,
        questions: [
            { id: '7_s1', category: 'Stress', text: 'How often do you find it hard to tolerate interruptions?' },
            { id: '7_s2', category: 'Stress', text: 'How often do you feel defensive when criticized?' },
            { id: '7_a1', category: 'Anxiety', text: 'How often do you fear losing control in public?' },
            { id: '7_a2', category: 'Anxiety', text: 'How often do you worry about embarrassing yourself?' },
            { id: '7_d1', category: 'Depression', text: 'How often do you feel heavier than usual (physically)?' },
            { id: '7_d2', category: 'Depression', text: 'How often do you feel like a burden to others?' },
            { id: '7_sl1', category: 'Sleep', text: 'How often do you toss and turn throughout the night?' },
            { id: '7_sl2', category: 'Sleep', text: 'How often do anxious thoughts keep you awake?' },
            { id: '7_m1', category: 'Motivation', text: 'How often do you feel too lazy to get out of bed?' },
            { id: '7_m2', category: 'Motivation', text: 'How often do you ignore responsibilities hoping they go away?' }
        ]
    },
    // SET 8
    {
        setId: 8,
        questions: [
            { id: '8_s1', category: 'Stress', text: 'How often do you feel burned out?' },
            { id: '8_s2', category: 'Stress', text: 'How often do you feel resentful of demands on your time?' },
            { id: '8_a1', category: 'Anxiety', text: 'How often do you feel a knot in your stomach?' },
            { id: '8_a2', category: 'Anxiety', text: 'How often do you check things repeatedly (like locks or switches)?' },
            { id: '8_d1', category: 'Depression', text: 'How often do you feel unable to enjoy your favorite foods?' },
            { id: '8_d2', category: 'Depression', text: 'How often do you feel distant from your feelings?' },
            { id: '8_sl1', category: 'Sleep', text: 'How often do you wake up with a headache or dry mouth?' },
            { id: '8_sl2', category: 'Sleep', text: 'How often do late-night screens keep you awake?' },
            { id: '8_m1', category: 'Motivation', text: 'How often do you feel like you are just going through the motions?' },
            { id: '8_m2', category: 'Motivation', text: 'How often do you struggle to find a reason to get up in the morning?' }
        ]
    },
    // SET 9
    {
        setId: 9,
        questions: [
            { id: '9_s1', category: 'Stress', text: 'How often do you feel you have too much specific responsibility?' },
            { id: '9_s2', category: 'Stress', text: 'How often do minor inconveniences make you angry?' },
            { id: '9_a1', category: 'Anxiety', text: 'How often do you avoid social events due to nervousness?' },
            { id: '9_a2', category: 'Anxiety', text: 'How often do you startle easily at loud noises?' },
            { id: '9_d1', category: 'Depression', text: 'How often do you feel that your future is bleak?' },
            { id: '9_d2', category: 'Depression', text: 'How often do you feel disconnected from reality?' },
            { id: '9_sl1', category: 'Sleep', text: 'How often do you need complete silence and darkness to sleep?' },
            { id: '9_sl2', category: 'Sleep', text: 'How often do you nap excessively during the day?' },
            { id: '9_m1', category: 'Motivation', text: 'How often do you rely on deadlines to get anything done?' },
            { id: '9_m2', category: 'Motivation', text: 'How often do you feel indifferent about your achievements?' }
        ]
    },
    // SET 10
    {
        setId: 10,
        questions: [
            { id: '10_s1', category: 'Stress', text: 'How often do you feel like you are running on empty?' },
            { id: '10_s2', category: 'Stress', text: 'How often do you feel that you have no time for yourself?' },
            { id: '10_a1', category: 'Anxiety', text: 'How often do you sweat excessively when nervous?' },
            { id: '10_a2', category: 'Anxiety', text: 'How often do you feel an impending sense of doom?' },
            { id: '10_d1', category: 'Depression', text: 'How often do you feel guilty for no reason?' },
            { id: '10_d2', category: 'Depression', text: 'How often do you wish you could just disappear?' },
            { id: '10_sl1', category: 'Sleep', text: 'How often do you grind your teeth in your sleep (if known)?' },
            { id: '10_sl2', category: 'Sleep', text: 'How often do you talk in your sleep (if known)?' },
            { id: '10_m1', category: 'Motivation', text: 'How often do you avoid making decisions?' },
            { id: '10_m2', category: 'Motivation', text: 'How often do you feel that trying is not worth the effort?' }
        ]
    }
];

module.exports = questionSets;
