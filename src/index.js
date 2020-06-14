import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// window.jQuery = $;
// window.$ = $;

class Gold {
  constructor() {
    //change baseUrl
    this.url = "http://api.nbp.pl/api/cenyzlota";

    // store required URLs
    this.api = {
      current: {
        url: this.url,
        // price: "",
        // date: "",
      },
      secondMarch: {
        url: this.url + "/2020-03-02",
        // price: "",
        // date: "",
      },
      topTen: {
        url: this.url + "/last/10",
        // price: {},
        // date: "",
      },
    };
  }

  // get data by jquery WHEN method
  // if one url fail, no one display
  getDataByWhen = () => {
    let self = this;
    $.when(
      $.ajax(self.api.current.url),
      $.ajax(self.api.secondMarch.url),
      $.ajax(self.api.topTen.url)
    )
      .done((current, march, top) => {
        self.setItem(current[0][0], "current");
        self.setItem(march[0][0], "secondMarch");
        self.setItem(top[0], "topTen");
      })
      .fail((current, march, top) => {
        console.log(current, march, top);
        console.log("cos poszlo nie tak");
      });
  };

  // getPromise = (url) => {
  //   return new Promise((resolve, reject) => {
  //     console.log(url, "url");
  //     $.get(url);
  //   });
  // };

  // get data by promise
  // if one promise failed, rest still work
  getDataByThen = () => {
    const self = this;
    $.get(this.api.current.url)
      .then((current) => {
        self.setItem(current[0], "current");
      })
      .catch((error) => {
        {
          console.error(error);
          self.setItem("error", "current");
        }
      });

    $.get(this.api.secondMarch.url)
      .then((march) => {
        self.setItem(march[0], "secondMarch");
      })
      .catch((error) => {
        {
          console.error(error);
          self.setItem("error", "secondMarch");
        }
      });

    $.get(this.api.topTen.url)
      .then((top) => {
        self.setItem(top, "topTen");
      })
      .catch((error) => {
        {
          console.error(error);
          self.setItem("error", "topTen");
        }
      });
    // console.log(current, "current");
    // console.log(current.promise());
  };

  // append data to DOM
  // if getDataByThen reject append error notification
  setItem = (item, which) => {
    switch (which) {
      case "current":
        // this.api.current.price = item.cena;
        // this.api.current.date = item.data;
        console.log(item, "item");
        item === "error"
          ? $(".current-body").append(`<h5>Brak danych<h5>`)
          : $(".current-body").append(`<h5>${item.cena}zł<h5>`);

        break;

      case "secondMarch":
        // this.api.secondMarch.price = item.cena;
        // this.api.secondMarch.date = item.data;

        item === "error"
          ? $(".custom-body").append(`<h5>Brak danych<h5>`)
          : $(".custom-body").append(`<h5>${item.cena}zł<h5>`);
        break;

      case "topTen":
        // this.api.topTen.price = item;
        // this.api.topTen.date = item;
        item === "error"
          ? $(".top-body").append(`<h5>Brak danych<h5>`)
          : item.forEach((element) => {
              $(".top-body").append(
                `<li class="my-4">W dniu ${element.data} cena złota wyniosła ${element.cena}zł`
              );
            });
        break;
    }
  };
}
const gold = new Gold();
gold.getDataByWhen();
// gold.getDataByThen();
