
$(document).ready(function () {

    // Particles
    tsParticles
        .loadJSON("particle-background-0", "./assets/particles.json")
        .then((container) => {
        })
        .catch((error) => {
            console.error(error);
        });

    tsParticles
        .loadJSON("particle-background-1", "./assets/particles.json")
        .then((container) => {
        })
        .catch((error) => {
            console.error(error);
        });
        
});
