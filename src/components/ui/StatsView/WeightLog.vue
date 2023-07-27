<template>
<section class="WeightLog">
    <h1>Weight Log</h1>
</section>
</template>

<style scoped lang="scss">
.WeightLog {
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
            background-image: url('/public/images/icons/heart.webp');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }
}
</style>
