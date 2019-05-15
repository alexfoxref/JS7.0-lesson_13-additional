'use strict';

const text = document.querySelector('.text');

//асинхронная функция перебора цифр числа
function animatedNum(str, element) {
    let index = 0,
        count = 0;

    function getNum(str) {
        getOneNum(str)
            .then((res) => {
                if (index == 0) {
                    element.textContent = count
                } else {
                    element.textContent = `${res.slice(0, index)}${count}`
                }
                count++;
            })
            .then(() => {
                waitTimeout(20)
                    .then(() => {
                        getNum(str)
                    })
            })
            .catch((err) => console.log(err))
    }

    function getOneNum(str) {
        return new Promise((resolve, reject) => {
            if (index < str.length) {
                if (count <= +str[index]) {
                    resolve(str);
                } else {
                    index++;
                    (index < str.length) ? count = 0 : count = ''
                    resolve(str);
                }
            } else {
                reject('конец числа');
                index = 0;
                count = 0;
            }
        })
    }

    function waitTimeout(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        })
    }

    getNum(str);
}

animatedNum('357925679', text);