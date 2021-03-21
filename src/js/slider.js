import { getData } from './getData';

class Slider {
  constructor(
    url,
    navigation,
    container,
    template,
    slideSelectors
  ) {
    this.url = url;
    this.navigation = navigation;
    this.container = document.querySelector(`.${container}`);
    this.template = template;
    this.slideSelectors = slideSelectors;
    this.slidesContainer = null;
    this.dots = null;
    this.slides = [];
    this.counter = 0;

    this.dots = this.container.querySelector('.dots');
    this.slidesContainer = this.container.querySelector('.slides-container');

    const nextBtn = this.container.querySelector('.next-slide');
    const prevBtn = this.container.querySelector('.prev-slide');

    nextBtn.addEventListener('click', this.nextSlide.bind(this));
    prevBtn.addEventListener('click', this.prevSlide.bind(this));
  };

  drawSlider() {
    const slideTemplate = document.querySelector(`.${this.template}`);
    const content = slideTemplate.content;

    // прохожусь по слайдам взятым с json
    this.slides.forEach((slideItem, index) => {

      // навигация / если нужна
      this.setNavigation(index);

      // слайды
      const slideNode = content.cloneNode(content);
      const slide = slideNode.querySelector('.slide');
      slide.setAttribute('data-key', index.toString());

      // динамически наполняю слайд контентом
      this.fillSlide(slide, slideItem, slideNode);

      // задаю изначальые классы слайдам
      this.setSlideClass(index, slide);

      // навешиваю навигацию на клик по слайду, по моему прикольно работает...
      slide.addEventListener('click', () => {
        this.goToSlide(index);
      });

      // вывожу слайды на страницу
      this.slidesContainer.append(slideNode);
    });
  };

  setSlideClass(index, slide) {
    switch (index) {
      case 0:
        slide.classList.add('active');
        break;
      case 1:
        slide.classList.add('next');
        break;
      case this.slides.length - 1:
        slide.classList.add('prev');
        break;
    }
  }

  setNavigation(index) {
    if (this.navigation) {
      const dot = document.createElement('div');
      dot.setAttribute('data-key', index.toString());
      if (index === 0) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {
        this.goToSlide(index);
      })

      this.dots.append(dot);
    }
  }

  fillSlide(slide, slideItem, slideNode) {
    this.slideSelectors.forEach(selector => {
      switch (selector) {
        case 'slide-bg':
          slide.style.backgroundImage = `url('${slideItem[selector]}')`;
          break;
        case 'slide-description':
          slideItem[selector].forEach(descriptionItem => {
            const li = document.createElement('li');
            li.textContent = `-${descriptionItem}`;
            li.classList.add(`${selector}-item`);
            slideNode.querySelector(`.${selector}`).append(li);
          });
          break;
        case 'slide-img':
          slideNode.querySelector(`.${selector}`).src = slideItem[selector];
          break;
        default:
          slideNode.querySelector(`.${selector}`).textContent = slideItem[selector];
      }
    })
  }


  nextSlide() {
    this.counter++;
    if (this.counter > this.slides.length - 1) {
      this.counter = 0;
    }
    this.slide();
  }

  prevSlide() {
    this.counter--;
    if (this.counter < 0) {
      this.counter = this.slides.length - 1;
    }
    this.slide();
  }

  goToSlide(count) {
    this.counter = count;
    this.slide();
  }

  slide() {
    ['next', 'active', 'prev'].forEach(className => {
      this.slidesContainer.querySelector(`.${className}`)?.classList.remove(className);
    });

    Array.from(this.dots.childNodes).forEach(dot => {
      dot.dataset.key === this.counter.toString() ? dot.classList.add('active') : dot.classList.remove('active')
    });

    const active = this.slidesContainer.querySelector(`[data-key="${this.counter}"]`);

    const next = active?.nextElementSibling || this.slidesContainer.firstElementChild;
    const prev = active?.previousElementSibling || this.slidesContainer.lastElementChild;

    active.classList.add('active');
    next.classList.add('next');
    prev.classList.add('prev');
  }

  getSlides() {
    getData(this.url).then(res => {
      this.slides = res;
      this.drawSlider();
    });
  };
}

export default Slider;
