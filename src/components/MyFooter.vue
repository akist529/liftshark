<template>
<v-footer class="bg-primary py-1 d-flex justify-space-around align-center">
    <span>Gym Tracker © {{ new Date().getFullYear() }} Alex Kist</span>
    <span>Built with <a class="logo" id="vue" aria-label="Vue" href="https://vuejs.org/" target="_blank"></a> with help from <a class="logo" id="vuetify" aria-label="Vuetify" href="https://vuetifyjs.com" target="_blank"></a></span>
</v-footer>
</template>

<style scoped lang="scss">
footer {
    background: white;
    color: black;
    text-align: center;

    span {
        font-family: var(--content-font);
    }

    .logo {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: inline-block;
        content: '';
        height: 12px;
    }

    #vue {
        background-image: url('/public/images/logos/vuejs.svg');
        width: 48px;
    }

    #vuetify {
        background-image: url('/public/images/logos/vuetify.svg');
        width: 64px;
    }
}
</style>
