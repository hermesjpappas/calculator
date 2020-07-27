function operate(string)
{
	//split the string using spaces
	//so you can differentiate between
	//numbers and operators (even if a number is negative)
	
	let strArray = string.split(" ");

	//first array element is the first number,
	//then the operator, then the second number
	
	let num1 = +strArray[0];
	let operator = strArray[1];
	let num2 = +strArray[2];

	switch(operator)
	{
		case("+"):
			return add(num1, num2);
		case("-"):
			return subtract(num1, num2);
		case("×"):
			return multiply(num1, num2);
		case("÷"):
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
		return "Don't do that.";
	else
		return a / b;
}
