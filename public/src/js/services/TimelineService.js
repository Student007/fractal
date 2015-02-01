// public/js/services/TimelineService.js
angular.module('goals').factory('TimelineService', function() {
    return function(begin, end, subgoals) {
        this.subgoals     = subgoals;
        this.subgoalRange = getSubgoalRange();
        this.begin        = (begin !== undefined && begin !== null ? begin : this.subgoalRange.earliest);
        this.end          = (end !== undefined && end !== null ? end : this.subgoalRange.latest);
        this.days         = getNumDays(this.begin,this.end);

        console.log("subgoals: " + this.subgoals);
        console.log("subgoalRange: " + this.subgoalRange);
        console.log("begin: " + this.begin);
        console.log("end: " + this.end);
        console.log("days: " + this.days);

        this.setParams = function(begin, end, subgoals) {
            this.subgoals     = subgoals;
            this.subgoalRange = getSubgoalRange();
            this.begin        = (begin !== null && begin !== undefined ? begin : this.subgoalRange.earliest);
            this.end          = (end !== null && end !== undefined ? end : this.subgoalRange.latest);
            this.days         = getNumDays(begin,end);
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
            var itemDays     = getNumDays(itemBegin, itemEnd);
            var itemDaysPush = getNumDays(this.begin, itemBegin);

            console.log("itemBegin: " + itemBegin);
            console.log("itemEnd: " + itemEnd);
            console.log("itemDays: " + itemDays);
            console.log("itemDaysPush: " + itemDaysPush);

            if ((this.begin && this.end) && (itemBegin && itemEnd)) {
                results.push = Math.round((itemDaysPush / this.days) * 100); //push %
                results.size = Math.round((itemDays / this.days) * 100); // size %
            } else {
                results.push = 0;
                results.size = 100;
            }

            if (begin === null || begin === undefined) {
                results.fadeBegin = true;
            } else {
                if (itemBegin != begin || begin < this.begin) {
                    results.fadeBegin = true;
                }
            }

            if (end === null || end === undefined) {
                results.fadeEnd = true;
            } else {
                if (itemEnd != end || end > this.end) {
                    results.fadeEnd = true;
                }
            }

            return results;
        };

        // returns list of subgoals with appended timeline values
        this.appendSubgoalTimelines = function() {
            timelineSubgoals = angular.copy(subgoals);
            for (var s in timelineSubgoals) {
                timelineSubgoals[s].timeline = this.getGoalTimeline(timelineSubgoals[s].goal.beginDate, 
                    timelineSubgoals[s].goal.endDate);
            }
            return timelineSubgoals;
        };

        // get number of days between two dates
        function getNumDays(begin, end) {
            var oneDay = 24*60*60*1000;
            if (begin && end) {
                var beginDate = new Date(begin);
                var endDate = new Date(end);
                return Math.round(Math.abs((endDate.getTime() - beginDate.getTime())/(oneDay)));
            } else {
                return this.days;
            }
        }

        // get a start date respective to the visual timeline
        function getProperStart(begin) {
            properBegin = begin;

            if (begin === null || begin === undefined) {
                properBegin = this.begin;
            } else {
                if (begin < this.begin) {
                    properBegin = this.begin;
                } 
            }
            console.log('this.begin: ' + this.begin);
            console.log('properBegin: ' + properBegin);
            return properBegin;
        }

        function getProperEnd(end) {
            properEnd = end;

            if (end === null || end === undefined) {
                properEnd = this.end;
            } else {
                if (end > this.end) {
                    properEnd = this.end;
                }
            }

            return properEnd;
        }

        // get range of subgoal dates
        function getSubgoalRange() {
            if (subgoals && subgoals.length > 0) {
                earliest = null;
                latest   = null;

                // to account for edge cases, such as a goal that
                // starts after the last end date
                latestStart = null;
                earliestEnd = null;

                for (var s in subgoals) {
                    if (subgoals[s].goal.beginDate !== null) {
                        var curGoalStartDate = new Date(subgoals[s].goal.beginDate);
                        console.log("testing start date: " + curGoalStartDate);
                        if (earliest === null) {
                            earliest = curGoalStartDate;
                        } else {
                            if (curGoalStartDate < earliest) {
                                earliest = curGoalStartDate;
                            }
                        }

                        if (latestStart === null) {
                            latestStart = curGoalStartDate;
                        } else {
                            if (curGoalStartDate > latestStart) {
                                latestStart = curGoalStartDate;
                            }
                        }
                    }

                    if (subgoals[s].goal.endDate !== null) {
                        var curGoalEndDate = new Date(subgoals[s].goal.endDate);
                        console.log("testing end date: " + curGoalEndDate);
                        if (latest === null) {
                            latest = curGoalEndDate;
                        } else {
                            if (curGoalEndDate > latest) {
                                latest = curGoalEndDate;
                            }
                        }

                        if (earliestEnd === null) {
                            earliestEnd = curGoalEndDate;
                        } else {
                            if (curGoalEndDate < earliestEnd) {
                                earliestEnd = curGoalEndDate;
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

                console.log("earliest: " + earliest);
                console.log("latest: " + latest);
                return {
                    earliest: earliest,
                    latest: latest
                };
            } else {
                return {
                    earliest: null,
                    latest: null
                };
            }
        }
    }; 
});