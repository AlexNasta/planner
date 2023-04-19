const stepsNum = document.querySelectorAll(".numb");
const back = document.querySelector(".back");
const next = document.querySelector(".next");
const pages = document.querySelectorAll(".optStep");
const inputs = document.querySelectorAll(".formsInfo");
const errorInput = document.querySelectorAll("h6");
const plans = document.querySelectorAll(".plan");
const planSwitch = document.querySelector(".planButton");
const planSwitchH3 = document.querySelectorAll(".change span");
const planInfo = document.querySelectorAll(".planInfo");
const monthFree = document.querySelectorAll(".monthsFree");
const bodys = document.querySelectorAll(".body");
const thanksPage = document.querySelector(".thanksPage");

console.log(thanksPage);

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameControl = /^[A-Za-z\s]+$/;
const numberControl = /^(?:[0-9 \s\+]+$)/;

/* array per i dati del utente */
let conferma = "";
const utentInfo = {
  nome: "",
  email: "",
  phone: "",
  plan: "",
  time: "",
  addsName: [],
  addsPrice: [],
};
let planSelected = 9;
let planTime = "mo";
let planPrice = "";
let resumePlan = "Monthly";
let resumeToatalPer = "month";
let planSelectedName = "Arcade";
let sommaTotale = [];

stepsNum[0].classList.add("currentStep");
pages[0].classList.add("currentPage");

next.addEventListener("click", prossimo);
back.addEventListener("click", indietro);

let cont = 0;

/* selezione del abbonamento */
for (let i = 0; i < plans.length; i++) {
  const element = plans[i];

  element.addEventListener("click", () => {
    plans.forEach((element) => {
      element.classList.remove("selezionato");
    });
    element.classList.add("selezionato");
    planSelected = Number(element.getAttribute("value"));
    planSelectedName = element.getAttribute("id");
    utentInfo.plan = planSelected;
    console.log(planSelected);
  });
}

/* month/year */
planSwitch.addEventListener("click", () => {
  utentInfo.addsName = [];
  utentInfo.addsPrice = [];
  planSwitch.classList.toggle("sposta");
  planSwitchH3[0].classList.toggle("grosso");
  planSwitchH3[1].classList.toggle("grosso");

  /* month */
  if (planSwitchH3[0].classList.contains("grosso")) {
    planTime = "mo";
    utentInfo.time = "mo";
    planPrice = "";
    resumePlan = "Monthly";
    resumeToatalPer = "month";
    for (let i = 0; i < monthFree.length; i++) {
      const element = monthFree[i];
      element.classList.remove("vedi");
    }
  }
  /* year */
  if (planSwitchH3[1].classList.contains("grosso")) {
    planTime = "yr";
    utentInfo.time = "yr";
    planPrice = 0;
    resumePlan = "Yearly";
    resumeToatalPer = "year";

    for (let i = 0; i < monthFree.length; i++) {
      const element = monthFree[i];
      element.classList.add("vedi");
    }
  }

  planInfo[0].innerHTML = `
    <h3>Arcade</h3>
    <h3>$9${planPrice}/${planTime}</h3>
   `;
  planInfo[1].innerHTML = `
    <h3>Advanced</h3>
    <h3>$12${planPrice}/${planTime}</h3>
   `;
  planInfo[2].innerHTML = `
    <h3>Pro</h3>
    <h3>$15${planPrice}/${planTime}</h3>
   `;
});

/* tasto avanti */
function prossimo() {
  cont = cont + 1;
  console.log(cont);

  if (cont > 0) {
    /* controllo dei dati */
    inputs.forEach((element) => {
      const dati = element.value;

      
      if (dati == "") {
        cont = 0;
      }

      if (inputs[0].value.match(nameControl)) {
        errorInput[0].classList.remove("vedimi");
        utentInfo.nome = inputs[0].value;
      }

      if (!inputs[0].value.match(nameControl)) {
        errorInput[0].innerText = "";
        errorInput[0].insertAdjacentText("afterbegin", "Not valid name");
        errorInput[0].classList.add("vedimi");
        cont = 0;
      }

      if (inputs[0].value == "") {
        errorInput[0].classList.add("vedimi");
        errorInput[0].innerText = "";
        errorInput[0].insertAdjacentText("afterbegin", "The field is required");
      }

      if (!inputs[1].value.match(emailControl)) {
        errorInput[1].innerText = "";
        errorInput[1].insertAdjacentText("afterbegin", "Email form not valid");
        errorInput[1].classList.add("vedimi");
        cont = 0;
      }
      if (inputs[1].value.match(emailControl)) {
        errorInput[1].classList.remove("vedimi");
        utentInfo.email = inputs[1].value;
      }
      if (inputs[1].value == "") {
        errorInput[1].classList.add("vedimi");
        errorInput[1].innerText = "";
        errorInput[1].insertAdjacentText("afterbegin", "The field is required");
      }
      if (
        !inputs[2].value.match(numberControl) ||
        inputs[2].value.length < 10
      ) {
        errorInput[2].innerText = "";
        errorInput[2].insertAdjacentText(
          "afterbegin",
          "phone number form not valid"
        );
        errorInput[2].classList.add("vedimi");
        cont = 0;
      }
      if (
        inputs[2].value.match(numberControl) &&
        inputs[2].value.length >= 10
      ) {
        errorInput[2].classList.remove("vedimi");
        utentInfo.phone = inputs[2].value;
      }
      if (inputs[2].value == "") {
        errorInput[2].classList.add("vedimi");
        errorInput[2].innerText = "";
        errorInput[2].insertAdjacentText("afterbegin", "The field is required");
      }
    });
  }

    /* mostra bottone indietro */
    if (cont >= 1) {
      back.classList.add("vedimi");
    }
  if (cont == 2) {
    console.log(utentInfo.plan);
    utentInfo.addsName=[];
    utentInfo.addsPrice=[];

    bodys[2].innerHTML = `
    <div class="add">
    <input type="checkbox" class="addOn" id="Online service" value=1>
    <div class="addText">
      <h3>Online service</h3>
      <h3>Access to multiplayer games</h3>
    </div>
    <div class="addValue">
      <h3>+$1${planPrice}/${planTime}</h3>
    </div>
  </div>
  <div class="add">
    <input type="checkbox" class="addOn" id="Larger storage" value=2>
    <div class="addText">
      <h3>Larger storage</h3>
      <h3>Extra 1TB of cloud save</h3>
    </div>
    <div class="addValue">
      <h3> +$2${planPrice}/${planTime}</h3>
    </div>
  </div>
  <div class="add">
    <input type="checkbox" class="addOn" id="Customizable profile" value=2>
    <div class="addText">
      <h3>Customizable profile</h3>
      <h3>Custom theme on your profile</h3>
    </div>
    <div class="addValue">
    <h3> +$2${planPrice}/${planTime}</h3>
    </div>
  </div>
    `;

    const adds = document.querySelectorAll(".addOn");
    const addsBox = document.querySelectorAll(".add");

    console.log(addsBox);
    console.log(adds);

    /* aggiunta dei ads */
    for (let i = 0; i < adds.length; i++) {
      const element = adds[i];

      element.addEventListener("click", () => {
        let addSelPrice = Number(element.getAttribute("value"));
        let addSelName = element.getAttribute("id");
        /* selezione ad */
        if (element.checked) {
          utentInfo.addsName.push(addSelName);
          utentInfo.addsPrice.push(addSelPrice);
          addsBox[i].classList.add("selezionato");
          console.log(utentInfo.addsPrice);
        } /* deselezione ad */
        if (!element.checked) {
          const eldaTogliere = utentInfo.addsName.indexOf(addSelName);
          const elPrezdaTogliere = utentInfo.addsPrice.indexOf(addSelPrice);
          utentInfo.addsName.splice(eldaTogliere, 1);
          utentInfo.addsPrice.splice(elPrezdaTogliere, 1);
          addsBox[i].classList.remove("selezionato");
          console.log(utentInfo.addsPrice);
        }
      });
    }
  }

  if (cont == 3) {
    /* sommaTotale= */
    let totAdds = Number(
      utentInfo.addsPrice.reduce(
        (accumulatore, elementoCorrente) => accumulatore + elementoCorrente,
        0
      )
    );
    let prezzoTotale = totAdds + planSelected;
    console.log(prezzoTotale);

    
    bodys[3].innerHTML = `
            <div class="planFinish">
              <span>
                <h3>${planSelectedName} (${resumePlan})</h3>
                <span class="changePlan" >Change</span>
              </span>
              <span>
                <h3>$${planSelected}${planPrice}/${planTime}</h3>
              </span>
            </div>
            <div class="addsFinish">
              
            </div>
            <div class="finishTotal">
              <span><h3>Total (per ${resumeToatalPer})</h3> <h3>+$${prezzoTotale}${planPrice}/${planTime}</h3></span>
            </div>
    `;

    const addsFinish = document.querySelector(".addsFinish");
    for (let i = 0; i < utentInfo.addsName.length; i++) {
      const element = utentInfo.addsName[i];
      console.log(utentInfo.addsName[i]);
      let html = `
      <span><h3>${element}</h3> <h3>+$${utentInfo.addsPrice[i]}${planPrice}/${planTime}</h3></span>
      `;
      addsFinish.insertAdjacentHTML("afterbegin", html);
    }
    console.log(addsFinish);

    const changePlan = document.querySelector(".changePlan");
    changePlan.addEventListener("click", () => {
      cont = 1;
      stepsNum.forEach((element) => {
        element.classList.remove("currentStep");
      });
      stepsNum[cont].classList.add("currentStep");
      pages.forEach((element) => {
        element.classList.remove("currentPage");
      });
      pages[cont].classList.add("currentPage");
      next.innerHTML = "<h5>Next Step</h5>";
    });
  }

  /* ferma transizione numeri side */
  if (cont > 3) {
    cont = 3;
    return;
  }
  /* trasforma il next in conferm */
  if (cont === 3) {
    next.innerHTML = `
        <div class="confirm">
           <h5>Confirm</h5>
        </div>
        `;
  }
  /* spostamento pagina e numeri */
  conferma = document.querySelector(".confirm");
  stepsNum.forEach((element) => {
    element.classList.remove("currentStep");
  });
  stepsNum[cont].classList.add("currentStep");
  pages.forEach((element) => {
    element.classList.remove("currentPage");
  });
  pages[cont].classList.add("currentPage");
  conferma.addEventListener("click", conferm);
}

/* torna indietro */
function indietro() {
  cont = cont - 1;
  if (cont < 1) {
    back.classList.remove("vedimi");
  }

  if (cont === 2) {
    next.innerHTML = "";
    next.innerHTML = `
           <h5>Next Step</h5>
        `;
  }
  stepsNum.forEach((element) => {
    element.classList.remove("currentStep");
  });
  stepsNum[cont].classList.add("currentStep");
  pages.forEach((element) => {
    element.classList.remove("currentPage");
  });
  pages[cont].classList.add("currentPage");
  stepsNum[cont].classList.add("currentStep");
}
/* passa alla pagina finale confermando i dati */
function conferm() {
  cont = 4;

  pages.forEach((element) => {
    element.classList.remove("currentPage");
  });
  pages[cont].classList.add("currentPage");

  back.classList.add("sparisci");
  next.classList.add("sparisci");
  conferma.classList.add("sparisci");
}
