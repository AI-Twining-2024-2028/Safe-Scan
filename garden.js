// Garden Visuals (3 categories only)
const gardenEffects = {
    'LOVE': { plantEmoji: '🌸', status: '🌸 A beautiful flower blooms! Your kind words make the garden flourish! 🌸' },
    'OFFENSIVE': { plantEmoji: '🍂', status: '🍂 The leaves are turning yellow. Offensive language damages the garden. Please be kinder. 🍂' },
    'HATE': { plantEmoji: '🥀', status: '🥀 The plant withers. Hateful words poison the garden. Choose kindness and compassion. 🥀' }
};

function createFallingLeaves(count, color) {
    const container = document.querySelector('.garden-stage');
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-particle';
        leaf.style.position = 'absolute';
        leaf.style.width = '20px';
        leaf.style.height = '20px';
        leaf.style.background = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color.replace('#', '%23')}"><path d="M12,2C9,7,4,9,4,14c0,4,4,6,8,6s8-2,8-6C20,9,15,7,12,2z"/></svg>')`;
        leaf.style.backgroundSize = 'contain';
        leaf.style.left = Math.random() * 80 + 10 + '%';
        leaf.style.top = '-20px';
        leaf.style.animation = `leafFloat ${Math.random() * 3 + 2}s linear forwards`;
        leaf.style.pointerEvents = 'none';
        leaf.style.zIndex = '100';
        container.appendChild(leaf);
        setTimeout(() => leaf.remove(), 4000);
    }
}

function animatePlantGrowth(category) {
    const effect = gardenEffects[category];
    const plantEmojiEl = document.getElementById('plantEmoji');
    const plantStatusEl = document.getElementById('plantStatus');
    
    plantEmojiEl.style.animation = 'none';
    plantEmojiEl.offsetHeight;
    plantEmojiEl.style.animation = 'plantGrow 0.6s ease-out';
    plantEmojiEl.innerHTML = effect.plantEmoji;
    plantStatusEl.innerHTML = effect.status;
    
    if (category === 'HATE') {
        createFallingLeaves(12, '#8B4513');
    } else if (category === 'OFFENSIVE') {
        createFallingLeaves(6, '#DAA520');
    } else if (category === 'LOVE') {
        createFallingLeaves(8, '#FF69B4');
    }
}

function updateUI(result, comment, detectedLang) {
    const categoryColors = { 'LOVE': '#4caf50', 'OFFENSIVE': '#ff9800', 'HATE': '#f44336' };
    const categoryIcons = { 'LOVE': '❤️', 'OFFENSIVE': '⚠️', 'HATE': '😡' };
    const color = categoryColors[result.category];
    const confidencePercent = (result.confidence * 100).toFixed(1);
    
    document.getElementById('analysisResult').innerHTML = `
        <div class="category-badge" style="background: ${color}20; color: ${color}; border-left: 4px solid ${color};">
            ${categoryIcons[result.category]} ${result.category} ${result.category === 'HATE' ? '🥀' : result.category === 'LOVE' ? '🌸' : '🍂'}
        </div>
        <div style="margin: 0.5rem 0;">Confidence: <strong>${confidencePercent}%</strong></div>
        <div class="confidence-bar"><div class="confidence-fill" style="width: ${confidencePercent}%; background: ${color};"></div></div>
        <div style="margin-top: 0.8rem; font-size: 0.8rem; background: rgba(0,0,0,0.1); padding: 0.5rem; border-radius: 1rem;">
            <i class="fas fa-quote-left"></i> "${escapeHtml(comment.substring(0, 100))}${comment.length > 100 ? '...' : ''}"
        </div>
    `;
    
    document.getElementById('confidenceResult').innerHTML = `
        <div><i class="fas fa-language"></i> <strong>Detected Language:</strong> ${detectedLang}</div>
        <div style="margin-top: 0.5rem;"><i class="fas fa-chart-simple"></i> <strong>Neural Scores:</strong></div>
        <div style="font-size: 0.8rem; margin-top: 0.5rem;">
            <div style="display: flex; justify-content: space-between; margin: 0.2rem 0;"><span>🌸 Love:</span> <strong>${(result.probs[2] * 100).toFixed(1)}%</strong></div>
            <div style="display: flex; justify-content: space-between; margin: 0.2rem 0;"><span>🍂 Offensive:</span> <strong>${(result.probs[1] * 100).toFixed(1)}%</strong></div>
            <div style="display: flex; justify-content: space-between; margin: 0.2rem 0;"><span>🥀 Hate:</span> <strong>${(result.probs[0] * 100).toFixed(1)}%</strong></div>
        </div>
        <div class="lang-badge" style="margin-top: 0.8rem; text-align: center;"><i class="fas fa-seedling"></i> Safe Scan AI | Detox Garden</div>
    `;
    
    animatePlantGrowth(result.category);
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}