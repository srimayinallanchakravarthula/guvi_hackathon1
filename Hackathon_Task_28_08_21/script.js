const productHeader = document.createElement('div');
productHeader.className = 'product-header'

const logo = document.createElement('div');
logo.className = 'logo';
logo.innerText = 'Kalon'
    // const i = document.createElement('i');
    // i.className = 'fas fa-magic'
    // const h1 = document.createElement('h1')
    // h1.innerText = 'Kalon'
    // logo.append(h1)
const h4 = document.createElement('h4');
h4.innerText = "One Stop Destination for All Makeup Products"
productHeader.append(logo, h4);

const productContainer = document.createElement("div");
productContainer.className = 'product-grid'

const hr = document.createElement('hr')

async function getProducts() {
    let response;
    try {
        response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
    } catch (error) {
        console.log("Error in fetching the data from API")
        console.log(error)
    }
    const products = await response.json();
    return products
}

async function displayContent() {
    let products = await Promise.resolve(getProducts())
    products.forEach(product => {
        const img = document.createElement('img');
        img.setAttribute('src', product.image_link);
        img.setAttribute('onerror', "this.onerror=null; this.src= 'https://post.healthline.com/wp-content/uploads/2020/04/makeup_composition_overhead-732x549-thumbnail.jpg'");
        img.setAttribute('alt', "");
        img.style.height = "8rem";
        img.style.width = "10rem";

        const productImg = document.createElement('div');
        productImg.className = 'product-img';
        productImg.append(img);

        const h3 = document.createElement('h3');
        h3.innerText = product.brand;

        const h5 = document.createElement('h5');
        h5.innerText = product.name;

        const p2 = document.createElement('p');
        p2.innerText = product.price_sign + product.price;

        const colorContainer = document.createElement('div');
        colorContainer.className = 'product-colors';
        product.product_colors.forEach(color => {
            const productColor = document.createElement('div');
            productColor.className = 'color';
            productColor.style.background = color.hex_value;
            colorContainer.append(productColor)
        })
        const p3 = document.createElement('p');
        p3.className = 'description';
        p3.innerText = product.description;

        const infoContainer = document.createElement("div");
        infoContainer.style.padding = "10px";
        infoContainer.append(h3, h5, p2, colorContainer, p3);

        const container = document.createElement("div");
        container.className = 'product-container';
        container.style.background = "white";
        // container.style.borderRadius = "5px";
        //container.style.boxShadow = "3px 3px 10px 0px rgba(50, 50, 50, 0.1)";
        // container.style.height = "18rem";
        container.style.width = "15rem";
        container.style.overflow = "hidden";

        const aTag = document.createElement('a');
        aTag.setAttribute('href', product.product_link)
        container.append(productImg, infoContainer);
        aTag.append(container)
        productContainer.append(aTag);
    });
}

document.body.append(productHeader, hr, productContainer);
document.body.style.background = "white";
document.body.style.justifyContent = "Around";

displayContent().catch((error) => console.log(error))