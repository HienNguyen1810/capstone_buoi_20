window.addEventListener("DOMContentLoaded", (event) => {
	const email = document.querySelector("#email");
	const name = document.querySelector("#name");
	const phone = document.querySelector("#phone");
	const password = document.querySelector("#password");
	const passwordConfirm = document.querySelector("#passwordConfirm");

	const checkIsEmpty = (value) => {
		let isError = false;
		[...value].forEach((v) => {
			if (v.value.trim() === "") {
				v.nextElementSibling.innerText = `${v.name} is not empty!`;
				isError = true;
			} else {
				v.nextElementSibling.innerText = ``;
			}
		});

		return isError;
	};

	const checkIsEmail = (input) => {
		const value = input.value.trim();
		if (value === "") return;
		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!reg.test(value)) {
			input.nextElementSibling.innerText = `Email is invalid!`;
			return true;
		} else {
			input.nextElementSibling.innerText = ``;
			return false;
		}
	};

	const checkConfirmPassword = (pass, confirm) => {
		if (!pass.value.trim() || !confirm.value.trim()) return;
		if (pass.value.trim() !== confirm.value.trim()) {
			confirm.nextElementSibling.innerText = `${confirm.name} is not match with password!`;
			return true;
		} else {
			confirm.nextElementSibling.innerText = ``;
			pass.nextElementSibling.innerText = ``;
			return false;
		}
	};

	const checkPhoneNumber = (phone) => {
		const isPhone = /(\+\d{2,3}|0)\d{9,10}/g.test(phone.value);
		phone.nextElementSibling.innerText = isPhone ? `` : `Phone is invalid!`;
		return isPhone;
	};

	const form = document.querySelector("form");
	form.addEventListener("submit", function (e) {
		e.preventDefault();
		let isEmpty = checkIsEmpty([email, name, phone, password, passwordConfirm]);
		let isInvalidEmail = checkIsEmail(email);
		let isDiff = checkConfirmPassword(password, passwordConfirm);
		let isValidPhone = checkPhoneNumber(phone);

		const gender = Boolean(form["gender"].value);

		if (isInvalidEmail || isDiff || isEmpty || !isValidPhone) return;

		const payload = {
			email: email.value,
			name: name.value,
			phone: phone.value,
			password: password.value,
			gender,
		};

		//call axios here
		axios
			.post("https://shop.cyberlearn.vn/api/Users/signup", payload)
			.then((data) => {
				Swal.fire({
					title: "Success!",
					text: "Register successfully",
					icon: "success",
					confirmButtonText: "Cool",
				});
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					title: "Error!",
					text: err.response.data.message,
					icon: "error",
					confirmButtonText: "Cool",
				});
			});
	});
});
