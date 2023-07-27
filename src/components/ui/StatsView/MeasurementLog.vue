<template>
<section class="MeasurementLog">
    <h1>Measurement Log</h1>
</section>
</template>

<style scoped lang="scss">
.MeasurementLog {
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
            background-image: url('/public/images/icons/tape.webp');
                background-repeat: no-repeat;
                background-size: contain;
        }
    }
}
</style>
