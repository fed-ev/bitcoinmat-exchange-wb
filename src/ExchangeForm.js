export default class ExchangeForm extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		const template = document.createElement("template");
		template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                input {
                    padding: 0.5rem;
                    background-color: #292926;
                    border: 1px solid #474747;
                    height: 100%;
                    width: 100%;
                    border-radius: 10px;
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

                .submit-btn {
                    width: 100%;
                    padding: 0.5rem 0;
                    color: white;
                    background-color: #735494;
                    border: none;
                    border-radius: 4px;
                }
            </style>

            <div class='exchange-form'>
                <form>
                    <section>
                        <input>
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

                    <section>
                        <input>
                    </section>

                    <section class='extra-inputs'>
                        <input>
                    </section>

                    <section class='extra-inputs'>
                        <input>
                    </section>

                    <button class='submit-btn'>Exchange</button>
                </form>
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));
	}
}
