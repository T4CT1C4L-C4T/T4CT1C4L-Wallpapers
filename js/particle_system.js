
$(document).ready(function () {

    // Particles
    tsParticles
        .loadJSON("particle-background-0", "../T4CT1C4L-Wallpapers/assets/particles.json")
        .then((container) => {
        })
        .catch((error) => {
            console.error(error);
        });

    tsParticles
        .loadJSON("particle-background-1", "../T4CT1C4L-Wallpapers/assets/particles.json")
        .then((container) => {
        })
        .catch((error) => {
            console.error(error);
        });
        
});
