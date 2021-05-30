// 63) Евент листенерээ тохируулъя, гарны эвенттэй ажиллах

// Дэлгэцтэй холбоотой модулиа үүсгэе.
// Дэлгэцтэй ажилладаг контроллер
var uiController = (function () {
  // index.html файлын утгуудыг нэг доор бөөгнүүлэх, дараа өөрчлөлт хийхэд хялбар болгох үүднээс DOMstrings гэсэн обьект үүсгээд бөгнүүлэх кодыг дараах байдлаар бичлээ.
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentagelLabel: ".budget__expenses--percentage",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc, exp буюу +, - утгууд буцаана
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    // DOMstrings гэсэн хамгаалагдсан өгөгдлийг getDOMstrings функцээр дамжуулаад public болгож буцааж байна.
    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue,
      );

      // Convert List to Array
      // fieldsArr хувьсагчид array обьектын prototype удамшилаар дамжуулан slice функцыг дуудаж байна.
      // өөрөө хэлбэл var fieldsArr = new Array(); үүнтэй төстэй юм.
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });
      // дараах мөр код нь Массивын 0-р элементэд курсорыг шилжүүлж байна.
      fieldsArr[0].focus();
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },

    tusviigUzuulekh: function (tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalsInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalsExp;
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentagelLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentagelLabel).textContent =
          tusuv.huvi;
      }
    },

    addListItem: function (item, type) {
      //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">$$DESCRIPTION$$</div>  <div class="right clearfix">   <div class="item__value">$$VALUE$$</div>  <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>  </div>  </div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%">    <div class="item__description">$$DESCRIPTION$$</div>  <div class="right clearfix">  <div class="item__value">$$VALUE$$</div>  <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>   </div> </div>';
      }
      // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      //Бэлтгэсэн HTML ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  // Орлого тооцоололт
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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

    tusuv: 0,
    huvi: 0,
  };

  return {
    tusuvTootsooloh: function () {
      // Нийт орлогын нийлбэрийг тооцоолох
      calculateTotal("inc");

      // Нийт зарлагын нийлбэрийг тооцоолох
      calculateTotal("exp");

      // ТӨсвйг шинээр тооцоолох
      data.tusuv = data.totals.inc - data.totals.exp;

      // Орлого зарлагын хувийг тооцоолно.
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalsInc: data.totals.inc,
        totalsExp: data.totals.exp,
      };
    },

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

      return item;
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
    if (input.description !== "" && input.value !== "") {
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контороллерт дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value,
      );
      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // 4. Төсвийг тооцоолно.

      financeController.tusuvTootsooloh();

      // 5. Эцсийн үлдэгдэл, тооцог дэлгэцэнд гаргана.

      var tusuv = financeController.tusuviigAvah();

      // 6. Төсвийн тооцоог дэлгэцэнд гаргана.
      uiController.tusviigUzuulekh(tusuv);
      //console.log(tusuv);
    }
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
      // програм эхлэхэд өгөгдлүүдийг нойллож өгөх функцийг доорх мөр кодонд бичие.
      uiController.tusviigUzuulekh({
        tusuv: 0,
        huvi: 0,
        totalsInc: 0,
        totalsExp: 0,
      });
      setupEventlisteners();
    },
  };
})(uiController, financeController);

// appController оор дамжуулан init функцыг дуудаж программыг эхлүүлдэг болголоо.

// init функцээ дуудаж ажиллуулая.
appController.init();
