const copyYear = document.querySelector(".year");
const login = document.querySelector(".login-btn");
const lawer = document.querySelector("#lawer");
const contacts = document.querySelector("#contacts")

copyYear.innerHTML = new Date().getFullYear();

const modal = new Modal({maxWidth: "400px"});
const modal2 = new Modal({maxWidth: "600px"})

login.addEventListener('click', () => {
    modal.open();
    modal.setContent(`
        <h2 class="modal__title">Авторизация</h2>
        <form class="login-modal__form">
            <input type="text" placeholder="Логин:" name="login" id="login" class="login-form__input" required>
            <input type="password" placeholder="Пароль:" name="password" id="password" class="login-form__input" required>
            <div class="form__group">
                <button class="btn login-form__btnlogin" type="button">Войти</button>
                <button class="btn login-form__change" type="button">Забыли пароль</button>
            </div>
        </form>
    `);
  });

lawer.addEventListener("click", () => {
    modal2.open();
    modal2.setContent(`
    <div class="lawer-container">
        <h2 class="modal__title">Юридическая информация</h2>

        <div class="lawer-info__group">
            <p>Название:</p>
            <p>ООО «ЛР»</p>
        </div>

        <div class="lawer-info__group">
            <p>ИНН:</p>
            <p>7728767260</p>
        </div>

        <div class="lawer-info__group">
            <p>КПП:</p>
            <p>772801001</p>
        </div>

        <div class="lawer-info__group">
            <p>ОГРН:</p>
            <p>1117746212210</p>
        </div>

        <div class="lawer-info__group">
            <p>Юридический адрес:</p>
            <p>Российская Федерация, 117574, г. Москва, проезд Одоевского, д.3, корп.7, ЭТ/ПОМ/ОФ 1/II/14</p>
        </div>

        <div class="lawer-info__group">
            <p>Фактический адрес:</p>
            <p>Российская Федерация, 115419, г. Москва, 2-й Верхний Михайловский проезд, д. 9, стр. 2, офис 501</p>
        </div>

        <div class="lawer-info__group">
            <p>Реквизиты:</p>
            <p>АКБ «Абсолют Банк» (ПАО) г. Москва</p>
        </div>

        <div class="lawer-info__group">
            <p>Расчетный счет:</p>
            <p>40702810422000029070</p>
        </div>

        <div class="lawer-info__group">
            <p>К/С:</p>
            <p>30101810500000000976</p>
        </div>

        <div class="lawer-info__group">
            <p>БИК:</p>
            <p>044525976</p>
        </div>
    </div>
    `)
})


contacts.addEventListener('click', () => {
    modal2.open();
    modal2.setContent(`
    <div class="contacts-container">
        <h2 class="modal__title">Контакты</h2>

        <div class="contacts-info__group">
            <img src="img/icon-phone.png">
            <a class="bold" href="tel:74996536610">+7 (499) 653 - 66 - 10</a>
        </div>

        <div class="contacts-info__group">
            <img src="img/icon-mail.png">
            <a class="bold" href="mailto:info@ligand-research.com">info@ligand-research.com</a>
        </div>

        <div class="contacts-info__group">
            <img src="img/icon-geo.png">
            <a href="mailto:info@ligand-research.com">115419, г. Москва, 2-й Верхний Михайловский проезд, д. 9, стр. 2, офис 501</a>
        </div>

        <iframe style="margin-top: 20px "src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;um=constructor%3Ab5f2a5270066ba9ecabc78a68b0d72e49307644948dce71771507701f6029840" frameborder="0" allowfullscreen="true" width="100%" height="400px" style="display: block;"></iframe>
    </div>
    `)
})