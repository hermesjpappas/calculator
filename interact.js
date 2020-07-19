const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display");
let solved = false;


buttons.forEach( button => {

		button.addEventListener('click', event => {

				let text = button.textContent.replace(/\s/g, "");

				if(button.classList.contains("num"))
				{
					if(solved === true)
					{
						solved = false;
						display.textContent = "";
					}

					display.textContent += text;
				}
				
				else if(button.classList.contains("oper"))
				{
					//evaluate if operation needs to first calculate
					//if we already have an operator in the string
					if(/[\+\-\*\/]/g.test(display.textContent))
					{
						display.textContent = operate(display.textContent);
					}
					display.textContent += " " + text + " ";
				}
				
				else if(button.id === "calctitle")
					return;
				
				else if(button.id === "clear")
					display.textContent = "";
				
				else if(button.id === "equals")
				{
					if(/[0-9]/.test(display.textContent
								.slice(display.textContent.length-1, display.textContent.length)))
					{
						let result = operate(display.textContent);
						result = Number((result).toFixed(3));
						display.textContent = result;
						solved = true;

					}
					
					else
						return;
				}

		});
});