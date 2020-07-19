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
				if(display.textContent === "")
				{
					if(text === "-")
						display.textContent += text;
					else
						return;
				}
			
				if(/-?[0-9]/g.test(display.textContent) === false)
					return;

				if(solved === true)
					solved = false;
				//evaluate if operation needs to first calculate
				//if we already have an operator in the string
				if(/-?[0-9]+\s[\+\-\*\/]+\s[0-9]+/g.test(display.textContent))
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
					if(result === "Don't.")
					{
						display.textContent = result;
						solved = true;
					}
					
					else 
					{
						result = Number((result).toFixed(3));
						display.textContent = result;
						solved = true;
					}			
				}
				
				else
					return;
			}

	});
});
