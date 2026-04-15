// ============================================================
// 3-CLASS CLASSIFIER: LOVE, OFFENSIVE, HATE (NO NEUTRAL)
// ============================================================

function detectLanguage(text) {
    const hindiPattern = /[\u0900-\u097F]/;
    const bhojpuriIndicators = ['बा', 'हई', 'रहल', 'जा', 'का', 'के', 'मे', 'से', 'त', 'हम', 'तोहर', 'रउआ'];
    
    if (hindiPattern.test(text)) {
        for (let word of bhojpuriIndicators) {
            if (text.includes(word)) return 'Bhojpuri';
        }
        return 'Hindi';
    }
    return 'English';
}

// COMPREHENSIVE LEXICONS
const HATE_WORDS = {
    english: ['hate', 'stupid', 'kill', 'die', 'murder', 'trash', 'worthless', 'scum', 'bastard', 'fuck', 'shit', 'crap', 'nasty', 'disgusting', 'racist', 'sexist', 'retard', 'moron', 'ugly', 'fat', 'loser', 'damn', 'hell', 'bitch', 'asshole', 'pathetic', 'terrible', 'awful', 'horrible', 'dumb', 'idiot', 'useless', 'crazy', 'annoying'],
    hindi: ["नफरत", "घृणा", "विद्वेष", "चिढ़", "जलन", "ईर्ष्या", "द्वेष", "तिरस्कार", "अपमान", "उपेक्षा", "तुच्छता", "घिन", "क्रोध", "गुस्सा", "रोष", "आक्रोश", "विरोध", "अरुचि", "असहिष्णुता", "बैर", "दुश्मनी", "शत्रुता", "असंतोष", "नापसंद", "अप्रिय", "बेज़ार", "तंग", "परेशान", "चिड़चिड़ापन", "खीज", "अप्रसन्नता", "नाराज़गी", "असंतुष्टि", "अविश्वास", "शक", "संदेह", "तिरस्कृत", "निरादर", "अनादर", "अवहेलना", "बेइज्जती", "अपमानजनक", "घृणित", "घिनौना", "नफरतभरा", "द्वेषपूर्ण", "जलनभरा", "ईर्ष्यालु", "क्रोधित", "रुष्ट", "अप्रसन्न", "नाखुश", "ऊब", "उकताहट", "विरक्ति", "उदासीनता", "बेरुखी", "दूरी", "अलगाव", "एकाकीपन", "अकेलापन", "त्याग", "छोड़ देना", "किनारा", "परहेज", "बचाव", "घृणा करना", "नफरत करना", "चिढ़ना", "जलना", "ईर्ष्या करना", "तिरस्कार करना", "अपमान करना", "उपेक्षा करना"],
    bhojpuri: ["नफरत", "घृणा", "चीढ़", "जलन", "ईर्ष्या", "द्वेष", "तिरस्कार", "अपमान", "उपेक्षा", "तुच्छता", "घिन", "क्रोध", "रोष", "आक्रोश", "विरोध", "अरुचि", "असहिष्णुता", "बैर", "दुश्मनी", "शत्रुता", "असंतोष", "नापसंद", "अप्रिय", "अनचाहल", "बेज़ार", "तंग", "परेशान", "चिड़चिड़ापन", "खीज", "अप्रसन्नता", "नाराज़गी", "असंतुष्टि", "अविश्वास", "शक", "संदेह", "तिरस्कृत", "निरादर", "अनादर", "अवहेलना", "बेइज्जती", "अपमानजनक", "घृणित", "घिनौना", "नफरतभरा", "द्वेषपूर्ण", "जलनभरा", "ईर्ष्यालु", "क्रोधित", "रुष्ट", "अप्रसन्न", "नाखुश", "ऊब", "उकताहट", "विरक्ति", "उदासीनता", "बेरुखी", "दूरी", "अलगाव", "एकाकीपन", "अकेलापन", "त्याग", "छोड़ देवल", "किनारा", "परहेज", "बचाव", "घृणा करल", "नफरत करल", "चिढ़ल", "जलल", "ईर्ष्या करल", "तिरस्कार करल", "अपमान करल", "उपेक्षा करल", "रिस करल", "गुस्सा करल", "तिखार", "ताना", "चुटकी", "कटाक्ष", "फटकार", "झिड़की", "डाँट"]
};

const OFFENSIVE_WORDS = {
    english: ['stupid', 'idiot', 'dumb', 'moron', 'annoying', 'crap', 'damn', 'hell', 'suck', 'lame', 'fool', 'ignorant', 'rubbish', 'nonsense', 'pathetic', 'screw', 'bloody', 'jerk', 'rude', 'shut up', 'bullshit', 'bewakoof', 'bekaar', 'nikamma', 'ghatiya', 'nalayak', 'faltu', 'pagal', 'sanki', 'kamzor', 'ganda', 'jhootha', 'sust', 'aalsi', 'behuda', 'besharam', 'anpadh', 'gawar', 'jahil', 'nakara', 'dheet', 'kharab'],
    hindi: ['बेवकूफ', 'मूर्ख', 'पागल', 'चिड़चिड़ा', 'बकवास', 'लानत', 'नरक', 'बेकार', 'मूर्खतापूर्ण', 'बदतमीजी', 'बुदबक'],
    bhojpuri: ['बेवकूफ', 'मुर्ख', 'पागल', 'चिड़चिड़', 'बकवास', 'लानत', 'नरक', 'बेकार', 'बदतमीजी', 'बुदबक']
};

const LOVE_WORDS = {
    english: ['love', 'amazing', 'awesome', 'wonderful', 'fantastic', 'great', 'beautiful', 'brilliant', 'happy', 'joy', 'excellent', 'incredible', 'thank', 'appreciate', 'bless', 'cherish', 'respect', 'kind', 'support', 'positive', 'best', 'lovely', 'peace', 'friend', 'care', 'help', 'inspire', 'good', 'nice', 'sweet', 'caring'],
    hindi: ['प्यार', 'प्रेम', 'अद्भुत', 'शानदार', 'बढ़िया', 'खूबसूरत', 'खुश', 'आनंद', 'धन्यवाद', 'शुक्रिया', 'आशीर्वाद', 'सम्मान', 'दयालु', 'सकारात्मक', 'शांति', 'दोस्त', 'मदद', 'अच्छा', 'सुंदर'],
    bhojpuri: ['प्यार', 'प्रेम', 'अद्भुत', 'शानदार', 'बढ़िया', 'खूबसूरत', 'खुश', 'आनंद', 'धन्यवाद', 'शुक्रिया', 'आशीर्वाद', 'सम्मान', 'दयालु', 'सकारात्मक', 'शांति', 'दोस्त', 'मदद', 'अच्छा']
};

// Hate phrases array
const hatePhrases = ['i hate you', 'fuck you', 'kill yourself', 'go die', 'मर जा', 'hate you', 'you are fat', 'you are ugly', 'you are dumb', 'you are stupid', 'you are an idiot', 'you are useless', 'you are a loser', 'you are pathetic', 'you are worthless', 'you are trash', 'तू बेकार कचरा बाटे', 'जा के मर', 'तू घिनौना बाटे', 'तू सबसे बुरहा इंसान बाटे', 'तू हमरा बीमार कर देला'];

// Love phrases array
const lovePhrases = ['i love you', 'you are amazing', 'you are wonderful', 'thank you so much', 'you make me happy', 'you are beautiful', 'you are kind', 'you are my sunshine', 'i appreciate you', 'you are special', 'you inspire me', 'you are a blessing', 'keep shining', 'you are awesome', 'मैं तुमसे प्यार करता हूँ', 'तुम बहुत अच्छे हो', 'हम तोहरा से प्यार करी', 'तू बहुत अच्छा बाटे', 'तू अद्भुत बाटे', 'तू हमर खुशी बाटे'];

function classifyComment(text, lang) {
    if (!text.trim()) {
        return { category: 'LOVE', confidence: 0.6, probs: [0.2, 0.2, 0.6] };
    }
    
    const lower = text.toLowerCase();
    const words = lower.match(/[\w\u0900-\u097F]+/g) || [];
    
    let hateScore = 0;
    let offensiveScore = 0;
    let loveScore = 0;
    
    const hateList = HATE_WORDS[lang.toLowerCase()] || HATE_WORDS.english;
    const offList = OFFENSIVE_WORDS[lang.toLowerCase()] || OFFENSIVE_WORDS.english;
    const loveList = LOVE_WORDS[lang.toLowerCase()] || LOVE_WORDS.english;
    
    // Check each word
    for (let w of words) {
        if (hateList.some(h => w.includes(h))) hateScore += 1.8;
        if (offList.some(o => w.includes(o))) offensiveScore += 1.2;
        if (loveList.some(l => w.includes(l))) loveScore += 1.5;
    }
    
    // Check hate phrases
    for (let phrase of hatePhrases) {
        if (lower.includes(phrase)) hateScore += 2.5;
    }
    
    // Check love phrases
    for (let phrase of lovePhrases) {
        if (lower.includes(phrase)) loveScore += 2.0;
    }
    
    // Punctuation boost
    const exclamationCount = (text.match(/!+/g) || []).length;
    if (exclamationCount > 0) {
        if (hateScore > 0) hateScore += 0.4 * exclamationCount;
        if (loveScore > 0) loveScore += 0.3 * exclamationCount;
        if (offensiveScore > 0) offensiveScore += 0.3 * exclamationCount;
    }
    
    // Uppercase emphasis
    const upperRatio = text.length > 0 ? (text.match(/[A-Z]/g) || []).length / text.length : 0;
    if (upperRatio > 0.5 && words.length > 2) {
        if (hateScore > 0) hateScore += 0.6;
        if (offensiveScore > 0) offensiveScore += 0.5;
        if (loveScore > 0) loveScore += 0.4;
    }
    
    // Normalize by word count
    const wordCount = words.length;
    hateScore = hateScore / Math.max(1, wordCount);
    offensiveScore = offensiveScore / Math.max(1, wordCount);
    loveScore = loveScore / Math.max(1, wordCount);
    
    // Calculate probabilities
    let hateProb = Math.min(hateScore * 1.6, 0.98);
    let offensiveProb = Math.min(offensiveScore * 1.3, 0.95);
    let loveProb = Math.min(loveScore * 1.5, 0.98);
    
    // Normalize
    const total = hateProb + offensiveProb + loveProb;
    hateProb = hateProb / total;
    offensiveProb = offensiveProb / total;
    loveProb = loveProb / total;
    
    const probs = [hateProb, offensiveProb, loveProb];
    const maxIdx = probs.indexOf(Math.max(...probs));
    const categories = ['HATE', 'OFFENSIVE', 'LOVE'];
    let category = categories[maxIdx];
    let confidence = probs[maxIdx];
    
    // Override for strong single words
    if (lower === 'hate' || lower === 'नफरत') {
        return { category: 'HATE', confidence: 0.98, probs: [0.98, 0.01, 0.01] };
    }
    if (lower === 'love' || lower === 'प्यार') {
        return { category: 'LOVE', confidence: 0.98, probs: [0.01, 0.01, 0.98] };
    }
    
    // If confidence is too low, default to LOVE
    if (confidence < 0.4) {
        category = 'LOVE';
        confidence = 0.6;
        const newProbs = [0.2, 0.2, 0.6];
        return { category, confidence, probs: newProbs };
    }
    
    return { category, confidence, probs };
}