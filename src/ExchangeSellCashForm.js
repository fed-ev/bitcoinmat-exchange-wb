export default class ExchangeSellCashForm extends HTMLElement {
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
            </style>

            <div>
                SELL
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));
	}
}
