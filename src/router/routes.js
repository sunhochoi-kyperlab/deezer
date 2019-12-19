const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home/Home'),
    children: [
      {
        path: 'now-playing',
        name: 'now-playing',
        component: () => import('@/components/screen/NowPlaying')
      },
      {
        path: 'play-list',
        name: 'play-list',
        component: () => import('@/components/list/ListPlay')
      },
      {
        path: 'flows',
        name: 'flows',
        component: () => import('@/components/screen/NowPlaying')
      },
      {
        path: 'editors-pick',
        name: 'editors-pick',
        component: () => import('@/components/list/ListAlbum')
      },
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/components/list/ListCharts')
      },
      {
        path: 'new-release',
        name: 'new-release',
        component: () => import('@/components/list/ListAlbum')
      },
      {
        path: 'shuffle-list-track',
        name: 'shuffle-list-track',
        component: () => import('@/components/list/ListShuffleTrack')
      },
      {
        path: 'charts_tracks',
        name: 'charts_tracks',
        component: () => import('@/components/list/ListShuffleTrack')
      },
      {
        path: 'charts_playlist',
        name: 'charts_playlist',
        component: () => import('@/components/list/ListNotShufflePlayLists')
      },
      {
        path: 'charts_albums',
        name: 'charts_albums',
        component: () => import('@/components/list/ListNotShuffleAlbums')
      },
      {
        path: 'charts_artists',
        name: 'charts_artists',
        component: () => import('@/components/list/ListNotShuffleArtist')
      },
      {
        path: 'mixes',
        name: 'mixes',
        component: () => import('@/components/list/ListMixes')
      },
      {
        path: 'mixes_popular',
        name: 'mixes_popular',
        component: () => import('@/components/list/ListNotShuffleRadio')
      },
      {
        path: 'mixes_genre',
        name: 'mixes_genre',
        component: () => import('@/components/list/ListNotShuffleRadio')
      },
      {
        path: 'mixes_mood',
        name: 'mixes_mood',
        component: () => import('@/components/list/ListNotShuffleRadio')
      },
      {
        path: 'my-music',
        name: 'my-music',
        component: () => import('@/components/list/ListMyMusic')
      },
      {
        path: 'my_music_recently',
        name: 'my_music_recently',
        component: () => import('@/components/list/ListShuffleTrack')
      },
      {
        path: 'my_music_favorite_tracks',
        name: 'my_music_favorite_tracks',
        component: () => import('@/components/list/ListShuffleTrack')
      },
      {
        path: 'my_music_favorite_playlist',
        name: 'my_music_favorite_playlist',
        component: () => import('@/components/list/ListNotShufflePlayLists')
      },
      {
        path: 'my_music_favorite_albums',
        name: 'my_music_favorite_albums',
        component: () => import('@/components/list/ListNotShuffleAlbums')
      },
      {
        path: 'my_music_favorite_artists',
        name: 'my_music_favorite_artists',
        component: () => import('@/components/list/ListNotShuffleArtist')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/components/screen/Search')
      },
      {
        path: 'need_login',
        name: 'need_login',
        component: () => import('@/components/screen/NeedLogin')
      }
    ]
  }
]

export default routes
