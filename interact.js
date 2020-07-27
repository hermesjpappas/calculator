const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display");
let solved = false;

//add an event listener for each button
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

			//add the number to the evaluation string
			display.textContent += text;

		}//end if number button is pressed
		
		//if an operator button is pressed
		else if(button.classList.contains("oper"))
		{
			//allows for continuous evaluation
			if(solved === true && /[0-9]$/.test(display.textContent))
				solved = false;
	
			//special treatment for our minus because it can be
			//both an operator and a negative number indicator
			if(text === "-")
			{
				//if there is nothing or there is a previous number
				//and an operator, means it can be a negative number
				//therefore allow adding "-" on numbers with no space

				if(display.textContent === "" || 
				/[0-9]+\s[\+\-\×\÷]\s$/.test(display.textContent))
				{
					display.textContent += text;
					solved = false;
					
					//return so we don't add more to 
					//the string by mistake

					return;
				}
			}//end if minus
		
			//evaluate if operation needs to first calculate
			//if we already have two numbers and an operator in the string
			//further allowing continuous evaluation

			if(/-?[0-9]+\s[\+\-\×\÷]+\s-?[0-9]+/g.test(display.textContent))
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
			//padded with spaces to differentiate for operate function
			
			if(/[0-9]$/.test(display.textContent))
				display.textContent += " " + text + " ";
			
		}//end if operator
		
		//if the decimal button is pressed
		else if(button.id === "decimal")
		{
			//allow only one decimal per number
			if(/^-?[0-9]+$/.test(display.textContent) 
			|| /^-?[0-9]+.?[0-9]*\s[\+\-\÷\×]\s-?[0-9]+$/.test(display.textContent))
				display.textContent += text;
			
		}//end if decimal

		//if backspace button is pressed
		else if(button.id === "backspace")
		{
			//if the string ends in a number, negative symbol or decimal point
			//erase that one character
			if(/.*[0-9\-\.]$/.test(display.textContent) && display.textContent !== "Don't do that.")
				display.textContent = display.textContent.slice(0, display.textContent.length-1);

			//otherwise, if the string ends in an operator followed by a space
			//delete the last three characters
			else if(/.*[\+\×\-\÷]\s$/.test(display.textContent))
				display.textContent = display.textContent.slice(0, display.textContent.length-3);
		}
	
		//clear everything if the clear button is pressed
		else if(button.id === "clear")
			display.textContent = "";
		
		//if equals is pressed
		else if(button.id === "equals")
		{
			//if there is a number at the end of our string, 
			//evaluate; otherwise do nothing
			
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
			
		}//end if equals
	});
});

//add event listener for triggering HTML "button" (div) presses
//from keyboard button presses
document.addEventListener("keyup", event => {

		
		switch(event.keyCode)
		{
			//enter triggers equals
			case 13:
				event.preventDefault();
				document.getElementById("equals").click();
				break;

			//backspace triggers backspace
			case 8:
				event.preventDefault();
				document.getElementById("backspace").click();
				break;

			//c or Delete triggers clear button
			case 46:
			case 67:
				event.preventDefault();
				document.getElementById("clear").click();
				break;

			//. or numpad . inserts decimal
			case 190:
			case 110:
				event.preventDefault();
				document.getElementById("decimal").click();
				break;

			// / or numpad / triggers division
			case 191:
			case 111:
				event.preventDefault();
				document.getElementById("divide").click();
				break;

			// + or numpad + triggers addition
			case 187:
			case 107:
				event.preventDefault();
				document.getElementById("add").click();
				break;

			// - or numpad - triggers subtraction
			case 189:
			case 109:
				event.preventDefault();
				document.getElementById("subtract").click();
				break;

			// * or numpad * or x triggers multiplication
			case 56:
			case 106:
			case 88:
				event.preventDefault();
				document.getElementById("multiply").click();
				break;

			//0
			case 48:
			case 96:
				event.preventDefault();
				document.getElementById("zero").click();
				break;
	
			//1
			case 49:
			case 97:
				event.preventDefault();
				document.getElementById("one").click();
				break;
	
			//2
			case 50:
			case 98:
				event.preventDefault();
				document.getElementById("two").click();
				break;
	
			//3
			case 51:
			case 99:
				event.preventDefault();
				document.getElementById("three").click();
				break;

			//4
			case 52:
			case 100:
				event.preventDefault();
				document.getElementById("four").click();
				break;

			//5
			case 53:
			case 101:
				event.preventDefault();
				document.getElementById("five").click();
				break;

			//6
			case 54:
			case 102: 
				event.preventDefault();
				document.getElementById("six").click();
				break;

			//7
			case 55:
			case 103:
				event.preventDefault();
				document.getElementById("seven").click();
				break;

			//8
			case 56:
			case 104:
				event.preventDefault();
				document.getElementById("eight").click();
				break;

			//9
			case 57:
			case 105:
				event.preventDefault();
				document.getElementById("nine").click();
				break;	
		}
	});


