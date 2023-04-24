<template>
  <div id="background" :class="getTheme">
    <div id="app">

      <Menu v-if="activatedSettings.active" :activatedSettingsActive="activatedSettings.active" :weekday="getWeekday" :showSettings="showSettings" :doneToday="getDoneAmount" :activatedTheme="activatedTheme" id="menu" v-on:resetDay="resetDay" v-on:sendShowSettings="toggleSettings" v-on:themeChange="changeTheme"></Menu>
      
      <Setup v-if="showSettings || !activatedSettings.active" v-on:changedSettings="saveSettings" :previousSettings="activatedSettings"></Setup>

      <div v-if="!showSettings && activatedSettings.active" id="counter">
  <!--
        <div class="counter-item-avatar">
          <div class="counter-item-avatar-shorthand">{{getTaskShorthand}}</div>
        </div>  -->
        <div v-if="planHistory[0].done < planHistory[0].todo" class="counter-item-remaining">You have {{getRemainingAmount}} {{getTask}} left for {{getWeekday}}</div>
        <div v-else-if="planHistory[0].todo > 0" class="counter-item-remaining">All {{getTask}} done for {{getWeekday}}</div>
        <div v-else class="counter-item-remaining">Resting on {{getWeekday}}s</div>


        <div id="counter-form">

          <div v-if="planHistory[0].todo > 0" class="counter-form-wrapper">
            <div class="counter-form-button counter-form-button-minus"><button @mousedown="countLimiter($event, true)">-</button></div>
            <div class="counter-form-button counter-form-button-plus"><button @mousedown="countLimiter($event, false)">+</button></div>
            <input tabindex="1" v-on:keyup.enter="submitTaskInput()" class="counter-form-input" type="number" placeholder="0" v-model="taskInput">
            
          </div>

          <button tabindex="2" v-if="planHistory[0].todo > 0" id="counter-submit" @click="submitTaskInput()">Done</button>

        </div>

        <Statistics  :activatedSettings="activatedSettings" :planHistory="planHistory" :key="planHistory[0].done" v-on:resetDay="resetDay"></Statistics>


        <Footer  v-if="activatedSettings.active" :activatedSettings="activatedSettings" :planHistory="planHistory" :planHistoryOverhead="planHistoryOverhead"></Footer>


      </div>

    </div>
  </div>
</template>

<style>
#background {display: flow-root; min-height: 100vh;}

#background.dark {background: #35363a}
#background.light {background: #fff;}
#app {
  font-family: Avenir, Tahoma, Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(232, 234, 237, 1);
  margin-top: 60px;
  animation: fadeIn 800ms;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
#counter {z-index: 800;}
#menu {position: fixed; width: auto; right:0; top:0; display: flex; z-index:1100}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
.counter-item-avatar {background:#389588; width: 100px; height: 100px; padding:20px; border-radius: 20px; margin: 20px auto 15px auto; box-shadow: 0 20px 40px 0 rgba(21, 21, 23,0.25), inset 0 -24px 36px 0 rgba(62, 64, 68,0.35);}
.counter-item-avatar-shorthand {height: 60px; margin-top: 20px; line-height: 60px; display: inline-block; font-size: 60px; font-weight: bold; color: #fff; text-align: center; width: 100%;}
.counter-item-remaining {font-size:1.8em; margin-top:149px; color:rgba(255, 255, 255, 1)}
.counter-form-wrapper {display:flex; flex-direction: row; justify-content: center; align-items: center; width: 220px; margin: 32px auto; font-size:1em; font-weight: bold; position: relative; height: 48px; padding:0 8px}
.counter-form-input {text-align: center; position: absolute; left:0; right: 0; top: 0; bottom: 0; z-index: 140; background: rgba(255, 255, 255, 0.0); color:#fff; border: 2px solid #4c4d50; border-radius:64px; box-shadow: inset 8px 8px 16px rgba(0,0,0,0.00); transition: border ease 200ms;}
.counter-form-input:focus {
     outline:none; 
     border:2px solid #6a6b6d;
     box-shadow: inset 8px 8px 16px rgba(0,0,0,0.0);
     transition: border ease 200ms;
 }
.counter-form-button {position: absolute; z-index: 160;}
.counter-form-button button {color: rgba(255, 255, 255,0.5); background:  transparent; font-size:1.25em; font-weight: normal; border:none; height: 48px; width: 48px; text-align: center; padding:0; line-height: 100%; }
.counter-form-button button:active {color: rgba(255,255,255,0.66); transition: color linear 1s;}
.counter-form-button-minus {left: 4px; bottom:0; top: 0px; border-right: 0px solid rgba(26,28,32,0.5);}
.counter-form-button-plus {right: 4px; bottom:0; top: 0px; border-left: 0px solid rgba(26,28,32,0.5);}

#counter-submit {background: #767BD5;
    border: none;
    border-radius: 64px;
    height:48px;
    padding: 0;
    color: rgb(232, 234, 237);
    margin-top: 12px;
    width: 100px;
    font-weight: 500;
    cursor: pointer;
    transition: box-shadow ease 200ms;
}

#counter-submit:hover {
  box-shadow: inset 0px 8px 16px rgba(255,255,255,0.08);
  transition: box-shadow ease 200ms;
}

#counter-submit:active {
  box-shadow: inset 0px -24px 16px rgba(255,255,255,0.08);
  transition: box-shadow ease 40ms;
}

.variation-1 {background: #5C95B8; }
.variation-8 {background: #6C7278; }

#statistics-overview {width:auto; height: 7em; line-height: 7em; display: none;}


#background.light .counter-item-remaining {color:#707173;}
#background.light .counter-form-input {background:#fff; color:#35363a; border-color:#dbdbdc; transition: border ease 200ms;}
#background.light .counter-form-input:focus {outline:none; 
     border:2px solid #cdcdce;
     box-shadow: inset 8px 8px 16px rgba(0,0,0,0.0);
     transition: border ease 200ms;}
#background.light .counter-form-button button {color:#949496}
#background.light .counter-form-button button:active {color: #707173; transition: color linear 1s;}

</style>

<script>
import Menu from './components/Menu.vue';
import Setup from './components/Setup.vue';
import Statistics from './components/Statistics.vue';
import Footer from './components/Footer.vue';
import helper from './helper/helper.js';

export default {
  name: 'App',
  data() {
    return {
      /* Data below will be stored to localStorage */
      taskInput: null,
      mouseDown: {state: false, time: Date.now()},
      counterActive: 0,
      activatedSettings: {active: false},
      activatedTheme: 'auto',
      systemPreferedTheme: 'light',
      showSettings: false,
      today: false,
      planHistory: [],
      planHistoryOverhead: {days: 0},
      lastSave: Date.now(),
    }
  },
  components: {
    Menu,
    Setup,
    Statistics,
    Footer
  },
  methods: {
    updateOnDateChange() {

      if (!this.today) {
        this.today = helper.getDateAsString(0);
        
        setInterval(function(){
          
          if (localStorage.lastSave) {

            let globalLastSave = JSON.parse(localStorage.lastSave);

            if (globalLastSave > this.lastSave) {
            
              this.planHistory = JSON.parse(localStorage.planHistory);
              this.planHistoryOverhead = JSON.parse(localStorage.planHistoryOverhead);
              this.today = helper.getDateAsString(0);
              this.lastSave = globalLastSave;

            } else if (this.today !== helper.getDateAsString(0)) {

              this.today = helper.getDateAsString(0);
              this.resumePlan();
            }
          }
          }.bind(this), 3000);

      }

    },
    countLimiter(event, isDecremental) {

      if (event.button === 0) {

        this.mouseDown.state = true;
        this.mouseDown.time = Date.now();

        

        this.countOnHold(600, isDecremental);

      }

      
    },
    countOnHold(ms, isDecremental) {
    
        isDecremental ? this.decreaseTaskInput() : this.increaseTaskInput();
        ms = ms > 80 ? ms * 0.65 : 80;

        setTimeout(function() {
          let mouseDownDuration = Date.now() - this.mouseDown.time;
          if (this.mouseDown.state && mouseDownDuration >= ms) {
            this.countOnHold(ms, isDecremental);
          }
        }.bind(this), ms);
    },
    decreaseTaskInput() {
      let parsedInput = this.taskInput ? parseInt(this.taskInput) : 0;
      this.taskInput = parsedInput > 1 ? parsedInput - 1 : null;
    },
    increaseTaskInput() {
      let parsedInput = this.taskInput ? parseInt(this.taskInput) : 0;
      this.taskInput = parsedInput + 1;
    },
    submitTaskInput() {
      let parsedInput = this.taskInput ? parseInt(this.taskInput) : 0;
      this.planHistory[0].done = this.planHistory[0].done + parsedInput;
      this.taskInput = null;

      localStorage.planHistory = JSON.stringify(this.planHistory);
      this.lastSave = Date.now();

      document.activeElement.blur();


      
      
    },
    resetDay() {
      console.log('event recieved')
      this.planHistory[0].done = 0;
      localStorage.planHistory = JSON.stringify(this.planHistory);
      this.lastSave = Date.now();
    },
    changeTheme(mode) {
      console.log(mode);
      this.activatedTheme = mode;
      localStorage.activatedTheme = JSON.stringify(this.activatedTheme);
    },
    toggleSettings(show) {
    
      this.showSettings = show;
    },
    saveSettings(settings) {
    
      this.activatedSettings = settings;
      localStorage.activatedSettings = JSON.stringify(this.activatedSettings);

      this.showSettings = false;
      this.initialisePlan();
      console.log('settings loaded');
    
    },
    getWeekdayNumber(moveDays) {

      let dateObject = new Date();
      let weekdayToday = dateObject.getDay() ? dateObject.getDay() : 7;
      
      //console.log(weekdayToday);

      let weekdayTarget = weekdayToday + (moveDays ? moveDays : 0);

      while (weekdayTarget < 1 || weekdayTarget > 7) {
        weekdayTarget = weekdayTarget + (weekdayTarget < 1 ? 7 : - 7);
      }

      return weekdayTarget;
    
    },
    initialisePlan() {



      /*

      console.log('helperstring');
      console.log(helper.getDateAsString(-1));

      console.log('historystring');
      console.log(this.planHistory[0].date);


      */

      if (this.activatedSettings.active) {

        //this.testGetWeekdayNumber();

        if (!this.planHistory.length) {
      
          this.addDayToPlanHistory();
          console.log('initialised');
      
        } else if (parseInt(helper.getDateAsString()) > parseInt(this.planHistory[0].date)) {

            this.resumePlan();
            console.log('resumed');

        }
      }
    },
    resumePlan(moveDays) {

      moveDays = moveDays ? moveDays : 0;

      console.log('moveDays: ' + moveDays + ', planHistory[0].date: ' + this.planHistory[0].date + ', getDateAsString: ' + helper.getDateAsString(moveDays - 1));

      
      // If multiple dates are missing, the history will be restored by recursion
      if (parseInt(helper.getDateAsString(moveDays - 1)) > parseInt(this.planHistory[0].date)) {
        this.resumePlan(moveDays - 1);
      }
      
      // Raise the handicap if the user finished the current date succesfull
      if (moveDays === 0 && this.planHistory[0].done >= this.planHistory[0].todo && this.planHistory[0].todo > 0) {
        this.activatedSettings.handicap = (parseInt(this.activatedSettings.handicap) + 2) > 100 ? 100 : (parseInt(this.activatedSettings.handicap) + 2);
        localStorage.activatedSettings = JSON.stringify(this.activatedSettings);
      }


      // Adds todays date to the history
      this.addDayToPlanHistory(moveDays);

      // The latest date will trigger the update of other windows via global storage
      if (moveDays === 0) {
        this.lastSave = Date.now();
      }

    },
    addDayToPlanHistory(moveDays) {
      
      moveDays = moveDays ? moveDays : 0;

      let day = {};

      day.date = helper.getDateAsString(moveDays);
      day.task = this.activatedSettings.week[this.getWeekdayNumber(moveDays)].task;
      day.todo = Math.round((this.activatedSettings.week[this.getWeekdayNumber(moveDays)].amount / 100) * parseInt(this.activatedSettings.handicap));
      day.done = 0;

      this.planHistory.unshift(day);

      if (this.planHistory.length > 35) {

        this.removeDayFromPlanHistory();

      }
      
      console.log(day);
    },
    removeDayFromPlanHistory() {

      console.log('try to remove last day from history')

      if (!Object.prototype.hasOwnProperty.call(this.planHistoryOverhead, this.planHistory[this.planHistory.length - 1].task)) {

        this.planHistoryOverhead[this.planHistory[this.planHistory.length - 1].task] = this.planHistory[this.planHistory.length - 1].done;
      
      } else {
      
        this.planHistoryOverhead[this.planHistory[this.planHistory.length - 1].task] += this.planHistory[this.planHistory.length - 1].done;
      
      }
    
      this.planHistoryOverhead.days++;

      this.planHistory.pop();

      localStorage.planHistoryOverhead = JSON.stringify(this.planHistoryOverhead);
    

    },
  },
  computed: {

    getWeekday() {
      let day = '';
      if (this.activatedSettings.active && Object.keys(this.planHistory[0].length > 0)) {
        const dateString = this.planHistory[0].date.substring(4,6) + '/' + this.planHistory[0].date.substring(6,8) + '/' + this.planHistory[0].date.substring(0,4);
        day = helper.getDayName(dateString);
      }
      return day;
    },
    getTask() {
      let task = '';
      if (this.activatedSettings.active && Object.keys(this.planHistory[0].length > 0)) {
        task = this.planHistory[0].task;
      }
      return task;
    },
    getTaskShorthand() {
      let taskShorthand = '';
      if (this.activatedSettings.active) {
        taskShorthand = this.activatedSettings.week[this.getWeekdayNumber()].task.substring(0, 2);
      }
      return taskShorthand;
    },
    getRemainingAmount() {
      let remainingAmount = 0;
      if (this.activatedSettings.active && Object.keys(this.planHistory[0].length > 0)) {
        remainingAmount = this.planHistory[0].todo - this.planHistory[0].done;
      }
      return remainingAmount > 0 ? remainingAmount : 0;
    },
    getDoneAmount() {
      let done = 0;
      if (this.activatedSettings.active && Object.keys(this.planHistory[0].length > 0)) {
        done = this.planHistory[0].done;
      }
      return done;
    },
    getTheme() {
      if (this.activatedTheme === 'dark' || this.activatedTheme === 'light') {
        return this.activatedTheme;
      }
      return this.systemPreferedTheme;
    }
  },
  beforeMount() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.systemPreferedTheme = event.matches ? 'dark' : 'light';
    });

    window.addEventListener('mouseup', () => {
          this.mouseDown.state = false;
    });
  },
  mounted() {

    

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    this.systemPreferedTheme = 'dark';
    }

    if (localStorage.activatedSettings) {
      this.activatedSettings = JSON.parse(localStorage.activatedSettings);
    }
    if (localStorage.activatedTheme) {
      this.activatedTheme = JSON.parse(localStorage.activatedTheme);
    }
    if (localStorage.planHistory) {
      this.planHistory = JSON.parse(localStorage.planHistory);
    }
    if (localStorage.planHistoryOverhead) {
      this.planHistoryOverhead = JSON.parse(localStorage.planHistoryOverhead);
    }
    this.initialisePlan();
    this.updateOnDateChange();

    console.log('mounted main app');
    
    
    
  },
  watch: {
    activatedSettings(newActivatedSettings) {
      localStorage.activatedSettings = JSON.stringify(newActivatedSettings);
    },
    lastSave(newLastSave) {
      localStorage.lastSave = JSON.stringify(newLastSave);
    },
    planHistory(newPlanHistory) {
      localStorage.planHistory = JSON.stringify(newPlanHistory);
    }
  }
}
</script>


