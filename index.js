window.addEventListener("DOMContentLoaded", (event) => {
	const productListInner = document.querySelector(".product-feature__list");
	const getProductLis = () => {
		axios
			.get("https://shop.cyberlearn.vn/api/Product")
			.then(function (res) {
				const productList = res.data.content.map((item, idx) => {
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
				});
				let templateHTML = "";
				productList.forEach((element) => {
					templateHTML += element;
				});
				productListInner.innerHTML = templateHTML;
			});
	};
	getProductLis();
});
