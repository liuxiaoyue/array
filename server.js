var input = ['John', 'Paul', 'George','Ringo'];

function modify(str){
	return str.replace(/[aeiou]/g,'xiaoyue');
}

function modify2(str){
	return str.replace(/[aeiou]/g,'lxy');
}

//正常情况下 第一反应肯定循环便利数字，
// var output = [];
// for(var i=0; i< input.length; i++){
// 	output.push(modify(input[i]))
// }
// console.log(output);

//其实es6 for...of循环也可以实现
// var output = [];
// for(var item of input ){	
// 	output.push(modify(item))
// }
// console.log(output);

//以上两种方式都定义了一个变量，并且调用数字的push方法 若再来个数组，再来个函数，就会有很多重复代码
//只有函数固定，一个数组
function map(arr){
	var output = [];
	for(var item of arr ){	
		output.push(modify(item))
	}
	return output
}

var arr1 = map(['sad','qw']);
var arr2 = map(['sad12','qw12']);

console.log(arr1);
console.log(arr2);

//函数不固定，数组不固定
function map(fn, arr){
	var output = [];
	for(var item of arr ){	
		output.push(fn(item))
	}
	return output
}
var arr1 = map(modify, ['sad','qw']);
var arr2 = map(modify2, ['sad12','qw12']);

console.log(arr1);
console.log(arr2);

//es5 内置的map方法  map的代码看似简单，其实就是将对数组的处理和对字符串的处理分离开来，而不是相互混在一起。
var arr1 = ['sad','qw'];
var arr2 = ['sad12','qw12'];

var newArr1 = arr1.map(modify);
var newArr2 = arr1.map(modify2);

console.log(newArr1);
console.log(newArr2);

/*
*以上所有操作，返回的都是相同长度的数组，下面是处理数组最终得到一个值
*/

//想要获取strength最大值
var heros = [
	{name:'lxy1', strength:100},
	{name:'lxy2', strength:60},
	{name:'lxy3', strength:300},
	{name:'lxy4', strength:400},
	{name:'lxy5', strength:530},
	{name:'lxy6', strength:30},
	{name:'lxy7', strength:200},
]

var midVal = heros[0].strength ;
for(var item of heros){
	if(item.strength >= midVal){
		midVal = item.strength;
	}
}
console.log(midVal);

//获取所有力量值
var sumVal = 0;
for(var item of heros){
	sumVal += item.strength;
}
console.log(sumVal);

//获取最小值
var minVal = heros[0].strength;
for(var item of heros){
	if(minVal >= item.strength){
		minVal = item.strength;
	}
}
console.log(minVal);

//以上两种是求值，都是事先设置这个变量，然后不段对这个变量求值。
function getMax(max, item){
	return (item.strength >= max) ? item.strength : max;
}

function getMin(min, item){
	return (item.strength >= min) ? min : item.strength;
}

function sum(sum, item){
	return sum + item.strength;
}

var maxVal = 0;
for(var item of heros){
	maxVal = getMax(maxVal,item);
}

var sumVal = 0;
for(var item of heros){
	sumVal = sum( sumVal, item);
}

console.log(maxVal);
console.log(sumVal);

//发现上面两种写法很相似，可以改成一种
var heros = [
	{name:'lxy1', strength:100},
	{name:'lxy2', strength:60},
	{name:'lxy3', strength:300},
	{name:'lxy4', strength:400},
	{name:'lxy5', strength:530},
	{name:'lxy6', strength:30},
	{name:'lxy7', strength:200},
]
function getMax(max, item){
	return (item.strength >= max) ? item.strength : max;
}

function getMin(min, item){
	return (item.strength >= min) ? min : item.strength;
}

function sum(sum, item){
	return sum + item.strength;
}

function reduce(arr, fn){
	var value = arr[0].strength; //此处的初始值最好一致
	for(var item of arr){
		value = fn(value,item);
	}
	return value;
}

var func1 = reduce(heros, getMax);
var func3 = reduce(heros, getMin);
var func2 = reduce(heros, sum);

console.log(func1);
console.log(func2); 
console.log(func3); //其实上面reduce设置的变量还不够灵活

//es5 内置的reduce方法 
var heros = [
	{name:'lxy1', strength:100},
	{name:'lxy2', strength:60},
	{name:'lxy3', strength:300},
	{name:'lxy4', strength:400},
	{name:'lxy5', strength:530},
	{name:'lxy6', strength:30},
	{name:'lxy7', strength:200},
]
function getMax(max, item){
	return (item.strength >= max) ? item.strength : max;
}

function getMin(min, item){
	return (item.strength >= min) ? min : item.strength;
}

function sum(sum, item){
	return sum + item.strength;
}

var sum = heros.reduce(sum,0);
var max = heros.reduce(getMax,0);
var min = heros.reduce(getMin);

console.log(sum);
console.log(max);
console.log(min);


/*
*下面想要数组中的某一项，或者某几项
*/

//内置数组filter
var heros = [
	{name:'lxy1', strength:100, sex : 'f'},
	{name:'lxy2', strength:60, sex : 'm'},
	{name:'lxy3', strength:300, sex : 'f'},
	{name:'lxy4', strength:400, sex : 'm'},
	{name:'lxy5', strength:530, sex : 'f'},
	{name:'lxy6', strength:30, sex : 'm'},
	{name:'lxy7', strength:200, sex : 'f'},
]

//只返回true或者false的函数称作断言函数
function getSexF(item){
	return item.sex === 'f';
}

function getStrength(item){
	return item.strength > 500;
}

var arr1 = heros.filter(getSexF);
var arr2 = heros.filter(getStrength);

console.log(arr1);
console.log(arr2);

//找到数组中的某一项，并且我们确定只有一项
var heros = [
	{name:'lxy1', strength:100, sex : 'f'},
	{name:'lxy2', strength:60, sex : 'm'},
	{name:'lxy3', strength:300, sex : 'f'},
	{name:'lxy4', strength:400, sex : 'm'},
	{name:'lxy5', strength:530, sex : 'f'},
	{name:'lxy6', strength:30, sex : 'm'},
	{name:'lxy7', strength:200, sex : 'f'},
]
function getHero(item){
	return item.name === 'lxy1'
}
var blackHero = heros.find(getHero);
console.log(blackHero);


//代码消除循环

//其实就是了解reduce, map, find, filter es5对数组方法的支持

//好处1.消除了循环结构2.适当的方法来支持我们的业务3.把问题从处理整个数组 简化到处理每个元素















