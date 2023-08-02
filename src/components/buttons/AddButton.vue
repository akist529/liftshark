<template>
<v-btn
    class="AddButton rounded-circle"
    width="64"
    height="64"
    color="indigo-darken-4"
    variant="tonal">
    <v-icon
        icon="mdi-plus"
        size="xxx-large" />
</v-btn>
</template>

<style scoped lang="scss">
.AddButton {
    /* Visual */
    transform: rotate(0deg);
    transition: 0.25s ease-out;

    &:hover {
        transform: rotate(90deg);
    }
}
</style>
