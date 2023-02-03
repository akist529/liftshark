<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
    button {
        background-color: var(--button-bg-color);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
