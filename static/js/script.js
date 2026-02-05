// Global variables
let noClickCount = 0;
let yesButtonClicked = false;
let audioRestartTimeouts = [];
let sparkleInterval = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeSparkles();
    initializeAudio();
    ensureYesButtonAlwaysVisible();
    checkLandscapeOrientation();
    
    // Check orientation on resize and orientation change
    window.addEventListener('resize', checkLandscapeOrientation);
    window.addEventListener('orientationchange', function() {
        setTimeout(checkLandscapeOrientation, 100);
    });
    
    // Check landscape orientation periodically while loading screen is visible
    const landscapeCheckInterval = setInterval(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            checkLandscapeOrientation();
        } else {
            clearInterval(landscapeCheckInterval);
        }
    }, 500);
});

// Check Landscape Orientation
function checkLandscapeOrientation() {
    const landscapeMessage = document.getElementById('landscapeMessage');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!landscapeMessage) return;
    
    // Completely hide landscape message if loading screen is done
    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        landscapeMessage.classList.remove('show');
        landscapeMessage.style.display = 'none';
        landscapeMessage.style.visibility = 'hidden';
        landscapeMessage.style.opacity = '0';
        landscapeMessage.style.height = '0';
        landscapeMessage.style.padding = '0';
        landscapeMessage.style.margin = '0';
        return;
    }
    
    // Check if device is in landscape mode and height is small (mobile landscape)
    const isLandscape = window.innerWidth > window.innerHeight;
    const isSmallHeight = window.innerHeight < 600;
    const isMobile = window.innerWidth < 968;
    
    // Show landscape message banner on mobile devices in landscape mode (only on loading screen)
    if (isLandscape && isSmallHeight && isMobile && loadingScreen && !loadingScreen.classList.contains('hidden')) {
        landscapeMessage.style.display = 'flex';
        landscapeMessage.style.visibility = 'visible';
        landscapeMessage.style.opacity = '1';
        landscapeMessage.style.height = 'auto';
        landscapeMessage.style.padding = '12px 20px';
        landscapeMessage.style.margin = '0';
        landscapeMessage.classList.add('show');
    } else {
        landscapeMessage.classList.remove('show');
        landscapeMessage.style.display = 'none';
    }
}

// Loading Screen Functions
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingTitle = document.getElementById('loadingTitle');
    const loadedIndicator = document.getElementById('loadedIndicator');
    const loadingOkBtn = document.getElementById('loadingOkBtn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    // Simulate loading
    setTimeout(() => {
        // Hide loading title
        if (loadingTitle) {
            loadingTitle.style.opacity = '0';
            setTimeout(() => {
                loadingTitle.style.display = 'none';
            }, 300);
        }
        
        // Hide spinner and show green tick in the same place
        if (loadingSpinner) {
            loadingSpinner.style.opacity = '0';
            loadingSpinner.style.transform = 'scale(0)';
            loadingSpinner.classList.add('hidden');
            
            // Show green tick in the same position after spinner fades
            setTimeout(() => {
                if (loadingSpinner) {
                    loadingSpinner.style.display = 'none';
                }
                if (loadedIndicator) {
                    loadedIndicator.style.display = 'block';
                    loadedIndicator.classList.add('show');
                }
            }, 300);
        } else {
            // If spinner not found, just show indicator
            if (loadedIndicator) {
                loadedIndicator.style.display = 'block';
                loadedIndicator.classList.add('show');
            }
        }
    }, 1500);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContainer = document.getElementById('mainContainer');
    const landscapeMessage = document.getElementById('landscapeMessage');
    
    // Completely remove landscape message when loading screen closes
    if (landscapeMessage) {
        landscapeMessage.classList.remove('show');
        landscapeMessage.style.display = 'none';
        landscapeMessage.style.visibility = 'hidden';
        landscapeMessage.style.opacity = '0';
        landscapeMessage.style.height = '0';
        landscapeMessage.style.padding = '0';
        landscapeMessage.style.margin = '0';
    }
    
    // Slide up and hide loading screen
    loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        if (landscapeMessage) {
            landscapeMessage.style.display = 'none';
        }
        mainContainer.style.display = 'flex';
        startBackgroundAudio();
    }, 500);
}

// Sparkles Effect
function initializeSparkles() {
    const container = document.getElementById('sparklesContainer');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    // Create sparkles periodically
    sparkleInterval = setInterval(createSparkle, 300);
}

// Audio Functions
function initializeAudio() {
    const startAudio = document.getElementById('startAudio');
    
    if (startAudio) {
        startAudio.volume = 0.3;
    }
}

function startBackgroundAudio() {
    const startAudio = document.getElementById('startAudio');
    
    if (startAudio && !yesButtonClicked) {
        startAudio.play().catch(error => {
            console.log('Audio autoplay prevented:', error);
        });
    }
}

// Confetti Function
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 250;
    const colors = ['#ff1744', '#ff6b9d', '#ff9800', '#ffc107', '#4caf50', '#2196f3', '#9c27b0', '#ffd700'];
    
    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 8 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
            tiltAngle: 0,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, index) => {
            ctx.beginPath();
            ctx.fillStyle = c.color;
            
            if (c.shape === 'circle') {
                ctx.arc(c.x + c.tilt, c.y, c.r, 0, Math.PI * 2);
            } else {
                ctx.fillRect(c.x + c.tilt, c.y, c.r, c.r);
            }
            
            ctx.fill();
            
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle - c.r / 2) * 15;
            
            if (c.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: Math.floor(Math.random() * 10) - 10,
                    tiltAngleIncrement: c.tiltAngleIncrement,
                    tiltAngle: 0,
                    shape: c.shape
                };
            }
        });
        
        requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    // Stop confetti after 8 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 8000);
}

// Handle YES Button Click
function handleYes() {
    const successMessage = document.getElementById('successMessage');
    const prankMessage = document.getElementById('prankMessage');
    const noCounter = document.getElementById('noCounter');
    const buttonsContainer = document.querySelector('.buttons-container');
    const questionContainer = document.querySelector('.question-container');
    const memeImage = document.getElementById('memeImage');
    const startAudio = document.getElementById('startAudio');
    const yesAudio = document.getElementById('yesAudio');
    const subtitle = document.querySelector('.subtitle');
    const questionHint = document.querySelector('.question-hint');
    
    // Set flag
    yesButtonClicked = true;
    
    // Stop sparkles
    if (sparkleInterval) {
        clearInterval(sparkleInterval);
    }
    
    // Hide elements
    if (noCounter) {
        noCounter.style.display = 'none';
        noCounter.classList.remove('show');
    }
    
    if (prankMessage) {
        prankMessage.style.display = 'none';
        prankMessage.classList.remove('show');
    }
    
    if (questionHint) {
        questionHint.style.display = 'none';
    }
    
    // Stop start audio
    if (startAudio) {
        startAudio.pause();
        startAudio.currentTime = 0;
        startAudio.loop = false;
        startAudio.muted = true;
        startAudio.removeAttribute('autoplay');
        
        audioRestartTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        audioRestartTimeouts = [];
    }
    
    // Play YES audio
    if (yesAudio) {
        yesAudio.volume = 0.7;
        yesAudio.play().catch(error => {
            console.log('YES audio play failed:', error);
        });
    }
    
    // Change image with smooth transition
    if (memeImage && window.YES_IMAGE_PATH) {
        memeImage.style.opacity = '0';
        memeImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        memeImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            memeImage.src = window.YES_IMAGE_PATH;
            memeImage.alt = 'YAY! You said YES! 💕';
            memeImage.style.opacity = '1';
            memeImage.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                memeImage.style.transform = 'scale(1)';
            }, 200);
        }, 600);
    }
    
    // Hide buttons and question
    if (buttonsContainer) {
        buttonsContainer.style.display = 'none';
    }
    
    if (questionContainer) {
        questionContainer.style.display = 'none';
    }
    
    if (subtitle) {
        subtitle.style.display = 'none';
    }
    
    // Show success message
    if (successMessage) {
        successMessage.classList.add('show');
    }
    
    // Create confetti
    createConfetti();
    
    // Add extra celebration
    setTimeout(() => {
        createConfetti();
    }, 2000);
}

// Prank messages array - different messages for each click
const prankMessages = [
    {
        title: "Nice Try! 😏",
        text: "But you can only click YES! 💕",
        hint: "There's only one right answer here! 😄",
        emoji: "🤷‍♀️💕"
    },
    {
        title: "Nope! 😄",
        text: "That button doesn't work! 💕",
        hint: "Try clicking YES instead! 😉",
        emoji: "🙅‍♀️💖"
    },
    {
        title: "Wrong Choice! 😏",
        text: "YES is the only option! 💕",
        hint: "You know what to do! 😊",
        emoji: "❌💕"
    },
    {
        title: "Not Happening! 😄",
        text: "You can't escape! 💕",
        hint: "Just click YES already! 😂",
        emoji: "🚫💖"
    },
    {
        title: "Try Again! 😏",
        text: "But click YES this time! 💕",
        hint: "I'm not giving up! 😄",
        emoji: "🔄💕"
    },
    {
        title: "Still Wrong! 😄",
        text: "YES is calling you! 💕",
        hint: "Listen to your heart! 💖",
        emoji: "💔💕"
    },
    {
        title: "Come On! 😏",
        text: "You know the answer! 💕",
        hint: "Just say YES! 😊",
        emoji: "🙏💖"
    },
    {
        title: "Not That One! 😄",
        text: "The pink button is waiting! 💕",
        hint: "You're so close! 😉",
        emoji: "👆💕"
    }
];

// Handle NO Button Click
function handleNo() {
    noClickCount++;
    
    const prankMessage = document.getElementById('prankMessage');
    const prankTitle = document.getElementById('prankTitle');
    const prankText = document.getElementById('prankText');
    const prankHint = document.getElementById('prankHint');
    const prankEmoji = document.getElementById('prankEmoji');
    const memeImage = document.getElementById('memeImage');
    const noCounter = document.getElementById('noCounter');
    const noCountDisplay = document.getElementById('noCount');
    const noBtn = document.getElementById('noBtn');
    
    // Update counter
    if (noCounter && noCountDisplay) {
        noCountDisplay.textContent = noClickCount;
        noCounter.style.display = 'block';
        noCounter.classList.add('show');
    }
    
    // Show prank message with different text each time
    if (prankMessage) {
        // Get a random message (or cycle through them)
        const messageIndex = (noClickCount - 1) % prankMessages.length;
        const selectedMessage = prankMessages[messageIndex];
        
        // Update message content
        if (prankTitle) prankTitle.textContent = selectedMessage.title;
        if (prankText) prankText.textContent = selectedMessage.text;
        if (prankHint) prankHint.textContent = selectedMessage.hint;
        if (prankEmoji) prankEmoji.textContent = selectedMessage.emoji;
        
        // Show prank message
        prankMessage.style.display = 'block';
        prankMessage.classList.add('show');
        
        // Keep message visible for longer (5 seconds instead of 2)
        setTimeout(() => {
            prankMessage.classList.remove('show');
            setTimeout(() => {
                prankMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }
    
    // Change image to loop through NO images in order
    if (noClickCount >= 1 && memeImage && window.NO_IMAGES && window.NO_IMAGES.length > 0) {
        memeImage.style.opacity = '0';
        memeImage.style.transition = 'opacity 0.5s ease';
        
        // Calculate which image to show (loop through array)
        // First click (noClickCount = 1) shows index 0, second click shows index 1, etc.
        const imageIndex = (noClickCount - 1) % window.NO_IMAGES.length;
        const imageToShow = window.NO_IMAGES[imageIndex];
        
        setTimeout(() => {
            memeImage.src = imageToShow;
            memeImage.style.opacity = '1';
        }, 500);
    }
    
    // Make button smaller after 5 clicks
    if (noClickCount >= 5 && noBtn) {
        const currentScale = parseFloat(noBtn.style.transform.replace('scale(', '').replace(')', '')) || 1;
        const newScale = Math.max(0.5, currentScale - 0.1);
        noBtn.style.transform = `scale(${newScale})`;
        noBtn.style.fontSize = `${Math.max(0.8, parseFloat(noBtn.style.fontSize) || 1.3 - 0.1)}em`;
    }
    
    // Move button away
    moveNoButton();
}

// Move NO Button Away (Prank Feature)
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;
    
    const container = document.querySelector('.buttons-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position within container bounds
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    // Ensure button stays within bounds
    const randomX = Math.max(0, Math.min(maxX, Math.random() * maxX));
    const randomY = Math.max(0, Math.min(maxY, Math.random() * maxY));
    
    // Apply smooth transition
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Add shake animation
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'prankShake 0.3s ease-out';
    }, 10);
}

// Ensure YES Button Always Visible
function ensureYesButtonVisible() {
    const yesBtn = document.getElementById('yesBtn');
    if (!yesBtn) return;
    
    const ensureVisible = () => {
        if (yesBtn) {
            yesBtn.style.setProperty('opacity', '1', 'important');
            yesBtn.style.setProperty('visibility', 'visible', 'important');
            yesBtn.style.setProperty('display', 'inline-flex', 'important');
            yesBtn.style.setProperty('position', 'relative', 'important');
            yesBtn.style.setProperty('z-index', '1001', 'important');
            yesBtn.style.setProperty('pointer-events', 'auto', 'important');
        }
    };
    
    // Check every 10ms
    setInterval(ensureVisible, 10);
    
    // Also check on mouse move
    document.addEventListener('mousemove', ensureVisible, { passive: true });
    
    // Check on every frame
    function checkEveryFrame() {
        if (yesBtn && !yesButtonClicked) {
            ensureVisible();
        }
        requestAnimationFrame(checkEveryFrame);
    }
    checkEveryFrame();
}

// Handle window resize
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    checkLandscapeOrientation();
});

// Prevent right-click context menu (optional prank)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Add keyboard shortcuts (optional)
document.addEventListener('keydown', function(e) {
    // Press Y for YES
    if (e.key.toLowerCase() === 'y' && !yesButtonClicked) {
        handleYes();
    }
    
    // Press N for NO (but it will move away)
    if (e.key.toLowerCase() === 'n' && !yesButtonClicked) {
        handleNo();
    }
});
