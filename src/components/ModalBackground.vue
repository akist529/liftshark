<template>
<div class="ModalBackground">
    <slot></slot>
</div>
</template>

<style scoped lang="scss">
.ModalBackground {
    /* Positioning */
    width: 100vw;
    height: 100vh;
    position: fixed;
        top: 0;
        left: 0;
        z-index: 2;

    /* Visual */
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
