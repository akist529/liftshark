<template>
    <button>
        <div class="add-button-content">
            <slot></slot>
        </div>
    </button>
</template>

<style scoped lang="scss">
    button {
        background-color: var(--button-bg-color);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        :slotted(.add-button-content) {
            display: flex;
            align-items: center;
            gap: 10px;

            img {
                filter: invert(100%);
            }
        }
    }
</style>
