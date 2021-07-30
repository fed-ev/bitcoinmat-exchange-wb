import ExchangeForm from "./ExchangeForm.js";
import ExchangeIndacoinForm from "./ExchangeIndacoinForm.js";
import ExchangeSellCashForm from "./ExchangeSellCashForm.js";
import Select from "./Select.js";
class Exchange extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		this.backgroundColor = this.hasAttribute("bg")
			? this.getAttribute("bg")
			: "#1d1d1b";
		this.textColor = this.hasAttribute("text")
			? this.getAttribute("text")
			: "white";
		this.mobile = this.hasAttribute("mobile")
			? this.getAttribute("mobile")
			: "false";

		this.mobile === "true"
			? (this.content = {
					img: "./assets/mobile-transparent.png",
					top: "30px",
					left: "38px",
					height: "643px",
					width: "299px",
					margin: "1.6rem",
			  })
			: (this.content = {
					img: "./assets/mobile-hand-transparent.png",
					top: "51px",
					left: "345px",
					height: "586px",
					width: "273px",
					margin: "1.5rem",
			  });

		const template = document.createElement("template");
		template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                li {
                    list-style: none;
                }

                .exchange {
                    position: relative;
                    height: 700px;
                    color: ${this.textColor}
                }

                .exchange-img {
                    position: relative;
                    z-index: 5;
                    height: 100%;
                }

                .exchange-content {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: ${this.content.top};
                    left: ${this.content.left};
                    height: ${this.content.height};
                    width: ${this.content.width};
                    background-color: ${this.backgroundColor};
                }

                .exchange-top-row {
                    margin-top: ${this.content.margin};
                }

                .exchange-tabs {
                    position: relative;
                    z-index: 10;
                    margin: 0 3px;
                    display: flex;
                }

                .exchange-tabs li {
                    cursor: pointer;
                    padding: 10px 0;
                    text-align: center;
                    flex: 1 1;
                }

                .selected-transaction {
                    background-color: #da9723;
                    border-radius: 4px;
                }

                .exchange-bottom-row {
                    flex: auto;
                    position: relative;
                    z-index: 10;
                }

                .hide { 
                    display: none;
                }
            </style>

            <div class='exchange'>
                <img class='exchange-img' src='${this.content.img}' draggable="false" >

                <div class='exchange-content'>
                    <section class='exchange-top-row'>
                        <ul class='exchange-tabs'>
                            <li id='convert'>Convert</li>
                            <li id='buy'>Buy</li>
                            <li id='sell'>Sell</li>
                        </ul>
                    </section>

                    <section class='exchange-bottom-row'>
                        <bitcoinmat-exchange-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-form>
                    </section>
                </div>
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));

		const handleTransactionClick = (e) => {
			const previous = this.shadowRoot.querySelector(
				".selected-transaction"
			);
			const bottomRow = this.shadowRoot.querySelector(
				".exchange-bottom-row"
			);

			if (previous) {
				previous.classList.remove("selected-transaction");

				//Compare if its the same
				if (previous.innerText !== e.target.innerText) {
					this._form = e.target.innerText;

					if (this._form === "Convert") {
						bottomRow.innerHTML = `<bitcoinmat-exchange-form text=${this.textColor}></bitcoinmat-exchange-form>`;
					} else if (this._form === "Buy") {
						bottomRow.innerHTML = `<bitcoinmat-exchange-indacoin-form></bitcoinmat-exchange-indacoin-form>`;
					} else if (this._form === "Sell") {
						bottomRow.innerHTML = `<bitcoinmat-exchange-sell-form></bitcoinmat-exchange-sell-form>`;
					}
				}
			} else {
				this._form = e.target.innerText;

				if (this._form === "Convert") {
					bottomRow.innerHTML = `<bitcoinmat-exchange-form text=${this.textColor}></bitcoinmat-exchange-form>`;
				} else if (this._form === "Buy") {
					bottomRow.innerHTML = `<bitcoinmat-exchange-indacoin-form></bitcoinmat-exchange-indacoin-form>`;
				} else if (this._form === "Sell") {
					bottomRow.innerHTML = `<bitcoinmat-exchange-sell-form></bitcoinmat-exchange-sell-form>`;
				}
			}

			e.target.classList.add("selected-transaction");
		};

		const convertTab = this.shadowRoot.querySelector("#convert");
		const buyTab = this.shadowRoot.querySelector("#buy");
		const sell = this.shadowRoot.querySelector("#sell");

		convertTab.addEventListener("click", handleTransactionClick);
		buyTab.addEventListener("click", handleTransactionClick);
		sell.addEventListener("click", handleTransactionClick);
	}
}

customElements.define("bitcoinmat-exchange", Exchange);
customElements.define("bitcoinmat-exchange-form", ExchangeForm);
customElements.define(
	"bitcoinmat-exchange-indacoin-form",
	ExchangeIndacoinForm
);
customElements.define("bitcoinmat-exchange-sell-form", ExchangeSellCashForm);
customElements.define("bitcoinmat-select", Select);
