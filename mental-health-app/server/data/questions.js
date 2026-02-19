const questions = [
    // STRESS (10)
    { id: 's1', category: 'Stress', text: 'How often do you feel overwhelmed by your daily tasks?' },
    { id: 's2', category: 'Stress', text: 'How often do you feel unable to control the important things in your life?' },
    { id: 's3', category: 'Stress', text: 'How often do you feel nervous and "stressed"?' },
    { id: 's4', category: 'Stress', text: 'How often do you find yourself becoming easily annoyed or irritable?' },
    { id: 's5', category: 'Stress', text: 'How often do you feel that things are going your way?' }, // Reverse scoring can be tricky, keeping simple for now
    { id: 's6', category: 'Stress', text: 'How often do you find that you could not cope with all the things that you had to do?' },
    { id: 's7', category: 'Stress', text: 'How often do you feel that you were on top of things?' },
    { id: 's8', category: 'Stress', text: 'How often have you been angered because of things that were outside of your control?' },
    { id: 's9', category: 'Stress', text: 'How often do you feel that difficulties were piling up so high that you could not overcome them?' },
    { id: 's10', category: 'Stress', text: 'How often do you hold tension in your body (jaw clenching, shoulders tight)?' },

    // ANXIETY (10)
    { id: 'a1', category: 'Anxiety', text: 'How often do you feel nervous, anxious, or on edge?' },
    { id: 'a2', category: 'Anxiety', text: 'How often do you have trouble relaxing?' },
    { id: 'a3', category: 'Anxiety', text: 'How often do you become so restless that it is hard to sit still?' },
    { id: 'a4', category: 'Anxiety', text: 'How often do you find yourself worrying about different things?' },
    { id: 'a5', category: 'Anxiety', text: 'How often do you feel afraid that something awful might happen?' },
    { id: 'a6', category: 'Anxiety', text: 'How often do you have a racing heart or palpitations?' },
    { id: 'a7', category: 'Anxiety', text: 'How often do you avoid situations because they make you anxious?' },
    { id: 'a8', category: 'Anxiety', text: 'How often do you feel like you are losing control?' },
    { id: 'a9', category: 'Anxiety', text: 'How often do you have trouble breathing when you are not exerting yourself?' },
    { id: 'a10', category: 'Anxiety', text: 'How often do you feel lightheaded or dizzy from nervousness?' },

    // DEPRESSION (10)
    { id: 'd1', category: 'Depression', text: 'How often have you been bothered by feeling down, depressed, or hopeless?' },
    { id: 'd2', category: 'Depression', text: 'How often have you had little interest or pleasure in doing things?' },
    { id: 'd3', category: 'Depression', text: 'How often do you feel bad about yourself - or that you are a failure?' },
    { id: 'd4', category: 'Depression', text: 'How often do you have trouble concentrating on things?' },
    { id: 'd5', category: 'Depression', text: 'How often do you move or speak so slowly that other people could have noticed?' },
    { id: 'd6', category: 'Depression', text: 'How often do you have thoughts that you would be better off dead, or of hurting yourself?' },
    { id: 'd7', category: 'Depression', text: 'How often do you feel empty or numb?' },
    { id: 'd8', category: 'Depression', text: 'How often do you feel isolated or withdraw from others?' },
    { id: 'd9', category: 'Depression', text: 'How often do you cry without a clear reason?' },
    { id: 'd10', category: 'Depression', text: 'How often do you feel like nothing matters?' },

    // SLEEP (10)
    { id: 'sl1', category: 'Sleep', text: 'How often do you have trouble falling asleep?' },
    { id: 'sl2', category: 'Sleep', text: 'How often do you wake up in the middle of the night and cannot get back to sleep?' },
    { id: 'sl3', category: 'Sleep', text: 'How often do you wake up too early in the morning?' },
    { id: 'sl4', category: 'Sleep', text: 'How often do you feel tired or exhausted during the day?' },
    { id: 'sl5', category: 'Sleep', text: 'How often do you have nightmares or disturbing dreams?' },
    { id: 'sl6', category: 'Sleep', text: 'How often do you need medication or alcohol to help you sleep?' },
    { id: 'sl7', category: 'Sleep', text: 'How often do you sleep too much (oversleeping)?' },
    { id: 'sl8', category: 'Sleep', text: 'How often is your sleep quality poor?' },
    { id: 'sl9', category: 'Sleep', text: 'How often do you snore or have trouble breathing while sleeping?' },
    { id: 'sl10', category: 'Sleep', text: 'How often do you feel unrefreshed after sleeping?' },

    // MOTIVATION (10)
    { id: 'm1', category: 'Motivation', text: 'How often do you feel enthusiastic about your future?' }, // Reverse
    { id: 'm2', category: 'Motivation', text: 'How often do you find it hard to start tasks?' },
    { id: 'm3', category: 'Motivation', text: 'How often do you leave tasks unfinished?' },
    { id: 'm4', category: 'Motivation', text: 'How often do you feel a lack of drive or ambition?' },
    { id: 'm5', category: 'Motivation', text: 'How often do you procrastinate on important things?' },
    { id: 'm6', category: 'Motivation', text: 'How often do you feel that your efforts are pointless?' },
    { id: 'm7', category: 'Motivation', text: 'How often do you need others to push you to do things?' },
    { id: 'm8', category: 'Motivation', text: 'How often do you set goals but fail to follow through?' },
    { id: 'm9', category: 'Motivation', text: 'How often do you feel bored with everything?' },
    { id: 'm10', category: 'Motivation', text: 'How often do you feel mentally drained before starting a task?' }
];

module.exports = questions;
