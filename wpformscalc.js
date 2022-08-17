//Selects the selector
let priceT = document.querySelectorAll(".wpforms-payment-price");

//this will convert the total to hours instead of minutes
function converTotal(theprice) {
  //grab the total by wpforms and divide it by 60
  let total = document.querySelector(".wpforms-payment-total").innerText;
  let newTotal = total.replace("$ ", "") / 60;
  //This array contains the pricing rules
  let dynamicPrices = {
    0.5: " hours for $25",
    0.75: " hours for $38",
    1: " hours for $51",
    1.25: " hours for $61.20",
    1.5: " hours for $71.40",
    1.75: " hours for $81.60",
    2: " hours for $90.80",
    2.25: " hours for $99.45",
    2.5: " hours for $107.10",
    2.75: " hours for $114.75",
    3: " hours for $122.40",
    3.25: " hours for $130.05",
    3.5: " hours for $137.7",
    3.75: " hours for $145.35",
    4: " hours for $153",
    4.25: " hours for $159.37",
    4.5: " hours for $165.75",
    4.75: " hours for $172.12",
    5: " hours for $178.50",
    5.25: " hours for $184.87",
    5.5: " hours for $191.25",
    5.75: " hours for $197.62",
    6: " hours for $201",
    7: " hours for $220.50",
    8: " hours for $237",
    9: " hours for $253.50",
    10: " hours for $270",
    11: " hours for $286.50",
    12: " hours for $319.50",
  };
  //Default value if the pricing rules is not on the list above
  const dynamicDefualt = " hours. Please contact support for pricing";
  //This filters the pricing rules for the dynamic price
  const myDynamicPrice = dynamicPrices[newTotal] || dynamicDefualt;
  //Append and print the total of hours
  let hours = document.querySelector(theprice);
  hours.innerHTML = newTotal + myDynamicPrice;
}
//Iterates through each select and runs the function to display the price after the click
for (let pricen of priceT) {
  pricen.addEventListener("click", function () {
    //Resets the message
    let hours = document.querySelector(".new-price");
    hours.innerHTML = "";
    //Displays the new message
    converTotal(".new-price");
  });
}

//on summary page
document
  .querySelector(".wpforms-page-next")
  .addEventListener("click", (event) => {
    //The mutation observer will run once the table is generated
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          let previewValue = document.querySelectorAll(
            ".wpforms-entry-preview-value"
          );
          previewValue.forEach(function (hourText) {
            if (hourText.innerText.includes("-")) {
              hourText.innerText = hourText.innerText
                .substring(0, hourText.innerText.indexOf("-") + "-".length)
                .slice(0, -1);
            }
          });
        }
      });
    });

    const previewWrapper = document.querySelector(
      ".wpforms-entry-preview-wrapper"
    );
    observer.observe(previewWrapper, { childList: true });

    //convert the total
    let hours = document.querySelector(".new-price-summary");
    hours.innerHTML = "0";

    //Displays the new message
    converTotal(".new-price-summary");

    //end of eventlistener
  });
