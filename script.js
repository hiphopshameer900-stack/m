// Function to generate the rolling Heart Rain Drop fall system
function startHeartRain() {
    const container = document.getElementById('heartRain');
    if (!container) return;

    const rainHearts = ['❤️', '💖', '💕', '♥', '💗'];

    setInterval(() => {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        
        // Pick a randomized heart shape variation
        drop.innerText = rainHearts[Math.floor(Math.random() * rainHearts.length)];
        
        // Distribute spacing horizontally across viewport widths
        drop.style.left = Math.random() * 100 + 'vw';
        
        // Randomize sizing constraints slightly
        drop.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        
        // Adjust the falling speed to simulate a graceful rainfall (4s to 7s)
        const fallingSpeed = Math.random() * 3 + 4;
        drop.style.animationDuration = fallingSpeed + 's';
        
        container.appendChild(drop);
        
        // Garbage cleanup to protect system process memory runtimes
        setTimeout(() => {
            drop.remove();
        }, fallingSpeed * 1000);
    }, 150); // Spawns drops continuously every 150ms
}

function runSceneAnimations(sceneElement) {
    const lines = sceneElement.querySelectorAll('.text-line, .promise-card');
    let maxDelay = 0;

    lines.forEach(line => {
        const currentDelay = parseInt(line.getAttribute('data-delay') || 0);
        if (currentDelay > maxDelay) maxDelay = currentDelay;

        setTimeout(() => {
            line.classList.add('visible');
        }, currentDelay);
    });

    if(sceneElement.id === 'scene6') {
        setTimeout(() => {
            const env = document.getElementById('letterEnvelope');
            if(env) env.classList.add('open');
        }, 800);
        maxDelay += 1500;
    }

    const nextBtn = sceneElement.querySelector('.btn');
    if (nextBtn) {
        setTimeout(() => {
            nextBtn.classList.add('show-btn');
        }, maxDelay + 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Run the heart rainfall system right away
    startHeartRain();

    const primaryScene = document.getElementById('scene1');
    if (primaryScene) {
        runSceneAnimations(primaryScene);
    }

    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentScene = e.target.closest('.scene');
            const targetSceneId = e.target.getAttribute('data-next');
            const nextScene = document.getElementById(targetSceneId);

            if (currentScene && nextScene) {
                if (targetSceneId === 'scene2') document.body.className = 'galaxy-state';
                if (targetSceneId === 'scene3') document.body.className = 'storm';
                if (targetSceneId === 'scene4' || targetSceneId === 'scene5') document.body.className = 'sunrise';
                if (targetSceneId === 'scene6' || targetSceneId === 'scene7') document.body.className = 'galaxy-state';

                currentScene.classList.remove('active');
                
                setTimeout(() => {
                    currentScene.style.display = 'none';
                    nextScene.style.display = 'flex';
                    window.scrollTo(0, 0);
                    
                    setTimeout(() => {
                        nextScene.classList.add('active');
                        runSceneAnimations(nextScene);
                    }, 50);
                }, 1200);
            }
        });
    });

    const finalBtn = document.getElementById('finalBtn');
    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            document.body.style.background = 'radial-gradient(circle at center, #ffffff 0%, #fff0f3 100%)';
            document.body.style.color = '#ff416c';
            finalBtn.style.display = 'none';
            
            const tbcText = document.getElementById('toBeContinued');
            if(tbcText) {
                tbcText.style.display = 'block';
                setTimeout(() => { tbcText.classList.add('visible'); }, 100);
            }
        });
    }
});
