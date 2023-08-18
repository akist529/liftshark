<template>
<v-bottom-navigation
    fixed
    grow
    mode="shift"
    horizontal
    bg-color="blue-grey-darken-4"
>
    <v-btn to="/">
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
    </v-btn>
    <v-btn to="/workouts">
        <v-icon>mdi-weight-lifter</v-icon>
        <span>Workouts</span>
    </v-btn>
    <v-btn to="/routines">
        <v-icon>mdi-notebook</v-icon>
        <span>Routines</span>
    </v-btn>
    <v-btn to="/stats">
        <v-icon>mdi-account-search</v-icon>
        <span>Stats</span>
    </v-btn>
    <v-btn to="/exercises">
        <v-icon>mdi-dumbbell</v-icon>
        <span>Exercises</span>
    </v-btn>
</v-bottom-navigation>
</template>

<style scoped lang="scss">
.v-btn {
    width: 20vw !important;
    min-width: 0px !important;
}
</style>
