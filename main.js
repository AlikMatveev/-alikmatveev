const startBtn = document.querySelector('.start-btn')
const block = document.querySelector('.block');
let current = 0;
const results = []

let data = []

fetch("getData.php").then(res => res.json()).then(json => {
  const keys = json.values.slice(0,1);
  data = json.values.slice(1).reduce((acc, el) => {
  let obj = el.reduce((arr, value, i) => {
      const k = keys[0][i];
      if(k.match(/^answer__\d/)){
        if(value !== ""){
          arr.answers.push(value);
        }
      }else if(k.match(/^score__\d/)){
          arr.scores.push(value);
      }else arr[k] = value;
      return arr;
    }, {answers: [], scores: []});
    acc.push(obj)
    return acc;
  }, []);
});


const createContent = (data, current) => {
  const {question, answers, scores} = data[current];
  return `
  <div class="quiz">
    <div class="quiz-header">
      <p>${current + 1}/${data.length}</p>
    </div>
    <div class="quiz-container">
      <div class="quiz-question">
        <p class="quiz-question__text">${question}</p>
        <form class="quiz-question__answers">
        	${answers.map((item, index) => `<div class="quiz-question"><label><input value="${item}" type="radio" data-score="${scores[index]}" name="answer">${item}</label></div>`).join('')}
  				<button class="btn quiz-submit">Подтвердить</button>
        </form>
      </div>
    </div>
  </div>`
}

const createCoupon = (text, color) => {
  const [h2, p] = text;
  return `
  <div class="coupon ${color}">
    <div class="coupon__info">
      <h2>${h2}</h2>
      <p>${p}</p>
    </div>
    <form class="form-data">
      <input type="text" placeholder="Введите ваш номер телефона:" name="phone" required />
      <button class="btn formdata-btn" type="submit">Подтвердить</button>
    </form>
  </div>`;
}

const result = (arr) => {
  const scores = arr.map(el => +el.score).reduce((a,b) => a+b);
  const allScores = Math.floor(data.map(({answers}) => answers.length).reduce((a,b) => a+b));

  if(scores <= Math.floor(allScores/3)){
    block.innerHTML = createCoupon(["Ваша коробка передач в хорошем состоянии.", "Не забывайте менять масло чтобы она и дальше работала хорошо. Оставьте свой номер телефона и мы отправим вам персональный купон на скидку в 2000р. на замену масла."], "green")
  }else if(scores > Math.floor(allScores/3) && scores <= Math.floor(2*(allScores/3))){
    block.innerHTML = createCoupon(["Ваша коробка передач работает не очень хорошо.", "Диагностика поможет выявить неисправности. Пройдите консультацию по телефону у мастера и запишитесь на бесплатную диагностику в нашем сервисе."], "yellow");
  }else{
    block.innerHTML = createCoupon(["Ваша коробка передач неисправна.", "Срочно пройдите бесплатную диагностику в нашем сервисе и выявите неисправности. В случае ремонта ваша персональная скидка составит 10% от стоимости."], "red");
  }
}


const generateBlock = (index) => block.innerHTML = createContent(data, index)

block.addEventListener('click', e => {
  if(e.target.matches('.quiz-submit')){
    e.preventDefault();
    const form = e.currentTarget.querySelector('form');
    const answer = form.answer.value;
    if(!answer){
      alert('Не выбран вариант');
    }else{
      const score = [...form.answer].filter(el => el.value == form.answer.value)[0].dataset.score;
      results[current] = {question: data[current].question, answer, score};
      if(current >= data.length - 1) return result(results);
      generateBlock(current += 1);
    }
  }
  if(e.target.matches(".formdata-btn")){
    e.preventDefault();
    const form = e.currentTarget.querySelector('form');
    if(!form.phone.value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gi)){
      alert("Введите корректый номер телефона");
      return null;
    }
    const formData = new FormData(form);
    formData.append("results", JSON.stringify(results));
    fetch("main.php", {
        method: "POST",
        body: formData
      }).then(data => block.innerHTML = `
        <div class="thanks">
          <p>Благодарим вас за заполнение заявки!</p>
          <a href="https://t-first.ru/">Автосервис T-FIRST</a>
        </div>`);
  }
});

startBtn.addEventListener("click", () => generateBlock(current));

const anchors = document.querySelectorAll('a[href*="#start"]')
console.log(anchors);
anchors.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href');
    console.log(blockID);
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
});
