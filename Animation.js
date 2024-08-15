// use tailwind.css cdn

/* <div class="w-full bg-zinc-900">
  <div class="w-full parent relative h-[800vh]">
    <div class="w-full sticky top-0 left-0 h-screen">
      <canvas class="w-full h-screen" id="frame"></canvas>
    </div>
  </div>
</div> */ 
// use gsap cdn and gsap scrollTrgger cdn in script tag src

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxindex: 382, // edit the total no. of images
};
let imagesLoaded = 0;
const images = [];
function preloadImges() {
  for (var i = 1; i <= frames.maxindex; i++) {
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`; // edit the image file path and image type(jpeg,png,etc)
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxindex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}
function loadImage(index) {
  if (index >= 0 && index <= frames.maxindex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;
  }
}
function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: 2,
    },
  });
  tl.to(frames, {
    currentIndex: frames.maxindex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}
preloadImges();
