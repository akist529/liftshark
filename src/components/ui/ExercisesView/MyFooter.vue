<template>
<footer>
    <a href="https://wger.de/en/software/api" target="_blank" title="exercises">Exercise Data provided by wger</a>
    <a href="https://www.flaticon.com/free-icons/gym" target="_blank" title="gym icons">Gym icons created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/bench" target="_blank" title="bench icon">Bench icon created by Freepik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/muscle" target="_blank" title="muscle icons">Muscle icons created by Anggre Tionanda - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/workout" title="workout icons">Workout icons created by Leremy - Flaticon</a>
</footer>
</template>

<style scoped lang="scss">
footer {
    /* Positioning */
    display: flex;
        flex-direction: column;
        gap: 5px;
    grid-row: 2 / 3;
    grid-column: 1 / -1;
    margin: 0 auto;
    width: 100%;

    /* Visual */
    padding: 10px 5px;

    a {
        color: black;
        font-size: 0.65rem;
    }
}
</style>
