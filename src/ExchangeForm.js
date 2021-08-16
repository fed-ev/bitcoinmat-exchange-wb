import QRCode from "qrcode";
import { io } from "socket.io-client";

export default class ExchangeForm extends HTMLElement {
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

                .success-info {
                    background-color: ${this.backgroundColor};
                    position: absolute;
                    height: 88%;
                    width: 84%;
                    top: 0;
                    left: 0;
                    margin: 1.5rem;
                }

				.center-message {
					display: flex;
					flex-direction: column;
                    justify-content: center;
					text-align: center;
				}

                .payin-wallet {
                    margin-bottom: 0.8rem;
                    word-break: break-all;
                }

				.margin {
					margin-bottom: 2rem;
				}

				.loading {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				  
				.loading::after {
					content: '';
					width: 50px;
					height: 50px;
					border: 5px solid #dddddd;
					border-top-color: #da9723;
					border-radius: 50%;
					animation: loading 1s linear infinite;
				}

				#requested-amount {
					font-weight: bold;
					font-size: 1.2rem;
				}

				.hide { 
                    display: none;
                }

				@keyframes loading {
					to {
					  transform: rotate(1turn);
					}
				  }
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='convert' transaction='send'></bitcoinmat-select>

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
                        <bitcoinmat-select type='convert' transaction='receive'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input id='refund-wallet' placeholder="Refund wallet">
                    </section>

                    <section class='extra-inputs'>
                        <input id='receive-wallet' placeholder="Receive wallet">
                    </section>

                    <section id='main-message' class='message hide'>This is a message</section>

                    <button class='submit-btn'>Exchange</button>
                </form>

                <div id='success-waiting' class='success-info hide'>
                    <section class='message'>
                        Successfully created a transaction.
                        </br>
                        </br>
                        Copy the wallet address bellow or scan the QR code to sent the requested amount of coins <span id='requested-amount'></span>
                    </section>

                    <section class='center-message'>
                        <p id='payin' class='payin-wallet'></p>

                        <img id='qrcode'>
                    </section>
                </div>

				<div id='success-confirming' class='success-info center-message hide'>
					<div id='loading-status' class='loading margin'></div>
					<img id='finish-status' class='margin hide' height='100' src='./assets/check-circle.svg'>

					<section class='center-message'>
						<h1>Confirming</h1>
						<p>This may take several minutes</p>
					</section>
				</div>
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
		const submitBtn = this.shadowRoot.querySelector(".submit-btn");
		const refundWallet = this.shadowRoot.querySelector("#refund-wallet");
		const receiveWallet = this.shadowRoot.querySelector("#receive-wallet");
		this.message = this.shadowRoot.querySelector("#main-message");

		//On send input change
		sendInput.addEventListener("input", async (e) => {
			if (this._minimum) {
				const value = e.target.value.replace(/[^0-9.]/g, "");

				if (value > 0 && value > this._minimum) {
					this.message.classList.add("hide");
					this.message.classList.remove("error");

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
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					this.message.textContent = `Too low, minimum is ${this._minimum}`;

					receiveInput.value = "";
				}

				e.target.value = value;
			}
		});

		//On submit
		submitBtn.addEventListener("click", async (e) => {
			e.preventDefault();

			if (
				this._minimum &&
				sendInput.value &&
				refundWallet.value &&
				receiveWallet.value &&
				sendInput.value >= this._minimum
			) {
				//Remove error message
				this.message.classList.add("hide");
				this.message.classList.remove("error");

				//Make transaction
				try {
					const res = await fetch(
						"http://localhost:1337/user-transactions/changenow/transaction?" +
							new URLSearchParams({
								from: this.sendSelected.ticker,
								to: this.receiveSelected.ticker,
								refundAddress: refundWallet.value,
								address: receiveWallet.value,
								amount: sendInput.value,
							}),
						{
							method: "POST",
						}
					);

					const data = await res.json();

					if (!res.ok) {
						throw new Error(data.message);
					}

					//Show success info
					const successInfoWaiting =
						this.shadowRoot.querySelector("#success-waiting");
					const imgQrcode = this.shadowRoot.querySelector("#qrcode");
					const payin = this.shadowRoot.querySelector("#payin");
					const requestedAmount =
						this.shadowRoot.querySelector("#requested-amount");

					requestedAmount.innerText =
						sendInput.value + " " + this.sendSelected.ticker;
					payin.innerText = data.payinAddress;
					successInfoWaiting.classList.remove("hide");

					const url = await this.generateQrcode(data.payinAddress);

					imgQrcode.src = url;

					//Socket TEST
					const socket = io("ws://localhost:1337");

					socket.emit("checkTransaction", {
						transactionId: data.id,
						type: "changenow",
					});

					//Change to loading screen
					const successConfirmation = this.shadowRoot.querySelector(
						"#success-confirming"
					);
					const successStatus = this.shadowRoot.querySelector(
						"#success-confirming h1"
					);
					const loadingStatus =
						this.shadowRoot.querySelector("#loading-status");
					const finishedStatus =
						this.shadowRoot.querySelector("#finish-status");

					socket.on("statusChange", (status) => {
						if (successConfirmation.classList.contains("hide")) {
							successConfirmation.classList.remove("hide");
							successInfoWaiting.classList.add("hide");
						}

						if (status === "finished") {
							loadingStatus.classList.add("hide");
							finishedStatus.classList.remove("hide");
						}

						successStatus.innerText = status;
					});

					//TODO: If possible manually disconnect socket when finished
				} catch (err) {
					//Add error message
					this.message.classList.add("error");
					this.message.classList.remove("hide");
					this.message.textContent = err.message;
				}
			} else {
				if (sendInput.value > this._minimum) {
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
		const res = await fetch(
			"https://api.changenow.io/v1/currencies?active=true&fixedRate=true"
		);
		const data = await res.json();

		this.sendSelectDropdown.list = data;
		this.receiveSelectDropdown.list = data;
	}

	async generateQrcode(text) {
		try {
			let url = await QRCode.toDataURL(text);

			return url;
		} catch (err) {
			console.error(err);
		}
	}

	async fetchMinimum() {
		if (this.sendSelected && this.receiveSelected) {
			try {
				const res = await fetch(
					"http://localhost:1337/user-transactions/changenow/minimum?" +
						new URLSearchParams({
							from: this.sendSelected.ticker,
							to: this.receiveSelected.ticker,
						})
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}

				//Remove error message
				this.message.classList.add("hide");
				this.message.classList.remove("error");

				this._minimum = data.minAmount;

				console.log("min", this._minimum);
			} catch (err) {
				//Add error message
				this.message.classList.add("error");
				this.message.classList.remove("hide");
				this.message.textContent = err.message;

				this._minimum = null;
			}
		}
	}
}
