<template>
<button class="SubmitButton"></button>
</template>

<style scoped lang="scss">
.SubmitButton {
    border: none;
    background: none;
    cursor: pointer;

    &::after {
        display: inline-block;
        content: '';
        width: 40px;
        height: 40px;
        background-image: url('/public/images/icons/add_circle.svg');
            background-repeat: no-repeat;
            background-size: contain;
    }
}
</style>
