document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const slideMenu = document.getElementById("slideMenu");

  // 메뉴 열기
  menuBtn.addEventListener("click", () => {
    slideMenu.classList.add("open");
    document.body.classList.add("menu-open");
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";
  });

  // 메뉴 닫기
  closeBtn.addEventListener("click", () => {
    slideMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    closeBtn.style.display = "none";
    menuBtn.style.display = "block";
  });
});
