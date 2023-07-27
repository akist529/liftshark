<template>
<section class="PRLog">
    <h1>PR Log</h1>
</section>
</template>

<style scoped lang="scss">
.PRLog {
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        &::after {
            display: inline-block;
            content: '';
            width: 48px;
            height: 48px;
            background-image: url('/public/images/icons/weightlift.webp');
                background-repeat: no-repeat;
                background-size: contain;
        }
    }
}
</style>
