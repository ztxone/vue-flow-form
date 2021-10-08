<template>
  <!-- <Rating></Rating> -->
  <div>
    <header class="vff-header">
      <div class="f-container">
       <!-- Add custom logo here -->
        <img class="logo" src="./assets/LOGO750.jpg"

        />
      </div>
    </header>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Thank you. 🙏</span>
            <span class="f-section-text">
              Great work, the survey is completed, and our demo is done. You can review your answers or press submit.
            </span>
          </p>
          <p class="f-description">Note: No data will be saved and/or sent in this demo.</p>
        </div>  
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button 
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit"
          >
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>
      </template>
    </flow-form>
  </div>
</template>

<script>
//import Rating from '../../Rating.vue'

  // Import necessary components and classes
  import FlowForm from '../../src/components/FlowForm.vue'
  import QuestionModel, { QuestionType, ChoiceOption, LinkOption } from '../../src/models/QuestionModel'
  import LanguageModel from '../../src/models/LanguageModel'
  // If using the npm package, use the following line instead of the ones above.
  // import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',

    components: {
      FlowForm, 
      //Rating
    },

    data() {
      return {
        submitted: false,
        completed: false,
        language: new LanguageModel(),
        // Create question list with QuestionModel instances
        questions: [
          new QuestionModel({
            id: 'first_name',
            tagline: 'Привет! Пройдите, пожалуйста, наш опрос 😊',
            title: 'Как Вас зовут?',
            type: QuestionType.Text,
            required: true,
            placeholder: 'Начните печатать здесь...'
          }),
          new QuestionModel({
            id: 'email',
            tagline: "Nice to meet you 👀, let's continue",
            title: 'Provide an example email.',
            type: QuestionType.Email,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'multiple_choice_image',
            tagline: "Let's take it one step further...",
            title: 'Tell us what is your favorite social network hangout.',
            helpTextShow: false,
            type: QuestionType.MultiplePictureChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                imageSrc: require('./assets/images/facebook.png'),
                imageAlt: 'Facebook logo',
                label: 'Facebook'
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/twitter.png'),
                imageAlt: 'Twitter logo',
                label: 'Twitter'
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/instagram.png'),
                imageAlt: 'Instagram logo',
                label: 'Instagram'
              }),
              new ChoiceOption({
                imageSrc: require('./assets/images/tiktok.png'),
                imageAlt: 'TikTok logo',
                label: 'TikTok'
              }),
            ]
          }),
          new QuestionModel({
            id: 'phone',
            title: 'Doing great! 👍 Go ahead and try with a phone number.',
            type: QuestionType.Phone,
            required: true,
            mask: '(###) ###-####'
          }),
          new QuestionModel({
            id: 'movies',
            title: 'List your favorite movies. 🍿',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'multiple_choice',
            tagline: 'FYI, You can always go back 👈, use the up arrow on the bottom.',
            title: 'Multiple choice question:',
            helpTextShow: false,
            type: QuestionType.MultipleChoice,
            multiple: false,
            allowOther: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
               }),
              new ChoiceOption({
                label: 'Answer 3'
              })
            ]
          }),
          new QuestionModel({
            id: 'multiple_choices',
            title: 'Multiple choices question:',
            type: QuestionType.MultipleChoice,
            multiple: true,
            helpText: 'Select all that apply. 👇',
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
              }),
              new ChoiceOption({
                label: 'Answer 3'
              }),
              new ChoiceOption({
                label: 'Answer 4'
              })
            ]
          }),
          new QuestionModel({
            id: 'break_1',
            title: 'Awesome, thank you. 🙏',
            content: 'You arrived at the section break of our little demo survey. To continue exploring, just press enter or use the continue button.',
            description: 'Note: We will take a look at our multiple path feature next.',
            type: QuestionType.SectionBreak
          }),
          new QuestionModel({
            id: 'choose_path',
            tagline: 'Where would you like to go? 🤔',
            title: 'Choose your path:',
            type: QuestionType.Dropdown,
            multiple: false,
            placeholder: 'Select',
            inline: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Path A'
              }),
              new ChoiceOption({
                label: 'Path B',
                value: 'path_b'
              })
            ],
            jump: {
              path_b: 'path_b'
            }
          }),
          new QuestionModel({
            id: 'path_a',
            title: 'Excellent choice! 🥳',
            content: 'Press enter or use the continue button for the final submit screen.',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'path_b',
            tagline: 'Path B',
            title: 'Hmm, are you sure?',
            helpText: 'Path A sounds like a winner! 😉',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Ok, let\'s go with A',
                value: 'path_a'
              }),
              new ChoiceOption({
                label: 'Yes, finish the survey'
              })
            ],
            jump: {
              path_a: 'path_a'
            }
          })
        ]
      }
    },

    mounted() {
      document.addEventListener('keyup', this.onKeyListener)
    },

    beforeUnmount() {
      document.removeEventListener('keyup', this.onKeyListener)
    },

    methods: {
      onKeyListener($event) {
        // We've overriden the default "complete" slot so
        // we need to implement the "keyup" listener manually.

        if ($event.key === 'Enter' && this.completed && !this.submitted) {
          this.onSendData()
        }
      },

      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
      },

      /* eslint-disable-next-line no-unused-vars */
      onSubmit(questionList) {
        // This method will only be called if you don't override the
        // completeButton slot.
        this.onSendData()
      },
      
      onSendData() {
        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        this.$refs.flowform.submitted = true

        this.submitted = true

        /* eslint-disable-next-line no-unused-vars */
        const data = this.getData()
        /*
          You can use Fetch API to send the data to your server, eg.:

          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */
      },

      getData() {
        const data = {
          questions: [],
          answers: []
        }

        this.questions.forEach(question => {
          if (question.title) {
            let answer = question.answer
            if (Array.isArray(answer)) {
              answer = answer.join(', ')
            }

            data.questions.push(question.title)
            data.answers.push(answer)
          }
        })

        return data
      }
    }
  }
</script>

<style lang="css">
  /* @import './node_modules/@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  @import './node_modules/@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */

.logo {
  height: 80px;
}  
</style>