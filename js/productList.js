const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
let query = '';

function loadCategories() {
    
    fetch(BASE_URL + '/categories', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
                renderCategories(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadProducts() {
    const data = { token:localStorage.getItem("token") };
    if(window.location.search) {
        data.id = window.location.search.split("=")[1];
    }
    fetch(BASE_URL + '/products', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        
        // params:{'name':'phone'}
        // body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data",data);
                renderProducts(data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function renderCategories(categories) {
    let categoryListHtml = '';
    for(i = 0; i < categories.length; i++) {
        categoryListHtml += '<a class="d-flex text-decoration-none" href="productList.html?categoryId=' + categories[i].categoryId + '">' + categories[i].name + '</a>';
    }

    categoryList.innerHTML = categoryListHtml;
}

function renderProducts(products) {
    let productListHtml = '';
    for(i = 0; i < products.length; i++) {
        productListHtml += '<a class="product-item text-decoration-none d-inline-block" href="productDetails.html?productId=' + products[i].id + '">'
        + '<div class="product-img">'
        + '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg">'
        + '</div>'
        + '<div class="product-name text-center">' + products[i].name + '</div>'
        + '<div class="product-price text-center">&#8377; ' + products[i].cost + '</div>'
        + '</a>';
    }

    productList.innerHTML = productListHtml;
}

loadCategories();
loadProducts();

function searchProduct(e) {
    const data = {
        query: e.target.value,
        token:localStorage.getItem("token")
    };

    if(window.location.search) {
        data.categoryId = window.location.search.split("=")[1];
    }
    fetch(BASE_URL + '/api/v1/product/all', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                renderProducts(data.products);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

searchInput.addEventListener("keyup", searchProduct);