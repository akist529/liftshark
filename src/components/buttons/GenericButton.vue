<template>
<v-btn class="GenericButton">
    <slot></slot>
</v-btn>
</template>

<style scoped lang="scss">
.GenericButton {
    background-color: var(--button-bg-color);
    color: white;
    font-size: 1.5rem;
    border: none;
        border-radius: 3px;
    padding: 5px 10px;
}
</style>
