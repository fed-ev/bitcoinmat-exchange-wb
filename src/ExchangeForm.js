export default class ExchangeForm extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		this.textColor = this.hasAttribute("text")
			? this.getAttribute("text")
			: "white";

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
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select></bitcoinmat-select>

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
                        <bitcoinmat-select></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input placeholder="Refund wallet">
                    </section>

                    <section class='extra-inputs'>
                        <input placeholder="Receive wallet">
                    </section>

                    <section class='message hide'>This is a message</section>

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
		const message = this.shadowRoot.querySelector(".message");

		sendInput.addEventListener("input", async (e) => {
			if (this._minimum) {
				const value = e.target.value.replace(/[^0-9.]/g, "");

				if (value > 0 && value > this._minimum) {
					message.classList.add("hide");
					message.classList.remove("error");

					const res = await fetch(
						"http://localhost:1337/user-transactions/changenow/estimate?" +
							new URLSearchParams({
								from: this.sendSelected.ticker,
								to: this.receiveSelected.ticker,
								sendAmount: value,
							})
					);
					const data = await res.json();

					receiveInput.value = data.estimatedAmount.toFixed(8);
				} else {
					message.classList.add("error");
					message.classList.remove("hide");
					message.textContent = `Too low, minimum is ${this._minimum}`;

					receiveInput.value = "";
				}

				e.target.value = value;
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
		const res = await fetch(
			"https://api.changenow.io/v1/currencies?active=true&fixedRate=true"
		);
		const data = await res.json();

		this.sendSelectDropdown.list = data;
		this.receiveSelectDropdown.list = data;
	}

	async fetchMinimum() {
		if (this.sendSelected && this.receiveSelected) {
			const res = await fetch(
				"http://localhost:1337/user-transactions/changenow/minimum?" +
					new URLSearchParams({
						from: this.sendSelected.ticker,
						to: this.receiveSelected.ticker,
					})
			);

			const data = await res.json();

			this._minimum = data.minAmount;

			console.log("min", this._minimum);
		}
	}
}
