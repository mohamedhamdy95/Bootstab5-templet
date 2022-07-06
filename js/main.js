const progressDiv = document.querySelector(".progress-div");
const progressBar = document.querySelectorAll(".progress-bar");
const counterDiv = document.querySelector(".counter-div");
const counterTag = document.querySelectorAll(".counter-div h3");

/********* Scrolling **********/
ScrollOut({
  targets: ".progress-div , .counter-div",
});
window.addEventListener("scroll", function () {
  // ************ Progres  ********************//
  if (progressDiv.dataset.scroll == "in") {
    progressBar.forEach((bar) => {
      let valueNow = bar.getAttribute("aria-valuenow");
      bar.style.width = valueNow + "%";
      let counterSpan = bar.parentElement.parentElement.querySelector(
        ".progress-value span"
      );
      let timer = setInterval(() => {
        if (Number(counterSpan.textContent) < valueNow) {
          counterSpan.textContent = Number(counterSpan.textContent) + 1;
        } else {
          clearInterval(timer);
        }
      }, 200);
    });
  } else {
    progressBar.forEach((bar) => {
      bar.style.width = 0 + "%";
      bar.parentElement.parentElement.querySelector(
        ".progress-value span"
      ).textContent = 0;
    });
  }

  // ************ Counter  ********************//

  // if (counterDiv.dataset.scroll == "in") {
  //   counterTag.forEach((el) => {
  //     let timer = setInterval(() => {
  //       if (Number(el.innerHTML) < el.dataset.counter) {
  //         el.innerHTML = Number(el.innerHTML) + 1;
  //       } else {
  //         clearInterval(timer);
  //       }
  //     }, 1000);
  //   });
  // } else {
  //   counterTag.forEach((el) => {
  //     el.innerHTML = 0;
  //   });
  // }

  if (counterDiv.dataset.scroll == "in") {
    counterTag.forEach((e) => {
      let timer = setInterval(() => {
        Number(e.innerHTML) < e.dataset.counter
          ? (e.innerHTML = Number(e.innerHTML) + 1)
          : clearInterval(timer);
      }, 500);
    });
  } else {
    counterTag.forEach((e) => {
      e.innerHTML = 0;
    });
  }
});

// ************ Filter Item  ********************//

const filteredItem = document.querySelectorAll(".filter-div a");
const filterListItem = document.querySelectorAll(".list-group li");
filterListItem.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".list-group li.active").classList.remove("active");
    item.classList.add("active");
    let filterValue = item.dataset.filter;
    console.log(filterValue);
    filteredItem.forEach((item) => {
      if (item.classList.contains(filterValue)) {
        console.log(item);
        item.classList.remove("hidden");
        item.classList.add("active");
      } else {
        item.classList.remove("active");
        item.classList.add("hidden");
      }
    });
  });
});

// ************ Galary  ********************//
lightGallery(document.getElementById("galary"), {});

// ************ AOS Animation  ********************//

AOS.init();
