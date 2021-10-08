/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

export default class LanguageModel {
  constructor(options) {
    this.enterKey = 'Enter'
    this.shiftKey = 'Shift'
    this.ok = 'OK'
    this.continue = 'Продолжить'
    this.skip = 'Пропустить'
    this.pressEnter = 'Нажмите :enterKey'
    this.multipleChoiceHelpText = 'Выберите несколько ответов'
    this.multipleChoiceHelpTextSingle = 'Выберите только один ответ'
    this.otherPrompt = 'Другое'
    this.placeholder = 'Напишите свой ответ здесь...'
    this.submitText = 'Отправить'
    this.longTextHelpText = 'Нажмите :shiftKey + :enterKey для переноса строки'
    this.prev = 'Назад'
    this.next = 'Вперед'
    this.percentCompleted = ':percent% завершено'
    this.invalidPrompt = 'Пожалуйста, заполните поле корректно'
    this.thankYouText = 'Благодарим Вас!'
    this.successText = 'Ваше мнение учтено!'
    this.ariaOk = 'Нажмите, чтобы продолжить'
    this.ariaRequired = 'Этот шаг обязателен'
    this.ariaPrev = 'Предыдущий шаг'
    this.ariaNext = 'Следующий шаг'
    this.ariaSubmitText = 'Нажмите, чтобы отправить'
    this.ariaMultipleChoice = 'Нажмите :letter чтобы выбрать'
    this.ariaTypeAnswer = 'Напишите свой ответ здесь'
    this.errorAllowedFileTypes = 'Некорректный тип файла. Допустимые типы файлов: :fileTypes.'
    this.errorMaxFileSize = 'Превышем размер файла(ов). Допустимый размер файла: :size.'
    this.errorMinFiles = 'Слишком мало файлов добавлено. Минимальное количество файлов: :min.'
    this.errorMaxFiles = 'Слишком много файлов добавлено. Максимальное количество файлов: :max.'

    Object.assign(this, options || {})
  }

  /**
   * Inserts a new CSS class into the language model string to format the :string
   * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
   */
  formatString(string, replacements) {
    return string.replace(/:(\w+)/g, (match, word) => {
      if (this[word]) {
        return '<span class="f-string-em">' + this[word] + '</span>'
      } else if (replacements && replacements[word]) {
        return replacements[word]
      }
      
      return match
    })
  }

  formatFileSize(bytes) {
    const
      units = ['B', 'kB', 'MB', 'GB', 'TB'],
      i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0
      
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
  }
}


