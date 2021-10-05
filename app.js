var initialData = [{}]

fetch("./xbox.json")
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		initialData = data
	})

function myFunction() {
	var popup = document.getElementById("myPopup")
	popup.classList.toggle("show")

	var exit = document.getElementById("exit_icon")

	window.onclick = function (event) {
		if (event.target == popup || event.target == exit) {
			popup.classList.remove("show")
		}
	}

	product()
}

const product = () => {
	//name of the product
	const name = initialData.product.name
	document.getElementById("popup__description--name").innerHTML = name

	//sizes of the product
	const sizesArray = Object.entries(initialData.sizes.items)
	const sizes = sizesArray.map((size) => {
		return (document.getElementById(`size__box--${size[0]}`).innerHTML = size[1].name)
	})

	//variants of the product
	const variantsArray = Object.entries(initialData.multiversions[0].items)
	const variants = variantsArray.map((variant) => {
		return variant[1].values[variant[1].values_id].name
	})

	const list = document.getElementById("variant__select")

	variants.forEach((name, key) => {
		list[key] = new Option(name, key)
	})

	radioChange()
}
const radioChange = () => {
	const radio = document.getElementsByName("size")

	radio.forEach((e) => {
		if (e.checked) {
			document.getElementById("popup__description--price").innerHTML = initialData.sizes.items[e.value].price + " zł"
			document.getElementById("popup__description--availability").innerHTML = initialData.sizes.items[e.value].status
			if (initialData.sizes.items[e.value].amount === 0) {
				document.getElementById("number_of_products").innerHTML = 0
			} else if (initialData.sizes.items[e.value].amount > 0) {
				document.getElementById("number_of_products").innerHTML = 1
			}
			document.getElementById("addition").onclick = () => {
				let normal = parseFloat(document.getElementById("number_of_products").innerText)
				if (initialData.sizes.items[e.value].amount > normal) {
					document.getElementById("number_of_products").innerHTML = normal + 1
				}
			}
			document.getElementById("subtraction").onclick = () => {
				let normal = parseFloat(document.getElementById("number_of_products").innerText)
				if (normal > 1) {
					document.getElementById("number_of_products").innerHTML = normal - 1
				}
			}
		}
	})
}
