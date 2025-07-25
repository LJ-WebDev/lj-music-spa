<script setup>
import FooterMusicPlatforms from './FooterMusicPlatforms.vue';
</script>

<template>
  <footer
    class="bg-[#152030] shadow-[0_0_2rem_#152030] font-1 text-[1.8rem] text-white flex flex-col sm:flex-row gap-6 sm:gap-0 items-start justify-between w-full h-fit my-[2rem] mx-auto p-[1rem] rounded-3xl [&>*]:mx-[1.5rem] [&>*]:min-w-fit [&>*]:h-full [&_*]:flex [&>*]:flex-row [&_*]:items-center [&_*]:duration-300"
  >
    <div class="!items-start">
      <ul>
        <li class="group">
          <a
            href="mailto:ljmusic61@gmail.com"
            class="group-hover:px-[2rem] group-hover:text-black group-active:text-white text-shadow-[0_0_1rem_#00ee00,_0_0_2rem_#00ee00]"
            target="_blank"
            ><img
              src="@/assets/icons/mail-white-fill.png"
              class="h-[1.8rem] mr-[0.8rem]"
            />ljmusic61@gmail.com</a
          >
        </li>
      </ul>
    </div>
    <div class="self-end">
      <FooterMusicPlatforms />
    </div>
  </footer>
</template>
