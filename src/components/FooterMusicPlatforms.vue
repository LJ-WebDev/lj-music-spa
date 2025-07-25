<script setup>
import { ref } from 'vue';

const clickedUrls = ref([]);

const platforms = ref([
  {
    title: 'Apple Music',
    url: 'https://music.apple.com/au/artist/lj-music/1779913125',
    textColor: 'group-hover:text-[theme(color-apple)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-apple),_0_0_2rem_theme(color-apple)]',
  },
  {
    title: 'Spotify',
    url: 'https://open.spotify.com/artist/3N4XRfTpU82HD2mxy9sFbi',
    textColor: 'group-hover:text-[theme(color-spotify)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-spotify),_0_0_2rem_theme(color-spotify)]',
  },
  {
    title: 'Tidal',
    url: 'https://listen.tidal.com/artist/53337213',
    textColor: 'group-hover:text-[theme(color-tidal)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-light-tidal),_0_0_2rem_theme(color-light-tidal)]',
  },
  {
    title: 'Amazon Music',
    url: 'https://music.amazon.com.au/artists/B0DTK3HW2M/lj-music',
    textColor: 'group-hover:text-[theme(color-amazon)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-amazon),_0_0_2rem_theme(color-amazon)]',
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/channel/UCmKZiD8OpGllxswOmoSTTaw',
    textColor: 'group-hover:text-[theme(color-youtube)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-youtube),_0_0_2rem_theme(color-youtube)]',
  },
  {
    title: 'YouTube Music',
    url: 'https://music.youtube.com/channel/UCmKZiD8OpGllxswOmoSTTaw',
    textColor: 'group-hover:text-[theme(color-music-youtube)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-music-youtube),_0_0_2rem_theme(color-music-youtube)]',
  },
  {
    title: 'SoundCloud',
    url: 'https://soundcloud.com/lj-music-968431961',
    textColor: 'group-hover:text-[theme(color-soundcloud)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-soundcloud),_0_0_2rem_theme(color-soundcloud)]',
  },
  {
    title: 'Deezer',
    url: 'https://www.deezer.com/en/artist/289807371',
    textColor: 'group-hover:text-[theme(color-deezer)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-deezer),_0_0_2rem_theme(color-deezer)]',
  },
  {
    title: 'Boomplay',
    url: 'https://www.boomplay.com/artists/82567515',
    textColor: 'group-hover:text-[theme(color-boomplay)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-boomplay),_0_0_2rem_theme(color-boomplay)]',
  },
  {
    title: 'iHeartRadio',
    url: 'https://www.iheart.com/artist/lj-music-44670225',
    textColor: 'group-hover:text-[theme(color-iheart)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-iheart),_0_0_2rem_theme(color-iheart)]',
  },
  {
    title: 'JioSavaan',
    url: 'https://www.jiosaavn.com/artist/lj-music-songs/vBjLTVbasLQ',
    textColor: 'group-hover:text-[theme(color-jiosaavn)]',
    hoverText:
      'text-shadow-[0_0_1rem_theme(color-jiosaavn),_0_0_2rem_theme(color-jiosaavn)]',
  },
]);

function handleClick(url) {
  if (!clickedUrls.value.includes(url)) {
    clickedUrls.value.push(url);
  }
}
</script>

<template>
  <ul class="flex-col !items-end">
    <li v-for="platform in platforms" :key="platform.url" class="group">
      <a
        :href="platform.url"
        target="_blank"
        :class="[
          platform.hoverText,
          'group-hover:text-black group-hover:pr-[2rem]',
          clickedUrls.includes(platform.url)
            ? 'text-black hover:text-white'
            : '',
          'group-active:text-white',
        ]"
        class="w-full"
        @click="handleClick(platform.url)"
        >{{ platform.title }}</a
      >
    </li>
  </ul>
</template>
