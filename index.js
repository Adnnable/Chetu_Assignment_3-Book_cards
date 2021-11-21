document.querySelector('.add-btn').addEventListener('click', getInputValues);

let bookArray = [];
let temp = [];

function getInputValues() {
    let bookName = document.querySelector('.book-name');
    let bookPrice = document.querySelector('.book-price');

    if (sanitizeText(bookName.value, bookPrice.value)) {
        if (!temp.includes(bookName.value)) {
            temp.push(bookName.value);
            bookArray.push({ [bookName.value]: bookPrice.value });
            bindCards();
        }
        else {
            alert(`Book: ${bookName.value} already exists`);
        }
    }
    bookName.value = '';
    bookPrice.value = '';
}

    // let arr = ['a', 'b'];
    // let [A, B] = arr;
    // console.log(A,B);

    // let person = {
    //     name: 'ABC',
    //     roll: '102'
    // };

    // let {name, roll} = person;

    // console.log(name, roll);
    
function bindCards() {
    let cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    bookArray.forEach((element, i) => {
        let [title, price] = Object.entries(element)[0];
    
        cardContainer.innerHTML +=
            ` <div class="card">
                <div class="card-body">
                    <div class="left">
                        <label>Title</label>
                    </div>
                    <div class="right">
                        <p>${title}</p>
                    </div>
                </div>
                <div class="card-body">
                    <div class="left">
                        <label>Price</label>
                    </div>
                    <div class="right">
                    <p>${price}</p>
                    </div>
                </div>
                <div class="card-body">
                    <button class="remove-btn" onclick="removeCard('${title}', ${i})">Remove</button>
                </div>
            </div>`;
    });
}

function removeCard(str, i) {
    let cardList = document.querySelectorAll('.card');
    cardList.forEach((ele, index) => {
        if (index == i) {
            ele.classList.add('fadeOut');
        }
    });
    setTimeout(() => {
        temp = [];
        let tempArr = bookArray.filter((element, i) => {
            let [title] = Object.keys(element);
            if (str != title) {
                temp.push(title);
                return true;
            }
        });
        bookArray = tempArr;
        bindCards();
    }, 800);
}

function sanitizeText(name, price) {
    let status = 1;
    if (!(/^[a-zA-Z]+$/.test(name))) {
        alert('Book name must be a string');
        status = 0;
    }
    if (!(/^[0-9]+$/.test(price))) {
        alert('Book price must be a number');
        status = 0;
    }

    if (!status) {
        return false;
    }

    return true;
}