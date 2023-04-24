<template>

    <div id="statistics-outer">
    

        <div id="statistics-wrapper"  :class="{ 'expanded' : expandedStatistics}">
            <div class="statistics-overlay"></div>
            <statistics-bar v-for="statisticsBar in statistics" :statisticsBar="statisticsBar" :key="statisticsBar.dateString"></statistics-bar>
            <div v-if="planHistory.length > 30" class="statistics-inner-message">Sessions older than 4 weeks are included in your overall statistics below.</div>
        </div>

        <button v-if="planHistory.length > 7" id="statistics-expand-submit" @click="toggleStatistics()">
            <i v-if="!expandedStatistics" class="icofont-caret-down"></i>
            <i v-if="expandedStatistics" class="icofont-caret-up"></i>
        </button>

    </div>

</template>


<script>
import StatisticsBar from './StatisticsBar.vue';
import helper from '../helper/helper.js';

export default {
  name: "AppStatistics",
  components: {
      StatisticsBar
      },
  props: {
      activatedSettings: {type: Object},
      planHistory: {type: Array}
  },
  data() { 
      return {
          statistics: [],
          highestValue: 0,
          expandedStatistics: false,
      }
  },
  computed: {
    planHistoryLength() {
        return this.planHistory.length;
    },
    activeDate() {
        return this.planHistory[0].date;
    },
    getStatisticsButton() {
        return this.expandedStatistics ? 'Show less' : 'Show more'; 
    }
  },
  watch: {
    /*
    planHistoryLength () {
        this.setHighestValue();
        this.generateStatisticsRenderValues(this.highestValue);
    },
    */
    activeDate () {
        this.setHighestValue();
        this.generateStatisticsRenderValues(this.highestValue);
    },

  },
  methods: {
      toggleStatistics() {
          this.expandedStatistics = this.expandedStatistics ? false : true;
          console.log('expandedStatistics changed to: ' + this.expandedStatistics);
      },
      setHighestValue() {
          let highestValue = 0;
          for (let day of this.planHistory) {
              highestValue = highestValue < day.done ? day.done : highestValue;
              highestValue = highestValue < day.todo ? day.todo : highestValue;
          }
          this.highestValue = highestValue;
      },
      getColorByTask(task) {

              for (let weekDay = 1; weekDay < 8; weekDay++) {
                  
                  if (this.activatedSettings.week[weekDay].task === task) {
                      return this.activatedSettings.week[weekDay].color;
                  }
              }

      },
      getAverageOfLastWeek(dateInteger) {

          let count = 0;
          let todoValues = [];
          let planIterations = 0;

          for (let day of this.planHistory) {

              planIterations++;

              if (day.date === dateInteger) {
                  count++;
              } else if (count >= 7 || planIterations >= this.planHistory.length) {
                  return Math.round((todoValues.reduce((pv, cv) => pv + cv, 0)) / todoValues.length);
              } else if (count > 0 && count < 7) {
                  count++;
                  todoValues.push(Math.round((day.todo / this.highestValue) * 100));
              } 

          }

          if (this.planHistory.length <= 1) {
            return 100;
          }
      },
      generateStatisticsRenderValues(limiter) {
          this.statistics = [];

            let activeTask;

          for (let day of this.planHistory) {

              let active = false;
              let restingDone = false;
              let lastWeekAverageTodo = false;

              if (day.date === this.planHistory[0].date) {
                  active = true;
                  activeTask = day.todo < 1 ? false : day.task;
              }

              if (day.todo < 1) {    
                  lastWeekAverageTodo = this.getAverageOfLastWeek(day.date);
              }
              
              if (day.todo < 1 && !active) {
                  restingDone = true;
              }
              
              

              const left = day.todo - day.done;
              const dateString = day.date.substring(4,6) + '/' + day.date.substring(6,8) + '/' + day.date.substring(0,4);
              const weekdayName = helper.getDayName(dateString);

              

              this.statistics.push({
                  active: active,
                  restingDone: restingDone,
                  lastWeekAverageTodo: lastWeekAverageTodo,
                  date: day.date.substring(0,4) + '-' + day.date.substring(4,6) + '-' + day.date.substring(6,8),
                  weekday: weekdayName.substring(0,3),
                  dateString: dateString,
                  done: day.done,
                  progressRender: Math.round((day.done / day.todo) * 100) > 100 ? 100 : Math.round((day.done / day.todo) * 100),
                  left: left > 0 ? left : 0,
                  backgroundRender: day.done < day.todo ? Math.round((day.todo / limiter) * 100) : Math.round((day.done / limiter) * 100) ,
                  todo: day.todo,
                  task: day.task,
                  shorthand: day.task.substring(0,2),
                  color: this.getColorByTask(day.task),
                  activeGroup: day.task === activeTask ? true : false,

              });
          }

          this.statistics = this.statistics.slice(0, 28)


      }

  },
  beforeMount() {
    console.log('beforeMount fired');
      this.setHighestValue();
      this.generateStatisticsRenderValues(this.highestValue);
  },

};
</script>
<style>
#statistics-wrapper {text-align: left; max-width:640px; margin:109px auto 0 auto; max-height: 350px; overflow: hidden; position: relative; z-index: 1000; padding:0 64px; border-radius: 18px; border-top:32px solid #3d3e42; border-bottom: 32px solid #3d3e42; background:#3d3e42;}
#statistics-wrapper .statistics-overlay {position: absolute; top:48px; left: 0; bottom:0; right:0; width:auto; height: auto; z-index: 1100; background: linear-gradient(180deg, transparent, #3d3e42); opacity: 0;}
#statistics-wrapper.expanded {max-height: initial;}
#statistics-wrapper.expanded .statistics-overlay {position: absolute; top:48px; left: 0; bottom:0; right:0; width:auto; height: 296px; z-index: 1100; background: transparent;}
#statistics-expand-submit {background: #4c4d50; border: none; border-radius: 64px; padding: 0px; color:rgba(255,255,255,0.5); margin-top: 0px; width: 40px; height: 40px; line-height: 42px; font-size: 1.2em; cursor: pointer; box-sizing: border-box; opacity: 1; position: relative; top:-20px; z-index:1400; box-shadow: 0 10px 2px 0 #35363a}
.statistics-inner-message {text-align: center;
    padding: 36px 128px;
    font-weight: 400;
    opacity: 0.5;
    font-size: 1.1em;}

#background.light .statistics-inner-message {color:#828285; opacity: 0.75;}

#background.light #statistics-wrapper {background:#eaeaea; border-color:#eaeaea;}
#background.light #statistics-expand-submit {color:#949496; background:#dbdbdc; box-shadow: 0 10px 20px 0 rgba(21, 21, 23,0.04)}





</style>

