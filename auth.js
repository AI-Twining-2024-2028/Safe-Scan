// Login Logic
const loginOverlay = document.getElementById('loginOverlay');
const mainApp = document.getElementById('mainApp');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userNameDisplay = document.getElementById('userNameDisplay');

function doLogin() {
    let username = document.getElementById('loginUsername').value.trim();
    if (!username) username = 'gentle_gardener';
    localStorage.setItem('safeScanUser', username);
    userNameDisplay.innerText = username;
    loginOverlay.classList.add('hide');
    mainApp.classList.add('active');
    resetGarden();
}

function resetGarden() {
    document.getElementById('commentInput').value = '';
    document.getElementById('plantEmoji').innerHTML = '🌱';
    document.getElementById('plantStatus').innerHTML = 'Plant a comment and see what grows...';
    document.getElementById('analysisResult').innerHTML = '<div style="color: #6b8c42;">✨ Waiting for your comment...</div>';
    document.getElementById('confidenceResult').innerHTML = '<div style="color: #6b8c42;">🌿 Analysis will appear here</div>';
    document.getElementById('charCounter').textContent = '0 / 500';
    document.getElementById('detectedLangDisplay').innerHTML = '<i class="fas fa-globe"></i> Auto-detecting...';
}

loginBtn.addEventListener('click', doLogin);
document.getElementById('loginPassword').addEventListener('keypress', (e) => { if (e.key === 'Enter') doLogin(); });

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('safeScanUser');
    loginOverlay.classList.remove('hide');
    mainApp.classList.remove('active');
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
});

// Check session
if (localStorage.getItem('safeScanUser')) {
    const user = localStorage.getItem('safeScanUser');
    userNameDisplay.innerText = user;
    loginOverlay.classList.add('hide');
    mainApp.classList.add('active');
    resetGarden();
}