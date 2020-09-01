// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa
// ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido(per ovviare al problema che l’API non carichi
// holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

// Link API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// response": [
//     {
//       "name": "Capodanno",
//       "date": "2018-01-01"
//     }

$(document).ready(function () {
  var dataInizio = moment($("h1.month").attr("data-my-date")); // Memorizzo l'attributo data-my-date del tag h1 e
  // lo considero come data di partenza per generare le date

  // var dataInizio = moment("2018-01-01"); // Creo l'oggetto moment sulla data di partenza

  insertDate(dataInizio);
  // var month = dataInizio.format("MMMM");
  // var year = dataInizio.format("YYYY");
  // $("h1.month").html(month + " " + year);

  // var daysMonth = dataInizio.daysInMonth(); // Calcolo i giorni in ogni mese

  // for (var i = 1; i <= daysMonth; i++) {
  //   var source = $("#day-template").html();
  //   var template = Handlebars.compile(source);

  //   var context = {
  //     day: addZero(i),
  //     month: month,
  //     fullDate: year + "-" + dataInizio.format("MM") + "-" + addZero(i),
  //   };

  //   var html = template(context);

  //   $(".month-list").append(html);
  // }
  insertHoliday(dataInizio);
  // $.ajax({
  //   url: "https://flynn.boolean.careers/exercises/api/holidays",
  //   method: "GET",
  //   data: {
  //     year: dataInizio.year(),
  //     month: dataInizio.month(),
  //   },
  //   success: function (data) {
  //     for (var i = 0; i < data.response.length; i++) {
  //       var listItem = $('li[data-full-date="' + data.response[i].date + '"]');
  //       listItem.append("- " + data.response[i].name);
  //       listItem.addClass("festa");
  //     }
  //   },
  // });

  $("button#next").click(function () {
    next(dataInizio);
  });

  $("button#prev").click(function () {
    prev(dataInizio);
  });
});

// ** FUNZIONI **

function addZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}

function insertDate(data) {
  $("ul.month-list").empty();

  var month = data.format("MMMM");
  var year = data.format("YYYY");
  $("h1.month").html(month + " " + year);

  var daysMonth = data.daysInMonth(); // Calcolo i giorni in ogni mese

  for (var i = 1; i <= daysMonth; i++) {
    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    var context = {
      day: addZero(i),
      month: month,
      fullDate: year + "-" + data.format("MM") + "-" + addZero(i),
    };

    var html = template(context);

    $(".month-list").append(html);
  }
}

function insertHoliday(data) {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: {
      year: data.year(),
      month: data.month(),
    },
    success: function (risposta) {
      for (var i = 0; i < risposta.response.length; i++) {
        var listItem = $(
          'li[data-full-date="' + risposta.response[i].date + '"]'
        );
        listItem.append("- " + risposta.response[i].name);
        listItem.addClass("festa");
      }
    },
  });
}

function next(data) {
  if (data.month() == 11) {
    alert("Non puoi proseguire");
  } else {
    data.add(1, "months");
    insertDate(data);
    insertHoliday(data);
  }
}

function prev(data) {
  if (data.month() == 0) {
    alert("Non puoi proseguire");
  } else {
    data.subtract(1, "months");
    insertDate(data);
    insertHoliday(data);
  }
}
