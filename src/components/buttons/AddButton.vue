<template>
    <button class="add-button-content">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
    button {
        background-color: var(--button-bg-color);
        color: white;
        padding: 5px;
        width: 35vw;
        min-width: 140px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
