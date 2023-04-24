<template>
  <div class="tabfit-setup">
    <h1 id="menu-headline">Settings</h1>
    <p class="menu-paragraph">
      {{computedStringCreateOrEdit}} your plan and {{computedStringStartOrContinue}} exercising.<br>
    </p>
    <!--<div>
      <div id="setup-name">
        <i class="icofont-ui-user"></i><label for="setup-name-input">Name</label><input id="setup-name-input" name="setup-name-input" v-model="planConfig.name" placeholder="Name">
      </div>
    </div>-->
      <div class="plan-container">



        <plan-card class="setup-card weekday" v-for="day in planConfig.week" :key="day.name" :day.sync="planConfig.week[day.id]" ></plan-card>

        <!--

        <div class="setup-card weekday"><span class="day-heading">Mon</span><div class="plan-item-avatar"><div class="plan-item-avatar-shorthand">Pu</div></div><input class="plan-item-input-task" v-model="setupPlan.monday.task"><div class="plan-item-amount"><span>{{setupPlan.monday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Tue</span><div class="plan-item-avatar"><div class="plan-item-avatar-shorthand">Pu</div></div><input class="plan-item-input-task" v-model="setupPlan.tuesday.task"><div class="plan-item-amount"><span>{{setupPlan.tuesday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Wed</span><div class="plan-item-avatar plan-item-avatar-variation-1"><div class="plan-item-avatar-shorthand">Sq</div></div><input class="plan-item-input-task" v-model="setupPlan.wednesday.task"><div class="plan-item-amount"><span>{{setupPlan.wednesday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Thu</span><div class="plan-item-avatar"><div class="plan-item-avatar-shorthand">Pu</div></div><input class="plan-item-input-task" v-model="setupPlan.thursday.task"><div class="plan-item-amount"><span>{{setupPlan.thursday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Fri</span><div class="plan-item-avatar"><div class="plan-item-avatar-shorthand">Pu</div></div><input class="plan-item-input-task" v-model="setupPlan.friday.task"><div class="plan-item-amount"><span>{{setupPlan.friday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Sat</span><div class="plan-item-avatar plan-item-avatar-variation-1"><div class="plan-item-avatar-shorthand">Sq</div></div><input class="plan-item-input-task" v-model="setupPlan.saturday.task"><div class="plan-item-amount"><span>{{setupPlan.saturday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
        <div class="setup-card weekday"><span class="day-heading">Sun</span><div class="plan-item-avatar plan-item-avatar-variation-free"><div class="plan-item-avatar-shorthand">Re</div></div><input class="plan-item-input-task" v-model="setupPlan.sunday.task"><div class="plan-item-amount"><span>{{setupPlan.sunday.amount}}</span><div class="plan-item-amount-control"><div class="plan-item-amount-control-up"><button><i class="icofont-caret-up"></i></button></div><div class="plan-item-amount-control-down"><button><i class="icofont-caret-down"></i></button></div></div></div></div>
       
       -->

      </div>
    
 
    <h3 id="handicap-headline"><i class="icofont-clock-time"></i></h3>
    

    <input type="range" min="0" max="100" step="1" v-model="planConfig.handicap" class="slider" id="handicap-slider">
    <p id="handicap-paragraph">{{computedExampleGain}}</p>
    <button class="button-save" @click="sendSettings(true)">{{computedStringStartOrUpdate}}</button>
    <button v-if="previousSettings.active" class="button-keep" @click="sendSettings(false)">Cancel</button>

  </div>
</template>

<script>

import PlanCard from './PlanCard.vue';

export default {
  name: 'PlanSetup',
  data() { 
    return {
      planConfig: { name: '',
                    week:     { 1: {id: 1, name: 'Monday', task: 'Pushups', amount: 100},
                                2: {id: 2, name: 'Tuesday', task: 'Pushups', amount: 100},
                                3: {id: 3, name: 'Wednesday', task: 'Squats', amount: 150},
                                4: {id: 4, name: 'Thursday', task: 'Pushups', amount: 100},
                                5: {id: 5, name: 'Friday', task: 'Pushups', amount: 100},
                                6: {id: 6, name: 'Saturday', task: 'Squats', amount: 150},
                                7: {id: 7, name: 'Sunday', task: 'Resting', amount: 0}
                              },
                    handicap: 50,
                    active: true,
                  },
    }
  },
  methods: {
    sendSettings(isUpdate) {
      if (isUpdate) {
        this.$emit('changedSettings', this.planConfig);
      } else {

        let reloadedSettings = JSON.parse(localStorage.activatedSettings);
        this.$emit('changedSettings', reloadedSettings);
        this.planConfig = reloadedSettings;
        console.log('restored')
      }

    },
  },
  computed: {

    computedExampleGain: function () {
      
      for(let day in this.planConfig.week){
        
        if(this.planConfig.week[day].amount) {

          console.log('foo');

          let exampleStartAmount = Math.round((this.planConfig.week[day].amount / 100) * this.planConfig.handicap);
          let exampleGoalAmount = this.planConfig.week[day].amount;
          let exampleTime = Math.round(((100 - this.planConfig.handicap) / 2) / 7) ;
          let exampleTask = this.planConfig.week[day].task;

          return 'From ' + exampleStartAmount + ' to ' + exampleGoalAmount + ' ' + exampleTask + ' in about ' + exampleTime + ' weeks.';

        } 
        
      }

      return 'Looks like you will just be resting.'
      
    },
    computedStringStartOrUpdate() {
      if (this.previousSettings.active) {
        return 'Update';
      } else {
        return 'Start';
      }
    },
    computedStringCreateOrEdit() {
      if (this.previousSettings.active) {
        return 'Edit';
      } else {
        return 'Create';
      }
    },
    computedStringStartOrContinue() {
      if (this.previousSettings.active) {
        return 'continue';
      } else {
        return 'start';
      }
    },
  },
  props: {
    previousSettings: {type: Object}
  },
  components: {
    PlanCard
  },
  mounted() {
    if (this.previousSettings.active) {
      this.planConfig = this.previousSettings;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--47484d-->
<style scoped>
h3 {margin: 40px 0 0;}
ul {list-style-type: none; padding: 0;}
li {display: inline-block; margin: 0 10px;}
a {color: rgba(232, 234, 237, 1);}
.plan-container {text-align: left; max-width:1600px; margin:48px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: center;}
#setup-name {margin-bottom:45px; margin-top: 45px; display: inline-block; width:220px; position: relative; padding:15px; border-radius:10px; height: 1em; font-size:0.95em;}
#setup-name i {position: absolute; left: 1em; opacity: 0.25; z-index: 150;}
#setup-name label {display: none;}
#setup-name-input { background: rgba(62, 64, 68, 1); position: absolute; left: 0; top: 0; z-index:140; width: auto; right: 0; bottom: 0; padding-left: 3em; padding-right: 3em; 
                    text-align: center; color: #fff; font-size: 1em; border: 0px solid transparent; border: 0px solid rgba(255,255,255, 0.05);  border-radius: 10px; box-shadow: 0 6px 18px 0 rgb(21 21 23 / 0%);}
.setup-card {width:190px; background: #3d3e42;  margin: 0px 0px 5px 1px; padding:0 0 30px 0; text-align: center;}
.setup-card:first-child {border-top-left-radius: 15px; border-bottom-left-radius: 15px;}
.setup-card:last-child {border-top-right-radius: 15px; border-bottom-right-radius: 15px;}

#handicap-slider {width: 440px; margin-top:50px; background: #444549; -webkit-appearance: none; border-radius:10px; overflow:hidden}
#handicap-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background:rgba(255,255,255,0.5);
  cursor: pointer;
  border: 1px solid #35363a;
  box-shadow: -407px 0 0 400px #5b5c5f;}

#handicap-paragraph, .menu-paragraph {opacity: 0.5; font-size: 1.1em;}
#handicap-headline {font-size:1.4em; margin-top:50px; margin-bottom: 5px; font-weight:lighter; opacity: 1; display: none;}
#menu-headline {opacity: 1; font-size:1.8em; margin-bottom: 0; margin-top:149px; font-weight:400}
.button-save {background: #767BD5;
    border: none;
    border-radius: 9px;
    height:48px;
    padding: 0;
    color: rgb(232, 234, 237);
    margin-top: 48px;
    margin-bottom:96px;
    width: 100px;
    font-weight: 500;
    cursor: pointer;
}

.button-keep {background: #4c4d50;
    border: none;
    border-radius: 9px;
    height:48px;
    padding: 0;
    color: rgb(232, 234, 237);
    margin-left:24px;
    margin-top: 48px;
    margin-bottom:96px;
    width: 100px;
    font-weight: 500;
    cursor: pointer;
}

.container {max-width: 900px; margin: 0 auto;}
label {width: 100%;}

.button-keep, .button-save {box-shadow: 0 10px 20px 0 rgba(11, 11, 13,0.1), inset 0 10px 15px 0 rgba(255,255,255, 0.03);}


#background.light #menu-headline, #background.light #handicap-paragraph, #background.light .menu-paragraph, #background.light #handicap-headline {color:#707173;}
#background.light #handicap-paragraph, #background.light .menu-paragraph {opacity: 0.75;}
#background.light .setup-card {background:#eaeaea; color:#707173}
#background.light #handicap-slider {background:#dfdfe0; color:#202227}
#background.light #handicap-slider::-webkit-slider-thumb {background:#98999b; color:#202227; box-shadow: -407px 0 0 400px rgba(152, 153, 155,0.25); border: 1px solid #dbdbdc;}
#background.light .button-keep {background:#98999b}
#background.light .button-keep, #background.light .button-save {color:#fff;}
#background.light .setup-card {margin-left: 0px; border-right:1px solid #dbdbdc;}
#background.light .setup-card:last-child {border-right:none;}


</style>
