import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Gold {
  constructor() {
    //change baseUrl
    this.baseUrl = "http://api.nbp.pl/api/cenyzlota";

    // store required URLs
    this.api = {
      current: {
        url: this.baseUrl,
      },
      secondMarch: {
        url: this.baseUrl + "/2020-03-01",
      },
      topTen: {
        url: this.baseUrl + "/last/10",
      },
    };
  }

  getCurrentAjax = () => {
    return $.ajax(this.api.current.url);
  };

  getMarchAjax = () => {
    return $.ajax(this.api.secondMarch.url);
  };

  getTopAjax = () => {
    return $.ajax(this.api.topTen.url);
  };

  // get data by jquery WHEN method
  // if one url fail, no one display
  getDataByWhen = () => {
    let self = this;
    $.when(self.getCurrentAjax(), self.getMarchAjax(), self.getTopAjax())
      .done((current, march, top) => {
        self.displayCurrentResult(current[0][0]);
        self.displayMarchResult(march[0][0]);
        self.displayTopResult(top[0]);
      })
      .fail((current, march, top) => {
        const err = current.statusText;
        console.error(err, current);

        self.displayError(err);
      });
  };

  // get data by promise
  // if one promise failed, rest still work
  getDataByThen = () => {
    const self = this;
    this.getCurrentAjax()
      .done((data) => this.displayCurrentResult(data[0]))
      .then(() => this.getMarchAjax())
      .done((data) => this.displayMarchResult(data[0]))
      .then(() => this.getTopAjax())
      .done((data) => this.displayTopResult(data))
      .fail((err) => this.displayError(err.statusText));
  };

  displayCurrentResult = (data) => {
    $(".current-body").append(`<h5>${data.cena}zł<h5>`);
  };
  displayMarchResult = (data) => {
    $(".custom-body").append(`<h5>${data.cena}zł<h5>`);
  };
  displayTopResult = (data) => {
    data.forEach((day) => {
      $(".top-body").append(
        `<li class="my-4">W dniu ${day.data} cena złota wyniosła ${day.cena}zł`
      );
    });
  };
  displayError = (err) => {
    alert(err);
  };
}

// new Gold().getDataByWhen();
new Gold().getDataByThen();
