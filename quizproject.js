let currentQuestion = 0; //question the user is on 
let score = 0; //number of correct answers 
let timeLeft = -1; 
let timer; //this will be the timer function 

let numHintsLeft = 3; //allows user to see three hints

let questions = [
   {
	"question": "What is Chandler's Middle Name? ",
	"a": "Muram",
	"b": "Muril",
	"c": "Murial",
	"d": "Murole",
	"image":"quizimages/q1.jpg",
	"answer": "c",
	"hint": "Chandler's middle name ends with the letter 'L'"
   },
   {
	"question": "How many sisters does Joey have?",
	"a": "9",
	"b": "7",
	"c": "11",
	"d": "17",
	"image":"quizimages/q2.jpg",
	"answer": "b",
	"hint": "Count each sister from the picture"
   },
   {
	"question": "Ross got suspended from the museum because of anger management issues. Why was he angry?",
	"a": "He got demoted",
	"b": "Someone ate his sandwhich",
	"c": "Somebody stole a dinosaur bone",
	"d": "He scared a group of little kids on a field trip",
	"image":"quizimages/q3.jpg",
	"answer": "b",
	"hint": "Ross used a contraption called 'the moist maker'"
   },
    {
	"question": "What's in Monica's secret closet? ",
	"a": "Embarrassing baby photos",
	"b": "Pete",
	"c": "Nothing",
	"d": "Junk",
	"image":"quizimages/q4.jpg",
	"answer": "d",
	"hint": "This is something almost everyone keeps inside a storage room"
   },
   {
	"question": "What is Rachel most afraid of?",
	"a": "Swings",
	"b": "Insects",
	"c": "Clowns",
	"d": "Getting her shoelace stuck in the Escalator",
	"image":"quizimages/q5.jpg",
	"answer": "a",
	"hint": "Rachel has a very uncommon fear"
   },
   {
	"question": "What does Phoebe find in a can of pop?",
	"a": "A finger",
	"b": "A winning lottery ticket",
	"c": "A Thumb",
	"d": "Some coins",
	"image":"quizimages/q6.jpg",
	"answer": "c",
	"hint": "Part of the human body"
   },
    {
	"question": "What Holiday does Chandler Hate the most? ",
	"a": "Thanksgivng",
	"b": "Christmas",
	"c": "Easter",
	"d": "Valentines Day",
	"image":"quizimages/q7.jpg",
	"answer": "a",
	"hint": "Monica usually serves Turkey for this Holiday"
   },
   {
	"question": "When Monica categorizes her towels, how many categories are there?",
	"a": "9",
	"b": "11",
	"c": "13",
	"d": "22",
	"image":"quizimages/q8.png",
	"answer": "b",
	"hint": "Less than 15"
   }, 
   {
   "question": "Joey can do what under 10 seconds?",
	"a": "Put on lipstick using his toes",
	"b": "List all the states in America",
	"c": "Shave",
	"d": "Drink a gallon of milk",
	"image":"quizimages/q9.jpg",
	"answer": "d",
	"hint": "He stains his shirt in th process of proving this point"
   },
   {
   "question": "How many total episodes of Friends are there?",
	"a": "145",
	"b": "298",
	"c": "236",
	"d": "405",
	"image":"quizimages/q10.jpg",
	"answer": "c", 
	"hint": "More than 200"
   }
 ];
 
 
 function loadQuestion() {
     
	// If a timer is running from previous question, stop it 
	if (timeLeft >= 0) {
		clearInterval(timer); 
	}
	 
	startTimer();  
	 
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
	
 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
       
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Very impressive! Your score is now "  + score + " / " + questions.length;
    } else {
       message = "Nope! Keep trying though, you'll get it next time. Your score is still " + score + " / " + questions.length; 
    } // else
        
   
    
    // move to the next question
    currentQuestion++;
    if (currentQuestion >= questions.length) {
       // create a special message
       message = "Wow! You did amazing! You really do know your FRIENDS facts! Keep playing to improve your score. ";
    } else {
       loadQuestion();
    }
    
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	// if a nw question is loaded, start timer when lightbox closes
	if (currentQuestion <= questions.length - 1 && timeLeft <= 0) {
		//startTimer(); 
		loadQuestion();
	}
 } // closeLightbox
 
 //start timer for the current question
 function startTimer() {
	 timeLeft = 15; //seconds 
	 console.log("in startTimer ");
	 timer = setInterval(function () {
		document.getElementById("countdown").innerHTML = timeLeft; 
		timeLeft--; 

		
		if (timeLeft < 0) {
			clearInterval(timer); 
			
			// show the lightbox
			let message = "Time up. Moving on to the next question. ";
			document.getElementById("lightbox").style.display = "block";
			document.getElementById("message").innerHTML = message;
			currentQuestion++; 
			loadQuestion ();
		} //if
		
	 }, 1000);
 } //start timer
 
 function showHint () {
	//unhide the lightbox displaying  
	//current question's hint (need to add hints to questions) 
	
	if (numHintsLeft > 0) {
	//get hint from currentQuestion
		message = questions[currentQuestion].hint; 
		numHintsLeft--; //subtract 1 from numHintsLeft
	} else {
		message = "Darn! It looks like you have used up all of your hints"; 
	} //else
	
	
	//unhide the lightbox 
	document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;

 } //showHint
 
 function refreshPage(){
    window.location.reload();
}