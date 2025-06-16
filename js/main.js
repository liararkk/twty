const images = [
  "img/img01.jpg",
  "img/img02.jpg",
  "img/img03.jpg"
];

let currentIndex = 0;
let showingA = true;

const imgA = document.getElementById("imgA");
const imgB = document.getElementById("imgB");

// 초기 세팅
imgA.src = images[currentIndex];

function showNextImage() {
  const current = showingA ? imgA : imgB;
  const next = showingA ? imgB : imgA;

  // 다음 이미지 설정
  const nextIndex = (currentIndex + 1) % images.length;
  next.src = images[nextIndex];

  // 초기 위치 오른쪽
  next.style.transition = "none"; // 트랜지션 잠시 제거
  next.style.transform = "translateX(100%)";
  next.style.zIndex = 2;
  current.style.zIndex = 1;

  // 강제 리플로우로 위치 반영
  void next.offsetWidth;

  // 트랜지션 복원 후 애니메이션 시작
  next.style.transition = "transform 0.8s ease-in-out";
  next.style.transform = "translateX(0)";

  currentIndex = nextIndex;
  showingA = !showingA;
}

setInterval(showNextImage, 3000);
