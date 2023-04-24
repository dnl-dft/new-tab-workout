<template>
    <div class="statistics-bar">


        <div class="statistics-bar-shorthand">

            <div class="weekday">
                {{statisticsBar.weekday}}
            </div>
        
        </div>


        <div class="statistics-bar-info">
                        

            <!--<div class="info">{{statisticsBar.weekday}}</div>-->
            <div class="date">{{statisticsBar.date}}</div>

            
        
        </div>

        <div class="statistics-bar-number" :style="getNumberColor">

            <div v-if="statisticsBar.todo > 0">{{statisticsBar.done}}</div>
            <div v-else><i class="icofont-clock-time resting-icon"></i></div>


        </div>

        <div class="statistics-bar-shorthand">

            <div class="statistics-bar-shorthand-avatar" :class="getActivityGroupClass">
                {{statisticsBar.shorthand}}
            </div>
        
        </div>


        <div class="statistics-bar-render">


            <div class="statistics-bar-render-background" :style="getBarBackgroundStyle"  :class="getActivityGroupClass" >
            
                <div class="statistics-bar-render-progress" :class="getActivityGroupClass" :style="getBarProgressStyle">
                
                    <i v-if="statisticsBar.left < 1 && statisticsBar.todo > 0 || statisticsBar.restingDone" class="icofont-check success"></i>    
                
                </div>

                <button v-if="statisticsBar.active && statisticsBar.todo > 0" class="statistics-bar-refresh" @click="resetDay()"><i class="icofont-close"></i></button>
            
            </div>



        </div>



<!--
        <div class="statistics-bar-render">
            

            <div class="statistics-bar-render-done" :style="getDoneStyle">


                <i v-if="statisticsBar.left < 1" class="icofont-check success"></i>


            </div>

            <div v-if="statisticsBar.active" class="statistics-bar-render-left" :style="getLeftStyle">
            

            



            </div>

            <button v-if="statisticsBar.active" class="statistics-bar-refresh"><i class="icofont-refresh"></i></button>
        
        </div>
-->
        
        
    </div>
</template>

<script>
export default {
    
    name: "StatisticsBar",
    data() {
    return {
      timePercentage: 0,
      timestamp: false
    }
  },
    props: {
      statisticsBar: {type: Object},
    },
    methods: {
        resetDay() {
            this.$parent.$emit('resetDay');
            console.log('click succesfull')
        },
        updateOnTimeChange() {

            if (!this.timestamp && this.statisticsBar.todo < 1 && this.statisticsBar.active) {
                this.timestamp = new Date();

                this.updateTime();
        
                setInterval(function(){

                    this.timestamp = new Date();
                    this.updateTime();
          
                
                    console.log('time bar update')
                

                 }.bind(this), 30000);

            }

        },
        updateTime() {
            this.timePercentage = Math.round(((this.timestamp.getHours() * 3600 + this.timestamp.getMinutes() * 60 + this.timestamp.getSeconds() + this.timestamp.getMilliseconds()/1000)/86400)*100);
        }
    },
    computed: {
        getBarBackgroundStyle() {
            if (this.statisticsBar.todo < 1) {
                return 'width:' + this.statisticsBar.lastWeekAverageTodo+'%;';
            } else {
                return 'width:' + this.statisticsBar.backgroundRender+'%;';
            }
        },
        getBarProgressStyle() {
            if (this.statisticsBar.todo < 1 && !this.statisticsBar.active) {
                return 'width: 100%;';
            } else if (this.statisticsBar.todo < 1 && this.statisticsBar.active) {
                return 'width: ' + this.timePercentage + '%;';
            } else if (this.statisticsBar.done < 1) {
                return 'display: none';
            } else {        
                return 'width:' + this.statisticsBar.progressRender+'%;';
            }
        },
        getActivityGroupClass() {
            if (this.statisticsBar.activeGroup) {
                return 'color-active';
            } else {
                return 'color-inactive';
            }
        },
        getInfo() {
            if (this.statisticsBar.task === "Resting") {
                return "Resting";
            } else {
                return this.statisticsBar.task;
            }
        },
        getNumberColor() {
            return 'color: #fff';
        }
        
    },
    mounted() {

    
        this.updateOnTimeChange();
    
    
  },
}
</script>
<style>
.statistics-bar {text-align: left; max-width:1600px; margin:16px auto; display: flex; flex-wrap: wrap; justify-content: center; height: 32px;}
.statistics-bar-shorthand {width:8.5%; justify-content: right; display: flex;}
.statistics-bar-number {width:7%; display: flex; line-height: 32px; justify-content: right; font-size: 0.9em;}
.statistics-bar-number div {padding-right: 14px; font-weight: 500; opacity:1}

.statistics-bar-info {width:17.5%;}
.statistics-bar-refresh {display:none; color:rgba(255,255,255,0.5); background: #32323b; border:none; font-size:0.7em; opacity:1; text-align: center; line-height: 22px; font-weight:600; padding:0; cursor: pointer; margin-left:24px; height:22px; width:22px; border-radius:22px; position:absolute; right: -38px; top:5px;}
.statistics-bar-render {width:57%; display: flex; flex-wrap: wrap; justify-content: left;}

.statistics-bar-info div.date {font-size: 0.9em; opacity: 0.5; line-height: 32px; display:block; }
.resting-icon {opacity: 0.0;}

.statistics-bar-render-progress.color-active {background:#767BD5; color: #767BD5}
.statistics-bar-render-progress.color-inactive {background:#646568; color: #646568}

.statistics-bar-shorthand-avatar.color-active {background:#767BD5; color: #fff}
.statistics-bar-shorthand-avatar.color-inactive {background: #646568; color: #fff}


.statistics-bar-render-background {background: rgba(255,255,255,0.06); border-radius: 6px; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; position:relative; overflow:hidden}

.statistics-bar-render-progress {overflow:hidden; border-radius: 6px; text-align: right; height:32px; transition-property: all;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 1s;}
.statistics-bar-render-progress i {color:inherit; background: #fff; border-radius:30px; height: 16px; width:16px; display:block; float: right; margin:8px; text-align: center; line-height: 16px; font-weight: bold; opacity: 1; font-size:0.85em}
.statistics-bar-shorthand-avatar {width:32px; height: 32px; border-radius:6px; line-height: 32px; text-align: center; font-size:0.8em; margin-right: 16px; font-weight: bold}
.statistics-bar-number-resting {opacity: 0.4 !important; margin-right:2px;}
.statistics-bar-shorthand .weekday {    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: transparent;
    line-height: 31px;
    text-align: center;
    font-size: 0.55em;
    margin-right: 16px;
    font-weight: bold;
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.5);
    box-sizing: border-box;
    opacity: 0.75;
    text-transform: uppercase;
    font-family: Helvetica, Arial, sans-serif;}

#background.light .statistics-bar-number div {color: #707173;}
#background.light .statistics-bar-info div.date {color:rgba(32, 34, 39,1);}
#background.light .statistics-bar-shorthand .weekday {color: #828285; border-color: #b7b8b9;}
#background.light .statistics-bar-render-progress.color-inactive {background: #98999b; color:#98999b;}
#background.light .statistics-bar-shorthand-avatar.color-inactive {background:#98999b; color: #fff;}
#background.light .statistics-bar-render-background {background:rgba(152, 153, 155,0.4);}

#background-light .statistics-bar-render-progress { box-shadow: inset 0 -10px 15px 0 rgba(62, 64, 68,0.5);}





</style>