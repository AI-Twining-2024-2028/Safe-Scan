// Main Analysis
let isAnalyzing = false;
const commentInput = document.getElementById('commentInput');
const charCounter = document.getElementById('charCounter');
const detectedLangDisplay = document.getElementById('detectedLangDisplay');
const plantBtn = document.getElementById('plantBtn');

commentInput.addEventListener('input', () => {
    charCounter.textContent = `${commentInput.value.length} / 500`;
    if (commentInput.value.length > 500) commentInput.value = commentInput.value.slice(0, 500);
    if (commentInput.value.trim()) {
        const previewLang = detectLanguage(commentInput.value);
        detectedLangDisplay.innerHTML = `<i class="fas fa-globe"></i> Detecting: ${previewLang}`;
    } else {
        detectedLangDisplay.innerHTML = `<i class="fas fa-globe"></i> Auto-detecting...`;
    }
});

async function analyzeAndGrow() {
    if (isAnalyzing) return;
    const comment = commentInput.value;
    if (!comment.trim()) {
        alert('🌱 Please plant a comment first!');
        return;
    }
    
    isAnalyzing = true;
    const originalText = plantBtn.innerHTML;
    plantBtn.innerHTML = '<div class="loading"></div> Analyzing your words...';
    plantBtn.disabled = true;
    
    setTimeout(() => {
        const lang = detectLanguage(comment);
        detectedLangDisplay.innerHTML = `<i class="fas fa-globe"></i> Detected: ${lang}`;
        const result = classifyComment(comment, lang);
        updateUI(result, comment, lang);
        
        plantBtn.innerHTML = originalText;
        plantBtn.disabled = false;
        isAnalyzing = false;
    }, 600);
}

plantBtn.addEventListener('click', analyzeAndGrow);

// Dark/Light Mode
let isDark = false;
const themeBtn = document.getElementById('themeToggleBtn');
const themeText = document.getElementById('themeText');
themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        themeText.innerHTML = 'Light Mode';
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        themeText.innerHTML = 'Dark Mode';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

document.body.classList.add('light');

// Generate floating leaves
for (let i = 0; i < 40; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.width = (Math.random() * 20 + 10) + 'px';
    leaf.style.height = (Math.random() * 20 + 10) + 'px';
    leaf.style.animationDelay = Math.random() * 15 + 's';
    leaf.style.animationDuration = Math.random() * 10 + 8 + 's';
    leaf.style.opacity = Math.random() * 0.4 + 0.1;
    document.querySelector('.garden-bg').appendChild(leaf);
}