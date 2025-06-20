document.addEventListener("DOMContentLoaded", () => {
  const images = ["img/img01.jpg", "img/img02.jpg", "img/img03.jpg"];
  let index = 0;
  let showingA = true;
  const intervalTime = 4000;

  const imgA = document.getElementById("main-imgA");
  const imgB = document.getElementById("main-imgB");
  const staticMenuItems = document.querySelectorAll(".static-index li");

  imgA.src = images[index];
  gsap.set(imgA, { opacity: 1, zIndex: 2 });
  gsap.set(imgB, { opacity: 0, zIndex: 1 });

  function switchImage(nextIndex) {
    const current = showingA ? imgA : imgB;
    const next = showingA ? imgB : imgA;

    next.src = images[nextIndex];
    gsap.set(next, { opacity: 0, zIndex: 3 });

    gsap.to(next, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(current, { zIndex: 1 });
        gsap.set(next, { zIndex: 2 });
      },
    });

    index = nextIndex;
    showingA = !showingA;
  }

  // 자동 슬라이드
  setInterval(() => {
    const nextIndex = (index + 1) % images.length;
    switchImage(nextIndex);
  }, intervalTime);

  // 번호 클릭 시 강제 이동
  staticMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetIndex = parseInt(item.getAttribute("data-index"));
      if (targetIndex !== index) {
        switchImage(targetIndex);
      }
    });
  });
});
