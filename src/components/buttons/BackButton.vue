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
    background-color: var(--button-bg-color);
    padding: 8px 16px;
    border: none;
        border-radius: 10px;
    cursor: pointer;

    // Icon
    &::after {
        background-image: url('/public/images/icons/double_arrow_left.svg');
            background-size: contain;
            background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
        filter: invert(1);
    }
}
</style>
