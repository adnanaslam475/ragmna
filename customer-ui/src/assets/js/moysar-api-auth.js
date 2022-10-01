Moyasar.init({
  // Required
  // Specify where to render the form
  // Can be a valid CSS selector and a reference to a DOM element
  element: ".mysr-form",

  amount: sessionStorage.getItem("moysaramount"),

  // Required
  // Currency of the payment transation
  currency: "SAR",

  // Required
  // A small description of the current payment process
  description: sessionStorage.getItem("moysardesc"),

  // Required
  publishable_api_key: localStorage.getItem('moysarkey'),
  //publishable_api_key: "pk_test_jYdnEJ8m5WZm49qvYLZ776bUEX2UgBAWvXuuyiTy",
  //LIVE
  // publishable_api_key: "pk_live_Xq8PiJvGvZ4wyw9KfupTfTxh8dmttTDEgiXQisrK",

  // This URL is used to redirect the user when payment process has completed
  // Payment can be either a success or a failure, which you need to verify on you system (We will show this in a couple of lines)
  callback_url: sessionStorage.getItem("moysarcallback"),
  supported_networks: ["mada", "visa", "mastercard", "amex"],
  // Optional
  // Required payments methods

  methods: ["creditcard", "stcpay", "applepay"],
  apple_pay: {
    country: "SA",
    label: "Ragmna",
    validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
  },

  fixed_width: false,
  on_initiating: function () {
    return new Promise(function (resolve, reject) {
      resolve({});
    });
  },
  on_completed: (payment) =>
    new Promise(async (resolve, reject) => {
      let _json = await JSON.parse(JSON.stringify(payment));

      // let _token = localStorage.getItem("App/auth").replace(/\"/g, "");

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //   myHeaders.append("token", _token.toString());

        let _reqbody = JSON.stringify({
          transId: _json["id"],
          amount: parseFloat(_json["amount"]) / 100,
          statusCd: _json["status"],
          respmsg: _json["status"],
          respData: JSON.stringify(_json).toString(),
          pgid: 1,
          quoteno: localStorage.getItem("tempid"),
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: _reqbody,
        };

        const req = await fetch(
          "https://dev-pvq-api.herokuapp.com/cust/quote-payment",
          requestOptions
        );
        const _result = await req.json();
        if (_result && _result["success"]) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        console.log("HI ERROR", error);
      }
    }),
  on_failure: function (error) {
    console.log("err", error);
    // Handle error
  },
});
