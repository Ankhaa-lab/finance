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
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  // Доорх nodeListForeach функцэд өгч байгаа list бол лист байх бол callback нь функц дамжуулагдана.
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    // too нь тоон төрөл байдлаар орж ирж байгаа тул бид тэмдэгт мөр болгохын тулд JS ийн нэг давуу талыг ашиглан type хувиргалтыг хийхдээ тэмдэгт мөр дээр тоо залгаж тэмдэгт мөр болгох байдлаар тэмдэгт мөрлүү хөрвүүлэлтийг дараах байдлаар хийж байна.
    too = "" + too;
    var x = too.split("").reverse().join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y.split("").reverse().join("");

    //console.log("z =" + z[0]);

    if (z[0] === ",") z = z.substr(1, z.length - 1);

    //console.log(z[0]);

    if (type === "inc") z = "+" + z;
    else z = "-" + z;

    return z;
  };

  return {
    // огноо буцаах функц
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() +
        "оны " +
        unuudur.getMonth() +
        " сарын " +
        unuudur.getDay() +
        "-ны өдөр ";
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue,
      );

      nodeListForeach(fields, function (el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red-focus");
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc, exp буюу +, - утгууд буцаана
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentages: function (allPercentages) {
      // Зарлагын NodeList -ийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel,
      );

      //Node list дээр foreach функц байхгүй. Иймд foreachiig орлох функц бичнэ. Үүнийг дээр NodeListForeach нэртэйгээр бичлээ.
      // Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
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
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type,
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalsInc,
        "inc",
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalsExp,
        "exp",
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentagelLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentagelLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">$$DESCRIPTION$$</div>  <div class="right clearfix">   <div class="item__value">$$VALUE$$</div>  <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>  </div>  </div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%">    <div class="item__description">$$DESCRIPTION$$</div>  <div class="right clearfix">  <div class="item__value">$$VALUE$$</div>  <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>   </div> </div>';
      }
      // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));

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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
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

      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPercentages;
    },

    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalsInc: data.totals.inc,
        totalsExp: data.totals.exp,
      };
    },

    // Санхүүгийн модуль дотроос бичигдсэн өгөдлийг устгах функц
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      //console.log('ids: ' + ids);
      var index = ids.indexOf(id);
      //console.log('index: ' + index);

      if (index !== -1) {
        //console.log('ustgah gej bna ');

        data.items[type].splice(index, 1);
      }
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
      // Төсвийг шинээр тооцоолоод дэлгэцэнд гаргана.
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    // 4. Төсвийг тооцоолно.

    financeController.tusuvTootsooloh();

    // 5. Эцсийн үлдэгдэл, тооцог дэлгэцэнд гаргана.

    var tusuv = financeController.tusuviigAvah();

    // 6. Төсвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuulekh(tusuv);
    //console.log(tusuv);
    // 7. Элементүүдийн хувийг тооцоолно
    financeController.calculatePercentages();
    // 8. Элементүүдийн хувийг хүлээж авна
    var allPercentages = financeController.getPercentages();
    // 9. Эдгээр хувийг дэлгэцэнд гаргана.
    uiController.displayPercentages(allPercentages);
    console.log(allPercentages);
  };

  //setupEventlisteners функц нь event -uudiig netgesen baidlaar байгуулж өгч байгаа private функц байна.
  var setupEventlisteners = function () {
    // DOMstrings гэсэн хамгаалагдсан өгөгдлийг getDOMstrings функцээр дамжуулаад public болгож буцааж байгаа өгдлийг uiController функцээр нь дамжуулаад DOM-д өгч байна.
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);
    document.addEventListener("keypress", function (event) {
      //console.log(/*"Товч дарагдлаа " +*/ event);
      //Keecode -ийг http://keycodes.atjayjo.com/ гэх мэт сайтуудаас харж болно. Эсвэл дээрх байдлаар event нь дуудаж ажиллуулаад browser-ийн consol дээрээс нээгээд харж болно. Дээр үеийн browser дээр keycode гэж байхгүй which гэж байдаг тул мөн which -ийг шалгах хэрэгтэй.

      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          //parseInt нь тэмдэг мөрөөс тоог нь салгаж авах команд
          var itemId = parseInt(arr[1]);
          // console.log(type + ' ===> ' + itemId );

          // 1. санхүүгийн модулиас type, id ашиглан устгана.
          financeController.deleteItem(type, itemId);

          // 2. Дэлгэц дээрээс энэ элементийг устгана.
          uiController.deleteListItem(id);

          // 3. Үлдэгдэл тооцоог шинэчилж харуулна.
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("Application started .....");

      uiController.displayDate();
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
