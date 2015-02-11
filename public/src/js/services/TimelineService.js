// public/js/services/TimelineService.js
angular.module('goals').factory('TimelineService', function() {
    return function(begin, end, subgoals) {
        this.subgoals     = subgoals;
        this.subgoalRange = getSubgoalRange();
        this.goalBegin    = begin;
        this.goalEnd      = end;

        this.begin        = null;
        this.end          = null;

        // logic to determine proper begin and end values
        if (begin) {
            if (this.subgoalRange.earliest) {
                this.begin = (new Date(begin) < this.subgoalRange.earliest ? begin : this.subgoalRange.earliest);
            } else {
                this.begin = begin;
            }
        } else {
            this.begin = this.subgoalRange.earliest;
        }

        if (end) {
            if (this.subgoalRange.latest) {
                this.end = (new Date(end) > this.subgoalRange.latest ? end : this.subgoalRange.latest);
            } else {
                this.end = end;
            }
        } else {
            this.end = this.subgoalRange.latest;
        }

        this.days         = getNumDays(this.begin,this.end);

        console.log("begin: " + this.begin);
        console.log("end: " + this.end);
        console.log("days: " + this.days);

        this.getGoalDateInfo = function() {
            var goalData = {
                subgoalBegin: null,
                subgoalEnd: null,
                subgoalDuration: null,
                goalBegin: null,
                goalEnd: null,
                goalDuration: null,
                timelineBegin: null,
                timelineEnd: null,
                timelineDuration: null
            };

            goalData.timelineBegin = this.begin;
            goalData.timelineEnd = this.end;
            goalData.timelineDuration = this.days;

            goalData.subgoalBegin = this.subgoalRange.earliest;
            goalData.subgoalEnd = this.subgoalRange.latest;
            goalData.subgoalDuration = getNumDays(this.subgoalRange.earliest, this.subgoalRange.latest);

            if (this.goalBegin && this.goalEnd) {
                goalData.goalDuration = getNumDays(this.goalBegin, this.goalEnd);
            }

            return goalData;
        };

        this.setParams = function(begin, end, subgoals) {
            this.subgoals     = subgoals;
            this.subgoalRange = getSubgoalRange();
            this.begin        = (begin !== null && begin !== undefined ? begin : this.subgoalRange.earliest);
            this.end          = (end !== null && end !== undefined ? end : this.subgoalRange.latest);
            this.days         = getNumDays(begin,end);
        };

        this.getFutureDate = function(date, numDays) {
            var newDate = date;
            return newDate.setDate(newDate.getDate() + numDays);
        };

        this.getDateTimeline = function() {
            var results = {
                beforeRange: 0,
                inRange: 0,
                afterRange: 0,
                tick: 1,
            };

            results.inRange = this.days;

            if (results.inRange) {
                results.tick = 100 / results.inRange;
            }

            if (this.goalBegin) {
                var beforeRange = getNumDays(this.subgoalRange.earliest, this.goalBegin);
               
                if (beforeRange > 0) {
                    results.beforeRange = beforeRange;

                    if (results.inRange) {
                        results.inRange = results.inRange - beforeRange;
                    }
                }
            }
            if (this.goalEnd) {
                var afterRange = getNumDays(this.goalEnd, this.subgoalRange.latest);
                if (afterRange > 0) {
                    results.afterRange = afterRange;

                    if (results.inRange) {
                        results.inRange = results.inRange - afterRange;
                    }
                }
            }
            console.log(results);
            return results;
        };

        //gets push and size values for timeline display
        this.getGoalTimeline = function(begin, end) {
            var results = {
                push: null,
                size: null,
                fadeBegin: false,
                fadeEnd: false
            };
            var itemBegin    = getProperStart(this.begin, this.end, begin);
            var itemEnd      = getProperEnd(this.begin, this.end, end);
            var itemDays     = getNumDays(itemBegin, itemEnd);
            var itemDaysPush = getNumDays(this.begin, itemBegin);

            // console.log("itemBegin: " + itemBegin);
            // console.log("itemEnd: " + itemEnd);
            // console.log("itemDays: " + itemDays);
            // console.log("itemDaysPush: " + itemDaysPush);

            if (this.begin && this.end && this.days > 0) {
                var roundPush = Math.round((itemDaysPush / this.days) * 100); //push %
                var roundSize = Math.round((itemDays / this.days) * 100); // size %

                var regPush = (itemDaysPush / this.days) * 100;
                var regSize = (itemDays / this.days) * 100;

                results.push = regPush;
                results.size = regSize;

                // if (results.size === 0) {
                //     results.size = 0.5;
                // }

                if ((results.push + results.size) > 100) {
                    var overflow = (results.push + results.size) - 100;
                    console.log(results);
                    console.log('overflow ' + overflow);
                    results.size = results.size - overflow;
                }
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
                console.log(timelineSubgoals[s].goal.name);
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
                return Math.round(((endDate.getTime() - beginDate.getTime())/(oneDay)));
            } else {
                return this.days;
            }
        }

        // get a start date respective to the visual timeline
        function getProperStart(masterBegin, masterEnd, beginDate) {
            properBegin = beginDate;

            if (beginDate === null || beginDate === undefined) {
                properBegin = masterBegin;
            } else {
                if (beginDate < masterBegin) {
                    properBegin = masterBegin;
                } 

                if (beginDate > masterEnd) {
                    properBegin = masterEnd;
                }
            }
            console.log('this.begin: ' + masterBegin);
            console.log('properBegin: ' + properBegin);
            return properBegin;
        }

        function getProperEnd(masterBegin, masterEnd, endDate) {
            properEnd = endDate;

            if (endDate === null || endDate === undefined) {
                properEnd = masterEnd;
            } else {
                if (endDate > masterEnd) {
                    properEnd = masterEnd;
                }

                if (endDate < masterBegin) {
                    properEnd = masterBegin;
                }
            }
            console.log('this.end: ' + masterEnd);
            console.log('properEnd: ' + properEnd);
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

                if (earliestEnd !== null && earliest === null) {
                    earliest = earliestEnd;
                }

                if (latestStart !== null && latest !== null) {
                    if (latestStart > latest) {
                        latest = latestStart;
                    }
                }

                if (latestStart !== null && latest === null) {
                    latest = latestStart;
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