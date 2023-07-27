<template>
<button class="BackButton"></button>
</template>

<style scoped lang="scss">
.BackButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    filter: invert(43%) sepia(9%) saturate(3609%) hue-rotate(182deg) brightness(85%) contrast(86%);

    // Icon
    &::after {
        background-image: url('/public/images/icons/arrow_left.svg');
            background-size: contain;
            background-repeat: no-repeat;
        width: 48px;
        height: 48px;
        content: '';
        filter: invert(1);
        transition: 0.25s;
    }

    &:hover {
        &::after {
            background-image: url('/public/images/icons/double_arrow_left.svg');
            transform: translateX(5px);
        }
    }
}
</style>
