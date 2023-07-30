<template>
<button
    class="DeleteButton"
></button>
</template>

<style scoped lang="scss">
.DeleteButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    padding: 5px;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &::after {
        display: inline-block;
        content: '';
        width: 16px;
        height: 16px;
        background-image: url('/public/images/icons/delete.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
    }
}
</style>
