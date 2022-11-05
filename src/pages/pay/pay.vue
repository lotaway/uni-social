<template>
    Pay with web3
</template>
<script setup lang="ts">
    import Web3 from "Web3";
    import Web3Utils from "Web3-utils";

    let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.6:5000"));
</script>
