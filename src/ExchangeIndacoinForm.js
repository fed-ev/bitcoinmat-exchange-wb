export default class ExchangeIndacoinForm extends HTMLElement {
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
                    margin-top: .8rem;
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
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='indacoin' transaction='send'></bitcoinmat-select>

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
                        <bitcoinmat-select type='indacoin' transaction='receive' image='false'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input type='email' id='email' placeholder="E-mail">
                    </section>

                    <section class='extra-inputs'>
                        <input type='text' id='wallet' placeholder="Your wallet">
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
		const walletInput = this.shadowRoot.querySelector("#wallet");
		const form = this.shadowRoot.querySelector(".exchange-form form");

		this.message = this.shadowRoot.querySelector("#main-message");

		//On send input change
		sendInput.addEventListener("input", async (e) => {
			const value = e.target.value.replace(/[^0-9.]/g, "");

			if (this.sendSelected && this.receiveSelected && value) {
				this.message.classList.add("hide");
				this.message.classList.remove("error");

				try {
					const res = await fetch(
						`https://indacoin.com/api/GetCoinConvertAmount/${this.sendSelected.ticker}/${this.receiveSelected.ticker}/${value}`
					);
					const data = await res.json();

					if (data > 0) {
						receiveInput.value = data.toFixed(8);

						this._error = false;
					} else {
						this.message.classList.add("error");
						this.message.classList.remove("hide");
						this.message.textContent = `Too low exchange amount`;

						receiveInput.value = "";

						this._error = true;
					}
				} catch (err) {
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					this.message.textContent = `There was a server error`;

					receiveInput.value = "";
				}
			}
		});

		//Form onSubmit
		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			if (
				sendInput.value &&
				receiveInput.value &&
				emailInput.value &&
				walletInput.value &&
				!this._error
			) {
				//Remove error message
				this.message.classList.add("hide");
				this.message.classList.remove("error");

				//Make transaction
				const link = `https://indacoin.com/payment/en?partner=bitcoinmat&user_id=${emailInput.value}&cur_from=${this.sendSelected.ticker}&cur_to=${this.receiveSelected.ticker}&amount=${sendInput.value}&address=${walletInput.value}`;

				window.location.href = link;
			} else {
				//Add error message
				this.message.classList.add("error");
				this.message.classList.remove("hide");
				this.message.textContent =
					"Amount is too low or not all inputs are filled";
			}
		});

		//Send select listener
		this.sendSelectDropdown.addEventListener("selected", (e) => {
			this.sendSelected = e.detail;
		});

		//Receive select listener
		this.receiveSelectDropdown.addEventListener("selected", (e) => {
			this.receiveSelected = e.detail;
		});

		this.fetchCoins();
	}

	async fetchCoins() {
		const resFiat = await fetch(
			"https://dev.bitcoinmat.uk/supported-currencies?" +
				new URLSearchParams({
					type: "FIAT",
				})
		);
		const dataFiat = await resFiat.json();

		const resCrypto = await fetch(
			"https://indacoin.com/api/mobgetcurrencies/1"
		);
		const dataCrypto = await resCrypto.json();

		//Rearrange the lists, so they work on select wb
		const organisedFiat = dataFiat.map((el) => {
			return {
				ticker: el.symbol,
				image: "https://dev.bitcoinmat.uk" + el.icon.url,
			};
		});
		const organisedCrypto = dataCrypto.map((el) => {
			return {
				ticker: el.short_name,
			};
		});

		this.sendSelectDropdown.list = organisedFiat;
		this.receiveSelectDropdown.list = organisedCrypto;
	}
}
