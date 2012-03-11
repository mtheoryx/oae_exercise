$(document).ready(function(){

    var global_width = 600;
    
    //@TODO: abstract to jquery plugin
    
    //@TODO: abstract the width from the make_events() function
    
    //Set up some event input objects
    var events_raw_input = [
        {"id":1, "start":610, "end":670},
        {"id":2, "start":30, "end":150},
        {"id":3, "start":540, "end":600},
        {"id":4, "start":560, "end":620}
        //{"id":5, "start":520 , "end": 570} //just an additional event for logic testing
        
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
            this.width = 0;
            this.left;
            this.collision_members = new Array();
            counter++; //just convenience here for display purposes
        });
        
        // set the left position and width of each event
        $.each(events_array, function(){set_position(this, events_array);});
        
        return events_array;
    } //end make_events() function
    
    function set_position(event, events_array){
        var me = event; //just to make it a little less confusing
        
        // Check for collisions, add to an array
        $.each(events_array, function(){
            if ( collides(event, this) ) { me.collision_members.push(this.id); } 
        }); //end looping through the whole array        
        
        if (me.collision_members.length < 1) { me.width = global_width; me.left = 0; } 
        else //sharing space with other events 
        {
            if ( (typeof me.left == "undefined") || (typeof me.left == null) ) {
                //if i have no left set, im first
                me.left = 0;
                if ( me.width == 0 ) {
                    //give my shared width to all my collision mates
                    me.width = ( global_width/(1 + me.collision_members.length) );
                    var l = 1;
                    $.each(me.collision_members, function(){
                        var them = events_array[findArrayIndexByObjectId(events_array, this)];

                        if (them.width == 0) {
                            them.width = me.width;
                            them.left = l;
                        } else { me.width = them.width;}
                        l++;
                        //set their left values, too
                            
                    }); //end iteration over my collision members
                }
            }
        } //end handling collisions
    
    } //end set_position() function
    
    function display_events(events_array){
        
        var event_canvas = $('div#event_canvas');
            event_canvas.css("position", "relative");

        $.each(events_array, function(){
            var new_event_html = '<div class="event" id="'+ this.id + '">';
                new_event_html += '<div class="event_inner">';
                new_event_html += '<p class="event_title">'+ this.title +'</p>';
                new_event_html +='<p class="event_location">' + this.location + '</p>';
                new_event_html += '</div></div>';
            
            //add this event to the canvas
            event_canvas.append(new_event_html);
            
            //style event based on previously calculated properties
            var new_event = $('div#' + this.id);
            
            //set top, height, left, and width
            new_event.css("position", "absolute")
                    .css("padding", "0")
                    .css("margin", "0")
                    .css("top", this.start + 'px')
                    .css("width", this.width + 'px')
                    .css("left", ( (this.width) * (this.left) ) + 'px')
                    .css("height", this.duration + 'px');
            
            //correct for inner div
            new_event.children("div.event_inner").css("height", (this.duration - 8) + 'px');
        });
            
    }// end display_events() function
    
    /*
        utility functions
    */
    
    //Clever utility to check event collision
    function collides(eventA, eventB){
        if (eventA.id == eventB.id) { return false; }
        return ((eventA.start < eventB.end) & (eventA.end > eventB.start)) ? true : false;
    } //end collides() function
    
    function sort_by_start_time(a,b){
        var aStart = a.start;
        var bStart = b.start;
        return ( (aStart < bStart) ? -1 : ((aStart > bStart) ? 1 : 0) );
    } //end sort_by_start_time() function
    
    function findArrayIndexByObjectId(set, needleID){
        var TheIndex;
        for (var i = 0; i < set.length; i++) {
           if (set[i].id == needleID) {
              TheIndex = i;
              break;
           } 
        }
        return TheIndex;
    } //end findArrayIndexByObjectId() function
    
    //create array of event objects
    var events = make_events(events_raw_input);
    
    //debug info
    //console.log(events);
    
    //display the events
    display_events(events);
    
});