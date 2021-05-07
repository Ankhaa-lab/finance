// 63) Евент листенерээ тохируулъя, гарны эвенттэй ажиллах
// Дэлгэцтэй холбоотой модулиа үүсгэе.
var uiController = (function () {
  return {};
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function () {})();

// appController  нь холбогч контроллер - дэлгэцны контрол/uiController болон financeController уудыг холбох, мөн бусад зүйлийг зохицуулах кодыг бичнэ.
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //  Click хийхэд хийгдэх үйлдэл.
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log("Дэлгэцээс өгөгдөл авах хэсэг ...");
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контороллерт дамжуулж тэнд хадгална.
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцог дэлгэцэнд гаргана.
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    //console.log(/*"Товч дарагдлаа " +*/ event);
    //Keecode -ийг http://keycodes.atjayjo.com/ гэх мэт сайтуудаас харж болно. Эсвэл дээрх байдлаар event нь дуудаж ажиллуулаад browser-ийн consol дээрээс нээгээд харж болно. Дээр үеийн browser дээр keycode гэж байхгүй which гэж байдаг тул мөн which -ийг шалгах хэрэгтэй.
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    } else {
      console.log(" Өөр товч дарсан байна.");
    }
  });
})(uiController, financeController);
