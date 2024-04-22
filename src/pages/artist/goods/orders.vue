<template>
  <div></div>
</template>

<script setup>
import { getArtist } from '@/api/artist'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return
  }

  const artist = await getArtist()
  if (!artist) {
    router.replace('/apply')
    return
  }
})
</script>

<style lang="scss" scoped></style>
