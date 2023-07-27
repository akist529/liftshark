<template>
<button class="CloseButton"></button>
</template>

<style scoped lang="scss">
.CloseButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;
    position: absolute;
        right: 5px;
        top: 5px;

    /* Visual */
    padding: 5px;
    background: none;
    border: none;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.25s ease;

    &:hover {
        animation: rotate 0.25s ease-in-out;
        transform: rotate(90deg);
        filter: invert(26%) sepia(75%) saturate(4623%) hue-rotate(349deg) brightness(95%) contrast(145%);
    }

    &::after {
        display: inline-block;
        content: '';
        width: 20px;
        height: 20px;
        background-image: url('/public/images/icons/close.svg');
        background-repeat: no-repeat;
        background-size: contain;
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
