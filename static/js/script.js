$(document).ready(function(){
    //@TODO: set up the time labels on the left, 1/2 hour increments, pixel-based
    var global_width = 600;
    //Set up some event input objects
    var events_raw_input = [
        {"id":1, "start":610, "end":670},
        {"id":2, "start":30, "end":150},
        {"id":3, "start":540, "end":600},
        {"id":4, "start":560, "end":620}
//        {"id":5, "start":520 , "end": 570}
        
    ]; //end events array
    
    //function to create our full event objects based on an array input
    function make_events(events_array){
        
        //sort by start time, id's are unimportant really
        events_array.sort(sort_by_start_time);
        
        //loop over each object in the input array
        var counter = 1;
        $.each(events_array, function(){
            //Set additional attributes
            this.title = "Sample Event " + counter;
            this.location = "Event Location " + counter;
            this.duration = this.end - this.start;
            this.top_position = this.start;
            this.collisions = 0;
            this.collision_members = new Array();
            
            counter++;
        });
        
        $.each(events_array, function(){
            count_collisions(this, events_array);
        });
        $.each(events_array, function(){
            //starting with the earliest event, going down the timeline
            set_position(this, events_array);
        });
        
        return events_array;
        
    } //end make_events() function
    
    //  @TODO: set width
    //  @TODO: set left position
    function set_position(event, events_array){
        
        var my = event;
        
        
        //no collisions at all
        if (my.collisions < 1) { event.width = global_width / 1; return true;} 
        else {
            // if we collisions,
            // it's possible we're overlapping 2 or more events
            // but those could be sequential events
            // let's check that and adjust our collision count
            
            console.log('Checking duplicate collisions for ' + my.id);
            console.log(my.collision_members);
            $.each(my.collision_members, function(){
                console.log('I am ' + event.id + ' and I collide with ' + this);

                //access the actual object whose ID we stored by number only
                var time_mate = events_array[findArrayIndexByObjectId(events_array, this)];

                console.log(time_mate.collision_members);

                $.each(time_mate.collision_members, function(){
                    
                    //if they collide with the same as me, i have a good count
                    //if not, i may have double counted
                    if ( ($.inArray(parseInt(this), my.collision_members) > -1) && (this != my.id)) {
                        console.log('' + this);
                        console.log(this + ' is probably not a dupe.');
                    } else if (( $.inArray(parseInt(this), my.collision_members) == -1 ) && (this != my.id)) {
                        console.log('' + this);
                        console.log(this + ' is a dupe.');
                        
                        //remove it from my collision list
                        //what position is this in my array?
                    }
  
                    
                });
                
                console.log(time_mate);

            }); //end looping through their collisions
            
            //@TODO: set width
            //if they have a width, take theirs
            //if they don't, set mine according to collisions
            
        
            
        } //end duplicate collision adjustment check
        
        //@TODO: set left position
        
        
    } //end set_position() function
    
    function count_collisions(event, events_array){
        $.each(events_array, function(){
            if ( collides(event, this) ) { event.collision_members.push(this.id); }
        });
        event.collisions = event.collision_members.length;
        return true;
    } //end count_collisions() function
    
    function collides(eventA, eventB){
        if (eventA.id == eventB.id) { return false; }
        return ((eventA.start < eventB.end) & (eventA.end > eventB.start)) ? true : false;
    } //end collides() function
    
    /*
        utility functions
    */
    
    function sort_by_start_time(a,b){
        var aStart = a.start;
        var bStart = b.start;
        return ( (aStart < bStart) ? -1 : ((aStart > bStart) ? 1 : 0) );
    }
    
    function findArrayIndexByObjectId(set, needleID){
        var TheIndex;
        for (var i = 0; i < set.length; i++) {
           if (set[i].id == needleID) {
              TheIndex = i;
              break;
           } 
        }
        return TheIndex;
    }
    
    //add events to the canvas correctly
    var events = make_events(events_raw_input);
    
    //debug info
    console.log(events);
    
});