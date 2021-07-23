export default class Select extends HTMLElement {
	#selected;

	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		let self = this;

		const handleDropdownClick = () => {
			const dropdownContent =
				this.shadowRoot.querySelector(".dropdown-content");

			if (dropdownContent.classList.contains("hide")) {
				dropdownContent.classList.remove("hide");
			} else {
				dropdownContent.classList.add("hide");
			}
		};

		this.list = this.getAttribute("list");

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

                .dropdown {
                    height: 100%;
                    position: relative;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                }

                .dropdown-btn {
                    height: 100%;
                    border: 1px solid #474747;
                    border-bottom: none;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-color: #333438;
                    padding: 0 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .dropdown-content {
                    position: absolute;
                    z-index: 20;
                    top: 110%;
                    width: 100%;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: #292926;
                    overflow: scroll;
                    max-height: 200px;
                    box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.4);
                }

                .dropdown-content li {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                }

                .dropdown-content li:hover {
                    background-color: #da9723;
                }

                .dropdown-content p {
                    margin-left: .5rem;
                }

                .dropdown-selected {
                    display: flex;
                    align-items: center;
                }

                .dropdown-selected p {
                    margin-left: .5rem;
                }

                .hide {
                    display: none;
                }
            </style>

            <div class='dropdown'>
                <div class='dropdown-btn'>
                    <div class='dropdown-selected'></div>
                </div>
                <div class='dropdown-content hide'></div>
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));

		console.log(this);

		const dropdownBtn = this.shadowRoot.querySelector(".dropdown-btn");
		const dropdown = this.shadowRoot.querySelector(".dropdown");

		dropdownBtn.addEventListener("click", handleDropdownClick);

		// Bind the event listener
		this.handleClickOutside = this.handleClickOutside.bind(this);
		document.addEventListener("click", this.handleClickOutside);
	}

	// Alert if clicked on outside of element
	handleClickOutside(e) {
		if (!e.composedPath().includes(this)) {
			const dropdownContent =
				this.shadowRoot.querySelector(".dropdown-content");

			dropdownContent.classList.add("hide");
		}
	}

	set list(coinList) {
		if (coinList) {
			this.coinList = coinList;

			const dropdownContent =
				this.shadowRoot.querySelector(".dropdown-content");
			const ul = document.createElement("ul");

			coinList.forEach((coin) => {
				const li = document.createElement("li");
				const img = document.createElement("img");
				const p = document.createElement("p");
				ul.appendChild(li);
				li.appendChild(img);
				li.appendChild(p);

				//TODO: Refactor this function maybe
				li.addEventListener("click", (e) => {
					const dropdownContent =
						this.shadowRoot.querySelector(".dropdown-content");
					const dropdownSelected =
						this.shadowRoot.querySelector(".dropdown-selected");
					const imgSelected = document.createElement("img");
					const pSelected = document.createElement("p");

					dropdownSelected.innerHTML = "";
					dropdownSelected.appendChild(imgSelected);
					dropdownSelected.appendChild(pSelected);

					imgSelected.src = coin.image;
					pSelected.textContent = coin.ticker.toUpperCase();

					this.#selected = coin;

					this.dispatchEvent(
						new CustomEvent("selected", { detail: coin })
					);

					dropdownContent.classList.add("hide");
				});

				img.src = coin.image;
				p.textContent = coin.ticker.toUpperCase();
			});

			dropdownContent.appendChild(ul);
		}
	}

	disconnectedCallback() {
		// Unbind the event listener on clean up
		document.removeEventListener("click", this.handleClickOutside);
	}
}
