<script setup>
import HeaderMusicPlatforms from './HeaderMusicPlatforms.vue';
</script>

<template>
  <header
    class="font-1 font-bold text-[2.8rem] sticky flex flex-row justify-center sm:justify-between items-center w-full h-[7rem] my-[1.5rem] mx-auto p-[0.75rem] rounded-3xl bg-[#c0c5d5] shadow-[0_0_2rem_#c0c5d5] z-100 [&>*]:mx-[1.5rem] [&>*]:min-w-fit [&_*]:h-full [&_*]:flex [&_*]:flex-row [&_*]:items-center [&_*]:duration-300"
  >
    <div>
      <RouterLink to="/" class="hover:pl-[2rem] duration-300">
        <img
          src="@/assets/logos/lj_music-logo-large-transparent_bg-2.png"
          alt="LJ Music"
        />
      </RouterLink>
    </div>

    <!-- <nav>
      <ul>
        <li>
          <RouterLink to="/" class="nav-link">HOME</RouterLink>
        </li>
        <li>
          <RouterLink to="/releases" class="nav-link">RELEASES</RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="nav-link">ABOUT</RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="nav-link">CONTACT</RouterLink>
        </li>
      </ul>
    </nav> -->
    <div
      class="w-full text-[#380502] font-2 italic !hidden sm:!flex justify-center"
    >
      <p class="">Upcoming Release &ndash; Falling Light &ndash; 20/02/2026</p>
    </div>

    <div class="!hidden sm:!flex">
      <ul>
        <HeaderMusicPlatforms />
      </ul>
    </div>
  </header>
</template>
