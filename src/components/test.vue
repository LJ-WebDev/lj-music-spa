<script setup>
import { releases } from '@/data/releasesData.js';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const hoveredIndex = ref({});
</script>

<template>
  <section
    v-for="release in releases"
    :key="release.UPC"
    :class="[release.className, release.unreleased ? 'opacity-50' : '']"
    class="group flex flex-row flex-[1_1_20%] relative rounded-[15px] font-1 font-normal text-white text-shadow-[0.2rem_0.2rem_0.5rem_#000] max-w-[60%] min-w-[60rem] h-fit duration-300"
  >
    <RouterLink
      :to="!release.unreleased ? release.className : ''"
      class="flex flex-row gap-x-[1.8rem] w-full h-full p-[1rem]"
    >
      <div class="basis-[30%] rounded-[15px]">
        <img
          :src="release.img"
          class="rounded-[10px] group-hover:mt-[-1.5rem] group-hover:mb-[-0.5rem] group-hover:ml-[-1.5rem] group-hover:max-w-[110%] group-hover:w-[110%] duration-300"
        />
      </div>
      <div class="flex flex-col basis-[70%]">
        <h2
          class="text-[2.8rem]/[3.2rem] group-hover:pl-[1.5rem] group-hover:text-shadow-[-1.5rem_0.1rem_0.5rem_#000] duration-300"
        >
          {{ release.title }}
        </h2>
        <p class="text-[1.8rem]/[2.2rem]">
          {{ release.releaseType }} - {{ release.releaseDate }} •
          {{ release.tracks.length }}
          {{ release.tracks.length === 1 ? 'Track' : 'Tracks' }},
          {{ release.duration }}
        </p>

        <table class="my-auto">
          <thead class="text-[1.6rem]/[3rem]">
            <tr class="border-b-[1px] border-b-[#222]">
              <th class="w-[5%] text-center">#</th>
              <th class="w-[80%] text-left">Table</th>
              <th class="w-[10%] text-right px-[1.4rem]">
                <img
                  src="../assets/icons/clock-icon.png"
                  alt="Duration"
                  class="w-[1.6rem]"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(track, index) in release.tracks"
              :key="track.ISRC"
              @mouseenter="hoveredIndex[release.UPC] = index"
              @mouseleave="hoveredIndex[release.UPC] = null"
              class="group/track"
            >
              <td class="text-center">
                <span v-if="hoveredIndex[release.UPC] !== index">{{
                  index + 1
                }}</span>
                <span v-else>
                  <img
                    src="../assets/icons/play.png"
                    alt="Play"
                    class="w-[2rem] h-[2rem] inline"
                /></span>
              </td>

              <td
                class="text-left group-hover/track:pl-[1.5rem] group-hover/track:text-shadow-[-1.5rem_0.1rem_0.5rem_#000] duration-300"
              >
                {{ track.title }}
              </td>
              <td class="text-left">{{ track.duration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="release.unreleased"
        class="text-[6rem] text-red-600 rotate-345 absolute top-[4rem] left-[20rem]"
      >
        Coming Soon
      </div>
    </RouterLink>
  </section>
</template>
