<template>
<footer>
    <span>Gym Tracker © {{ new Date().getFullYear() }} Alex Kist</span><br />
    <span>Built with <span class="logo" id="vue" aria-label="Vue"></span> with help from <span class="logo" id="vuetify" aria-label="Vuetify"></span></span>
</footer>
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
