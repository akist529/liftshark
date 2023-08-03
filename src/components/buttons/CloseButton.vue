<template>
<v-btn
    class="CloseButton"
    flat plain>
    <v-icon
        icon="mdi-close"
        size="xx-large"
    ></v-icon>
</v-btn>
</template>

<style scoped lang="scss">
.CloseButton {
    /* Positioning */
    position: absolute;
        right: 5px;
        top: 5px;

    /* Visual */
    background: none;
    transform: rotate(0deg);
    transition: all 0.25s ease;
    min-width: 0;
    width: 32px;
    height: 32px;

    &:hover {
        animation: rotate 0.25s ease-in-out;
        transform: rotate(90deg);

        i {
            filter: invert(26%) sepia(75%) saturate(4623%) hue-rotate(349deg) brightness(95%) contrast(145%);
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(90deg);
    }
}
</style>
