<template>
<button class="StrongButton">
    <slot></slot>
</button>
</template>

<style scoped lang="scss">
.StrongButton {
    background-color: var(--error-color);
    color: white;
    font-size: 1.5rem;
    border: none;
        border-radius: 3px;
    padding: 5px 10px;
}
</style>
