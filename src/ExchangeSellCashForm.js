export default class ExchangeSellCashForm extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		this.textColor = this.hasAttribute("text")
			? this.getAttribute("text")
			: "white";
		this.backgroundColor = this.hasAttribute("bg")
			? this.getAttribute("bg")
			: "#1d1d1b";

		const template = document.createElement("template");
		template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                input {
                    background-color: #292926;
                    border: 1px solid #474747;
                    height: 100%;
                    width: 100%;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 0.5rem;
                    color: ${this.textColor};
                }

                .exchange-form {
                    padding: 1.5rem;
                    height: 100%;
                }

                .exchange-form-options {
                    display: flex;
                }

                .exchange-form-info {
                    padding-left: 16px;
                }

                .info-wrapper {
                    border-left: 1px solid #474747;
                    padding: 10px 0;
                }

                .info-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 37px;
                    font-size: 0.8rem;
                    padding: 2px 0 2px 16px;
                }

                .info-item::before {
                    position: absolute;
                    top: 15px;
                    left: -5px;
                    content: '';
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    background-color: #474747;
                }

                .extra-inputs {
                    margin: .8rem 0;
                }

                .extra-inputs input{
                    border-radius: 10px;
                    padding: 0.5rem;
                }

                .submit-btn {
                    width: 100%;
                    padding: 0.5rem 0;
                    color: white;
                    background-color: #735494;
                    border: none;
                    border-radius: 4px;
                }

                .submit-btn:hover {
                    background-color: #563e6f;
                    cursor: pointer;
                }

                .exchange-form-group {
                    display: flex;
                    height: 80px;
                    flex-direction: column;
                }

                .exchange-form-group > * {
                    flex: 1 1;
                }

                .message {
                    margin-bottom: 0.8rem;
                    background-color: #37a737;
                    padding: 0.6rem 1rem;
                    border-radius: 10px;
                }

                .error {
                    background-color: #b53636;
                }

                .hide { 
                    display: none;
                }

                .success-info {
                    background-color: ${this.backgroundColor};
                    position: absolute;
                    height: 88%;
                    width: 84%;
                    top: 0;
                    left: 0;
                    margin: 1.5rem;
                }
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='sell' transaction='send'></bitcoinmat-select>

                        <input placeholder="Send Amount">
                    </section>

                    <section class='exchange-form-options'>
                        <div class='exchange-form-info'>
                            <div class='info-wrapper'>
                                <div class='info-item'>
                                    test
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id='receive' class='exchange-form-group'>
                        <bitcoinmat-select type='sell' transaction='receive'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input type='email' id='email' placeholder="E-mail">
                    </section>

                    <section id='main-message' class='message hide'>This is a message</section>

                    <button class='submit-btn'>Exchange</button>
                </form>
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));

		//Dropdowns
		this.sendSelectDropdown = this.shadowRoot.querySelector(
			"#send bitcoinmat-select"
		);
		this.receiveSelectDropdown = this.shadowRoot.querySelector(
			"#receive bitcoinmat-select"
		);

		//Inputs
		const sendInput = this.shadowRoot.querySelector("#send input");
		const receiveInput = this.shadowRoot.querySelector("#receive input");
		const emailInput = this.shadowRoot.querySelector("#email");

		const form = this.shadowRoot.querySelector(".exchange-form form");
		this.message = this.shadowRoot.querySelector("#main-message");

		//On send input change
		sendInput.addEventListener("input", async (e) => {
			if (this._minimum) {
				const value = e.target.value.replace(/[^0-9.]/g, "");
				const price = this._prices.find(
					(el) => el.cryptoCurrency === this.sendSelected.ticker
				);
				const estimatedReceive =
					value *
					price.rateForCashCurrency[this.receiveSelected.ticker];

				if (value > 0 && estimatedReceive > this._minimum) {
					this.message.classList.add("hide");
					this.message.classList.remove("error");

					receiveInput.value = estimatedReceive.toFixed(2);
				} else {
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					this.message.textContent = `Too low, minimum is ${this._minimum}€`; //fix this to show dynamic currency

					receiveInput.value = "";
				}

				e.target.value = value;
			}
		});

		//Form onSubmit
		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			if (
				emailInput.value &&
				this._minimum &&
				sendInput.value &&
				receiveInput.value > this._minimum
			) {
				//Remove error message
				this.message.classList.add("hide");
				this.message.classList.remove("error");

				//Make transaction
				try {
					const res = await fetch(
						"https://dev.bitcoinmat.uk​/sellCryptoForCashAnon?" +
							new URLSearchParams({
								fiatValue: receiveInput.value,
								fiatCurrency: this.receiveSelected.ticker,
								cryptoCurrency: this.sendSelected.ticker,
								email: emailInput.value,
								terminalNumber: "BT390001",
								locale: "en",
							})
					);

					const data = await res.json();
					console.log(res);
					if (!res.ok) {
						let errMessage = JSON.parse(data.message.message);

						if (errMessage.remainingLimit) {
							let message = `The remaining amount you can exchange without an account is ${errMessage.remainingLimit.toFixed(
								2
							)}€`; //fix this to show dynamic currency

							throw new Error(message);
						} else {
							throw new Error(data.message);
						}
					}

					console.log("success", data);

					//Show success info
					// const successInfo =
					// 	this.shadowRoot.querySelector(".success-info");
					// const imgQrcode = this.shadowRoot.querySelector("#qrcode");

					// successInfo.classList.remove("hide");

					// const url = await this.generateQrcode(data.payinAddress);

					// imgQrcode.src = url;
				} catch (err) {
					//Add error message
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					console.log(err);
					this.message.textContent = err.message;
				}
			} else {
				if (receiveInput.value > this._minimum) {
					//Add error message
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					this.message.textContent = "Please fill out all inputs";
				}
			}
		});

		//Send select listener
		this.sendSelectDropdown.addEventListener("selected", (e) => {
			this.sendSelected = e.detail;

			this.fetchMinimum();
		});

		//Receive select listener
		this.receiveSelectDropdown.addEventListener("selected", (e) => {
			this.receiveSelected = e.detail;

			this.fetchMinimum();
		});

		this.fetchCoins();
	}

	async fetchCoins() {
		const resCrypto = await fetch(
			"https://dev.bitcoinmat.uk/supported-currencies?" +
				new URLSearchParams({
					type: "CRYPTO",
				})
		);
		const dataCrypto = await resCrypto.json();

		const resFiat = await fetch(
			"https://dev.bitcoinmat.uk/supported-currencies?" +
				new URLSearchParams({
					type: "FIAT",
				})
		);
		const dataFiat = await resFiat.json();

		//Get Prices
		const resPrices = await fetch(
			"https://dev.cashini.eu/extensions/secured/getExchangeRateInfo?" +
				new URLSearchParams({
					direction: "4",
				})
		);
		const dataPrices = await resPrices.json();
		const messagePrices = await JSON.parse(dataPrices.message);

		this._prices = messagePrices["4"];

		//Rearrange the lists, so they work on select wb
		const organisedCrypto = dataCrypto.map((el) => {
			return {
				ticker: el.symbol,
				image: "https://dev.bitcoinmat.uk" + el.icon.url,
			};
		});
		const organisedFiat = dataFiat.map((el) => {
			return {
				ticker: el.symbol,
				image: "https://dev.bitcoinmat.uk" + el.icon.url,
			};
		});

		this.sendSelectDropdown.list = organisedCrypto;
		this.receiveSelectDropdown.list = organisedFiat;
	}

	fetchMinimum() {
		if (this.sendSelected && this.receiveSelected) {
			this._minimum = 50;
		} else {
			this._minimum = null;
		}
	}
}
