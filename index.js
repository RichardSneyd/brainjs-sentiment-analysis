const brain = require('brain.js');
const readline = require('readline');
const trainingData = require('./training-data.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a simple feed forward neural network
const net = new brain.NeuralNetwork();

// Train based on preprocessed training data
net.train(trainingData);

// Function to convert a string to tokenized object
function tokenize(inputString) {
  const words = inputString.toLowerCase().split(' ');
  const tokenized = {};

  words.forEach(word => {
    tokenized[word] = 1;
  });

  return tokenized;
}

const prompt = ()=> {
    rl.question('Please enter a phrase for sentiment analysis: ', function(userInput) {
        const tokenizedInput = tokenize(userInput);
        const output = net.run(tokenizedInput);
        
        console.log(`Sentiment analysis for the string "${userInput}"`);
        console.log(output);
        
        prompt();
      });
}

prompt();

