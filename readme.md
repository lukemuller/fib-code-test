# Fibonacci Code Test

Node.js code test that deals with awaiting user input, timers and large fibonacci numbers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

This readme also outlines my though process and reasoning around software architectural decisions.

### Prerequisites
```bash
Node.js > v10.4.0
```

## Usage

### Installation

```bash
npm install
tsc:build
```

### Run

```bash
npm start
```

### Run Tests

```bash
npm test
```

## Thought Process & Comments

### BigInt & Node.js version
The requirement to check the first 1000 terms of the Fibonacci sequence meant standard javascript integers would break from about the 79th term onwards due to the MAX_SAFE_INTEGER (9007199254740991).

[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to the rescue! BigInt is supported natively in Node.js from v10.4.0 onwards.

### Checking if number entered is Fibonacci
I opted for memoization to improve efficiency and storing it in array as a lookup rather than computing on the fly each time the user inputs a number.

The initial time taken to generate the array outweighs the repeated call upon user input especially the longer the program is run.

### Displaying frequency and eventBus
I decided to handle this by creating a generic timer class which takes in an eventName that it'll emit an event on during each cycle. I also created a generic eventBus class which handles the emitting and registering of event handlers which can be used throughtout any app.

This seemed the best approach to decouple the timer and displaying of the frequency and allows for futher modularity/udpates.

### Main CLI
The main application has been broken down into basically 3 states that (The last two are very similar but for ease of code readability I decided not to merge).

1. Asking for Frequency
2. Asking for First number
3. Asking for next number

These are all contained in while loops which requires a valid input to be entered before progressing to the next state or running an action.

#### Question Handler

The question handler outputs all questions, validation errors and handles their responses. During any of these 3 stages it will always check if one of the action words is inputted **_resume_**, **_halt_** & **_quit_** before going to the validation stage of ensuring an integer is entered.

#### Storing Entered Number

For performance reasons I decided in storing the inputted numbers and their frequency in a key value pair rather than just inputting them directly into an array and upon displaying to the user calculate the frequency and then order the output.

Originally I was planning on using an object and when outputting the display sorting the properties (inputted number) by their values (frequency) in descending order as requested by the problem. The issue with this is object property order didn't appear to be guaranteed and is prone to errors. Hence the reason of using a Map type where property order is guaranteed. 



## License
[MIT](https://choosealicense.com/licenses/mit/)
