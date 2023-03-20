<template>
    <button class="menu-btn">
        <slot></slot>
    </button>
</template>

<script lang="ts"></script>

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
