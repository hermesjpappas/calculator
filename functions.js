funtion operate(operator, a, b)
{
	let num1 = +a;
	let num2 = +b;
	
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
	return a / b;
}
