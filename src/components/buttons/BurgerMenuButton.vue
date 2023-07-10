<template>
<button class="menu-btn">
    <slot></slot>
</button>
</template>

<style scoped lang="scss">
button {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background-color: var(--button-bg-color);
    color: white;
    padding: 5px;
    width: 35vw;
        min-width: 140px;
}
</style>
