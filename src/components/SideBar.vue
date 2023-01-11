<template>
    <nav>
        <router-link class="link" to="/">Dashboard</router-link>
        <router-link class="link" to="/workouts">Workouts</router-link>
        <router-link class="link" to="/routines">Routines</router-link>
        <router-link class="link" to="/stats">Stats</router-link>
        <router-link class="link" to="Exercises">Exercises</router-link>
    </nav>
</template>

<style lang="scss">
nav {
    /* Positioning */
    display: flex;
    flex-direction: column;
    gap: 10px;

    grid-row: 2 / 3;
    grid-column: 1 / 2;

    .link {
        text-decoration: none;
        color: black;
    }
}
</style>
