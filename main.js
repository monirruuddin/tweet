"use strict";

let inputContentEle = document.querySelector(".contentField");
let btnEle = document.querySelector(".btnSubmitEle");
let searchEle = document.querySelector(".searchField");
let formEle = document.querySelector("form");
let listGroupEle = document.querySelector(".list-group");
let listGroupEe = document.querySelector(".list-group");
let characterCounter = document.querySelector(".counter");
let maxFixNumber = 250;
let tweet = [];
let itemId;

// submit form
formEle.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const contentValue = receiveDateFromInput();
  const isError = validationInput(contentValue);
  const id = tweet.length;
    const getTheTimeIn = PreTimeNow();
  let tweetAll = {
    id: id,
    contentValue: contentValue,
    time: getTheTimeIn,
  };

  if (!isError) {
    tweet.push(tweetAll);
    console.log(tweet);
    addTheContentToUi(contentValue, getTheTimeIn, id);
    resetTheDate();
    setDateLocSorage(tweetAll);
    removeElement()
  }
});

// generate date
function PreTimeNow() {
  let time = moment().format("h:mm A");
  return time;
}

// reset
function resetTheDate() {
  return (inputContentEle.value = "");
}

// addTheContentToUi
function addTheContentToUi(contentValue, getTheTimeIn, id) {
  const listEle = `<li class="liEle getID-${id}" id="idName">${contentValue}
  <div class="elmInfo"><span class="timeEle align-self-center">${getTheTimeIn}</span><div><button class="btn btn-dark updateEle  mr-2">Update</button><button class="btn btn-dark dltEle">Delete</button></div></div></li>`;
  listGroupEe.insertAdjacentHTML("beforeend", listEle);
}

// Pick up the value from input
function receiveDateFromInput() {
  let inputValuee;
  return (inputValuee = inputContentEle.value);
}

// validation date
function validationInput(contentValue) {
  let isError = false;
  if (contentValue == "" || contentValue.length >= 250) {
    return (isError = true);
  }
}

// counter the character
const countChar = () => {
  let inputChar = inputContentEle.value.length;
  let counterCharecter = maxFixNumber - inputChar;
  characterCounter.textContent = counterCharecter + "/250";
  let isrun = true;
  if (inputChar >= 250) {
    document.getElementById("inputId").disabled = true;
  }
};

// add addEventListener to count the charater
inputContentEle.addEventListener("input", countChar);

// add the date in local Storage
function setDateLocSorage(tweetAllInfo) {
  let tweet;
  if (localStorage.getItem("allThetweet")) {
    tweet = JSON.parse(localStorage.getItem("allThetweet"));
    tweet.push(tweetAllInfo);
    localStorage.setItem("allThetweet", JSON.stringify(tweet));
  } else {
    tweet = [];
    tweet.push(tweetAllInfo);
    localStorage.setItem("allThetweet", JSON.stringify(tweet));
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("allThetweet")) {
    tweet = JSON.parse(localStorage.getItem("allThetweet"));
    showTheDateSearch(tweet);
  }
});


searchEle.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const resultAll = tweet.filter((pro) => {
    return pro.contentValue.includes(searchValue);
  });

  // show the date
  showTheDateSearch(resultAll);
});

function showTheDateSearch(resultAll) {
  listGroupEe.innerHTML = " ";
  resultAll.forEach((item) => {
    const addDateHtml = `<li class="liEle getID-${item.id}" id="idName">${item.contentValue}
      <div class="elmInfo"><span class="timeEle align-self-center">${item.time}</span> <div> <button class="btn btn-dark updateEle mr-2">Update</button> <button class="btn btn-dark dltEle">Delete</button></div></div> </li>`;

    listGroupEe.insertAdjacentHTML("beforeend", addDateHtml);
  });
}


function getTheId(itemId) {
  const liElm = itemId.parentElement.parentElement.parentElement.classList[1].split("-")[1];
    return Number(liElm);
}

// remove item
function removeElement() {
  listGroupEe.addEventListener("click", (e) => {
    if (e.target.classList.contains("dltEle")) {
      let y = e.target
      const id = getTheId(y);
      removeFromUI(id);
      removeFromtweet(id);
      removeFromLocalStor(id);
    }else if(e.target.classList.contains("updateEle")){
      itemId = getTheId(e.target);
      const foundTheelemnt = tweet.find((element)=>element.id === itemId);
      updateToUiAndLsrotage(foundTheelemnt);
      
      // Show the update value
      if(!document.querySelector(".update")){
        updatebtn();
        
      }
     
     
    }
  });
}

// update the value
function updateToUiAndLsrotage(foundTheelemnt){
  inputContentEle.value = foundTheelemnt.contentValue;
  
}

function updatebtn(){
  let addBtnIpdate = `<button type="button" class="btn btnSubmitEle update btn-dark">Update</button>`;
  formEle.insertAdjacentHTML("beforeend",addBtnIpdate);
  btnEle.style.display = "none";


};

//add litsener
formEle.addEventListener("click",(evt)=>{
  if(evt.target.classList.contains("update")){    
    const contentValue = receiveDateFromInput(); 
    const isError= validationInput(contentValue);
    let getTheTimeIn = PreTimeNow()
    if(isError){
      alert("please Valid input");
    }else{
      tweet = tweet.map((item)=>{
        if(item.id === itemId){
          return {
            id: item.id,
            contentValue: contentValue,
            time: `Updated: ${getTheTimeIn}`,
          }
        }else{
          return item;
        }
      });
    }
  
  showTheDateSearch(tweet);
  resetTheDate();
  btnEle.style.display = "block";
  document.querySelector(".update").remove();
  updateLstorage();
  }
});

function updateLstorage(){
  if(localStorage.getItem("allThetweet")){
    localStorage.setItem("allThetweet",JSON.stringify(tweet))
  }
}



// remove From ui
function removeFromUI(id) {
  const dltEle = document.querySelector(`.getID-${id}`).remove();
}
// remove From array Tweet


// remove From Local Storage
function removeFromLocalStor(id){
  const tweet = JSON.parse(localStorage.getItem('allThetweet'));
  const tweetAfterRemove = removeAfterUpdate(tweet,id);
  localStorage.setItem('allThetweet',JSON.stringify(tweetAfterRemove));
}

// remove after update
function removeAfterUpdate(tweet,id){
  return tweet.filter((element) => element.id !== id);
 }
 
 // remove From products
 function removeFromtweet(id) {
   const dateremoveafterupdate = removeAfterUpdate(tweet,id);
   tweet = dateremoveafterupdate;
 }
 

 const timeout = document.querySelector('.Noticed')
 setTimeout(hideElement, 20000) //milliseconds until timeout//
 function hideElement() {
   timeout.style.display = 'none'
 }

// navigator.clipboard.writeText(qouteEle);

let copyTextCont =document.querySelector('.copytextt');
let copybtn = document.querySelector(".copybtn");
copybtn.addEventListener('click', async () => {
  if (!navigator.clipboard) {
    alert('Copy functionality not supported');
  }
  try {
    await navigator.clipboard.writeText(copyTextCont.textContent);

  } catch (err) {
    console.error('ERROR', err);
  }
});