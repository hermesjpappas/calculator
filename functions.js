function operate(string)
{
	
	let strArray = string.split(" ");
	let num1 = +strArray[0];
	let num2 = +strArray[2];
	let operator = strArray[1];
	
	switch(operator)
	{
		case("+"):
			return add(num1, num2);
		case("-"):
			return subtract(num1, num2);
		case("*"):
			return multiply(num1, num2);
		case("/"):
			return divide(num1, num2);
		default:
			throw "Invalid operation";
	}
}


function add(a, b)
{
	return a + b;
}

function subtract(a, b)
{
	return a - b;
}

function multiply(a, b)
{
	return a * b;
}

function divide(a, b)
{
	if(+b === 0)
		return "Don't.";
	else
		return a / b;
}
