console.log('───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────'); 
console.log('Starting app'); 

setTimeout(() => { //this is a async call back meaning it will go do other things before it runs the function
    console.log('Inside setTimeout');
}, 2000); //first argument is what to do on timeout and the second is the number of miliseconds

setTimeout(() => {
    console.log('Inside Second');    
}, 0); // expected to run after finishing up even though it has a 0 delay

console.log('Finishing up');