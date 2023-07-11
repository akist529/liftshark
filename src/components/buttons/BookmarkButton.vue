<template>
<button class="BookmarkButton not-favorited"></button>
</template>

<style scoped lang="scss">
.BookmarkButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;

    &::after {
        background-size: contain;
            background-repeat: no-repeat;
        width: 64px;
        height: 64px;
        content: '';
    }
}

.not-favorited {
    &::after {
        background-image: url('/public/images/icons/heart_plus.svg');
    }

    &:hover {
        &::after {
            filter: invert(65%) sepia(15%) saturate(6854%) hue-rotate(295deg) brightness(101%) contrast(102%);
        }
    }
}

.favorited {
    &::after {
        background-image: url('/public/images/icons/favorite.svg');
        filter: invert(65%) sepia(15%) saturate(6854%) hue-rotate(295deg) brightness(101%) contrast(102%);
    }
}
</style>
