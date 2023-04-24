<template>

    <div id="footer">

        <div id="footer-content">



            <div v-for="activeTasks in tasks" class="footer-info-element" :key="activeTasks.sum">


                <!--<div class="footer-shorthand-avatar">
                    {{activeTasks.shorthand}}
                </div>-->

                <div class="footer-info-sum">
                    <div class="number">{{activeTasks.sum}}</div>
                        <div class="text">
                            <div class="footer-shorthand-avatar">
                                {{activeTasks.shorthand}}
                            </div>
                        {{activeTasks.task}}
                    </div>
                </div>

            </div>



            <div class="footer-info-element">

                

                <div class="footer-info-sum">
                    <div class="number">{{getPlanAge}}</div>
                    <div class="text">
                        <div class="footer-shorthand-avatar">
                            <i class="icofont-clock-time"></i>
                        </div>
                        {{getPlanAgeUnit}}
                    </div>
                </div>


            </div>

            <!--

             <div class="footer-info-element">

                

                <div class="footer-info-sum">
                    <div class="number">{{success}}<span>%</span></div>
                    <div class="text">
                        <div class="footer-shorthand-avatar">
                            <i class="icofont-check"></i>
                        </div>
                        Success
                    </div>
                </div>


            </div>

            -->

            


        </div>
    

        

    </div>

</template>


<script>


export default {
    name: "AppFooter",
    props: {
        activatedSettings: {type: Object},
        planHistory: {type: Array},
        planHistoryOverhead: {type: Object},
    },
    data() { 
        return {
            success: 0,
            days: 0,
            tasks: []
        }
    },
    computed: {
        planHistoryLength() {
            return this.planHistory[0].done;
        },
        getStreak() {
            return this.streak;
        },
        getPlanAge() {
            if (this.days > 27) {
                return Math.round((this.days + this.planHistoryOverhead.days) / 7);
            } else {
                return this.days;
            }
        },
        getPlanAgeUnit() {
            if (this.days < 2) {
                return 'Day';
            } else if (this.days > 1 && this.days < 28) {
                return 'Days';
            } else {
                return 'Weeks';
            }
        },
    },
    methods: {
        generateOverallStatistics() {

            this.days = this.planHistory.length
            this.success = this.getSuccessRate();
            this.tasks = [];
            this.tasks = this.getTaskSummary();

        },
        getSuccessRate() {

            let successArray = [];
            let i = 0;

            for (let day of this.planHistory) {

                if (day.todo > 0 && i > 0) {

                    // If success is above 100 it gets flattened by a IF condition

                    let successPerDay = Math.round((day.done / day.todo) * 100) > 100 ? 100 : Math.round((day.done / day.todo) * 100);
                    successArray.push(successPerDay);
                }

                i++;
            }

            // If success is above 100 it gets flattened by a IF condition

            let successOfPlanHistory = Math.round(successArray.reduce((a, b) => a + b, 0) / successArray.length) > 100 ? 100 : Math.round(successArray.reduce((a, b) => a + b, 0) / successArray.length);

            return successOfPlanHistory;

        },
        getTaskSummary() {

            let activatedTasks = [];
            let returnTasks = [];

            for (let i = 1; i <= 7; i++) {

                if (!activatedTasks.includes(this.activatedSettings.week[i].task) && this.activatedSettings.week[i].amount > 0) {
                    activatedTasks.push(this.activatedSettings.week[i].task);
                }
            }

            for (let task of activatedTasks) {

                let taskSummary = {};
                taskSummary.task = task;
                taskSummary.shorthand = task.substring(0,2)


                if (Object.prototype.hasOwnProperty.call(this.planHistoryOverhead, task)) {
                
                    taskSummary.sum = this.planHistoryOverhead[task];

                } else {

                    taskSummary.sum = 0;

                }

                

                for (let day of this.planHistory) {

                    if (day.task === task) {
                        taskSummary.sum += day.done;
                    }
                }

                taskSummary.sum = taskSummary.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                returnTasks.push(taskSummary);
            }

            return returnTasks;

        }
    },
    watch: {
        planHistoryLength () {
            console.log('watcher works');
            this.generateOverallStatistics();
        }
    },
    beforeMount() {

        this.generateOverallStatistics();

    },

};
</script>
<style>

#footer {width:100%; background: transparent; z-index: 1500; padding: 0; margin:32px 0;}
#footer-content {width:100%; background: transparent; z-index: 1600; opacity:1; display: flex; justify-content: center; padding:16px 0; border:0px solid rgba(255,255,255,0.05)}
.footer-shorthand-avatar {display:none; height: 32px; width: 36px; border-top-left-radius:6px; border-bottom-left-radius: 6px; background: #3d3e42; box-sizing: border-box; line-height: 32px; text-align: center; border-right:1px solid rgba(255,255,255,0.06); margin-right: 12px; font-weight: bold; color:rgba(255, 255, 255,0.5);}
.footer-info-element:first-child {border-left:0px solid rgba(255,255,255,0.05)}
.footer-info-element {display: flex; width: 160px; padding:0; justify-content: center; margin:32px 0; border-right: 0px solid rgba(255,255,255,0.05); border:0px solid rgba(255,255,255,0.05);}
.footer-info-element i {line-height: 32px; font-size:1.33em;}
.footer-info-element div.number {font-weight: 400; font-size: 1.2em; opacity: 0.75;}
.footer-info-element div.text {color:rgba(255, 255, 255,0.5); font-weight: 400; text-transform: capitalize; line-height: 32px; opacity: 1; font-size: 0.75em; display: flex; justify-content: center; background: #444549; border:0px solid rgba(77, 77, 92,1); border-radius:6px; padding-right: 16px; padding-left:16px; margin-top:16px;}
.footer-info-element-spacer {padding-right: 8px; margin-right: 8px; opacity: 0.2;}
.footer-flash {position: fixed; bottom:0; left:0; right:0; background: rgba(118, 123, 213,0.5); height:48px; line-height: 48px; font-size:0.95em; font-weight:500;}
.footer-flash div {display: inline-block;}
.footer-info-element span {font-size: 66.6%; margin-left:2px;}


#background.light .footer-info-sum div.number {color:#707173; opacity: 1; font-weight: 400;}
#background.light .footer-info-element div.text {background: #e6e6e6; border:0px solid #dbdbdc; color:#828285}
#background.light .footer-shorthand-avatar {background: #ddddde; color:rgba(32, 34, 39,0.66); border-right: 1px solid #c6c6c7;}
#background.light .footer-info-sum .text {box-shadow: 0 10px 20px 0 rgba(21, 21, 23,0.04)}
</style>

