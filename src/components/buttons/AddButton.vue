<template>
<button
    class="AddButton"
    type="button"
></button>
</template>

<style scoped lang="scss">
.AddButton {
    /* Visual */
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #4267B2;
    width: 64px;
    height: 64px;
    position: fixed;
    bottom: 80px;
    right: 10px;
    transform: rotate(0deg);
    transition: 0.25s ease-out;

    &::after {
        display: inline-block;
        background-image: url('/public/images/icons/add.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        content: '';
        width: 64px;
        height: 64px;
        filter: invert(1);
    }

    &:hover {
        transform: rotate(90deg);
    }
}
</style>
