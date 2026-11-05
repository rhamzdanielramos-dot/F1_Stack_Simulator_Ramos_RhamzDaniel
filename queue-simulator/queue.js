class Queue {
    constructor() {
        this.items = []
        this.count = 0
         
    }

    // Add element to rear of queue
    enqueue(element) {
        this.items[this.count] = element
        let enqueue_res=`${element}`;
        this.count += 1;
        let count=this.count -1;
        return [enqueue_res, count];
    }

    // Return and remove front element in queue
    // Return undefined if queue is empty
    dequeue() {
        if(this.count == 0) return undefined
        let deleteItem = this.items.shift()   
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
    }

    // Check front element in queue
    peek() {
        console.log(`Front element is ${this.items[0]}`)   
        return this.items[0]
    }

    // Check if queue is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Queue is empty' : 'Queue is NOT empty')
        return this.count == 0
    }

    // Check size of queue
    size() {
        console.log(`${this.count} elements in queue`)
        return this.count
    }

    // Print elements in queue
    print() {
        let str = ''
        for(let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear queue
    clear() {
        this.items = []
        this.count = 0
        console.log('Queue cleared..')
        return this.items
    }
}

const queue = new Queue()

$(document).ready(function(){
    $("#btn_enqueue").on("click", function(){
        let value = $("#q_data").val().trim();
        if (value === "") {                                  
            $("#message").text("Please enter a value first.");
            return;
        }
        $("#message").text("");
        let enqueue_data = queue.enqueue(value);
        // CHANGED: append (adds to the REAR) instead of prepend
        $("#queue").append(`<div class="row bg-primary push queue-item">${enqueue_data[0]}</div>`);
    });
    $("#btn_dequeue").on("click", function(){
        if (queue.isEmpty()) {                              
            $("#message").text("Queue is empty. Nothing to dequeue.");
            return;
        }
        $("#message").text("");
        let dequeue_data = queue.dequeue();
        $("#dequeued").prepend(` <div class="row pop text-bg-danger border border-light">${dequeue_data}</div>`);
        $("#queue .queue-item").first().remove();            
    });
    $("#btn_peek").on("click", function(){
        if (queue.isEmpty()) {
            $("#message").text("Queue is empty. Nothing to peek.");
            return;
        }
        $("#message").text("");
        queue.peek();
        let front = $("#queue .queue-item").first();
        front.removeClass("bg-primary").addClass("peek");
        setTimeout(function() {
            front.removeClass("peek").addClass("bg-primary");
            }, 500)
});
    $("#btn_clear").on("click", function(){
        queue.clear();
        $("#message").text("");
        $("#queue, #dequeued").empty();
    });
});