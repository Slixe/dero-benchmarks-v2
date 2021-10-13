<template>
<button class="btn">
    <slot></slot>
</button>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.btn {
    width: 100%;
    min-height: 3rem;
    border-radius: 4px;
    background-color: #7289da;
    border-color: #7289da;
    color: white;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
}
</style>