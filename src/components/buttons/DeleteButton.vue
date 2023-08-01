<template>
<v-btn
    class="DeleteButton"
    flat
    width="24"
    height="24">
    <v-icon
        icon="mdi-delete"
        size="large"
    ></v-icon>
</v-btn>
</template>

<style scoped lang="scss">
.DeleteButton {
    /* Visual */
    background: none;

    &:hover {
        background: rgba(0,0,0,0.1);
    }
}
</style>
