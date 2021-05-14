// 63) Евент листенерээ тохируулъя, гарны эвенттэй ажиллах
// Дэлгэцтэй холбоотой модулиа үүсгэе.
var uiController = (function () {
  // index.html файлын утгуудыг нэг доор бөөгнүүлэх, дараа өөрчлөлт хийхэд хялбар болгох үүднээс DOMstrings гэсэн обьект үүсгээд бөгнүүлэх кодыг дараах байдлаар бичлээ.
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc, exp буюу +, - утгууд буцаана
        description: document.querySelector(DOMstrings.inputDescription).value, //
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    // DOMstrings гэсэн хамгаалагдсан өгөгдлийг getDOMstrings функцээр дамжуулаад public болгож буцааж байна.
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Санхүүтэй ажиллах контроллер

var financeController = (function () {
  // байгуулагч функц ашиглаад обьект үүсгэе.
  //private data
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private data
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
      var item, id;
      // id bol identification буюу тодорхойлж өгдөг зүйл, давтагдах ёсгүй.

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
    },

    seeData: function () {
      return data;
    },
  };
})();

// Программын холбогч конторл
// appController  нь холбогч контроллер - дэлгэцны контрол/uiController болон financeController уудыг холбох, мөн бусад зүйлийг зохицуулах кодыг бичнэ.
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //  Click хийхэд хийгдэх үйлдэл.
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();
    //console.log(uiController.data);
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контороллерт дамжуулж тэнд хадгална.
    financeController.addItem(input.type, input.description, input.value);
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцог дэлгэцэнд гаргана.
  };

  //setupEventlisteners функц нь event -uudiig netgesen baidlaar байгуулж өгч байгаа private функц байна.
  var setupEventlisteners = function () {
    // DOMstrings гэсэн хамгаалагдсан өгөгдлийг getDOMstrings функцээр дамжуулаад public болгож буцааж байгаа өгдлийг uiController функцээр нь дамжуулаад DOM-д өгч байна.
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      //console.log(/*"Товч дарагдлаа " +*/ event);
      //Keecode -ийг http://keycodes.atjayjo.com/ гэх мэт сайтуудаас харж болно. Эсвэл дээрх байдлаар event нь дуудаж ажиллуулаад browser-ийн consol дээрээс нээгээд харж болно. Дээр үеийн browser дээр keycode гэж байхгүй which гэж байдаг тул мөн which -ийг шалгах хэрэгтэй.

      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started .....");
      setupEventlisteners();
    },
  };
})(uiController, financeController);

// appController оор дамжуулан init функцыг дуудаж программыг эхлүүлдэг болголоо.

// init функцээ дуудаж ажиллуулая.
appController.init();
