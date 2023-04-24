<template>
  
 

        <div>
          <span class="day-heading">{{weekdayShorthand}}</span>
          <div class="plan-item-avatar" :class="getBgColor">
            <div class="plan-item-avatar-shorthand">{{taskShorthand}}</div>
            </div>
            <div class="plan-item-input-task-wrapper">
              
              <input class="plan-item-input-task" :value="day.task" @focus="$event.target.select()" v-on:keyup.enter="$event.target.blur()" @input="$emit('update:day', {id: day.id, name: day.name, task: $event.target.value, amount: day.amount, color: day.color})">
              <i class="icofont-pencil-alt-2 plan-item-input-task-icon"></i>
            </div>
            <div class="plan-item-amount">
             
            <div class="plan-item-amount-control">
              <div class="plan-item-amount-control-down">
                <button @click="$emit('update:day', {id: day.id, name: day.name, task: day.task, amount: day.amount - 10, color: day.color})">-</button>
              </div>
              <div class="plan-item-amount-display">
                {{day.amount}}
              </div>
              <div class="plan-item-amount-control-up">
                <button @click="$emit('update:day', {id: day.id, name: day.name, task: day.task, amount: day.amount + 10, color: day.color})">+</button>
              </div>
            </div>
          </div>
        </div>

       
  
</template>

<script>
export default {
  name: 'PlanCard',
  props: {
    day: {type: Object}
  },
  computed: {
    weekdayShorthand: function () {
      return this.day.name.substring(0, 3);
    },
    taskShorthand: function () {
      return this.day.task.length > 1 ? this.day.task.substring(0, 2) : '';
    }, 
    getBgColor() {
      if (parseInt(this.day.amount) < 1) {
        return 'without-todo';
      }
      return 'with-todo';
    }
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--47484d-->
<style>

.plan-item-avatar {background:#389588; width: 50px; height: 50px; padding:10px; border-radius: 10px; margin: 12px auto 24px auto;}
.plan-item-avatar-shorthand {height: 30px; margin-top: 10px; line-height: 30px; display: inline-block; font-size: 30px; font-weight: bold; color: #fff; text-align: center; width: 100%;}
.with-todo {background: rgba(118, 123, 213, 1.0); }
.without-todo {background: #646568; }
.plan-item-amount-control {display:flex; flex-direction: row; justify-content: center; align-items: center;}
.plan-item-amount-control button {border:none; padding: 0; color:#fff; cursor: pointer; height: 30px; width:30px; background: linear-gradient(180deg, rgba(101,102,105,0.15) 0%, rgba(101,102,105,0.1) 100%); text-align: center; color:#bec0c4}
.plan-item-amount-control-up button {border-top-right-radius:  5px; border-bottom-right-radius: 5px;}
.plan-item-amount-control-down button {border-top-left-radius: 5px; border-bottom-left-radius: 5px;}
.plan-item-input-task {background: transparent; cursor:pointer; border: 2px solid transparent; color:#e8eaed; font-weight: 400; font-size:0.95em; padding:0; width:116px; text-align: center; border-radius:5px; opacity: 1;  height: 32px; line-height: 32px; position:absolute; top:0; bottom:0; right:0; left:0; z-index:1250;}
.plan-item-input-task:focus {cursor:text; background: #3d3e42; outline:none; border:2px solid #6a6b6d; box-shadow: inset 8px 8px 16px rgba(0,0,0,0.08)}
.plan-item-input-task-icon {height: 32px; line-height: 32px; position: absolute; right:4px; z-index:1225; font-size:0.7em; opacity: 0.0;}
.plan-item-input-task-wrapper:hover .plan-item-input-task-icon {height: 32px; line-height: 32px; position: absolute; right:4px; z-index:1225; font-size:0.7em; opacity: 0.5;}
.plan-item-input-task-wrapper {height: 32px; width:122px; position: relative; margin:0px 34px 16px 34px; opacity: 0.8;}
.plan-item-amount {display: inline-block; height:30px; line-height: 30px; border: 1px solid rgba(101,102,105,0.15); border-radius:5px; box-shadow: 0 2px 6px 0 rgb(21 21 23 / 10%); }
.plan-item-amount span {text-align: center; padding: 16px 8px; font-weight: bold; font-size: 0.85em; opacity: 0.75;}
.day-heading {opacity: 0.5; font-size:0.65em; text-transform: uppercase; font-family: Helvetica, Arial, sans-serif; display: block; text-align: center; /* background: rgba(255,255,255,0.02); */ border:0px solid rgba(232, 234, 237, 0.3); padding: 24px 0px 16px 0px; border-radius:0px; /*box-shadow: 0 10px 20px 0 rgba(21, 21, 23,0.15);*/}
.plan-item-amount-display {
    text-align: center;
    
    width: 60px;
line-height: 30px;
    font-size: 0.8em;
    font-weight: bold;
    opacity: 0.5;}
.card-input-element {display: none;}
.card-input {margin: 10px; padding: 00px;}
.card-input:hover {cursor: pointer;}
.card-input-element:checked + .card-input {box-shadow: 0 0 1px 2px #41b883;}
.panel-heading {font-weight: bold; margin-bottom: 0.33rem;}
.panel-body {font-size:0.9em; opacity: 0.7;}
.plan-overview {display:inline-flex}
.plan-item .panel {padding:45px; background:rgb(62, 64, 68); border-radius:6px;}


#background.light .plan-item-input-task {color:#707173;}
#background.light .plan-item-input-task:focus {color:#707173; background: #eaeaea; border-color:#d0d1d2; box-shadow: inset 8px 8px 16px rgba(0,0,0,0.04)}
#background.light .plan-item-amount-control button {color:rgba(32, 34, 39,0.75); background: linear-gradient(0deg, #e6e6e6 0%, #eaeaea 100%);}
#background.light .plan-item-amount {background: #eaeaea; box-shadow: 0 2px 6px 0 rgb(32 34 39 / 04%); border-color:#dbdbdc}
#background.light .plan-item-input-task-wrapper:hover .plan-item-input-task-icon {color:rgba(32, 34, 39,0.7);}
#background.light .without-todo {background: #98999b;}
#background.light .plan-item-avatar {box-shadow: none;}
#background.light .day-heading {opacity: 0.75;}

</style>
