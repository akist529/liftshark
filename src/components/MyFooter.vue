<template>
<v-footer class="bg-primary py-1 d-flex flex-column justify-center align-center">
    <span>Lift Shark © {{ new Date().getFullYear() }} Alex Kist</span>
    <span>Built with <a class="logo" id="vue" aria-label="Vue" href="https://vuejs.org/" target="_blank"></a> with help from <a class="logo" id="vuetify" aria-label="Vuetify" href="https://vuetifyjs.com" target="_blank"></a></span>
    <span>Shark icon <span class="logo" id="shark-icon"></span> by Ehtisham Abid @ FlatIcon</span>
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
        width: 12px;
        height: 12px;
    }

    #vue {
        background-image: url('/public/images/logos/vuejs.svg');
    }

    #vuetify {
        background-image: url('/public/images/logos/vuetify.svg');
    }

    #shark-icon {
        background-image: url('/public/shark.webp');
        filter: invert(1);
    }
}
</style>
