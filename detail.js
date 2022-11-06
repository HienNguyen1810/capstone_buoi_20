window.addEventListener("DOMContentLoaded", (event) => {
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get("productId");

	//call api load lên giao diện
	const productListInner = document.querySelector(".product-feature__list");
	const sizeListInner = document.querySelector(".detail__size");
	const thumb = document.querySelector(".detail__img");
	const title = document.querySelector(".detail__title");
	const desc = document.querySelector(".detail__desc");
	const price = document.querySelector(".detail__price");

	const getDetails = () => {
		axios
			.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`)
			.then(function (res) {
				console.log(res);
				const productList = res.data.content.relatedProducts.map(
					(item, idx) => {
						return `<div class="product-feature__item overflow-hidden">
                    <div class="product-feature__info text-center">
                        <img
                            src=${item.image}
                            class="object-cover w-[220px] inline-block mb-[30px] mt-[45px]"
                            alt=""
                        />
                        <p
                            class="text-left font-[300] text-[24px] ml-[23px] leading-[29px] truncate"
                        >
                            ${item.name}
                        </p>
                        <p
                            class="text-left ml-[23px] font-[300] text-[20px] text-[#CBC9C9] mt-[8px] mb-[13px] leading-[24px] truncate"
                        >
                            ${item.description}
                        </p>
                    </div>
                    <div class="product-feature__bottom bg-[#DEDDDC] flex">
                        <a href="./detail.html?productId=${item.id}" class="bg-[#E1B067] py-[14px] w-[175px] text-center">
                            <span
                                class="text-[24px] text-[#000000] font-[200] tracking-wider"
                                >Buy now</span
                            >
                        </a>
                        <button class="font-[600] text-[24px] flex-1">
                            ${item.price}$
                        </button>
                    </div>
                </div>`;
					},
				);
				const sizeList = res.data.content.size.map((item, idx) => {
					return `<div
                    class="size__box w-[50px] h-[50px] bg-[#CCCCCC] flex items-center justify-center"
                >
                    <span
                        class="text-[24px] font-semibold leading-[29px]"
                        >${item}</span
                    >
                </div>`;
				});
				let templateHTML = "";
				let templateSize = "";

				productList.forEach((element) => {
					templateHTML += element;
				});
				productListInner.innerHTML = templateHTML;
				sizeList.forEach((element) => {
					templateSize += element;
				});
				sizeListInner.innerHTML = templateSize;
				thumb.src = res.data.content.image;
				title.innerText = res.data.content.name;
				desc.innerText = res.data.content.shortDescription;
				price.innerText = `${res.data.content.price}$`;
			});
	};
	getDetails();
});
