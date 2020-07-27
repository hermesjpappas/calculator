const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display");
let solved = false;
let displ;


buttons.forEach( button => {

	button.addEventListener('click', event => {

		//strip div/button content of whitespace
		let text = button.textContent.replace(/\s/g, "");
		
		//if a number button is pressed
		if(button.classList.contains("num"))
		{
			//if we have a solved state, reset the numbers by
			//just writing a new number in, instead of having
			//to clear first

			if(solved === true)
			{
				solved = false;
				display.textContent = "";
			}

			display.textContent += text;
		}//end if number
		
		//if an operator button is pressed
		else if(button.classList.contains("oper"))
		{
			//allows for continuous evaluation
			if(solved === true && /[0-9]$/.test(display.textContent))
				solved = false;
	
			//special treatment for our minus
			if(text === "-")
			{
				//if there is nothing or there is a previous number
				//and an operator, means it can be a negative number
				//therefore allow adding "-" on numbers with no space

				if(display.textContent === "" || 
				/[0-9]+\s[\+\-\*\/]\s$/.test(display.textContent))
				{
					display.textContent += text;
					solved = false;
					
					//return is so we don't add more to 
					//the string by mistake
					return;
				}
			}//end if minus
		
	
			//if there are no numbers or 
			//the string doesn't end with a number, do nothing
			if(/-?[0-9]/g.test(display.textContent) === false 
			|| /[0-9]$/.test(display.textContent) === false)
				return;

			//evaluate if operation needs to first calculate
			//if we already have two numbers and an operator in the string
			if(/-?[0-9]+\s[\+\-\*\/]+\s-?[0-9]+/g.test(display.textContent))
			{
				let result = operate(display.textContent);
				
				if(result === "Don't do that.")
				{
					display.textContent = result;
					solved = true;
				}
				
				else 
				{
					result = Number((result).toFixed(3));
					display.textContent = result;
					solved = false;
				}
			}

			//if after all that we have a digit at the end of the string
			//then add the operator to the overall evaluation string
			if(/[0-9]$/.test(display.textContent))
				display.textContent += " " + text + " ";
			
		}//end if operator
		
		//if the decimal button is pressed
		else if(button.id === "decimal")
		{
			//allow only one decimal per number
			if(/^-?[0-9]+$/.test(display.textContent) 
			|| /^-?[0-9]+.?[0-9]*\s[\+\-\/\*]\s-?[0-9]+$/.test(display.textContent))
				display.textContent += text;
		}//end if decimal

		//do nothing if clicking on the title
		else if(button.id === "calctitle")
			return;
	
		//clear everything if the clear button is pressed
		else if(button.id === "clear")
			display.textContent = "";
	

		//if equals is pressed
		else if(button.id === "equals")
		{
			//if there is a number at the end, evaluate
			//otherwise do nothing
			
			if(/[0-9]$/.test(display.textContent))
			{
				let result = operate(display.textContent);
				
				if(result === "Don't do that.")
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
