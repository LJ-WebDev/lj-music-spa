<script setup>
import { ref } from 'vue';
import appleMusicIcon from '@/assets/icons/apple-music-icon-96.png';
import spotifyIcon from '@/assets/icons/spotify-square-color-icon-96.png';
import tidalIcon from '@/assets/icons/tidal-square-black-icon-96.png';
import amazonMusicIcon from '@/assets/icons/amazon-music-square-color-icon-96.png';
import youtubeIcon from '@/assets/icons/youtube-app-icon-96.png';
import soundcloudIcon from '@/assets/icons/soundcloud-square-color-icon-96.png';

const platforms = ref([
  {
    url: 'https://music.apple.com/au/artist/lj-music/1779913125',
    img: appleMusicIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-apple),_0_0_2rem_theme(color-apple)]',
  },
  {
    url: 'https://open.spotify.com/artist/3N4XRfTpU82HD2mxy9sFbi',
    img: spotifyIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-spotify),_0_0_2rem_theme(color-spotify)]',
  },
  {
    url: 'https://listen.tidal.com/artist/53337213',
    img: tidalIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-tidal),_0_0_2rem_theme(color-tidal)]',
  },
  {
    url: 'https://music.amazon.com.au/artists/B0DTK3HW2M/lj-music',
    img: amazonMusicIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-amazon),_0_0_2rem_theme(color-amazon)]',
  },
  {
    url: 'https://www.youtube.com/channel/UCmKZiD8OpGllxswOmoSTTaw',
    img: youtubeIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-youtube),_0_0_2rem_theme(color-youtube)]',
  },
  {
    url: 'https://soundcloud.com/lj-music-968431961',
    img: soundcloudIcon,
    color:
      'group-hover:shadow-[0_0_1rem_theme(color-soundcloud),_0_0_2rem_theme(color-soundcloud)]',
  },
]);
</script>

<template>
  <li
    v-for="platform in platforms"
    :key="platform.url"
    class="px-[0.5rem] py-[1rem]"
  >
    <a :href="platform.url" target="_blank" class="group">
      <img
        :src="platform.img"
        class="duration-300 group-hover:rounded-[50%] group-hover:mb-[15px]"
        :class="platform.color"
      />
    </a>
  </li>
</template>
