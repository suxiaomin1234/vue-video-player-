<template>
  <div class="boxs">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="swipimage">
            <img src="../../assets/image/1305281023137168370.jpg" />
          </div>
        </div>
        <div class="swiper-slide">
          <video-player
            id="videone"
            :sources="sources"
            :cover_url="cover_url"
            @onPlayerPlay="onPlayerPlay"
            @onPlayerPause="onPlayerPause"
            @onPlayerEnded="onPlayerEnded"
            @init="init"
          />
        </div>
        <div class="swiper-slide">
          <div class="swipimage">
            <img src="../../assets/image/W020150511645104991642.jpg" />
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>-->

      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";
import videoPlayer from "@/components/videoPlayer/index";
export default {
  name: "Home",
  components: {
    videoPlayer,
  },
  data() {
    return {
      mySwiper: "",
      myPlay: "",
      sources: [
        {
          type: "application/x-mpegURL",
          type: "video/ogg",
          type: "video/webm",
          type: "video/mp4",
          src: require("../../assets/video/movie.ogg"),
        },
      ],
      soura: [
        require("../../assets/video/movie.ogg"),

        require("../../assets/video/234.mp4"),
      ],
      numOff:0,
      cover_url: "",
      indexs: "",
    };
  },
  computed: {},
  mounted() {
    this.setSWIPER();
  },
  methods: {
    setSWIPER() {
      let that = this;
      this.mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal", // 垂直切换选项
        loop: true, // 循环模式选项
        speed: 3000,
        initialSlide: 0,
        autoplay: true,
        grabCursor: true,
        height: window.innerHeight,
        autoplayDisableOnInteraction: true, // 用户操作swiper之后，是否禁止autoplay
        // 如果需要分页器
        // pagination: ".swiper-pagination",
        onAutoplay: function (swiper) {
          // 自动切换
          this.indexs = swiper.activeIndex;
          if (swiper.activeIndex == 2) {
            swiper.stopAutoplay();
            that.stopScoll();
          }
        },

        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },

        // 如果需要滚动条
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        // },
      });
    },
    // 停止滚动--播放视频
    stopScoll(n) {
      this.mySwiper.stopAutoplay();
      // 开始播放视频
      this.myPlay.play();
    },
    init(ev) {
      this.myPlay = ev;
    },
    onPlayerPlay(ev) {
      // 点击播放
      console.log("播放开始", ev);
    },
    onPlayerPause(ev) {
      // 播放暂停
      // console.log("播放暂停", ev);
    },
    onPlayerEnded(ev) {
      // 播放结束
      console.log(ev);
      this.mySwiper.startAutoplay();
      setTimeout(()=>{
        ev.reset();
        if (this.numOff == 1) {
          ev.src(this.soura[0]);
          this.numOff = 0;
          this.myPlay.pause()
        } else {
          ev.src(this.soura[1]);
          this.numOff = 1;
          this.myPlay.pause()
        }
      },2000)
      
      // this.myPlay.currentTime(0)
    },
  },
};
</script>
<style>
/* @import "swiper/dist/css/swiper.css"; */
.boxs {
  width: 100%;
  height: 100vh;
}
.swiper-container {
  width: 100%;
  height: 100%;
  /* background: #ff0; */
}
.swipimage {
  width: 100%;
  height: 100%;
}
.swipimage img {
  width: 100%;
  vertical-align: center;
  height: 100%;
}
</style>
