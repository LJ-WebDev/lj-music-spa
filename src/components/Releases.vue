div
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { releases } from '@/data/releasesData.js';
import { RouterLink } from 'vue-router';

const hoveredIndex = ref({});

const videoId = ref('');
const playingTrack = ref(''); // ISRC of currently playing track, default to empty string

function setInitialTrack() {
  const lastRelease = releases[releases.length - 1];
  const lastReleasedRelease = releases[releases.length - 2];
  let firstTrack = '';

  if (lastRelease?.unreleased) {
    firstTrack = lastReleasedRelease?.tracks[0];
  } else {
    firstTrack = lastRelease?.tracks[0];
  }
  videoId.value = firstTrack?.ytId || 'gmlQBIwSB1o';
  playingTrack.value = firstTrack?.ISRC || '';
}

setInitialTrack();

const currentYtLinkTrack = computed(() => {
  for (const release of releases) {
    const track = release.tracks.find((t) => t.ytId === videoId.value);
    if (track) return track.ytLinkTrack;
  }
  return '';
});

const player = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);

const trackProgress = ref({}); // { [ISRC]: percent }
const trackTime = ref({}); // { [ISRC]: seconds }
const trackDuration = ref({}); // { [ISRC]: seconds }

let intervalId;

const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const updateProgress = () => {
  if (player.value && typeof player.value.getCurrentTime === 'function') {
    currentTime.value = player.value.getCurrentTime();
    duration.value = player.value.getDuration();
    progress.value = (currentTime.value / duration.value) * 100;
  }
};

const togglePlayback = () => {
  if (!player.value) return;

  const state = player.value.getPlayerState();

  if (state === 1) {
    player.value.pauseVideo();
    isPlaying.value = false;
    clearInterval(intervalId);
  } else {
    player.value.playVideo();
    isPlaying.value = true;
    intervalId = setInterval(updateProgress, 1000);
  }
};

const playTrack = (track) => {
  playingTrack.value = track.ISRC;
  videoId.value = track.ytId;
  togglePlayback();
};

const initPlayer = async () => {
  if (!window.YT) {
    await new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = resolve;
    });
  }

  player.value = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: videoId.value,
    events: {
      onReady: () => {
        currentTime.value = 0;
        progress.value = 0;
        duration.value = 0;
      },
      onStateChange: (event) => {
        const YT = window.YT.PlayerState;
        if (event.data === YT.PLAYING) {
          isPlaying.value = true;
          duration.value = player.value.getDuration();
          intervalId = setInterval(updateProgress, 1000);
        } else {
          isPlaying.value = false;
          clearInterval(intervalId);
        }
      },
    },
  });
};

watch(
  () => videoId.value,
  (newId) => {
    if (player.value && newId) {
      player.value.loadVideoById(newId);
      isPlaying.value = true;
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (player.value && typeof player.value.getCurrentTime === 'function') {
          const current = player.value.getCurrentTime();
          const dur = player.value.getDuration();
          trackTime.value[playingTrack.value] = current;
          trackDuration.value[playingTrack.value] = dur;
          trackProgress.value[playingTrack.value] = (current / dur) * 100;
        }
      }, 1000);
    }
  }
);

onMounted(initPlayer);
onUnmounted(() => {
  clearInterval(intervalId);
});

const playbackExpanded = ref(false);

function expandPlayback() {
  playbackExpanded.value = !playbackExpanded.value;
}
</script>

<template>
  <footer
    :class="[
      'playback sticky bottom-8 bg-[#000] shadow-[0_0_2rem_#000] font-1 text-white flex gap-[2rem] flex-row items-center justify-center w-full mt-[3rem] mx-auto p-[1rem] rounded-3xl transition-all duration-500 z-100',
      playbackExpanded
        ? 'h-[50rem] text-[2.2rem]/[3.2rem] sm:text-[2.6rem]/[4rem] text-center'
        : 'h-[7rem] text-[1.4rem]/[2rem] sm:text-[2rem]/[2rem]',
    ]"
  >
    <!-- Play / Pause button -->

    <div
      :class="[
        'flex flex-col justify-center ',
        playbackExpanded ? 'basis-[95%]' : 'basis-[75%]',
      ]"
    >
      <div class="flex flex-row justify-between items-end">
        <div @click="togglePlayback" class="cursor-pointer mb-[1rem] w-[3rem]">
          <img v-if="!isPlaying" src="@/assets/icons/play.png" alt="Play" />
          <img v-if="isPlaying" src="@/assets/icons/pause.png" alt="Pause" />
        </div>

        <div
          :class="[
            'mb-4 flex items-center justify-center duration-500',
            playbackExpanded
              ? 'flex-col sm:basis-[25%] basis-[50%]'
              : 'flex-row basis-[75%] gap-3',
          ]"
        >
          <a
            target="_blank"
            :href="currentYtLinkTrack"
            :class="[
              'flex items-center justify-center text-white hover:text-red-500',
              playbackExpanded
                ? 'flex-col gap-[0.8rem]'
                : 'flex-row gap-[0.8rem] sm:gap-[1.5rem]',
            ]"
            title="Open in YouTube"
          >
            <div class="basis-[4rem]">
              <img
                :src="
                  releases.find((r) =>
                    r.tracks.some((t) => t.ISRC === playingTrack)
                  )?.img || ''
                "
                class="rounded-[0.5rem]"
              />
            </div>

            <div>
              {{
                releases
                  .flatMap((r) => r.tracks)
                  .find((t) => t.ISRC === playingTrack)?.title || ''
              }}
            </div>
          </a>
        </div>

        <!-- Time display -->
        <div class="text-sm text-gray-600 pb-[0.5rem]">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-2 bg-gray-300 rounded overflow-hidden">
        <div
          class="h-full bg-red-500 duration-300"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <div
      class="expand-playback absolute right-3 sm:right-10 bottom-5 sm:bottom-4 cursor-pointer w-[4rem]"
      @click="expandPlayback"
    >
      <img src="@/assets/icons/expand.png" />
    </div>

    <!-- Hidden YouTube player -->
    <div id="youtube-player" style="display: none"></div>
  </footer>

  <section
    v-for="release in releases"
    :key="release.UPC"
    :class="[release.className, release.unreleased ? 'opacity-50' : '']"
    class="group flex flex-row flex-[1_1_20%] relative rounded-[15px] font-1 font-normal text-white text-shadow-[0.2rem_0.2rem_0.5rem_#000] max-w-[90%] sm:max-w-[60%] min-w-[35rem] sm:min-w-[60rem] h-fit duration-300"
  >
    <RouterLink
      :to="!release.unreleased ? release.className : ''"
      class="flex flex-col sm:flex-row gap-[1.8rem] w-full h-full p-[1rem]"
    >
      <div class="basis-[30%] rounded-[15px]">
        <img
          :src="release.img"
          class="rounded-[10px] group-hover:mt-[-1.5rem] group-hover:mb-[-0.5rem] group-hover:ml-[-1.5rem] group-hover:max-w-[110%] group-hover:w-[110%] duration-300"
        />
      </div>
      <div class="flex flex-col basis-[70%] gap-y-2 sm:gap-y-0">
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
              <th class="w-[80%] text-left">Track</th>
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
              @click.prevent="playTrack(track)"
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
                    v-if="playingTrack !== track.ISRC || !isPlaying"
                    src="@/assets/icons/play.png"
                    alt="Play"
                    class="w-[2rem] h-[2rem] inline"
                  />
                  <img v-else src="@/assets/icons/pause.png" alt="Pause" />
                </span>
              </td>

              <td
                class="text-left group-hover/track:pl-[1.5rem] group-hover/track:text-shadow-[-1.5rem_0.1rem_0.5rem_#000] duration-300"
              >
                {{ track.title }}
                <!-- Per-track progress bar -->
              </td>
              <td class="text-left">{{ track.duration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="release.unreleased"
        class="text-[6rem] text-red-600 rotate-345 absolute top-[15rem] sm:top-[4rem] left-[5rem] sm:left-[15rem] px-[2rem]"
      >
        Coming Soon
      </div>
    </RouterLink>
  </section>
</template>
