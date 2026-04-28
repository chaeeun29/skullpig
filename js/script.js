// sec01 - 배너 스와이퍼
const bannerSwiper = new Swiper('.sec01 .banner', {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

// mypage - 카운트 효과
$(function () {
  let isCounted = false;

  function countUp() {
    $('.mypage .count').each(function () {
      const $this = $(this);
      const target = Number($this.data('target'));
      const suffix = $this.data('suffix') || '';
      const duration = 1000;
      const startTime = Date.now();

      function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);

        $this.text(current.toLocaleString() + suffix);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          $this.text(target.toLocaleString() + suffix);
        }
      }

      update();
    });
  }

  function mypageMotion() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    const sectionTop = $('.mypage').offset().top;

    if (!isCounted && windowBottom > sectionTop + 100) {
      isCounted = true;

      $('.progress-bar').each(function () {
        const progress = $(this).data('progress');
        $(this).css('--progress', progress + '%');
      });

      $('.mypage').addClass('is-active');
      countUp();
    }
  }

  $(window).on('scroll', mypageMotion);
  mypageMotion();
});

// sec02 - 아코디언
$('.sec02 .category-accordion .acc-title').on('click', function () {
  const $item = $(this).closest('.acc-item');
  const category = $item.data('category');

  if ($item.hasClass('active')) return;

  // 오른쪽 아코디언 초기화
  $('.sec02 .acc-item').removeClass('active');
  $('.sec02 .acc-content').stop(true, true).slideUp(280, 'swing');
  $('.sec02 .toggle').text('+');

  // 클릭한 항목 열기
  $item.addClass('active');
  $item.find('.acc-content').stop(true, true).slideDown(320, 'swing');
  $item.find('.toggle').text('−');

  // 왼쪽 이미지 변경
  $('.sec02 .left .img-set').removeClass('active');
  $('.sec02 .left .img-set[data-category="' + category + '"]').addClass('active');
});

// sec03 - 슬라이드
// Lookbook Swiper
$(function () {
  const lookbookSwiper = new Swiper('.lookbook__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 700,

    navigation: {
      nextEl: '.lookbook-next',
      prevEl: '.lookbook-prev',
    },
  });
});

// sec04 - tab메뉴 
$('.sec04 .best__tabs button').on('click', function () {
  const filter = $(this).data('filter');

  $('.sec04 .best__tabs button').removeClass('is-active');
  $(this).addClass('is-active');

  $('.sec04 .best__panel').removeClass('is-active').hide();
  $('.sec04 .best__panel[data-category="' + filter + '"]').addClass('is-active').show();
});

// sec05 - tab메뉴
$('.sec05 .new__tabs button').on('click', function () {
  const filter = $(this).data('filter');

  $('.sec05 .new__tabs button').removeClass('is-active');
  $(this).addClass('is-active');

  $('.sec05 .new__panel').removeClass('is-active').hide();
  $('.sec05 .new__panel[data-category="' + filter + '"]').addClass('is-active').show();
});

// sec07 - 자동 슬라이드
const $tabs = $('.sec07 .fit__tabs button');
const $panels = $('.sec07 .fit__panel');

let current = 0;
const total = $tabs.length;
let autoSlide;

function showFit(index) {
  const target = $tabs.eq(index).data('fit');

  $tabs.removeClass('is-active');
  $tabs.eq(index).addClass('is-active');

  $panels.removeClass('is-active');
  $panels.filter('[data-fit="' + target + '"]').addClass('is-active');
}

// 자동 시작
function startAuto() {
  autoSlide = setInterval(() => {
    current = (current + 1) % total;
    showFit(current);
  }, 3000);
}

// 자동 멈춤
function stopAuto() {
  clearInterval(autoSlide);
}

startAuto();

// 클릭
$tabs.on('click', function () {
  current = $(this).index();
  showFit(current);
});

// hover 멈춤
$('.sec07 .fit').on('mouseenter', stopAuto);
$('.sec07 .fit').on('mouseleave', startAuto);

// sec09 - 슬라이드
// sec09 - find your fit tabs
const $fitTabs = $('.sec09 .fit__tabs button');
const $fitPanels = $('.sec09 .find__panel');

$fitTabs.on('click', function () {
  const target = $(this).data('fit');

  $fitTabs.removeClass('is-active');
  $(this).addClass('is-active');

  $fitPanels.removeClass('is-active');
  $fitPanels.filter('[data-fit="' + target + '"]').addClass('is-active');
});