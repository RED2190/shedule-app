export default {
    "unregHi": ( user ) => {return `Приветствую вас, ${ user }. \nК сожалению, я не нашел вас в списках зарегестрированных пользователей`},
    "regHi": ( user ) => { return `Приветствую вас, ${ user }. \nОпознал вас, как зарегестрированного пользователя, чтобы вы хотели сделать?` },

    "reg_step1": () => {return { text: `Здравствуйте! Не видел вас раньше, но уже запомнил вас!\nСпасибо, что выбрали нас в качестве ваших помощников!\n Давайте начнем регистрацию, как вас зовут? (Иванов Иван Иванович)`, props: {}}},
    //"reg_step1": (name) => {return { text: ``, props: {}}},
    "reg_step2": (name) => {return { text: `${name}, верно?`, props: { reply_markup: {

        inline_keyboard: [

            [{text: 'Да', callback_data: 'resolve'},{text: 'нет', callback_data: 'reject'} ],

        ]

    } }}},
    "reg_step2_resolve": () => {return { text: "Теперь введите логин:", props: {}}},
    "reg_step2_reject": () => {return { text: "Давайте попробуем еще раз, введите свое имя:", props: {}}},
    
    "reg_step3_wait": () => {return {text: `Проверяю ваш логин, это может занять некоторое время...`, props: {}} },
    "reg_step3_mis": () => {return  {text: `Вы допустили ошибку в формате логина, проверьте правильность введенных данных. Логин должен состоять из минимум 4 символов.\n Введите логин еще раз`, props: {}} },
    "reg_step3_novalid": () => {return {text: `К сожалению, данный логин уже занят...\n Введите логин еще раз`, props: {}} },
    "reg_step3": (login) => { return {text: `Логин принят: <code>${login}</code>. Давайте придумаем пароль:`, props: { parse_mode: "HTML" }} },
    
    
    "reg_step4": (pass) => { return { text: `||${pass}||, верно?`, props: {  parse_mode: "MarkdownV2", reply_markup: {

        inline_keyboard: [

            [{text: 'Да', callback_data: 'resolve'},{text: 'нет', callback_data: 'reject'} ],

        ]

    } } } },
    "reg_step4_resolve": () => {return { text: "Пароль успешно сохранен! Базовая регистрация завершена!", props: {}}},
    "reg_step4_reject": () => {return { text: "Давайте попробуем еще раз, введите пароль:", props: {}}},
}