!function () {
  function I() {
    document.getElementById("topnav-hamburger-icon") &&
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", w);
    var e = sessionStorage.getItem("defaultAttribute"),
      t = JSON.parse(e),
      e = document.documentElement.clientWidth;
    "twocolumn" == t["data-layout"] &&
      e < 767 &&
      Array.from(
        document.getElementById("two-column-menu").querySelectorAll("li")
      ).forEach(function (e) {
        e.addEventListener("click", function (e) {
          document.body.classList.remove("twocolumn-panel");
        });
      });
  }
  I();
};
