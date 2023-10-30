const faqs = document.querySelectorAll(".faq");
const hiddenQuestionFontWeight = `400`;
const shownQuestionFontWeight = `700`;
const hiddenQuestionColor = `#4B4C5F`;
const shownQuestionColor = `#1E1F36`;
const questionHoverColor = `#F47B56`;

faqs.forEach(function (faq) {
  faq.addEventListener("click", function () {
    const questionElement = faq.querySelector(".question");
    const answerElement = faq.querySelector(".answer");
    const arrowElement = faq.querySelector(".arrow");
    //If answer is hidden, before showing i should hide all other answers
    if (answerIsHidden(answerElement)) {
      colapseAllFaqs();
    }
    //a) If answer was hidden, at this point all other answers are collapsed
    //and this two commands will show me hidden answer
    //b) If answer was shown, at any given moment i know
    //that there could be maximum of 1 shown answers, so
    //all i need is hide this answer, what this 2 lines of code
    //will tackle
    toogleAnswerVisibility(answerElement);
    turnIconArrow180(arrowElement);
    toogleQuestionStyle(questionElement);
  });

  faq.addEventListener("mouseenter", function () {
    const questionElement = faq.querySelector(".question");
    questionElement.style.color = questionHoverColor;
  });

  faq.addEventListener("mouseleave", function () {
    const questionElement = faq.querySelector(".question");

    // If the FAQ is expanded, use the expanded color; if it's collapsed, use the collapsed color.
    const answerElement = faq.querySelector(".answer");
    if (answerIsHidden(answerElement)) {
      questionElement.style.color = hiddenQuestionColor;
    } else {
      questionElement.style.color = shownQuestionColor;
    }
  });
});

function answerIsHidden(answerElement) {
  const computedStyle = getComputedStyle(answerElement);
  return computedStyle.display === "none";
}

function colapseAllFaqs() {
  faqs.forEach(function (faq) {
    const answerElement = faq.querySelector(".answer");

    if (!answerIsHidden(answerElement)) {
      const arrowElement = faq.querySelector(".arrow");
      const questionElement = faq.querySelector(".question");

      toogleQuestionStyle(questionElement);
      toogleAnswerVisibility(answerElement);
      turnIconArrow180(arrowElement);
    }
  });
}

function toogleAnswerVisibility(answerElement) {
  const computedStyle = getComputedStyle(answerElement);
  if (computedStyle.display !== "none") {
    answerElement.style.display = "none";
  } else {
    answerElement.style.display = "block";
  }
}

function turnIconArrow180(arrowElement) {
  const computedStyle = getComputedStyle(arrowElement);
  const isRotated = arrowElement.classList.contains("rotated");
  if (!isRotated) {
    arrowElement.style.transform = "rotate(180deg)";
  } else {
    arrowElement.style.transform = "";
  }
  arrowElement.classList.toggle("rotated");
}

function toogleQuestionStyle(questionElement) {
  const computedStyle = getComputedStyle(questionElement);
  if (computedStyle.fontWeight !== hiddenQuestionFontWeight) {
    questionElement.style.fontWeight = hiddenQuestionFontWeight;
    questionElement.style.color = hiddenQuestionColor;
  } else {
    questionElement.style.fontWeight = shownQuestionFontWeight;
    questionElement.style.color = shownQuestionColor;
  }
}

// function gethiddenQuestionFontWeight() {
//   const width = window.innerWidth;
//   if (width <= 768) {
//     console.log("Mobile or smaller device");
//   } else {
//     console.log("Desktop or larger device");
//   }
// }
