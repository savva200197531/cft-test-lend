// js
import Slider from './js/slider';

const groupsSlider = new Slider(
  'http://localhost:3000/data/groups-slider.json',
  false,
  'groups-slider',
  'slide-groups-template',
  ['slide-bg', 'slide-title', 'slide-age-start', 'slide-age-end', 'slide-description']
);

groupsSlider.getSlides();

const videosSlider = new Slider(
  'http://localhost:3000/data/videos-slider.json',
  true,
  'videos-slider',
  'slide-videos-template',
  ['slide-img']
);
videosSlider.getSlides();

// css
import './scss/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
