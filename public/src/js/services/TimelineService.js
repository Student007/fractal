// public/js/services/TimelineService.js
angular.module('goals').factory('TimelineService', function() {
    return function(begin, end, subgoals) {
        this.subgoals     = subgoals;
        this.subgoalRange = this.getSubgoalRange();
        this.begin        = (begin !== null ? begin : this.subgoalRange.earliest);
        this.end          = (end !== null ? end : this.subgoalRange.latest);
        this.days         = this.getNumDays(begin,end);

        this.setParams = function(begin, end, subgoals) {
            this.subgoals     = subgoals;
            this.subgoalRange = this.getSubgoalRange();
            this.begin        = (begin !== null ? begin : this.subgoalRange.earliest);
            this.end          = (end !== null ? end : this.subgoalRange.latest);
            this.days         = this.getNumDays(begin,end);
        };

        // returns list of subgoals with appended timeline values
        this.appendSubgoalTimelines = function() {
            timelineSubgoals = subgoals;
            for (var s in timelineSubgoals) {
                timelineSubgoals[s].timeline = this.getGoalTimeline(timelineSubgoals[s].goal.beginDate, 
                    timelineSubgoals[s].goal.endDate);
            }
            return timelineSubgoals;
        };

        //gets push and size values for timeline display
        this.getGoalTimeline = function(begin, end) {
            var results = {
                push: null,
                size: null,
                fadeBegin: false,
                fadeEnd: false
            };
            var itemBegin    = getProperStart(begin);
            var itemEnd      = getProperEnd(end);
            var itemDays     = this.getNumDays(itemBegin, itemEnd);
            var itemDaysPush = this.getNumDays(this.begin, itemBegin);

            if (this.begin !== null && this.end !== null) {
                results.push = (itemDaysPush / this.days) * 100; //push %
                results.size = (itemDays / this.days) * 100; // size %
            } else {
                results.push = 100;
                results.size = 100;
            }

            if (begin === null) {
                results.fadeBegin = true;
            } else {
                if (itemBegin != begin || begin < this.begin) {
                    results.fadeBegin = true;
                }
            }

            if (end === null) {
                results.fadeEnd = true;
            } else {
                if (itemEnd != end || end > this.end) {
                    results.fadeEnd = true;
                }
            }

            return results;
        };

        // get number of days between two dates
        var getNumDays = function(begin, end) {
            var oneDay = 24*60*60*1000;

            if (begin !== null && end !== null) {
                return Math.round(Math.abs((end.getTime() - begin.getTime())/(oneDay)));
            } else {
                return this.days;
            }
        };

        // get a start date respective to the visual timeline
        var getProperStart = function(begin) {
            properBegin = begin;

            if (begin === null) {
                properBegin = this.begin;
            } else {
                if (begin < this.begin) {
                    properBegin = this.begin;
                }
            }

            return properBegin;
        };

        var getProperEnd = function(end) {
            properEnd = end;

            if (end === null) {
                properEnd = this.end;
            } else {
                if (end > this.end) {
                    properEnd = this.end;
                }
            }

            return properEnd;
        };

        // get range of subgoal dates
        var getSubgoalRange = function() {
            earliest = subgoals[0].goal.beginDate;
            latest   = subgoals[0].goal.endDate;

            // to account for edge cases, such as a goal that
            // starts after the last end date
            latestStart = subgoals[0].goal.beginDate;
            earliestEnd = subgoals[0].goal.end;

            for (var s in subgoals) {
                curGoal = subgoals[s].goal;

                if (curGoal.beginDate !== null) {
                    if (earliest === null) {
                        earliest = curGoal.beginDate;
                    } else {
                        if (curGoal.beginDate < earliest) {
                            earliest = curGoal.beginDate;
                        }
                    }

                    if (latestStart === null) {
                        latestStart = curGoal.beginDate;
                    } else {
                        if (curGoal.beginDate > latestStart) {
                            latestStart = curGoal.beginDate;
                        }
                    }
                }

                if (curGoal.endDate !== null) {
                    if (latest === null) {
                        latest = curGoal.endDate;
                    } else {
                        if (curGoal.endDate > latest) {
                            latest = curGoal.endDate;
                        }
                    }

                    if (earliestEnd === null) {
                        earliestEnd = curGoal.endDate;
                    } else {
                        if (curGoal.endDate < earliestEnd) {
                            earliestEnd = curGoal.end;
                        }
                    }
                }
            }

            if (earliestEnd !== null && earliest !== null) {
                if (earliestEnd < earliest) {
                    earliest = earliestEnd;
                }
            }

            if (latestStart !== null && latest !== null) {
                if (latestStart > latest) {
                    latest = latestStart;
                }
            }

            return {
                earliest: earliest,
                latest: latest
            };
        };
    };       
});